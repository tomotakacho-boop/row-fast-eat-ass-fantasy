const TEAMS = [
  { id: 1, name: "Team Rex", manager: "Peter Rex", division: "West", divisionOrder: 2 },
  { id: 2, name: "Wet Willies", manager: "Will Cordonnier", division: "East", divisionOrder: 6 },
  { id: 3, name: "Juulio Jones", manager: "Seamus Mulcahy", division: "East", divisionOrder: 5 },
  { id: 4, name: "Shayshawn Broccoli", manager: "Ethan Ashley", division: "West", divisionOrder: 6 },
  { id: 5, name: "Meet The Robinson's", manager: "Tomotaka Cho", division: "East", divisionOrder: 1 },
  { id: 6, name: "Eat The Boutte Like Groceries", manager: "Tim Harris", division: "West", divisionOrder: 1 },
  { id: 7, name: "OnlyFannins", manager: "Jack Coffman", division: "East", divisionOrder: 3 },
  { id: 8, name: "Pukana Matatas", manager: "Jackson Herz", division: "West", divisionOrder: 3 },
  { id: 9, name: "Rex On Rex", manager: "Liam Rex", division: "East", divisionOrder: 4 },
  { id: 10, name: "Two-Point Conversion Therapy", manager: "Parker Sikora", division: "West", divisionOrder: 5 },
  { id: 11, name: "Goff Balls", manager: "Drew Eckler · Andrew Eckler", division: "East", divisionOrder: 2 },
  { id: 12, name: "Kittle League", manager: "John Olson", division: "West", divisionOrder: 4 },
];

const EMOJIS = ["👍", "❤️", "😂", "🔥", "🏈", "👀"];
const SAMPLE_POWER_RANKINGS = [
  {
    rank: 1, teamId: 8, score: 92.4, record: "1–0", movement: "NEW", movementTone: "up",
    result: "Won 143.8–118.6 vs Wet Willies",
    headline: "A first-week statement with very few soft spots.",
    blurb: "Pukana Matatas set the pace with an explosive ceiling and the kind of balanced scoring profile that travels. The model loves both the result and the lack of obvious lineup weakness, making this the sample standard everyone else is chasing.",
    stars: "Bijan Robinson · 27.4; Puka Nacua · 22.1",
    shortfall: "Caleb Williams · 12.8",
    moment: "Bijan’s late touchdown turned a competitive matchup into the week’s biggest margin."
  },
  {
    rank: 2, teamId: 5, score: 89.7, record: "1–0", movement: "+2", movementTone: "up",
    result: "Won 137.1–124.5 vs Goff Balls",
    headline: "The stars delivered, and the supporting cast held the line.",
    blurb: "Meet The Robinson’s got premium output at the top of the lineup and survived one quiet veteran performance. The roster already looks difficult to outscore when its centerpiece players hit together, though the depth will face a tougher test in a closer week.",
    stars: "Ja’Marr Chase · 29.6; Jonathan Taylor · 20.4",
    shortfall: "Mike Evans · 7.8",
    moment: "A fourth-quarter scoring burst created the separation in an otherwise tight matchup."
  },
  {
    rank: 3, teamId: 1, score: 87.9, record: "1–0", movement: "+3", movementTone: "up",
    result: "Won 132.6–117.4 vs OnlyFannins",
    headline: "Elite backfield speed gives Team Rex a real weekly hammer.",
    blurb: "Team Rex paired a strong quarterback result with efficient running-back production and never gave the opponent a clean opening. The ceiling is clear; the next checkpoint is whether the pass catchers can make this lineup less dependent on two superstars.",
    stars: "Jahmyr Gibbs · 24.8; Josh Allen · 25.2",
    shortfall: "Dalton Kincaid · 5.1",
    moment: "The Allen–Gibbs combination erased an early deficit before the late window."
  },
  {
    rank: 4, teamId: 4, score: 84.6, record: "1–0", movement: "+1", movementTone: "up",
    result: "Won 129.9–126.8 vs Juulio Jones",
    headline: "A narrow escape still revealed a lineup with real teeth.",
    blurb: "Shayshawn Broccoli won the week’s closest sample matchup behind a dominant WR1 and a timely flex contribution. The model is impressed by the usable depth but keeps this team outside the top three because the victory required nearly every late break.",
    stars: "CeeDee Lamb · 25.7; Bucky Irving · 18.3",
    shortfall: "Jordan Addison · 6.2",
    moment: "A final-drive reception flipped the projected winner with minutes left."
  },
  {
    rank: 5, teamId: 11, score: 81.8, record: "0–1", movement: "−2", movementTone: "down",
    result: "Lost 124.5–137.1 vs Meet The Robinson’s",
    headline: "The record says loss; the underlying score says contender.",
    blurb: "Goff Balls drew one of the week’s strongest opponents and still posted a score that would have beaten much of the league. There is no panic here: the model rewards the performance while flagging a thin margin for error at tight end.",
    stars: "Amon-Ra St. Brown · 23.9; Lamar Jackson · 24.6",
    shortfall: "Travis Kelce · 7.0",
    moment: "A strong Sunday night rally made the final score far more respectable."
  },
  {
    rank: 6, teamId: 12, score: 79.3, record: "1–0", movement: "+4", movementTone: "up",
    result: "Won 121.7–116.3 vs Two-Point Conversion Therapy",
    headline: "Good structure, timely scoring, and just enough star power.",
    blurb: "Kittle League did not post a fireworks show, but it built points steadily across the lineup and avoided a fatal zero. That sturdy floor earns a meaningful rise; unlocking another explosive option would push the model score into the next tier.",
    stars: "Saquon Barkley · 21.8; Nico Collins · 17.6",
    shortfall: "Deebo Samuel · 8.1",
    moment: "The defense sealed the matchup with a late turnover."
  },
  {
    rank: 7, teamId: 2, score: 76.8, record: "0–1", movement: "−6", movementTone: "down",
    result: "Lost 118.6–143.8 vs Pukana Matatas",
    headline: "A brutal opponent obscures an otherwise playable opening week.",
    blurb: "Wet Willies ran into the highest-scoring team in the sample, so the fall is more about the rest of the league moving up than a total collapse. The core held up, but the flex production has to improve before this roster can win shootouts.",
    stars: "Justin Jefferson · 20.9; Derrick Henry · 17.2",
    shortfall: "David Montgomery · 6.4",
    moment: "A promising comeback ended when the opponent answered with consecutive touchdowns."
  },
  {
    rank: 8, teamId: 6, score: 74.4, record: "1–0", movement: "+1", movementTone: "up",
    result: "Won 119.4–114.2 vs Rex On Rex",
    headline: "The win counts, but the model wants a little more proof.",
    blurb: "Eat The Boutte Like Groceries found just enough production from its young core to bank the result. There are exciting ingredients here, especially at receiver, but one inefficient backfield performance kept the projected rest-of-season strength in the middle tier.",
    stars: "Jaxon Smith-Njigba · 19.8; Drake Maye · 23.1",
    shortfall: "James Cook · 8.0",
    moment: "A bold fourth-down conversion protected the lead late."
  },
  {
    rank: 9, teamId: 10, score: 71.9, record: "0–1", movement: "−2", movementTone: "down",
    result: "Lost 116.3–121.7 vs Kittle League",
    headline: "Close enough to compete, not clean enough to finish.",
    blurb: "Two-Point Conversion Therapy stayed within striking distance but could not overcome a quiet receiving slot. The roster still carries speed and weekly upside, so this ranking could reverse quickly if its secondary options earn more volume.",
    stars: "Malik Nabers · 18.7; De’Von Achane · 16.8",
    shortfall: "Jaylen Waddle · 7.3",
    moment: "A missed Monday-night opportunity left the comeback one score short."
  },
  {
    rank: 10, teamId: 3, score: 68.5, record: "0–1", movement: "−2", movementTone: "down",
    result: "Lost 126.8–129.9 vs Shayshawn Broccoli",
    headline: "The process looked better than the result.",
    blurb: "Juulio Jones lost by a field goal despite producing one of the stronger losing scores. The model sees a competitive roster with immediate rebound potential, but a low tight-end output and a late lineup decision proved costly in a matchup decided at the margins.",
    stars: "Ashton Jeanty · 17.9; Tee Higgins · 15.2",
    shortfall: "George Kittle · 6.5",
    moment: "One bench decision represented more points than the final margin."
  },
  {
    rank: 11, teamId: 9, score: 64.2, record: "0–1", movement: "—", movementTone: "flat",
    result: "Lost 114.2–119.4 vs Eat The Boutte Like Groceries",
    headline: "There is enough talent here, but the lineup needs another gear.",
    blurb: "Rex On Rex remained competitive without receiving a true week-winning performance. A steady floor keeps the team out of last, while the model waits for its running backs to create more explosive plays and improve the weekly ceiling.",
    stars: "Brock Bowers · 16.4; Garrett Wilson · 15.9",
    shortfall: "RJ Harvey · 5.0",
    moment: "A late red-zone target narrowly missed what could have been the winning score."
  },
  {
    rank: 12, teamId: 7, score: 59.8, record: "0–1", movement: "−2", movementTone: "down",
    result: "Lost 117.4–132.6 vs Team Rex",
    headline: "One week is not a verdict, but the warning lights are on.",
    blurb: "OnlyFannins produced respectable top-line numbers, yet too many lineup spots failed to beat replacement level. The roster needs either a volume shift or a waiver-wire hit before the model will buy a quick climb out of the basement.",
    stars: "Josh Jacobs · 15.4; Terry McLaurin · 14.2",
    shortfall: "Rashee Rice · 4.8",
    moment: "Two early red-zone trips produced no touchdowns and set the tone."
  },
];

const WEEK_ONE_METRICS = {
  1: [90.8, 81.1], 2: [80.8, 67.5], 3: [75.1, 53.1], 4: [82.3, 90.0],
  5: [86.4, 97.4], 6: [73.7, 76.0], 7: [68.5, 39.5], 8: [90.2, 97.5],
  9: [65.3, 61.6], 10: [71.8, 72.1], 11: [87.5, 68.5], 12: [78.0, 82.3],
};

