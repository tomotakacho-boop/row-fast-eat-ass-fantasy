const TEAM_MANAGERS = new Map([
  ["teamrex", "Peter Rex"],
  ["wetwillies", "Will Cordonnier"],
  ["juuliojones", "Seamus Mulcahy"],
  ["shayshawnbroccoli", "Ethan Ashley"],
  ["meettherobinsons", "Tomotaka Cho"],
  ["eatthebouttelikegroceries", "Tim Harris"],
  ["onlyfannins", "Jack Coffman"],
  ["pukanamatatas", "Jackson Herz"],
  ["rexonrex", "Liam Rex"],
  ["twopointconversiontherapy", "Parker Sikora"],
  ["goffballs", "Drew Eckler · Andrew Eckler"],
  ["kittleleague", "John Olson"],
]);

const TEAM_DIVISIONS = new Map([
  ["meettherobinsons", "East"],
  ["goffballs", "East"],
  ["onlyfannins", "East"],
  ["rexonrex", "East"],
  ["juuliojones", "East"],
  ["wetwillies", "East"],
  ["eatthebouttelikegroceries", "West"],
  ["teamrex", "West"],
  ["pukanamatatas", "West"],
  ["kittleleague", "West"],
  ["twopointconversiontherapy", "West"],
  ["shayshawnbroccoli", "West"],
]);

