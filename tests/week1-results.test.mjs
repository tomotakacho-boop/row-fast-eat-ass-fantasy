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

async function requestLeague(boxscoreSchedule = []) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => new Response(JSON.stringify(String(url).includes("mBoxscore") ? { schedule: boxscoreSchedule } : raw), { status: 200, headers: { "Content-Type": "application/json" } });
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