const SAMPLE_WEEK_METRICS = {
  0: [
    [1, 1, 91.5, null, "0–0", "Post-draft favorite"],
    [2, 8, 89.8, null, "0–0", "Post-draft favorite"],
    [3, 11, 87.2, null, "0–0", "Championship-caliber core"],
    [4, 5, 84.9, null, "0–0", "High-ceiling contender"],
    [5, 4, 82.6, null, "0–0", "Balanced playoff build"],
    [6, 2, 80.8, null, "0–0", "Veteran floor with upside"],
    [7, 12, 78.4, null, "0–0", "Stable weekly foundation"],
    [8, 3, 75.9, null, "0–0", "Young roster with variance"],
    [9, 6, 73.5, null, "0–0", "Receiver-led breakout bet"],
    [10, 10, 70.7, null, "0–0", "Explosive but fragile"],
    [11, 7, 67.8, null, "0–0", "Needs a depth hit"],
    [12, 9, 63.9, null, "0–0", "Thin margin for error"],
  ],
  2: [
    [1, 8, 90.6, 95.1, "2–0", "Won 136.2–121.7 vs Juulio Jones"],
    [2, 1, 90.1, 91.1, "2–0", "Won 129.4–115.8 vs Rex On Rex"],
    [3, 5, 86.9, 91.7, "2–0", "Won 141.0–128.6 vs Wet Willies"],
    [4, 11, 87.4, 80.7, "1–1", "Won 134.8–117.1 vs OnlyFannins"],
    [5, 4, 82.8, 82.8, "1–1", "Lost 120.7–124.1 vs Kittle League"],
    [6, 12, 81.9, 80.9, "2–0", "Won 124.1–120.7 vs Shayshawn Broccoli"],
    [7, 3, 77.4, 78.7, "1–1", "Lost 121.7–136.2 vs Pukana Matatas"],
    [8, 2, 80.2, 66.7, "0–2", "Lost 128.6–141.0 vs Meet The Robinson's"],
    [9, 6, 74.1, 71.9, "1–1", "Lost 112.9–118.4 vs Two-Point Conversion Therapy"],
    [10, 10, 72.1, 68.1, "1–1", "Won 118.4–112.9 vs Eat The Boutte Like Groceries"],
    [11, 9, 65.0, 69.5, "0–2", "Lost 115.8–129.4 vs Team Rex"],
    [12, 7, 68.0, 51.0, "0–2", "Lost 117.1–134.8 vs Goff Balls"],
  ],
  3: [
    [1, 1, 91.2, 97.4, "3–0", "Won 151.3–126.2 vs Wet Willies"],
    [2, 8, 90.5, 94.0, "2–1", "Lost 132.5–137.1 vs Kittle League"],
    [3, 5, 87.4, 93.0, "3–0", "Won 139.6–119.3 vs OnlyFannins"],
    [4, 12, 81.9, 90.6, "3–0", "Won 137.1–132.5 vs Pukana Matatas"],
    [5, 11, 87.0, 79.0, "2–1", "Won 127.8–118.0 vs Rex On Rex"],
    [6, 4, 82.2, 80.9, "2–1", "Won 125.4–116.8 vs Two-Point Conversion Therapy"],
    [7, 3, 77.4, 80.5, "2–1", "Won 130.9–114.7 vs Eat The Boutte Like Groceries"],
    [8, 6, 74.1, 76.5, "1–2", "Lost 114.7–130.9 vs Juulio Jones"],
    [9, 2, 80.2, 61.9, "0–3", "Lost 126.2–151.3 vs Team Rex"],
    [10, 10, 72.1, 66.5, "1–2", "Lost 116.8–125.4 vs Shayshawn Broccoli"],
    [11, 9, 65.0, 65.0, "0–3", "Lost 118.0–127.8 vs Goff Balls"],
    [12, 7, 68.0, 47.8, "0–3", "Lost 119.3–139.6 vs Meet The Robinson's"],
  ],
};

function stripSamplePoints(value) {
  return value.replace(/ · \d+\.\d/g, "");
}

function shiftSamplePoints(value, week, teamId, down = false) {
  const direction = down ? -1 : 1;
  const offset = direction * ((((teamId * 3) + (week * 5)) % 7) - 3) * 0.7;
  return value.replace(/(\d+\.\d)/g, (match) => Math.max(0, Number(match) + offset).toFixed(1));
}

function movementFrom(rank, previousRank) {
  if (!previousRank) return { movement: "NEW", movementTone: "flat" };
  const change = previousRank - rank;
  if (change > 0) return { movement: `+${change}`, movementTone: "up" };
  if (change < 0) return { movement: `−${Math.abs(change)}`, movementTone: "down" };
  return { movement: "—", movementTone: "flat" };
}

function generatedPowerCopy(week, rank, team, strength, performance, record) {
  const gap = performance == null ? 0 : performance - strength;
  if (week === 0) {
    const headline = rank <= 3
      ? "The draft room produced an immediate contender."
      : rank <= 8 ? "A credible build with a clear path upward." : "The upside is visible, but the roster needs its bets to hit.";
    return {
      headline,
      blurb: `${team.name} opens at ${strength.toFixed(1)} in the roster-only baseline. The model likes the core while treating the preseason order as a forecast, not a result: depth, health, and waiver execution can change this picture quickly.`,
      moment: `Team Strength starts at ${strength.toFixed(1)}; game performance begins affecting the board after Week 1.`,
    };
  }
  const headline = gap >= 7
    ? "The game results are forcing the model to buy in."
    : gap <= -7 ? "The roster still looks stronger than the early résumé." : rank <= 4
      ? "A complete profile keeps this team in the top tier." : "The model sees a team close to its true early-season level.";
  const direction = gap > 1 ? "running ahead of" : gap < -1 ? "trailing" : "tracking closely with";
  return {
    headline,
    blurb: `${team.name} leaves Week ${week} at ${record}. Its ${performance.toFixed(1)} Performance Index is ${direction} the ${strength.toFixed(1)} Team Strength baseline, so the current slot reflects both what happened and what the roster projects to do next.`,
    moment: `The model’s loudest signal is a ${Math.abs(gap).toFixed(1)}-point gap between Performance Index and Team Strength.`,
  };
}

function buildGeneratedWeek(week, rows, previousRankings = []) {
  const previous = new Map(previousRankings.map((ranking) => [ranking.teamId, ranking.rank]));
  const weights = week === 0 ? [1, 0] : week === 2 ? [.6, .4] : [.55, .45];
  return rows.map(([rank, teamId, strength, performance, record, result]) => {
    const team = TEAMS.find((item) => item.id === teamId);
    const base = SAMPLE_POWER_RANKINGS.find((item) => item.teamId === teamId);
    const copy = generatedPowerCopy(week, rank, team, strength, performance, record);
    const score = performance == null ? strength : (strength * weights[0]) + (performance * weights[1]);
    return {
      ...base,
      ...movementFrom(rank, previous.get(teamId)),
      rank, teamId, strength, performance, record, result,
      score: Number(score.toFixed(1)),
      headline: copy.headline,
      blurb: copy.blurb,
      stars: week === 0 ? stripSamplePoints(base.stars) : shiftSamplePoints(base.stars, week, teamId),
      shortfall: week === 0 ? stripSamplePoints(base.shortfall) : shiftSamplePoints(base.shortfall, week, teamId, true),
      moment: copy.moment,
    };
  });
}

const WEEK_ZERO_POWER_RANKINGS = buildGeneratedWeek(0, SAMPLE_WEEK_METRICS[0]);
const WEEK_ONE_POWER_RANKINGS = SAMPLE_POWER_RANKINGS.map((ranking) => ({
  ...ranking,
  strength: WEEK_ONE_METRICS[ranking.teamId][0],
  performance: WEEK_ONE_METRICS[ranking.teamId][1],
}));
const WEEK_TWO_POWER_RANKINGS = buildGeneratedWeek(2, SAMPLE_WEEK_METRICS[2], WEEK_ONE_POWER_RANKINGS);
const WEEK_THREE_POWER_RANKINGS = buildGeneratedWeek(3, SAMPLE_WEEK_METRICS[3], WEEK_TWO_POWER_RANKINGS);

const SAMPLE_POWER_ISSUES = {
  0: {
    kicker: "Week 0 · Post-draft", title: "The draft room has spoken. Now we set the baseline.",
    copy: "A roster-only opening edition built before anyone scores a real point. Every team starts 0–0, and all rankings, player references, and commentary are fictional sample content.",
    issue: "Issue 00", version: "Model v0.0", calibration: "Roster-only baseline",
    rankingTitle: "Week 0 post-draft power rankings", resultLabel: "Post-draft outlook · sample",
    labels: ["Roster anchors", "Main concern", "Draft identity"],
    inputs: [["Published blend", "100% Team Strength"], ["Lineup", "Starter production"], ["Value", "VOR by position"], ["Risk", "Floor + resilience"], ["Games", "Not used yet"]],
    method: "Week 0 uses 100% Team Strength and 0% Performance Index because no games have been played. This is the post-draft baseline, not a permanent draft grade.",
    rankings: WEEK_ZERO_POWER_RANKINGS,
  },
  1: {
    kicker: "Week 1 issue", title: "One game creates movement, not certainty.",
    copy: "The first results enter the model while the post-draft roster baseline still carries most of the weight. All records, scores, player performances, and commentary are fictional sample content.",
    issue: "Issue 01", version: "Model v0.1", calibration: "One-game sample",
    rankingTitle: "Week 1 power rankings", resultLabel: "Previous matchup · sample",
    labels: ["Top performers", "Fell short", "Week-defining moment"],
    inputs: [["Published blend", "70% Team Strength"], ["Earned share", "30% Performance"], ["Game signal", "All-play + projection"], ["Coaching", "Lineup efficiency"], ["Context", "Opponent-adjusted"]],
    method: "Week 1 blends 70% Team Strength and 30% Performance Index. One result can move a team, but the model refuses to let a single spike or dud erase the roster forecast.",
    rankings: WEEK_ONE_POWER_RANKINGS,
  },
  2: {
    kicker: "Week 2 issue", title: "Repeat performances are becoming evidence.",
    copy: "Two weeks of scoring, decisions, and opponent context now carry meaningful weight, but the model still protects against early-season noise. All content remains fictional sample data.",
    issue: "Issue 02", version: "Model v0.2", calibration: "Early signal",
    rankingTitle: "Week 2 power rankings", resultLabel: "Previous matchup · sample",
    labels: ["Top performers", "Fell short", "Model signal"],
    inputs: [["Published blend", "60% Team Strength"], ["Earned share", "40% Performance"], ["Game signal", "All-play + projection"], ["Coaching", "Lineup efficiency"], ["Context", "Opponent-adjusted"]],
    method: "Week 2 blends 60% Team Strength and 40% Performance Index. Repeated success matters more, while roster quality still prevents a lucky 2–0 start from automatically taking the top spot.",
    rankings: WEEK_TWO_POWER_RANKINGS,
  },
  3: {
    kicker: "Week 3 issue", title: "Three weeks in, the résumés are taking shape.",
    copy: "Results nearly share equal weight with forward-looking roster strength. Rankings now reward sustained scoring and sound lineup decisions without pretending three weeks tell the whole story. All content is fictional.",
    issue: "Issue 03", version: "Model v0.3", calibration: "Early-season blend",
    rankingTitle: "Week 3 power rankings", resultLabel: "Previous matchup · sample",
    labels: ["Top performers", "Fell short", "Model signal"],
    inputs: [["Published blend", "55% Team Strength"], ["Earned share", "45% Performance"], ["Game signal", "All-play + projection"], ["Coaching", "Lineup efficiency"], ["Context", "Opponent-adjusted"]],
    method: "Week 3 blends 55% Team Strength and 45% Performance Index. The ranking is now close to an even split between who should be good and who has actually played well.",
    rankings: WEEK_THREE_POWER_RANKINGS,
  },
};
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const CHANNELS = {
  "league-feed": { title: "# league-feed", description: "Talk ball, post receipts, and react irresponsibly.", welcome: "Welcome to the league feed.", copy: "This is the start of the Row Fast Season 10 conversation." },
  "trade-talk": { title: "# trade-talk", description: "Shop players, signal interest, and build a deal.", welcome: "Welcome to the trade room.", copy: "Post trade ideas below or use the live trade block to find a match." },
  memes: { title: "# memes", description: "The league meme wall. Images only, dignity optional.", welcome: "Welcome to the meme wall.", copy: "Upload an image or use the built-in studio to make one. Text-only posts are disabled here." },
};