export default async (request) => {
  if (request.method !== "GET") return json({ error: "Method not allowed." }, 405);

  // ESPN credentials remain server-side; the public overview can load before sign-in.

  const leagueId = process.env.ESPN_LEAGUE_ID || "416026";
  const season = process.env.ESPN_SEASON || "2026";
  if (!leagueId) return json({ error: "Add ESPN_LEAGUE_ID in Netlify to activate the live league connection." }, 503);

  const views = ["mTeam", "mStandings", "mMatchup", "mMatchupScore", "mRoster", "mSettings", "mSchedule"];
  const endpoint = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${encodeURIComponent(season)}/segments/0/leagues/${encodeURIComponent(leagueId)}?${views.map((view) => `view=${view}`).join("&")}`;
  const headers = { Accept: "application/json", "User-Agent": "Row-Fast-League-Hub/1.0" };

  if (process.env.ESPN_S2 && process.env.ESPN_SWID) {
    const swid = process.env.ESPN_SWID.startsWith("{") ? process.env.ESPN_SWID : `{${process.env.ESPN_SWID}}`;
    headers.Cookie = `espn_s2=${process.env.ESPN_S2}; SWID=${swid}`;
  }

  try {
    const response = await fetch(endpoint, { headers });
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        return json({ error: "ESPN rejected the private-league connection. Refresh ESPN_S2 and ESPN_SWID in Netlify." }, 502);
      }
      return json({ error: `ESPN returned ${response.status}. Try refreshing in a moment.` }, 502);
    }
    const raw = await response.json();
    return json(normalizeLeague(raw, Number(season)), 200, "private, max-age=90, stale-while-revalidate=240");
  } catch {
    return json({ error: "The ESPN league is temporarily unreachable." }, 502);
  }
};

async function requireLeagueMember(request) {
  const supabaseUrl = normalizeSupabaseUrl(process.env.SUPABASE_URL || "");
  const anonKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) {
    const error = new Error("Google member authentication is not configured yet.");
    error.status = 503;
    throw error;
  }

  const authorization = request.headers.get("authorization") || "";
  if (!authorization.startsWith("Bearer ")) {
    const error = new Error("Sign in with Google to view private ESPN league data.");
    error.status = 401;
    throw error;
  }

  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { apikey: anonKey, Authorization: authorization },
  });
  if (!response.ok) {
    const error = new Error("Your league session has expired. Please sign in again.");
    error.status = 401;
    throw error;
  }
  const user = await response.json();
  const email = String(user.email || "").toLowerCase();
  const domain = String(process.env.ALLOWED_GOOGLE_DOMAIN || "").toLowerCase().trim();
  const allowedEmails = String(process.env.ALLOWED_EMAILS || "").split(",").map((item) => item.trim().toLowerCase()).filter(Boolean);
  const domainAllowed = domain && email.endsWith(`@${domain}`);
  const emailAllowed = allowedEmails.includes(email);

  if ((domain || allowedEmails.length) && !domainAllowed && !emailAllowed) {
    const error = new Error("This Google account is not on the Row Fast member list.");
    error.status = 403;
    throw error;
  }
}

function normalizeSupabaseUrl(value) {
  return String(value)
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/rest\/v1$/i, "");
}

function normalizeLeague(raw, season) {
  const members = new Map((raw.members || []).map((member) => [member.id, member.displayName || [member.firstName, member.lastName].filter(Boolean).join(" ")]));
  const currentWeek = Number(raw.status?.currentMatchupPeriod || raw.scoringPeriodId || 1);
  const teamsById = new Map();
  const divisionsById = new Map((raw.settings?.scheduleSettings?.divisions || []).map((division) => [Number(division.id), division.name]));

  const teams = (raw.teams || []).map((team) => {
    const name = team.name || [team.location, team.nickname].filter(Boolean).join(" ") || team.abbrev || `Team ${team.id}`;
    const record = team.record?.overall || {};
    const manager = (team.owners || []).map((owner) => members.get(owner)).filter(Boolean).join(" · ") || TEAM_MANAGERS.get(normalize(name)) || "";
    const normalized = {
      id: team.id,
      name,
      abbreviation: team.abbrev || "",
      manager,
      divisionId: team.divisionId == null ? null : Number(team.divisionId),
      divisionName: divisionsById.get(Number(team.divisionId)) || TEAM_DIVISIONS.get(normalize(name)) || "West",
      rank: team.playoffSeed || 0,
      wins: record.wins || 0,
      losses: record.losses || 0,
      ties: record.ties || 0,
      pointsFor: round(record.pointsFor || 0),
      pointsAgainst: round(record.pointsAgainst || 0),
      streak: formatStreak(record.streakLength, record.streakType),
    };
    teamsById.set(team.id, normalized);
    return normalized;
  }).sort((a, b) => {
    const gamesA = a.wins + a.losses + a.ties;
    const gamesB = b.wins + b.losses + b.ties;
    const percentageA = gamesA ? (a.wins + a.ties * .5) / gamesA : 0;
    const percentageB = gamesB ? (b.wins + b.ties * .5) / gamesB : 0;
    return percentageB - percentageA || b.pointsFor - a.pointsFor;
  }).map((team, index) => ({ ...team, rank: index + 1 }));

  const matchups = (raw.schedule || []).filter((matchup) => matchup.home?.teamId && matchup.away?.teamId).map((matchup) => {
    const week = Number(matchup.matchupPeriodId || 0);
    const isFuture = week > currentWeek;
    const isPast = week < currentWeek;
    return {
      id: matchup.id,
      week,
      home: teamsById.get(matchup.home.teamId) || { id: matchup.home.teamId, name: `Team ${matchup.home.teamId}` },
      away: teamsById.get(matchup.away.teamId) || { id: matchup.away.teamId, name: `Team ${matchup.away.teamId}` },
      homeScore: isFuture ? null : round(matchup.home.totalPoints || 0),
      awayScore: isFuture ? null : round(matchup.away.totalPoints || 0),
      status: isPast ? "Final" : isFuture ? "Scheduled" : "Live",
    };
  });

  return {
    leagueName: raw.settings?.name || "Row Fast Eat Ass Season 10",
    season,
    currentWeek,
    updatedAt: new Date().toISOString(),
    teams,
    matchups,
  };
}

function normalize(value = "") { return String(value).toLowerCase().replace(/[^a-z0-9]/g, ""); }
function round(value) { return Math.round(Number(value) * 100) / 100; }
function formatStreak(length, type) { return length ? `${String(type || "").slice(0, 1).toUpperCase()}${length}` : "—"; }
function json(body, status = 200, cache = "no-store") {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": cache },
  });
}
