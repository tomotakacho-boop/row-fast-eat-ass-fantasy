const POSITION = { 1: "QB", 2: "RB", 3: "WR", 4: "TE", 5: "K", 16: "D/ST" };
const WEEK_ZERO_RANKS = new Map([[3, 1], [4, 2], [8, 3], [7, 4], [1, 5], [12, 6], [11, 7], [6, 8], [2, 9], [9, 10], [10, 11], [5, 12]]);
// Final ESPN scoreboard supplied by the commissioner on September 15, 2026.
// The live ESPN boxscore view supersedes this snapshot if all six games have totals.
const WEEK_ONE_POINTS = new Map([[1, 104.74], [2, 72.62], [3, 179.76], [4, 124.86], [5, 140.56], [6, 102.88], [7, 100.46], [8, 137.46], [9, 107.12], [10, 108.60], [11, 112.10], [12, 173.16]]);
const WEEK_ONE_HIGHLIGHTS = new Map([[1, ["D'Andre Swift", 32.4]], [2, ["Jacksonville D/ST", 14.0]], [3, ["Josh Allen", 35.66]], [4, ["Ashton Jeanty", 32.7]], [5, ["Caleb Williams", 37.26]], [6, ["Amon-Ra St. Brown", 28.7]], [7, ["CeeDee Lamb", 15.4]], [8, ["Derrick Henry", 35.3]], [9, ["Justin Jefferson", 31.2]], [10, ["Jonathan Taylor", 25.1]], [11, ["Jaxson Dart", 26.6]], [12, ["Bijan Robinson", 31.3]]]);
const MANAGERS_BY_TEAM_ID = new Map([[1, "Tomotaka Cho"], [2, "Tim Harris"], [3, "Peter Rex"], [4, "Jackson Herz"], [5, "Drew Eckler · Andrew Eckler"], [6, "Jack Coffman"], [7, "John Olson"], [8, "Liam Rex"], [9, "Parker Sikora"], [10, "Seamus Mulcahy"], [11, "Ethan Ashley"], [12, "Will Cordonnier"]]);

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
    const scoringEndpoint = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${encodeURIComponent(season)}/segments/0/leagues/${encodeURIComponent(leagueId)}?view=mBoxscore&matchupPeriodId=1&scoringPeriodId=1`;
    const scoringResponse = await fetch(scoringEndpoint, { headers });
    const scoringRaw = scoringResponse.ok ? await scoringResponse.json() : null;
    const league = normalizeLeague(raw, Number(season), scoringRaw);
    return json(league, 200, "private, max-age=90, stale-while-revalidate=240");
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

function normalizeLeague(raw, season, scoringRaw = null) {
  const members = new Map((raw.members || []).map((member) => [member.id, member.displayName || [member.firstName, member.lastName].filter(Boolean).join(" ")]));
  const currentWeek = Number(raw.status?.currentMatchupPeriod || raw.scoringPeriodId || 1);
  const teamsById = new Map();
  const divisionsById = new Map((raw.settings?.scheduleSettings?.divisions || []).map((division) => [Number(division.id), division.name]));
  const weekOneGames = Number(season) === 2026 ? finalizedWeekOneGames(raw.schedule || [], scoringRaw?.schedule || []) : [];
  const weekOneFinal = weekOneGames.length === 6 && weekOneGames.every((game) => game.final);
  const weekOneScoreSource = weekOneFinal ? weekOneGames[0].source : null;
  const computedRecords = weekOneFinal ? recordsFromGames(weekOneGames) : new Map();

  const teams = (raw.teams || []).map((team) => {
    const name = String(team.name || [team.location, team.nickname].filter(Boolean).join(" ") || team.abbrev || `Team ${team.id}`).trim();
    const record = team.record?.overall || {};
    const computed = computedRecords.get(Number(team.id));
    const manager = MANAGERS_BY_TEAM_ID.get(Number(team.id)) || (team.owners || []).map((owner) => members.get(owner)).filter(Boolean).join(" · ") || TEAM_MANAGERS.get(normalize(name)) || "";
    const normalized = {
      id: team.id,
      name,
      abbreviation: team.abbrev || "",
      manager,
      divisionId: team.divisionId == null ? null : Number(team.divisionId),
      divisionName: divisionsById.get(Number(team.divisionId)) || TEAM_DIVISIONS.get(normalize(name)) || "West",
      rank: team.playoffSeed || 0,
      wins: computed?.wins ?? record.wins ?? 0,
      losses: computed?.losses ?? record.losses ?? 0,
      ties: computed?.ties ?? record.ties ?? 0,
      pointsFor: round(computed?.pointsFor ?? record.pointsFor ?? 0),
      pointsAgainst: round(computed?.pointsAgainst ?? record.pointsAgainst ?? 0),
      streak: computed ? formatStreak(1, computed.wins ? "WIN" : computed.losses ? "LOSS" : "TIE") : formatStreak(record.streakLength, record.streakType),
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

  const weekOneById = new Map(weekOneGames.map((game) => [Number(game.id), game]));
  const matchups = (raw.schedule || []).filter((matchup) => matchup.home?.teamId && matchup.away?.teamId).map((matchup) => {
    const week = Number(matchup.matchupPeriodId || 0);
    const isFuture = week > currentWeek;
    const isPast = week < currentWeek;
    const finalGame = week === 1 && weekOneFinal ? weekOneById.get(Number(matchup.id)) : null;
    return {
      id: matchup.id,
      week,
      home: teamsById.get(matchup.home.teamId) || { id: matchup.home.teamId, name: `Team ${matchup.home.teamId}` },
      away: teamsById.get(matchup.away.teamId) || { id: matchup.away.teamId, name: `Team ${matchup.away.teamId}` },
      homeScore: finalGame ? round(finalGame.homeScore) : isFuture ? null : round(matchup.home.totalPoints || 0),
      awayScore: finalGame ? round(finalGame.awayScore) : isFuture ? null : round(matchup.away.totalPoints || 0),
      status: finalGame || isPast ? "Final" : isFuture ? "Scheduled" : "Live",
    };
  });

  const projectionWeek = weekOneFinal ? Math.max(2, currentWeek) : currentWeek;
  const powerRankings = buildPowerRankings(raw.teams || [], season, projectionWeek);
  if (weekOneFinal) {
    const actualByTeam = new Map(weekOneGames.flatMap((game) => [[game.homeId, game.homeScore], [game.awayId, game.awayScore]]));
    powerRankings.forEach((row) => {
      row.teamStrength = row.projected;
      row.performanceIndex = actualByTeam.get(Number(row.teamId));
      row.powerScore = .70 * row.teamStrength + .30 * row.performanceIndex;
      row.weekOnePoints = row.performanceIndex;
      row.previousRank = WEEK_ZERO_RANKS.get(Number(row.teamId)) || null;
      const highlight = WEEK_ONE_HIGHLIGHTS.get(Number(row.teamId));
      row.weekOneHighlight = highlight ? { player: highlight[0], points: highlight[1] } : null;
    });
    powerRankings.sort((a, b) => b.powerScore - a.powerScore).forEach((row, index) => { row.rank = index + 1; });
  }
  return {
    leagueName: raw.settings?.name || "Row Fast Eat Ass Season 10",
    season,
    currentWeek,
    updatedAt: new Date().toISOString(),
    powerIssueWeek: weekOneFinal ? 1 : 0,
    projectionWeek,
    weekOneFinal,
    weekOneScoreSource,
    teams,
    matchups,
    powerRankings,
  };
}

function finalizedWeekOneGames(schedule, scoreSchedule) {
  const scoringById = new Map(scoreSchedule.filter((game) => Number(game.matchupPeriodId) === 1).map((game) => [Number(game.id), game]));
  const games = schedule.filter((game) => Number(game.matchupPeriodId) === 1 && game.home?.teamId && game.away?.teamId).map((game) => {
    const scored = scoringById.get(Number(game.id));
    const homeScore = scoreValue(scored?.home, game.home);
    const awayScore = scoreValue(scored?.away, game.away);
    return { id: game.id, homeId: Number(game.home.teamId), awayId: Number(game.away.teamId), homeScore, awayScore, final: Number.isFinite(homeScore) && Number.isFinite(awayScore) && homeScore > 0 && awayScore > 0, source: "ESPN boxscore" };
  });
  if (games.length === 6 && games.every((game) => game.final)) return games;
  return games.map((game) => {
    const homeScore = WEEK_ONE_POINTS.get(game.homeId), awayScore = WEEK_ONE_POINTS.get(game.awayId);
    return { ...game, homeScore, awayScore, final: Number.isFinite(homeScore) && Number.isFinite(awayScore), source: "Commissioner scoreboard · September 15" };
  });
}

function scoreValue(scored, fallback) {
  const candidates = [scored?.totalPoints, scored?.totalPointsLive, scored?.pointsByScoringPeriod?.[1], fallback?.totalPoints];
  for (const candidate of candidates) {
    const value = Number(candidate);
    if (Number.isFinite(value) && value > 0) return value;
  }
  return null;
}

function recordsFromGames(games) {
  const records = new Map();
  const record = (id) => {
    if (!records.has(id)) records.set(id, { wins: 0, losses: 0, ties: 0, pointsFor: 0, pointsAgainst: 0 });
    return records.get(id);
  };
  games.forEach((game) => {
    const home = record(game.homeId), away = record(game.awayId);
    home.pointsFor += game.homeScore; home.pointsAgainst += game.awayScore;
    away.pointsFor += game.awayScore; away.pointsAgainst += game.homeScore;
    if (game.homeScore > game.awayScore) { home.wins++; away.losses++; }
    else if (game.homeScore < game.awayScore) { away.wins++; home.losses++; }
    else { home.ties++; away.ties++; }
  });
  return records;
}

function buildPowerRankings(teams, season, currentWeek) {
  const projected = (player) => projectedTotal(player, season, currentWeek) || projectedTotal(player, season, 0) / 17;
  const injuryWeight = (status) => ({ ACTIVE: 0, QUESTIONABLE: .25, DOUBTFUL: .7, OUT: 1, INJURY_RESERVE: 1, IR: 1, SUSPENSION: 1 }[status] ?? .1);
  const cv = (position) => ({ QB: .2, RB: .34, WR: .39, TE: .36, "D/ST": .42, K: .32 }[position] || .35);
  const rows = teams.map((team) => {
    const pool = (team.roster?.entries || []).map((entry) => {
      const player = entry.playerPoolEntry?.player || {};
      return { id: player.id, name: player.fullName || player.name || "Unknown player", position: POSITION[player.defaultPositionId] || "OTHER", projection: projected(player), owned: Number(player.ownership?.percentOwned || 0), injuryStatus: player.injuryStatus || "ACTIVE" };
    }).sort((a, b) => b.projection - a.projection);
    const used = new Set();
    const grab = (position, count) => pool.filter((player) => player.position === position && !used.has(player.id)).slice(0, count).map((player) => (used.add(player.id), player));
    const starters = [...grab("QB", 1), ...grab("RB", 2), ...grab("WR", 2), ...grab("TE", 1), ...grab("D/ST", 1), ...grab("K", 1)];
    const flex = pool.filter((player) => ["RB", "WR", "TE"].includes(player.position) && !used.has(player.id)).slice(0, 1);
    flex.forEach((player) => used.add(player.id));
    starters.push(...flex);
    const skill = pool.filter((player) => ["RB", "WR", "TE"].includes(player.position));
    const bench = skill.filter((player) => !used.has(player.id)).slice(0, 3);
    const stars = skill.slice(0, 3);
    const wildcard = pool.filter((player) => !used.has(player.id) && ["RB", "WR", "TE"].includes(player.position)).sort((a, b) => wildcardScore(b) - wildcardScore(a))[0];
    const lineup = starters.reduce((sum, player) => sum + player.projection, 0);
    const starPower = stars.reduce((sum, player) => sum + player.projection, 0);
    const depth = bench.reduce((sum, player) => sum + player.projection, 0);
    const injuryRisk = starters.reduce((sum, player) => sum + player.projection * injuryWeight(player.injuryStatus), 0);
    const wildcardValue = wildcard ? wildcardScore(wildcard) : 0;
    const rawSd = Math.sqrt(starters.reduce((sum, player) => sum + Math.pow(player.projection * cv(player.position), 2), 0));
    return { teamId: team.id, lineup, starPower, depth, injuryRisk, wildcardValue, rawSd, leaders: stars.map((player) => player.name), wildcard: wildcard?.name || null };
  });
  const average = (values) => values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
  const leagueStarPower = average(rows.map((row) => row.starPower));
  const leagueDepth = average(rows.map((row) => row.depth));
  rows.forEach((row) => {
    const starScenario = row.lineup + .35 * (row.starPower - leagueStarPower);
    const depthScenario = row.lineup + .15 * (row.depth - leagueDepth);
    const injuryScenario = row.lineup - row.injuryRisk;
    const wildcardScenario = row.lineup + .5 * row.wildcardValue;
    row.projected = Math.max(0, .55 * row.lineup + .25 * starScenario + .05 * depthScenario + .05 * injuryScenario + .10 * wildcardScenario);
    row.stdDev = Math.max(6, Math.min(22, row.rawSd * (row.projected / Math.max(row.lineup, 1)) + row.injuryRisk * .2));
    delete row.rawSd;
  });
  return rows.sort((a, b) => b.projected - a.projected).map((row, index) => ({ ...row, rank: index + 1 }));
}

function wildcardScore(player) {
  return player.projection * (1 - Math.min(player.owned, 100) / 125);
}

function projectedTotal(player, season, scoringPeriodId) {
  const stat = (player.stats || []).find((item) => Number(item.seasonId) === Number(season) && Number(item.statSourceId) === 1 && Number(item.statSplitTypeId) === 0 && Number(item.scoringPeriodId || 0) === Number(scoringPeriodId || 0));
  return Number(stat?.appliedTotal || 0);
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