const state = {
  config: null,
  session: null,
  user: null,
  profile: null,
  league: null,
  selectedWeek: 1,
  selectedPowerWeek: 3,
  posts: [],
  comments: [],
  reactions: [],
  profiles: [],
  powerComments: [],
  powerReactions: [],
  activePowerReplyKey: null,
  activePowerReactionKey: null,
  powerLoaded: false,
  activeReplyPostId: null,
  activeReactionPostId: null,
  feedTimer: null,
  authJustCompleted: false,
  authError: "",
  activeChannel: "league-feed",
  tradeItems: [],
  tradeInterests: [],
  composerFile: null,
  composerMedia: null,
  composerPreviewUrl: "",
  memeBaseImage: null,
  memeOverlayImage: null,
};

document.addEventListener("DOMContentLoaded", bootstrap);

async function bootstrap() {
  populateStaticTeams();
  populateWeekSelect();
  renderFallbackOverview();
  bindNavigation();
  bindInterface();

  state.config = await loadRuntimeConfig();
  await restoreSession();
  renderAuth();

  if (state.session) {
    await Promise.all([loadProfile(), loadLeagueData()]);
    await loadFeed();
    await loadPowerRankingActivity();
  } else {
    renderFeedSignedOut();
    renderPowerIssue();
  }

  routeFromHash();
  if (state.authJustCompleted && state.user) {
    const name = state.profile?.display_name || state.user.user_metadata?.full_name || state.user.email;
    toast(`Signed in successfully as ${name}.`);
  } else if (state.authError) {
    toast(state.authError);
  }
}

function bindNavigation() {
  $$("[data-view]").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });
  window.addEventListener("hashchange", routeFromHash);
}

function routeFromHash() {
  const route = window.location.hash.replace("#", "");
  if (["overview", "power", "methods", "feed"].includes(route)) switchView(route, false);
}

function switchView(view, updateHash = true) {
  $$("[data-view]").forEach((item) => item.classList.toggle("is-active", item.dataset.view === view));
  $$("[data-view-panel]").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.viewPanel === view));
  if (updateHash) history.replaceState(null, "", `#${view}`);
  if (view === "feed" && state.session) {
    loadFeed();
    clearInterval(state.feedTimer);
    state.feedTimer = setInterval(() => {
      if ($('[data-view-panel="feed"]').classList.contains("is-active")) loadFeed(true);
    }, 15000);
  } else {
    clearInterval(state.feedTimer);
  }
  if (view === "power") {
    if (state.session) loadPowerRankingActivity(true);
    else renderPowerIssue();
  }
}

function bindInterface() {
  $("#auth-actions").addEventListener("click", (event) => {
    const action = event.target.closest("[data-auth]")?.dataset.auth;
    if (action === "login" || action === "signup") beginGoogleAuth();
    if (action === "logout") signOut();
    if (action === "profile") openProfileModal();
  });

  $("#refresh-espn").addEventListener("click", () => loadLeagueData(true));
  $("#week-select").addEventListener("change", (event) => {
    state.selectedWeek = Number(event.target.value);
    renderSchedule();
  });
  $("#power-week-select").addEventListener("change", (event) => selectPowerWeek(Number(event.target.value)));
  $("#power-prev-week").addEventListener("click", () => selectPowerWeek(state.selectedPowerWeek - 1));
  $("#power-next-week").addEventListener("click", () => selectPowerWeek(state.selectedPowerWeek + 1));
  $("#post-form").addEventListener("submit", createPost);
  $("#post-input").addEventListener("input", autoGrowComposer);
  $("#post-input").addEventListener("keydown", handleComposerKeydown);
  $("#attachment-button").addEventListener("click", () => $("#attachment-input").click());
  $("#attachment-input").addEventListener("change", handleComposerAttachment);
  $("#gif-button").addEventListener("click", toggleGifPicker);
  $("#gif-search-button").addEventListener("click", searchGifs);
  $("#gif-search").addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); searchGifs(); } });
  $("#gif-close").addEventListener("click", closeGifPicker);
  $("#gif-results").addEventListener("click", chooseGif);
  $("#composer-preview").addEventListener("click", (event) => {
    if (event.target.closest("[data-clear-media]")) clearComposerMedia();
  });
  $$("[data-channel]").forEach((button) => button.addEventListener("click", () => selectChannel(button.dataset.channel)));
  $("#channel-plugin").addEventListener("click", handleChannelPluginClick);
  $("#trade-form").addEventListener("submit", createTradeItem);
  $("#meme-form").addEventListener("submit", createMemePost);
  $("#meme-base").addEventListener("change", handleMemeBase);
  $("#meme-overlay").addEventListener("change", handleMemeOverlay);
  ["#meme-white-bar", "#meme-top-text", "#meme-bottom-text", "#meme-overlay-x", "#meme-overlay-size"].forEach((selector) => {
    $(selector).addEventListener("input", drawMemePreview);
    $(selector).addEventListener("change", drawMemePreview);
  });
  $$('[data-close-modal]').forEach((button) => button.addEventListener("click", () => closeModal(button.dataset.closeModal)));
  ["#trade-modal", "#meme-modal"].forEach((selector) => $(selector).addEventListener("click", (event) => { if (event.target === event.currentTarget) closeModal(event.currentTarget.id); }));
  $("#profile-form").addEventListener("submit", saveProfile);
  $("#profile-avatar").addEventListener("change", previewProfileAvatar);
  $("#profile-cancel").addEventListener("click", closeProfileModal);
  $("#profile-close").addEventListener("click", closeProfileModal);
  $("#profile-modal").addEventListener("click", (event) => {
    if (event.target === event.currentTarget) closeProfileModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!$("#profile-modal").hidden) closeProfileModal();
    if (!$("#trade-modal").hidden) closeModal("trade-modal");
    if (!$("#meme-modal").hidden) closeModal("meme-modal");
    closeGifPicker();
  });
  $("#message-list").addEventListener("click", handleMessageClick);
  $("#message-list").addEventListener("submit", handleReplySubmit);
  $("#power-rankings-list").addEventListener("click", handlePowerRankingClick);
  $("#power-rankings-list").addEventListener("submit", handlePowerReplySubmit);
  $("#toggle-members").addEventListener("click", () => $("#member-rail").classList.add("is-open"));
  $("#close-members").addEventListener("click", () => $("#member-rail").classList.remove("is-open"));
}

function populateStaticTeams() {
  renderPowerIssue();

  $("#member-list").innerHTML = TEAMS.map((team) => `
    <div class="member">
      <span class="member-dot">${initials(team.name)}</span>
      <span><strong>${escapeHtml(team.name)}</strong><small>${escapeHtml(team.manager)}</small></span>
    </div>`).join("");

  $("#profile-team").innerHTML = `<option value="">Select your team</option>${TEAMS.map((team) =>
    `<option value="${team.id}">${escapeHtml(team.name)} · ${escapeHtml(team.manager)}</option>`).join("")}`;

  $("#draft-order-list").innerHTML = [...TEAMS]
    .sort((a, b) => a.id - b.id)
    .map((team) => `<div class="draft-order-entry${team.id === 5 ? " is-user-team" : ""}">
      <span class="draft-slot">${team.id}</span>
      <span><strong>${escapeHtml(team.name)}</strong><small>${escapeHtml(team.manager)}</small></span>
    </div>`).join("");
}

function populateWeekSelect() {
  $("#week-select").innerHTML = Array.from({ length: 18 }, (_, i) => `<option value="${i + 1}">Week ${i + 1}</option>`).join("");
}

async function loadRuntimeConfig() {
  try {
    const response = await fetch("/.netlify/functions/runtime-config", { cache: "no-store" });
    if (!response.ok) throw new Error("Runtime configuration is unavailable.");
    return await response.json();
  } catch {
    return { supabaseUrl: "", supabaseAnonKey: "", allowedDomain: "", giphyApiKey: "", configured: false };
  }
}

async function restoreSession() {
  const hash = new URLSearchParams(window.location.hash.slice(1));
  const query = new URLSearchParams(window.location.search);
  const oauthError = hash.get("error_description") || query.get("error_description") || hash.get("error") || query.get("error");
  const accessToken = hash.get("access_token");
  const refreshToken = hash.get("refresh_token");

  if (oauthError) {
    state.authError = `Google sign-in did not finish: ${oauthError}`;
    clearOAuthCallback();
    return;
  }

  if (accessToken) {
    state.session = {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: Math.floor(Date.now() / 1000) + Number(hash.get("expires_in") || 3600),
    };
    localStorage.setItem("rowfast_session", JSON.stringify(state.session));
    state.authJustCompleted = true;
    clearOAuthCallback();
  } else if (query.get("code")) {
    state.authError = "Google approved the login, but the Supabase session could not be completed. Start sign-in again from this page.";
    clearOAuthCallback();
    return;
  } else {
    try { state.session = JSON.parse(localStorage.getItem("rowfast_session")); } catch { state.session = null; }
  }

  if (!state.session) return;
  if (!state.config?.configured) {
    state.authError = "Google returned successfully, but SUPABASE_ANON_KEY is missing or unavailable in Netlify.";
    localStorage.removeItem("rowfast_session");
    state.session = null;
    return;
  }
  if (state.session.expires_at < Math.floor(Date.now() / 1000) + 90) await refreshSession();
  if (!state.session) return;

  try {
    const response = await fetch(`${state.config.supabaseUrl}/auth/v1/user`, {
      headers: authHeaders(),
    });
    if (!response.ok) {
      let detail = "Session validation failed.";
      try {
        const payload = await response.json();
        detail = payload.msg || payload.message || payload.error_description || detail;
      } catch {}
      throw new Error(detail);
    }
    state.user = await response.json();
    const domain = state.user.email?.split("@")[1]?.toLowerCase();
    if (state.config.allowedDomain && domain !== state.config.allowedDomain.toLowerCase()) {
      await signOut();
      toast(`Use your ${state.config.allowedDomain} Google account to enter this league.`);
    }
  } catch (error) {
    localStorage.removeItem("rowfast_session");
    state.session = null;
    state.user = null;
    state.authError = /api key/i.test(error.message)
      ? "Google approved the login, but Netlify is missing a valid SUPABASE_ANON_KEY. Add the public publishable/anon key and redeploy."
      : `Google approved the login, but the session could not be verified: ${error.message}`;
  }
}

