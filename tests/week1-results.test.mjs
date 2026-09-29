import test from "node:test";
import assert from "node:assert/strict";
import handler from "../netlify/functions/espn-league.mjs";

const pairs = [[12, 5], [6, 8], [3, 2], [10, 11], [7, 1], [4, 9]];
const points = new Map([[1, 104.74], [2, 72.62], [3, 179.76], [4, 124.86], [5, 140.56], [6, 102.88], [7, 100.46], [8, 137.46], [9, 107.12], [10, 108.60], [11, 112.10], [12, 173.16]]);
const schedule = pairs.map(([homeId, awayId], index) => ({
  id: index + 1,
  matchupPeriodId: 1,
  home: { teamId: homeId, totalPoints: 0 },
  away: { teamId: awayId, totalPoints: 0 },
}));
const raw = {
  status: { currentMatchupPeriod: 1 },
  settings: { name: "row fast eat ass s10", scheduleSettings: { divisions: [{ id: 0, name: "East" }, { id: 1, name: "West" }] } },
  teams: Array.from({ length: 12 }, (_, index) => ({ id: index + 1, name: `Team ${index + 1}`, divisionId: index % 2, record: { overall: { wins: 0, losses: 0, ties: 0, pointsFor: 0, pointsAgainst: 0 } }, roster: { entries: [] } })),
  schedule,
};

async function requestLeague(boxscoreSchedule = [], leagueRaw = raw) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => new Response(JSON.stringify(String(url).includes("mBoxscore") ? { schedule: boxscoreSchedule } : leagueRaw), { status: 200, headers: { "Content-Type": "application/json" } });
  try {
    const response = await handler(new Request("https://example.test/api/league"));
    assert.equal(response.status, 200);
    return response.json();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("verified Week 1 scoreboard supplies six finals, records, and a separate rankings issue", async () => {
  const league = await requestLeague();
  assert.equal(league.weekOneFinal, true);
  assert.equal(league.powerIssueWeek, 1);
  assert.equal(league.weekOneScoreSource, "Commissioner scoreboard · September 15");
  assert.equal(league.matchups.filter((game) => game.week === 1 && game.status === "Final").length, 6);
  const gibbsResult = league.matchups.find((game) => game.home.id === 3);
  assert.equal(gibbsResult.homeScore, 179.76);
  assert.equal(gibbsResult.awayScore, 72.62);
  assert.deepEqual(league.teams.filter((team) => team.wins === 1).map((team) => team.id).sort((a, b) => a - b), [1, 3, 4, 8, 11, 12]);
  assert.equal(league.teams.find((team) => team.id === 12).pointsFor, 173.16);
  assert.equal(league.powerRankings.length, 12);
  assert.equal(league.powerRankings.find((row) => row.teamId === 3).performanceIndex, 179.76);
  assert.ok(league.teams.every((team) => !Object.hasOwn(team, "roster")));
});

test("complete ESPN boxscores supersede the verified screenshot after a correction", async () => {
  const corrected = schedule.map((game) => ({
    ...game,
    home: { teamId: game.home.teamId, totalPoints: points.get(game.home.teamId) + (game.home.teamId === 3 ? 1 : 0) },
    away: { teamId: game.away.teamId, totalPoints: points.get(game.away.teamId) },
  }));
  const league = await requestLeague(corrected);
  assert.equal(league.weekOneScoreSource, "ESPN boxscore");
  assert.equal(league.teams.find((team) => team.id === 3).pointsFor, 180.76);
});

test("Week 2 finals produce cumulative standings and a 60/40 post-Week-2 issue", async () => {
  const weekTwoPairs = [[5, 8], [2, 12], [3, 6], [11, 1], [9, 10], [4, 7]];
  const weekTwoPoints = new Map([[1, 115.18], [2, 146.32], [3, 134.82], [4, 148.30], [5, 66.52], [6, 105.90], [7, 119.48], [8, 119.64], [9, 104.06], [10, 115.46], [11, 87.30], [12, 90.38]]);
  const weekTwoSchedule = weekTwoPairs.map(([homeId, awayId], index) => ({
    id: index + 7,
    matchupPeriodId: 2,
    home: { teamId: homeId, totalPoints: weekTwoPoints.get(homeId) },
    away: { teamId: awayId, totalPoints: weekTwoPoints.get(awayId) },
  }));
  const leagueRaw = { ...raw, status: { currentMatchupPeriod: 3 }, schedule: [...schedule, ...weekTwoSchedule] };
  const league = await requestLeague([], leagueRaw);
  assert.equal(league.powerIssueWeek, 2);
  assert.equal(league.latestFinalWeek, 2);
  assert.deepEqual(league.powerWeights, { strength: .6, performance: .4 });
  const gibbs = league.teams.find((team) => team.id === 3);
  assert.equal(gibbs.wins, 2);
  assert.equal(gibbs.pointsFor, 314.58);
  assert.equal(gibbs.streak, "W2");
  const peloton = league.teams.find((team) => team.id === 2);
  assert.equal(peloton.wins, 1);
  assert.equal(peloton.losses, 1);
  const gibbsRanking = league.powerRankings.find((row) => row.teamId === 3);
  assert.equal(gibbsRanking.performanceIndex, 157.29);
  assert.equal(gibbsRanking.latestWeekPoints, 134.82);
  assert.equal(gibbsRanking.previousRank, 1);
});

test("Week 3 issue exposes cumulative Points For context and Week 2 movement", async () => {
  const makeWeek = (week, startId, pairs, scores) => pairs.map(([homeId, awayId], index) => ({
    id: startId + index,
    matchupPeriodId: week,
    home: { teamId: homeId, totalPoints: scores.get(homeId) },
    away: { teamId: awayId, totalPoints: scores.get(awayId) },
  }));
  const weekTwoPoints = new Map([[1, 115.18], [2, 146.32], [3, 134.82], [4, 148.30], [5, 66.52], [6, 105.90], [7, 119.48], [8, 119.64], [9, 104.06], [10, 115.46], [11, 87.30], [12, 90.38]]);
  const weekThreePoints = new Map([[1, 116.86], [2, 103.66], [3, 140.26], [4, 136.90], [5, 79.52], [6, 113.68], [7, 91.58], [8, 148.96], [9, 80.22], [10, 124.54], [11, 95.78], [12, 131.54]]);
  const weekTwo = makeWeek(2, 7, [[5, 8], [2, 12], [3, 6], [11, 1], [9, 10], [4, 7]], weekTwoPoints);
  const weekThree = makeWeek(3, 13, [[2, 5], [8, 3], [12, 6], [9, 11], [1, 4], [10, 7]], weekThreePoints);
  const leagueRaw = { ...raw, status: { currentMatchupPeriod: 4 }, schedule: [...schedule, ...weekTwo, ...weekThree] };
  const league = await requestLeague([], leagueRaw);
  assert.equal(league.powerIssueWeek, 3);
  assert.deepEqual(league.powerWeights, { strength: .55, performance: .45 });
  assert.equal(league.leagueScoringAverage, 116.14);
  const gibbsRanking = league.powerRankings.find((row) => row.teamId === 3);
  assert.equal(gibbsRanking.cumulativePointsFor, 454.84);
  assert.equal(gibbsRanking.pointsForRank, 1);
  assert.equal(gibbsRanking.pointsPerGame, 454.84 / 3);
  assert.ok(gibbsRanking.pointsPerGameVsLeague > 35);
  assert.equal(gibbsRanking.previousRank, 1);
  const jacksRanking = league.powerRankings.find((row) => row.teamId === 4);
  assert.equal(jacksRanking.previousRank, 2);
});