function clearOAuthCallback() {
  history.replaceState(null, "", `${location.pathname}#overview`);
}

async function refreshSession() {
  if (!state.session?.refresh_token) return signOut();
  try {
    const response = await fetch(`${state.config.supabaseUrl}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: { apikey: state.config.supabaseAnonKey, "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: state.session.refresh_token }),
    });
    if (!response.ok) throw new Error("Refresh failed");
    const session = await response.json();
    state.session = {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: Math.floor(Date.now() / 1000) + session.expires_in,
    };
    localStorage.setItem("rowfast_session", JSON.stringify(state.session));
  } catch {
    localStorage.removeItem("rowfast_session");
    state.session = null;
  }
}

function beginGoogleAuth() {
  if (!state.config?.configured) {
    toast("Google sign-in needs both SUPABASE_URL and SUPABASE_ANON_KEY in Netlify, followed by a new deploy.");
    return;
  }
  const redirectTo = `${location.origin}${location.pathname}`;
  location.assign(`${state.config.supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectTo)}`);
}

async function signOut() {
  if (state.session && state.config?.supabaseUrl) {
    fetch(`${state.config.supabaseUrl}/auth/v1/logout`, { method: "POST", headers: authHeaders() }).catch(() => {});
  }
  state.session = null;
  state.user = null;
  state.profile = null;
  state.authJustCompleted = false;
  state.authError = "";
  localStorage.removeItem("rowfast_session");
  renderAuth();
  renderFallbackOverview();
  renderFeedSignedOut();
  state.powerComments = [];
  state.powerReactions = [];
  state.powerLoaded = false;
  renderPowerRankings();
}

function renderAuth() {
  const root = $("#auth-actions");
  if (!state.user) {
    root.innerHTML = `<button class="button button-ghost" data-auth="login">Log in</button><button class="button button-gold" data-auth="signup">Sign up</button>${state.authError ? `<span class="auth-alert" title="${escapeAttr(state.authError)}">Sign-in incomplete</span>` : ""}`;
    return;
  }
  const name = state.profile?.display_name || state.user.user_metadata?.full_name || state.user.email;
  const avatar = state.profile?.avatar_url || state.user.user_metadata?.avatar_url;
  root.innerHTML = `<div class="user-chip" aria-label="Signed in as ${escapeAttr(name)}"><span class="user-presence" aria-hidden="true"></span><button class="user-profile-button" data-auth="profile" aria-label="Edit profile"><span class="user-identity"><small>Signed in · Edit profile</small><strong>${escapeHtml(name)}</strong></span>${avatar ? `<img class="avatar" src="${escapeAttr(avatar)}" alt="" />` : `<span class="avatar-fallback">${initials(name)}</span>`}</button><button class="logout-button" data-auth="logout">Log out</button></div>`;
  const input = $("#post-input");
  input.disabled = false;
  input.placeholder = `Message #${state.activeChannel}`;
  $(".send-button").disabled = false;
  $("#attachment-button").disabled = false;
  $("#gif-button").disabled = false;
  $("#composer-note").textContent = "Press Enter to post · Shift + Enter for a new line.";
  renderChannelUI();
}

async function loadProfile() {
  if (!state.user) return;
  try {
    const profiles = await supabaseRequest(`/rest/v1/profiles?id=eq.${encodeURIComponent(state.user.id)}&select=*`);
    state.profile = profiles?.[0] || null;
    if (!state.profile?.team_id) openProfileModal();
    renderAuth();
  } catch (error) {
    toast(readableError(error, "Profile setup is waiting for the database schema."));
  }
}

function openProfileModal() {
  if (!state.user) return;
  $("#profile-name").value = state.profile?.display_name || state.user.user_metadata?.full_name || state.user.email?.split("@")[0] || "";
  $("#profile-team").value = state.profile?.team_id ? String(state.profile.team_id) : "";
  $("#profile-avatar").value = "";
  renderProfileAvatarPreview(state.profile?.avatar_url || state.user.user_metadata?.avatar_url, $("#profile-name").value);
  $("#profile-cancel").hidden = false;
  $("#profile-modal").hidden = false;
}

function closeProfileModal() {
  $("#profile-modal").hidden = true;
  switchView("overview");
}

function previewProfileAvatar(event) {
  const file = event.target.files?.[0];
  if (!file) return renderProfileAvatarPreview(state.profile?.avatar_url, $("#profile-name").value);
  if (!/^image\/(jpeg|png|webp|gif)$/.test(file.type) || file.size > 4 * 1024 * 1024) {
    event.target.value = "";
    toast("Choose a JPG, PNG, WebP, or GIF no larger than 4 MB.");
    return;
  }
  renderProfileAvatarPreview(URL.createObjectURL(file), $("#profile-name").value);
}

function renderProfileAvatarPreview(url, name = "") {
  $("#profile-avatar-preview").innerHTML = url
    ? `<img src="${escapeAttr(url)}" alt="Profile preview" />`
    : escapeHtml(initials(name));
}

async function saveProfile(event) {
  event.preventDefault();
  const teamId = Number($("#profile-team").value);
  const team = TEAMS.find((item) => item.id === teamId);
  const displayName = $("#profile-name").value.trim();
  const avatarFile = $("#profile-avatar").files?.[0];
  if (!team || !displayName) return;

  try {
    const saveButton = $("#profile-save");
    saveButton.disabled = true;
    saveButton.textContent = avatarFile ? "Uploading…" : "Saving…";
    const avatarUrl = avatarFile
      ? await uploadProfileAvatar(avatarFile)
      : state.profile?.avatar_url || state.user.user_metadata?.avatar_url || null;
    const rows = await supabaseRequest("/rest/v1/profiles?on_conflict=id", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify({
        id: state.user.id,
        email: state.user.email,
        display_name: displayName,
        avatar_url: avatarUrl,
        team_id: team.id,
        team_name: team.name,
      }),
    });
    state.profile = rows?.[0];
    $("#profile-modal").hidden = true;
    renderAuth();
    await loadFeed(true);
    renderPowerRankings();
    toast("Profile saved. Your picture now appears throughout the league feed.");
  } catch (error) {
    toast(readableError(error, "Could not save your team profile."));
  } finally {
    const saveButton = $("#profile-save");
    saveButton.disabled = false;
    saveButton.textContent = "Save profile";
  }
}

async function uploadProfileAvatar(file) {
  const extension = ({ "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" })[file.type];
  if (!extension || file.size > 4 * 1024 * 1024) throw new Error("Choose a supported image no larger than 4 MB.");
  const path = `${state.user.id}/avatar.${extension}`;
  const response = await fetch(`${state.config.supabaseUrl}/storage/v1/object/profile-images/${path}`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": file.type, "x-upsert": "true" },
    body: file,
  });
  if (!response.ok) {
    let message = `Profile image upload failed (${response.status}).`;
    try { message = (await response.json()).message || message; } catch {}
    if (/bucket not found/i.test(message)) {
      message = "Profile storage is not set up yet. Run supabase/profile-images-setup.sql once in the Supabase SQL Editor, then try again.";
    }
    throw new Error(message);
  }
  return `${state.config.supabaseUrl}/storage/v1/object/public/profile-images/${path}?v=${Date.now()}`;
}

function authHeaders(extra = {}) {
  return {
    apikey: state.config?.supabaseAnonKey || "",
    Authorization: `Bearer ${state.session?.access_token || state.config?.supabaseAnonKey || ""}`,
    ...extra,
  };
}

async function supabaseRequest(path, options = {}) {
  if (!state.config?.supabaseUrl || !state.session) throw new Error("Sign in is not configured.");
  const response = await fetch(`${state.config.supabaseUrl}${path}`, {
    ...options,
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    let message = `Database request failed (${response.status}).`;
    try { message = (await response.json()).message || message; } catch {}
    throw new Error(message);
  }
  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function loadLeagueData(force = false) {
  if (!state.session) return renderFallbackOverview();
  const refresh = $("#refresh-espn");
  refresh.classList.add("is-loading");
  try {
    const response = await fetch(`/.netlify/functions/espn-league${force ? `?refresh=${Date.now()}` : ""}`, {
      headers: { Authorization: `Bearer ${state.session.access_token}` },
      cache: force ? "no-store" : "default",
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "ESPN sync failed.");
    state.league = payload;
    state.selectedWeek = payload.currentWeek || 1;
    $("#week-select").value = String(state.selectedWeek);
    renderLeagueOverview();
    $("#sync-label").textContent = payload.leagueName || "ESPN league connected";
    $("#sync-time").textContent = `Updated ${formatDate(payload.updatedAt)}`;
    $(".status-dot").classList.remove("is-offline");
  } catch (error) {
    renderFallbackOverview();
    $("#sync-label").textContent = "ESPN setup needed";
    $("#sync-time").textContent = error.message;
    $(".status-dot").classList.add("is-offline");
  } finally {
    refresh.classList.remove("is-loading");
  }
}

function renderFallbackOverview() {
  state.league = {
    currentWeek: 1,
    teams: TEAMS.map((team, index) => ({ ...team, divisionName: team.division, rank: index + 1, wins: 0, losses: 0, ties: 0, pointsFor: 0, pointsAgainst: 0, streak: "—" })),
    matchups: Array.from({ length: 6 }, (_, index) => ({
      week: 1,
      home: TEAMS[index],
      away: TEAMS[TEAMS.length - 1 - index],
      homeScore: null,
      awayScore: null,
      status: "Scheduled",
    })),
  };
  state.selectedWeek = 1;
  $("#week-select").value = "1";
  renderLeagueOverview();
}

function renderLeagueOverview() {
  renderStandings();
  renderSchedule();
}

function renderStandings() {
  const teams = state.league?.teams || [];
  renderDivisionStandings("East", "#standings-east-body", teams);
  renderDivisionStandings("West", "#standings-west-body", teams);
}

function renderDivisionStandings(division, selector, teams) {
  const divisionTeams = teams
    .filter((team) => (team.divisionName || divisionFor(team.name)) === division)
    .sort(compareStandings);
  $(selector).innerHTML = divisionTeams.map((team, index) => {
    const profile = profileForTeam(team);
    const avatar = profile?.avatar_url;
    return `
    <tr>
      <td class="rank-number">${index + 1}</td>
      <td><div class="team-cell">${avatar ? `<span class="team-seed team-photo"><img src="${escapeAttr(avatar)}" alt="${escapeAttr(team.name)} profile picture" /></span>` : `<span class="team-seed">${initials(team.name)}</span>`}<span><strong>${escapeHtml(team.name)}</strong><small>${escapeHtml(profile?.display_name || team.manager || managerFor(team.name))}</small></span></div></td>
      <td>${team.wins || 0}-${team.losses || 0}-${team.ties || 0}</td>
      <td>${formatNumber(team.pointsFor)}</td>
      <td>${formatNumber(team.pointsAgainst)}</td>
      <td>${escapeHtml(team.streak || "—")}</td>
    </tr>`;
  }).join("");
}

function compareStandings(a, b) {
  const gamesA = (a.wins || 0) + (a.losses || 0) + (a.ties || 0);
  const gamesB = (b.wins || 0) + (b.losses || 0) + (b.ties || 0);
  const percentageA = gamesA ? ((a.wins || 0) + (a.ties || 0) * .5) / gamesA : 0;
  const percentageB = gamesB ? ((b.wins || 0) + (b.ties || 0) * .5) / gamesB : 0;
  return percentageB - percentageA || (b.pointsFor || 0) - (a.pointsFor || 0) || divisionOrderFor(a.name) - divisionOrderFor(b.name);
}

function renderSchedule() {
  const week = state.selectedWeek || 1;
  const matchups = (state.league?.matchups || []).filter((matchup) => Number(matchup.week) === week);
  $("#schedule-title").textContent = `Week ${week} slate`;

  $("#schedule-list").innerHTML = matchups.length ? matchups.map((matchup) => `
    <div class="schedule-item">
      <div class="schedule-team">${escapeHtml(matchup.home?.name || "TBD")}<small>${scoreSingle(matchup.homeScore)}</small></div>
      <span class="versus">VS</span>
      <div class="schedule-team">${escapeHtml(matchup.away?.name || "TBD")}<small>${scoreSingle(matchup.awayScore)}</small></div>
    </div>`).join("") : `<div class="empty-state">No schedule is available for Week ${week}.</div>`;
}

function scoreSingle(value) { return value == null ? "Scheduled" : `${Number(value).toFixed(1)} pts`; }

async function loadFeed(silent = false) {
  if (!state.session) return renderFeedSignedOut();
  if (!silent) $("#message-list").insertAdjacentHTML("beforeend", `<div class="feed-loading">Loading league messages…</div>`);
  try {
    const posts = await supabaseRequest("/rest/v1/feed_posts?select=*&order=created_at.desc&limit=75");
    const ids = (posts || []).map((post) => post.id);
    const filter = ids.length ? `&post_id=in.(${ids.join(",")})` : "&post_id=eq.-1";
    const [comments, reactions, profiles, tradeItems, tradeInterests] = await Promise.all([
      supabaseRequest(`/rest/v1/feed_comments?select=*&order=created_at.asc${filter}`),
      supabaseRequest(`/rest/v1/feed_reactions?select=*${filter}`),
      supabaseRequest("/rest/v1/profiles?select=id,display_name,avatar_url,team_id,team_name"),
      safeSupabase("/rest/v1/trade_block_items?select=*&order=created_at.desc"),
      safeSupabase("/rest/v1/trade_interests?select=*"),
    ]);
    state.posts = (posts || []).reverse();
    state.comments = comments || [];
    state.reactions = reactions || [];
    state.profiles = profiles || [];
    state.tradeItems = tradeItems || [];
    state.tradeInterests = tradeInterests || [];
    renderMembers();
    renderStandings();
    renderChannelUI();
    renderFeed();
  } catch (error) {
    if (!silent) renderFeedError(error);
  }
}

function renderFeedSignedOut() {
  const channel = CHANNELS[state.activeChannel];
  $("#message-list").innerHTML = `
    <div class="feed-welcome"><span class="hash-orb">#</span><h2>${escapeHtml(channel.welcome)}</h2><p>${escapeHtml(channel.copy)}</p></div>
    <div class="feed-loading">Sign in with Google to read and join the conversation.</div>`;
  const input = $("#post-input");
  input.disabled = true;
  input.placeholder = `Sign in to post in #${state.activeChannel}`;
  $(".send-button").disabled = true;
  $("#attachment-button").disabled = true;
  $("#gif-button").disabled = true;
  renderChannelUI();
}

function renderFeedError(error) {
  $("#message-list").innerHTML = `
    <div class="feed-welcome"><span class="hash-orb">#</span><h2>Welcome to the league feed.</h2><p>This is the start of the Row Fast Season 10 conversation.</p></div>
    <div class="feed-loading">${escapeHtml(readableError(error, "The feed is waiting for its database setup."))}</div>`;
}

function renderFeed() {
  const root = $("#message-list");
  const channel = CHANNELS[state.activeChannel];
  const wasNearBottom = root.scrollHeight - root.scrollTop - root.clientHeight < 100;
  const previousScrollTop = root.scrollTop;
  const channelPosts = state.posts.filter((post) => (post.channel || "league-feed") === state.activeChannel);
  const messages = channelPosts.map((post) => {
    const postProfile = profileFor(post.user_id);
    const postAuthor = postProfile?.display_name || post.author_name;
    const postAvatar = postProfile?.avatar_url || post.author_avatar;
    const postTeam = postProfile?.team_name || post.author_team_name;
    const comments = state.comments.filter((comment) => comment.post_id === post.id);
    const reactions = state.reactions.filter((reaction) => reaction.post_id === post.id);
    const reactionButtons = EMOJIS.map((emoji) => {
      const matching = reactions.filter((reaction) => reaction.emoji === emoji);
      if (!matching.length) return "";
      const mine = matching.some((reaction) => reaction.user_id === state.user?.id);
      const attribution = reactionAttribution(matching);
      return `<button class="reaction ${mine ? "is-mine" : ""}" data-reaction="${emoji}" data-post-id="${post.id}" aria-label="${mine ? "Remove" : "Add"} ${emoji} reaction" data-tooltip="${escapeAttr(attribution)}">${emoji} ${matching.length}</button>`;
    }).join("");
    const replyIsOpen = state.activeReplyPostId === post.id;
    const reactionPickerIsOpen = state.activeReactionPostId === post.id;

    return `<article class="message" data-post-id="${post.id}">
      ${postAvatar ? `<img class="avatar" src="${escapeAttr(postAvatar)}" alt="" />` : `<span class="avatar-fallback">${initials(postAuthor)}</span>`}
      <div>
        <div class="message-meta"><span class="message-author">${escapeHtml(postAuthor)}</span>${postTeam ? `<span class="message-team">${escapeHtml(postTeam)}</span>` : ""}<time class="message-time">${formatMessageTime(post.created_at)}</time></div>
        ${post.body ? `<p class="message-body">${escapeHtml(post.body)}</p>` : ""}
        ${post.media_url ? `<a class="message-media-link" href="${escapeAttr(post.media_url)}" target="_blank" rel="noreferrer"><img class="message-media" src="${escapeAttr(post.media_url)}" alt="${escapeAttr(post.media_alt || "Shared image")}" loading="lazy" /></a>` : ""}
        ${reactionButtons ? `<div class="reaction-row">${reactionButtons}</div>` : ""}
        ${comments.length ? `<div class="thread">${comments.map((comment) => { const commentProfile = profileFor(comment.user_id); return `<div class="comment"><strong>${escapeHtml(commentProfile?.display_name || comment.author_name)}</strong>${escapeHtml(comment.body)}<small>${formatMessageTime(comment.created_at)}</small></div>`; }).join("")}</div>` : ""}
        ${replyIsOpen ? `<form class="reply-form" data-reply-form="${post.id}"><input maxlength="500" placeholder="Reply to ${escapeAttr(postAuthor)}" aria-label="Reply to ${escapeAttr(postAuthor)}" required /><button type="submit">Reply</button><button class="reply-cancel" type="button" data-cancel-reply>Cancel</button></form>` : ""}
      </div>
      <div class="message-tools" aria-label="Message actions">
        <button data-add-reaction="${post.id}" title="Add reaction" aria-label="Add reaction">☺<span class="tool-plus">+</span></button>
        <button data-reply="${post.id}" title="Reply" aria-label="Reply">↩</button>
      </div>
      ${reactionPickerIsOpen ? `<div class="reaction-picker" role="group" aria-label="Choose a reaction">${EMOJIS.map((emoji) => `<button data-reaction="${emoji}" data-post-id="${post.id}" aria-label="React ${emoji}">${emoji}</button>`).join("")}<button class="reaction-picker-close" data-close-reactions aria-label="Close reaction picker">×</button></div>` : ""}
    </article>`;
  }).join("");

  root.classList.toggle("is-meme-grid", state.activeChannel === "memes");
  root.innerHTML = `<div class="feed-welcome"><span class="hash-orb">#</span><h2>${escapeHtml(channel.welcome)}</h2><p>${escapeHtml(channel.copy)}</p></div>${messages || `<div class="feed-loading">No posts here yet. Be the first.</div>`}`;
  root.scrollTop = wasNearBottom ? root.scrollHeight : previousScrollTop;
}

async function safeSupabase(path) {
  try { return await supabaseRequest(path); } catch { return []; }
}

function selectChannel(channelName) {
  if (!CHANNELS[channelName]) return;
  state.activeChannel = channelName;
  state.activeReplyPostId = null;
  state.activeReactionPostId = null;
  clearComposerMedia();
  closeGifPicker();
  renderChannelUI();
  if (state.session) renderFeed(); else renderFeedSignedOut();
}

function renderChannelUI() {
  const channel = CHANNELS[state.activeChannel];
  if (!channel) return;
  $$("[data-channel]").forEach((button) => button.classList.toggle("is-active", button.dataset.channel === state.activeChannel));
  $("#channel-title").textContent = channel.title;
  $("#channel-description").textContent = channel.description;
  const composer = $("#post-form");
  const note = $("#composer-note");
  const plugin = $("#channel-plugin");
  const isMemes = state.activeChannel === "memes";
  composer.hidden = isMemes;
  $("#composer-preview").hidden = isMemes || (!state.composerFile && !state.composerMedia);
  note.hidden = isMemes;
  plugin.hidden = state.activeChannel === "league-feed";
  if (state.activeChannel === "trade-talk") renderTradeBlock();
  if (state.activeChannel === "memes") {
    plugin.innerHTML = `<div class="meme-channel-toolbar"><div><strong>Meme studio</strong><span>Upload, caption, remix, and post directly to the channel.</span></div><button class="button button-gold" data-open-meme ${state.user ? "" : "disabled"}>Create a meme</button></div>`;
  }
  if (!isMemes) {
    $("#post-input").placeholder = state.user ? `Message #${state.activeChannel}` : `Sign in to post in #${state.activeChannel}`;
  }
}

function reactionAttribution(reactions) {
  const names = [...new Set(reactions.map((reaction) => profileFor(reaction.user_id)?.display_name || "League member"))];
  if (!names.length) return "No reactions yet";
  if (names.length <= 3) return names.join(", ");
  return `${names.slice(0, 2).join(", ")} + ${names.length - 2} others`;
}

function currentPowerIssue() {
  return SAMPLE_POWER_ISSUES[state.selectedPowerWeek] || SAMPLE_POWER_ISSUES[3];
}

function powerRankingKey(teamId, week = state.selectedPowerWeek) {
  return `sample-week-${week}-team-${teamId}`;
}

function selectPowerWeek(week) {
  const nextWeek = Math.max(0, Math.min(3, Number(week)));
  if (nextWeek === state.selectedPowerWeek) return;
  state.selectedPowerWeek = nextWeek;
  state.activePowerReplyKey = null;
  state.activePowerReactionKey = null;
  state.powerComments = [];
  state.powerReactions = [];
  renderPowerIssue();
  if (state.session) loadPowerRankingActivity(true);
}

function renderPowerIssue() {
  const issue = currentPowerIssue();
  if (!issue) return;
  $("#power-week-kicker").textContent = issue.kicker;
  $("#power-week-title").textContent = issue.title;
  $("#power-week-copy").textContent = issue.copy;
  $("#power-issue-number").textContent = issue.issue;
  $("#power-model-version").textContent = issue.version;
  $("#power-calibration-label").textContent = issue.calibration;
  $("#power-week-select").value = String(state.selectedPowerWeek);
  $("#power-prev-week").disabled = state.selectedPowerWeek === 0;
  $("#power-next-week").disabled = state.selectedPowerWeek === 3;
  $("#power-rankings-title").textContent = issue.rankingTitle;
  $("#power-method-summary").innerHTML = `<strong>How this issue is scored</strong><p>${escapeHtml(issue.method)} The order and all football results shown here are fictional placeholders for this interface preview.</p>`;
  renderPowerRankings();
}

async function loadPowerRankingActivity(silent = false) {
  if (!state.session) {
    state.powerComments = [];
    state.powerReactions = [];
    return renderPowerRankings();
  }
  const rankingKeys = new Set(currentPowerIssue().rankings.map((ranking) => powerRankingKey(ranking.teamId)));
  try {
    const [comments, reactions] = await Promise.all([
      supabaseRequest("/rest/v1/power_ranking_comments?select=*&order=created_at.asc"),
      supabaseRequest("/rest/v1/power_ranking_reactions?select=*"),
    ]);
    state.powerComments = (comments || []).filter((comment) => rankingKeys.has(comment.ranking_key));
    state.powerReactions = (reactions || []).filter((reaction) => rankingKeys.has(reaction.ranking_key));
    state.powerLoaded = true;
    renderPowerRankings();
  } catch (error) {
    state.powerLoaded = false;
    renderPowerRankings();
    const status = $("#power-social-status");
    if (status) status.textContent = "Sample rankings are ready. Run the included Power Rankings SQL once to enable reactions and replies.";
    if (!silent) toast(readableError(error, "Power Ranking conversations need their database setup."));
  }
}

function renderPowerRankings() {
  const root = $("#power-rankings-list");
  if (!root) return;
  const issue = currentPowerIssue();
  const status = $("#power-social-status");
  if (status) {
    status.textContent = state.user
      ? "React or reply to any ranking. Conversation follows your league profile."
      : "Sign in to react and reply to each team’s write-up.";
  }

  root.innerHTML = issue.rankings.map((ranking) => {
    const team = TEAMS.find((item) => item.id === ranking.teamId);
    const profile = profileForTeam(team);
    const avatar = profile?.avatar_url;
    const key = powerRankingKey(ranking.teamId);
    const comments = state.powerComments.filter((comment) => comment.ranking_key === key);
    const reactions = state.powerReactions.filter((reaction) => reaction.ranking_key === key);
    const reactionButtons = EMOJIS.map((emoji) => {
      const matching = reactions.filter((reaction) => reaction.emoji === emoji);
      if (!matching.length) return "";
      const mine = matching.some((reaction) => reaction.user_id === state.user?.id);
      const attribution = reactionAttribution(matching);
      return `<button class="power-reaction ${mine ? "is-mine" : ""}" data-power-reaction="${emoji}" data-ranking-key="${key}" data-tooltip="${escapeAttr(attribution)}" aria-label="${mine ? "Remove" : "Add"} ${emoji} reaction. ${escapeAttr(attribution)}">${emoji} ${matching.length}</button>`;
    }).join("");
    const replyIsOpen = state.activePowerReplyKey === key;
    const pickerIsOpen = state.activePowerReactionKey === key;

    return `<article class="power-ranking-card" id="power-week-${state.selectedPowerWeek}-rank-${ranking.rank}" data-ranking-key="${key}">
      <aside class="power-rank-rail">
        <span class="power-rank-label">Rank</span>
        <strong>${ranking.rank}</strong>
        <span class="power-movement is-${ranking.movementTone}">${escapeHtml(ranking.movement)}</span>
      </aside>
      <div class="power-card-body">
        <header class="power-card-header">
          <div class="power-team-identity">
            ${avatar ? `<span class="power-avatar"><img src="${escapeAttr(avatar)}" alt="${escapeAttr(team.name)} profile picture" /></span>` : `<span class="power-avatar">${initials(team.name)}</span>`}
            <span><small>${escapeHtml(team.division)} · ${escapeHtml(profile?.display_name || team.manager)}</small><h3>${escapeHtml(team.name)}</h3></span>
          </div>
          <div class="power-score-cluster">
            <div class="power-score-block"><span>Power score</span><strong>${ranking.score.toFixed(1)}</strong><small>of 100 · sample</small></div>
            <div class="power-score-block is-secondary"><span>Team strength</span><strong>${ranking.strength.toFixed(1)}</strong><small>forward view</small></div>
            <div class="power-score-block is-secondary"><span>Performance</span><strong>${ranking.performance == null ? "—" : ranking.performance.toFixed(1)}</strong><small>${ranking.performance == null ? "starts Week 1" : "earned"}</small></div>
          </div>
        </header>
        <div class="power-result-bar"><strong>${ranking.record}</strong><span>${escapeHtml(ranking.result)}</span><small>${escapeHtml(issue.resultLabel)}</small></div>
        <section class="power-editorial">
          <p class="power-kicker">The read</p>
          <h4>${escapeHtml(ranking.headline)}</h4>
          <p>${escapeHtml(ranking.blurb)}</p>
        </section>
        <div class="power-insight-grid">
          <div class="power-insight is-star"><span>${escapeHtml(issue.labels[0])}</span><strong>${escapeHtml(ranking.stars)}</strong></div>
          <div class="power-insight is-short"><span>${escapeHtml(issue.labels[1])}</span><strong>${escapeHtml(ranking.shortfall)}</strong></div>
          <div class="power-insight is-moment"><span>${escapeHtml(issue.labels[2])}</span><strong>${escapeHtml(ranking.moment)}</strong></div>
        </div>
        <div class="power-social">
          <div class="power-social-left">
            ${reactionButtons ? `<div class="power-reaction-row">${reactionButtons}</div>` : `<span class="power-no-reactions">No reactions yet</span>`}
            <button class="power-action" data-power-add-reaction="${key}" type="button"><span>☺+</span> Add reaction</button>
            <button class="power-action" data-power-reply="${key}" type="button"><span>↩</span> Reply${comments.length ? ` (${comments.length})` : ""}</button>
          </div>
          ${pickerIsOpen ? `<div class="power-reaction-picker" role="group" aria-label="Choose a reaction">${EMOJIS.map((emoji) => `<button data-power-reaction="${emoji}" data-ranking-key="${key}" aria-label="React ${emoji}">${emoji}</button>`).join("")}<button data-power-close-reactions aria-label="Close reaction picker">×</button></div>` : ""}
        </div>
        ${comments.length ? `<div class="power-thread">${comments.map((comment) => { const author = profileFor(comment.user_id); const authorName = author?.display_name || comment.author_name; const authorAvatar = author?.avatar_url || comment.author_avatar; return `<div class="power-comment">${authorAvatar ? `<img src="${escapeAttr(authorAvatar)}" alt="" />` : `<span>${initials(authorName)}</span>`}<div><strong>${escapeHtml(authorName)}</strong><p>${escapeHtml(comment.body)}</p><small>${formatMessageTime(comment.created_at)}</small></div></div>`; }).join("")}</div>` : ""}
        ${replyIsOpen ? `<form class="power-reply-form" data-power-reply-form="${key}"><input maxlength="500" placeholder="Reply to this ranking" aria-label="Reply to ${escapeAttr(team.name)} ranking" required /><button type="submit">Reply</button><button type="button" data-power-cancel-reply>Cancel</button></form>` : ""}
      </div>
    </article>`;
  }).join("");
}

async function handlePowerRankingClick(event) {
  const reply = event.target.closest("[data-power-reply]");
  const addReaction = event.target.closest("[data-power-add-reaction]");
  const reaction = event.target.closest("[data-power-reaction]");
  const cancelReply = event.target.closest("[data-power-cancel-reply]");
  const closeReactions = event.target.closest("[data-power-close-reactions]");
  if (!reply && !addReaction && !reaction && !cancelReply && !closeReactions) return;
  if (!state.user) {
    toast("Sign in with Google to react or reply to Power Rankings.");
    return;
  }
  if (!state.profile?.team_id) {
    openProfileModal();
    return;
  }
  if (reply) {
    const key = reply.dataset.powerReply;
    state.activePowerReplyKey = state.activePowerReplyKey === key ? null : key;
    state.activePowerReactionKey = null;
    renderPowerRankings();
    $(`[data-power-reply-form="${key}"] input`)?.focus();
    return;
  }
  if (addReaction) {
    const key = addReaction.dataset.powerAddReaction;
    state.activePowerReactionKey = state.activePowerReactionKey === key ? null : key;
    state.activePowerReplyKey = null;
    renderPowerRankings();
    return;
  }
  if (cancelReply) {
    state.activePowerReplyKey = null;
    renderPowerRankings();
    return;
  }
  if (closeReactions) {
    state.activePowerReactionKey = null;
    renderPowerRankings();
    return;
  }
  await togglePowerReaction(reaction.dataset.rankingKey, reaction.dataset.powerReaction);
}

async function togglePowerReaction(rankingKey, emoji) {
  const existing = state.powerReactions.find((reaction) => reaction.ranking_key === rankingKey && reaction.user_id === state.user.id && reaction.emoji === emoji);
  try {
    if (existing) {
      await supabaseRequest(`/rest/v1/power_ranking_reactions?id=eq.${existing.id}`, { method: "DELETE" });
    } else {
      await supabaseRequest("/rest/v1/power_ranking_reactions", {
        method: "POST",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ ranking_key: rankingKey, user_id: state.user.id, emoji }),
      });
    }
    state.activePowerReactionKey = null;
    await loadPowerRankingActivity(true);
  } catch (error) { toast(readableError(error, "Could not save that Power Ranking reaction.")); }
}

async function handlePowerReplySubmit(event) {
  const form = event.target.closest("[data-power-reply-form]");
  if (!form) return;
  event.preventDefault();
  const body = $("input", form).value.trim();
  if (!body || !state.user || !state.profile) return;
  try {
    await supabaseRequest("/rest/v1/power_ranking_comments", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        ranking_key: form.dataset.powerReplyForm,
        user_id: state.user.id,
        author_name: state.profile.display_name,
        author_avatar: state.profile.avatar_url,
        body,
      }),
    });
    state.activePowerReplyKey = null;
    await loadPowerRankingActivity(true);
  } catch (error) { toast(readableError(error, "Could not post that Power Ranking reply.")); }
}

async function createPost(event) {
  event.preventDefault();
  const input = $("#post-input");
  const body = input.value.trim();
  if (state.activeChannel === "memes") {
    openModal("meme-modal");
    return;
  }
  if ((!body && !state.composerFile && !state.composerMedia) || !state.profile) {
    if (!state.profile) openProfileModal();
    return;
  }
  try {
    let media = state.composerMedia;
    if (state.composerFile) {
      const mediaUrl = await uploadChannelMedia(state.composerFile, state.activeChannel);
      media = {
        url: mediaUrl,
        type: "image",
        alt: state.composerFile.name || "Uploaded image",
      };
    }
    await supabaseRequest("/rest/v1/feed_posts", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        user_id: state.user.id,
        author_name: state.profile.display_name,
        author_avatar: state.profile.avatar_url,
        author_team_id: state.profile.team_id,
        author_team_name: state.profile.team_name,
        body,
        channel: state.activeChannel,
        media_url: media?.url || null,
        media_type: media?.type || null,
        media_alt: media?.alt || null,
      }),
    });
    input.value = "";
    input.style.height = "auto";
    clearComposerMedia();
    await loadFeed(true);
  } catch (error) { toast(readableError(error, "Could not post that message.")); }
}

async function handleMessageClick(event) {
  const reply = event.target.closest("[data-reply]");
  if (reply) {
    const postId = Number(reply.dataset.reply);
    state.activeReplyPostId = state.activeReplyPostId === postId ? null : postId;
    state.activeReactionPostId = null;
    renderFeed();
    const form = $(`[data-reply-form="${postId}"]`);
    if (form) $("input", form).focus();
    return;
  }
  const addReaction = event.target.closest("[data-add-reaction]");
  if (addReaction) {
    const postId = Number(addReaction.dataset.addReaction);
    state.activeReactionPostId = state.activeReactionPostId === postId ? null : postId;
    state.activeReplyPostId = null;
    renderFeed();
    return;
  }
  if (event.target.closest("[data-cancel-reply]")) {
    state.activeReplyPostId = null;
    renderFeed();
    return;
  }
  if (event.target.closest("[data-close-reactions]")) {
    state.activeReactionPostId = null;
    renderFeed();
    return;
  }
  const reaction = event.target.closest("[data-reaction]");
  if (!reaction) return;
  await toggleReaction(Number(reaction.dataset.postId), reaction.dataset.reaction);
}

async function toggleReaction(postId, emoji) {
  if (!state.user) return;
  const existing = state.reactions.find((reaction) => reaction.post_id === postId && reaction.user_id === state.user.id && reaction.emoji === emoji);
  try {
    if (existing) {
      await supabaseRequest(`/rest/v1/feed_reactions?id=eq.${existing.id}`, { method: "DELETE" });
    } else {
      await supabaseRequest("/rest/v1/feed_reactions", {
        method: "POST",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ post_id: postId, user_id: state.user.id, emoji }),
      });
    }
    state.activeReactionPostId = null;
    await loadFeed(true);
  } catch (error) { toast(readableError(error, "Could not save that reaction.")); }
}

async function handleReplySubmit(event) {
  const form = event.target.closest("[data-reply-form]");
  if (!form) return;
  event.preventDefault();
  const body = $("input", form).value.trim();
  if (!body) return;
  try {
    await supabaseRequest("/rest/v1/feed_comments", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        post_id: Number(form.dataset.replyForm),
        user_id: state.user.id,
        author_name: state.profile.display_name,
        author_avatar: state.profile.avatar_url,
        body,
      }),
    });
    state.activeReplyPostId = null;
    await loadFeed(true);
  } catch (error) { toast(readableError(error, "Could not post that reply.")); }
}

function autoGrowComposer(event) {
  event.target.style.height = "auto";
  event.target.style.height = `${Math.min(event.target.scrollHeight, 150)}px`;
}

function handleComposerKeydown(event) {
  if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
  event.preventDefault();
  $("#post-form").requestSubmit();
}

function openModal(id) {
  const modal = $(`#${id}`);
  if (!modal) return;
  modal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeModal(id) {
  const modal = $(`#${id}`);
  if (!modal) return;
  modal.hidden = true;
  if (!$(".modal:not([hidden])")) document.body.classList.remove("modal-open");
  if (id === "meme-modal") {
    state.memeBaseImage = null;
    state.memeOverlayImage = null;
    $("#meme-form")?.reset();
    drawMemePreview();
  }
}

function handleComposerAttachment(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;
  if (!file.type.startsWith("image/")) return toast("Please choose an image file.");
  if (file.size > 8 * 1024 * 1024) return toast("Images must be 8 MB or smaller.");
  clearComposerMedia();
  state.composerFile = file;
  state.composerPreviewUrl = URL.createObjectURL(file);
  renderComposerPreview();
}

function clearComposerMedia() {
  if (state.composerPreviewUrl) URL.revokeObjectURL(state.composerPreviewUrl);
  state.composerFile = null;
  state.composerMedia = null;
  state.composerPreviewUrl = "";
  renderComposerPreview();
}

function renderComposerPreview() {
  const preview = $("#composer-preview");
  if (!preview) return;
  const url = state.composerPreviewUrl || state.composerMedia?.previewUrl || state.composerMedia?.url;
  if (!url || state.activeChannel === "memes") {
    preview.hidden = true;
    preview.innerHTML = "";
    return;
  }
  preview.hidden = false;
  preview.innerHTML = `<div class="composer-media-chip"><img src="${escapeAttr(url)}" alt="Attachment preview"><span>${state.composerMedia?.type === "gif" ? "GIF ready" : "Image ready"}</span><button type="button" data-clear-media aria-label="Remove attachment">×</button></div>`;
}

async function uploadChannelMedia(file, prefix = "feed") {
  if (!state.user) throw new Error("Sign in before uploading media.");
  const safeName = (file.name || "image.png").replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `${state.user.id}/${prefix}-${Date.now()}-${safeName}`;
  const response = await fetch(`${state.config.supabaseUrl}/storage/v1/object/channel-media/${encodeURI(path)}`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": file.type || "image/png", "x-upsert": "false" }),
    body: file,
  });
  if (!response.ok) throw new Error(await response.text());
  return `${state.config.supabaseUrl}/storage/v1/object/public/channel-media/${encodeURI(path)}`;
}

function toggleGifPicker() {
  const picker = $("#gif-picker");
  if (!picker) return;
  picker.hidden = !picker.hidden;
  if (!picker.hidden) $("#gif-search")?.focus();
}

function closeGifPicker() {
  const picker = $("#gif-picker");
  if (picker) picker.hidden = true;
}

async function searchGifs() {
  const results = $("#gif-results");
  const query = $("#gif-search")?.value.trim();
  if (!results || !query) return;
  if (!state.config.giphyApiKey) {
    results.innerHTML = "<p class=\"empty-note\">Add GIPHY_API_KEY in Netlify to enable GIF search.</p>";
    return;
  }
  results.innerHTML = "<p class=\"empty-note\">Searching…</p>";
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${encodeURIComponent(state.config.giphyApiKey)}&q=${encodeURIComponent(query)}&limit=18&rating=pg-13`);
    if (!response.ok) throw new Error("GIF search failed.");
    const payload = await response.json();
    results.innerHTML = payload.data.map((gif) => {
      const preview = gif.images.fixed_width_small?.url || gif.images.fixed_width?.url;
      const url = gif.images.original?.url || preview;
      return `<button type="button" class="gif-result" data-gif-url="${escapeAttr(url)}" data-gif-preview="${escapeAttr(preview)}" data-gif-title="${escapeAttr(gif.title || "GIPHY GIF")}"><img src="${escapeAttr(preview)}" alt="${escapeAttr(gif.title || "GIF")}" loading="lazy"></button>`;
    }).join("") || "<p class=\"empty-note\">No GIFs found.</p>";
  } catch (error) {
    results.innerHTML = `<p class="empty-note">${escapeHtml(readableError(error, "Could not search GIFs."))}</p>`;
  }
}

function chooseGif(event) {
  const button = event.target.closest("[data-gif-url]");
  if (!button) return;
  clearComposerMedia();
  state.composerMedia = {
    url: button.dataset.gifUrl,
    previewUrl: button.dataset.gifPreview,
    type: "gif",
    alt: button.dataset.gifTitle || "GIPHY GIF",
  };
  renderComposerPreview();
  closeGifPicker();
}

function handleChannelPluginClick(event) {
  const tradeButton = event.target.closest("[data-open-trade]");
  if (tradeButton) return openModal("trade-modal");
  const memeButton = event.target.closest("[data-open-meme]");
  if (memeButton) return openModal("meme-modal");
  const interestButton = event.target.closest("[data-trade-interest]");
  if (interestButton) return toggleTradeInterest(interestButton.dataset.tradeInterest);
  const closeButton = event.target.closest("[data-close-trade]");
  if (closeButton) return closeTradeItem(closeButton.dataset.closeTrade);
}

function renderTradeBlock() {
  const plugin = $("#channel-plugin");
  if (!plugin || state.activeChannel !== "trade-talk") return;
  const openItems = state.tradeItems.filter((item) => item.status !== "closed");
  const cards = openItems.map((item) => {
    const interests = state.tradeInterests.filter((interest) => String(interest.trade_item_id) === String(item.id));
    const names = [...new Set(interests.map((interest) => profileFor(interest.user_id)?.display_name || "League member"))];
    const mine = interests.some((interest) => interest.user_id === state.user?.id);
    const owner = item.user_id === state.user?.id;
    return `<article class="trade-card"><div><span class="trade-position">${escapeHtml(item.position || "PLAYER")}</span><strong>${escapeHtml(item.player_name)}</strong><small>${escapeHtml(item.nfl_team || "")} · offered by ${escapeHtml(item.author_name || "League member")}</small>${item.note ? `<p>${escapeHtml(item.note)}</p>` : ""}</div><div class="trade-actions"><button type="button" class="button button-small ${mine ? "is-active" : ""}" data-trade-interest="${escapeAttr(item.id)}">${mine ? "Interested ✓" : "Show interest"}</button>${names.length ? `<span data-tooltip="${escapeAttr(reactionAttribution(interests))}">${names.length} interested</span>` : ""}${owner ? `<button type="button" class="text-button" data-close-trade="${escapeAttr(item.id)}">Close</button>` : ""}</div></article>`;
  }).join("");
  plugin.innerHTML = `<div class="trade-toolbar"><div><strong>League trade block</strong><span>List an available player or signal interest without committing to a deal.</span></div><button type="button" class="button button-gold" data-open-trade ${state.user ? "" : "disabled"}>Add player</button></div><div class="trade-grid">${cards || '<p class="empty-note">No players are on the trade block yet.</p>'}</div>`;
}

async function createTradeItem(event) {
  event.preventDefault();
  if (!state.profile) return openProfileModal();
  const playerName = $("#trade-player")?.value.trim();
  if (!playerName) return;
  try {
    await supabaseRequest("/rest/v1/trade_block_items", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        user_id: state.user.id,
        author_name: state.profile.display_name,
        author_team_id: state.profile.team_id,
        author_team_name: state.profile.team_name,
        player_name: playerName,
        position: $("#trade-position")?.value.trim() || null,
        nfl_team: $("#trade-nfl-team")?.value.trim() || null,
        note: $("#trade-note")?.value.trim() || null,
      }),
    });
    closeModal("trade-modal");
    $("#trade-form")?.reset();
    await loadFeed(true);
  } catch (error) { toast(readableError(error, "Could not add that player.")); }
}

async function toggleTradeInterest(itemId) {
  if (!state.user) return signInWithGoogle();
  const existing = state.tradeInterests.find((interest) => String(interest.trade_item_id) === String(itemId) && interest.user_id === state.user.id);
  try {
    if (existing) {
      await supabaseRequest(`/rest/v1/trade_interests?trade_item_id=eq.${encodeURIComponent(itemId)}&user_id=eq.${encodeURIComponent(state.user.id)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
    } else {
      await supabaseRequest("/rest/v1/trade_interests", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ trade_item_id: itemId, user_id: state.user.id }) });
    }
    await loadFeed(true);
  } catch (error) { toast(readableError(error, "Could not update trade interest.")); }
}

async function closeTradeItem(itemId) {
  try {
    await supabaseRequest(`/rest/v1/trade_block_items?id=eq.${encodeURIComponent(itemId)}`, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ status: "closed" }) });
    await loadFeed(true);
  } catch (error) { toast(readableError(error, "Could not close that listing.")); }
}

async function imageFromFile(file) {
  if (!file) return null;
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");
  if (file.size > 8 * 1024 * 1024) throw new Error("Images must be 8 MB or smaller.");
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; img.src = url; });
    return img;
  } finally { URL.revokeObjectURL(url); }
}

async function handleMemeBase(event) {
  try { state.memeBaseImage = await imageFromFile(event.target.files?.[0]); drawMemePreview(); }
  catch (error) { toast(readableError(error, "Could not load that image.")); }
}

async function handleMemeOverlay(event) {
  try { state.memeOverlayImage = await imageFromFile(event.target.files?.[0]); drawMemePreview(); }
  catch (error) { toast(readableError(error, "Could not load that overlay.")); }
}

function drawMemeText(ctx, text, x, y, maxWidth, fontSize, fromBottom = false) {
  if (!text) return;
  ctx.font = `900 ${fontSize}px Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = fromBottom ? "bottom" : "top";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = Math.max(4, fontSize / 12);
  ctx.fillStyle = "#fff";
  const words = text.toUpperCase().split(/\s+/);
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = word; } else line = test;
  });
  if (line) lines.push(line);
  const lineHeight = fontSize * 1.05;
  lines.forEach((value, index) => {
    const lineY = fromBottom ? y - (lines.length - 1 - index) * lineHeight : y + index * lineHeight;
    ctx.strokeText(value, x, lineY, maxWidth);
    ctx.fillText(value, x, lineY, maxWidth);
  });
}

function drawMemePreview() {
  const canvas = $("#meme-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const base = state.memeBaseImage;
  const whiteBar = $("#meme-white-bar")?.checked;
  const barHeight = whiteBar ? 150 : 0;
  const width = 900;
  const imageHeight = base ? Math.round(width * Math.min(1.15, base.naturalHeight / base.naturalWidth)) : 560;
  canvas.width = width;
  canvas.height = barHeight + imageHeight;
  ctx.fillStyle = whiteBar ? "#fff" : "#222";
  ctx.fillRect(0, 0, width, canvas.height);
  if (base) ctx.drawImage(base, 0, barHeight, width, imageHeight);
  else { ctx.fillStyle = "#333"; ctx.fillRect(0, barHeight, width, imageHeight); ctx.fillStyle = "#aaa"; ctx.font = "32px Arial"; ctx.textAlign = "center"; ctx.fillText("Choose a base image", width / 2, barHeight + imageHeight / 2); }
  const topText = $("#meme-top-text")?.value || "";
  const bottomText = $("#meme-bottom-text")?.value || "";
  if (whiteBar) {
    ctx.fillStyle = "#111"; ctx.strokeStyle = "transparent"; ctx.font = "700 46px Arial, sans-serif"; ctx.textBaseline = "middle"; ctx.textAlign = "center";
    ctx.fillText(topText, width / 2, barHeight / 2, width - 60);
  } else drawMemeText(ctx, topText, width / 2, barHeight + 24, width - 50, 54, false);
  drawMemeText(ctx, bottomText, width / 2, canvas.height - 24, width - 50, 54, true);
  if (state.memeOverlayImage) {
    const scale = Number($("#meme-overlay-size")?.value || 30) / 100;
    const overlayWidth = width * scale;
    const overlayHeight = overlayWidth * state.memeOverlayImage.naturalHeight / state.memeOverlayImage.naturalWidth;
    const x = (width - overlayWidth) * Number($("#meme-overlay-x")?.value || 50) / 100;
    ctx.drawImage(state.memeOverlayImage, x, barHeight + 24, overlayWidth, overlayHeight);
  }
}

async function createMemePost(event) {
  event.preventDefault();
  if (!state.profile) return openProfileModal();
  if (!state.memeBaseImage) return toast("Choose a base image first.");
  drawMemePreview();
  try {
    const canvas = $("#meme-canvas");
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png", 0.92));
    const file = new File([blob], `meme-${Date.now()}.png`, { type: "image/png" });
    const mediaUrl = await uploadChannelMedia(file, "memes");
    await supabaseRequest("/rest/v1/feed_posts", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ user_id: state.user.id, author_name: state.profile.display_name, author_avatar: state.profile.avatar_url, author_team_id: state.profile.team_id, author_team_name: state.profile.team_name, body: "", channel: "memes", media_url: mediaUrl, media_type: "image", media_alt: "League meme" }),
    });
    closeModal("meme-modal");
    await loadFeed(true);
  } catch (error) { toast(readableError(error, "Could not publish that meme.")); }
}

function profileFor(userId) {
  return state.profiles.find((profile) => profile.id === userId) || null;
}

function profileForTeam(team) {
  const localTeam = TEAMS.find((item) => normalize(item.name) === normalize(team?.name));
  const localTeamId = localTeam?.id ?? Number(team?.id);
  return state.profiles.find((profile) =>
    Number(profile.team_id) === Number(localTeamId)
    || normalize(profile.team_name) === normalize(team?.name)
  ) || null;
}

function renderMembers() {
  $("#member-list").innerHTML = TEAMS.map((team) => {
    const profile = state.profiles.find((item) => Number(item.team_id) === team.id);
    const name = profile?.display_name || team.manager;
    return `<div class="member">
      ${profile?.avatar_url ? `<span class="member-dot member-photo"><img src="${escapeAttr(profile.avatar_url)}" alt="" /></span>` : `<span class="member-dot">${initials(team.name)}</span>`}
      <span><strong>${escapeHtml(team.name)}</strong><small>${escapeHtml(name)}</small></span>
    </div>`;
  }).join("");
}

function managerFor(teamName = "") {
  return TEAMS.find((team) => normalize(team.name) === normalize(teamName))?.manager || "";
}

function divisionFor(teamName = "") {
  return TEAMS.find((team) => normalize(team.name) === normalize(teamName))?.division || "West";
}

function divisionOrderFor(teamName = "") {
  return TEAMS.find((team) => normalize(team.name) === normalize(teamName))?.divisionOrder || 99;
}

function formatNumber(value) { return Number(value || 0).toFixed(1); }
function formatDate(value) { return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value)); }
function formatMessageTime(value) { return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value)); }
function normalize(value = "") { return String(value).toLowerCase().replace(/[^a-z0-9]/g, ""); }
function initials(value = "") { return String(value).split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase() || "RF"; }
function readableError(error, fallback) { return error?.message && !/failed \(\d+\)/i.test(error.message) ? error.message : fallback; }

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}
function escapeAttr(value = "") { return escapeHtml(value).replace(/`/g, "&#96;"); }

let toastTimer;
function toast(message) {
  const root = $("#toast");
  root.textContent = message;
  root.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => root.classList.remove("is-visible"), 4300);
}
