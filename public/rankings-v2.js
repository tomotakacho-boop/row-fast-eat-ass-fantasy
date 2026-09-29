(() => {
  const weekly = p => Number(p.weeklyProjection || 0) || Number(p.seasonProjection || 0) / 17;
  const average = values => values.reduce((a, b) => a + b, 0) / Math.max(values.length, 1);
  const ordinal = value => { const n = Number(value), mod100 = n % 100; return `${n}${mod100 >= 11 && mod100 <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" }[n % 10] || "th")}`; };
  const injuryWeight = status => ({ ACTIVE: 0, QUESTIONABLE: .25, DOUBTFUL: .7, OUT: 1, INJURY_RESERVE: 1, IR: 1, SUSPENSION: 1 }[status] ?? .1);
  const cv = position => ({ QB: .2, RB: .34, WR: .39, TE: .36, "D/ST": .42, K: .32 }[position] || .35);
  const optimize = team => {
    const pool = [...(team.roster || [])].sort((a, b) => weekly(b) - weekly(a)), used = new Set();
    const grab = (position, count) => pool.filter(p => p.position === position && !used.has(p.id)).slice(0, count).map(p => (used.add(p.id), p));
    const starters = [...grab("QB", 1), ...grab("RB", 2), ...grab("WR", 2), ...grab("TE", 1), ...grab("D/ST", 1), ...grab("K", 1)];
    const flex = pool.filter(p => ["RB", "WR", "TE"].includes(p.position) && !used.has(p.id)).slice(0, 1);
    flex.forEach(p => used.add(p.id)); starters.push(...flex);
    const skill = pool.filter(p => ["RB", "WR", "TE"].includes(p.position));
    const bench = skill.filter(p => !used.has(p.id)).slice(0, 3);
    const stars = skill.slice(0, 3);
    const wildcardPool = pool.filter(p => !used.has(p.id) && ["RB", "WR", "TE"].includes(p.position));
    const wildcard = wildcardPool.sort((a, b) => (weekly(b) * (1 - Math.min(Number(b.percentOwned || 0), 100) / 125)) - (weekly(a) * (1 - Math.min(Number(a.percentOwned || 0), 100) / 125)))[0];
    const lineup = starters.reduce((s, p) => s + weekly(p), 0);
    const starPower = stars.reduce((s, p) => s + weekly(p), 0);
    const depth = bench.reduce((s, p) => s + weekly(p), 0);
    const injuryRisk = starters.reduce((s, p) => s + weekly(p) * injuryWeight(p.injuryStatus), 0);
    const wildcardValue = wildcard ? weekly(wildcard) * (1 - Math.min(Number(wildcard.percentOwned || 0), 100) / 125) : 0;
    const rawSd = Math.sqrt(starters.reduce((s, p) => s + Math.pow(weekly(p) * cv(p.position), 2), 0));
    return { team, starters, stars, bench, wildcard, lineup, starPower, depth, injuryRisk, health: Math.max(1, lineup - injuryRisk), wildcardValue, rawSd };
  };
  rankings = teams => {
    const snapshot = window.powerRankingSnapshot || window.weekZeroPowerRankings || [];
    if (snapshot.length) {
      const teamsById = new Map(teams.map(team => [Number(team.id), team]));
      return snapshot.map(row => ({ ...row, team: teamsById.get(Number(row.teamId)) })).filter(row => row.team);
    }
    const rows = teams.map(optimize), leagueStarPower = average(rows.map(x => x.starPower)), leagueDepth = average(rows.map(x => x.depth));
    rows.forEach(x => {
      const starScenario = x.lineup + .35 * (x.starPower - leagueStarPower);
      const depthScenario = x.lineup + .15 * (x.depth - leagueDepth);
      const injuryScenario = x.lineup - x.injuryRisk;
      const wildcardScenario = x.lineup + .5 * x.wildcardValue;
      x.projected = .55 * x.lineup + .25 * starScenario + .05 * depthScenario + .05 * injuryScenario + .10 * wildcardScenario;
      x.projected = Math.max(0, x.projected);
      x.stdDev = Math.max(6, Math.min(22, x.rawSd * (x.projected / Math.max(x.lineup, 1)) + x.injuryRisk * .2));
    });
    return rows.sort((a, b) => b.projected - a.projected);
  };
  renderRankings = teams => {
    const issueWeek = Number(league?.powerIssueWeek || 0);
    const ordered = rankings(teams), leagueAverage = average(ordered.map(x => issueWeek ? x.powerScore : x.projected)), averageEl = document.querySelector("#projected-league-average");
    if (averageEl) averageEl.textContent = leagueAverage.toFixed(1);
    const weights = league?.powerWeights || { strength: issueWeek === 1 ? .7 : .6, performance: issueWeek === 1 ? .3 : .4 };
    const strengthPercent = Math.round(weights.strength * 100), performancePercent = Math.round(weights.performance * 100);
    document.querySelector("#power-issue-label").textContent = issueWeek ? `POST WEEK ${issueWeek} · PRE WEEK ${issueWeek + 1}` : "WEEK 0 · PRESEASON";
    document.querySelector("#power-issue-heading").textContent = `Week ${issueWeek} rankings`;
    document.querySelector("#power-average-label").textContent = issueWeek ? "POWER SCORE" : "PROJECTED POINTS";
    document.querySelector("#power-issue-description").textContent = issueWeek
      ? `Week ${issueWeek} Power Score blends ${strengthPercent}% projected Week ${league?.projectionWeek || issueWeek + 1} roster strength with ${performancePercent}% Points For per game through Week ${issueWeek}. The ± figure describes projected week-to-week lineup volatility.`
      : "Rankings use ESPN’s projected score for each team’s best legal lineup. The ± figure shows expected week-to-week volatility.";
    document.querySelector("#power-issue-note").textContent = issueWeek ? "PF includes every finalized scoring week." : "Scores update when ESPN projections change.";
    document.querySelector("#ranking-list").innerHTML = ordered.map((x, i) => {
      const leaders = (x.leaders || x.stars?.map(p => p.fullName) || []).join(", ") || "Projection data pending";
      const injury = x.injuryRisk > 1 ? ` Injury uncertainty removes about ${x.injuryRisk.toFixed(1)} raw lineup points.` : " The current starting group carries limited injury drag.";
      const wildcardName = typeof x.wildcard === "string" ? x.wildcard : x.wildcard?.fullName;
      const wild = wildcardName ? `${wildcardName} is the model’s wildcard.` : "The wildcard slot is still open.";
      const record = teamRecord(x.team), movement = issueWeek && x.previousRank ? x.previousRank - (i + 1) : 0;
      const trend = issueWeek && x.previousRank ? ` · ${movement > 0 ? `↑ ${movement}` : movement < 0 ? `↓ ${Math.abs(movement)}` : "—"} from Week ${issueWeek - 1}` : "";
      const cumulativePointsFor = Number(x.cumulativePointsFor ?? record.pointsFor ?? 0), pointsPerGame = Number(x.pointsPerGame ?? x.performanceIndex ?? 0);
      const pointsForRank = Number(x.pointsForRank || 0), vsLeague = Number(x.pointsPerGameVsLeague ?? (pointsPerGame - Number(league?.leagueScoringAverage || 0)));
      const scoringContext = `${cumulativePointsFor.toFixed(1)} total PF${pointsForRank ? ` (${ordinal(pointsForRank)} in the league)` : ""}, ${pointsPerGame.toFixed(1)} per game and ${Math.abs(vsLeague).toFixed(1)} ${vsLeague >= 0 ? "above" : "below"} league average.`;
      const tags = (issueWeek
        ? [`Team Strength ${x.teamStrength.toFixed(1)}`, `Points For ${cumulativePointsFor.toFixed(1)}`, `PF rank ${pointsForRank ? ordinal(pointsForRank) : "—"}`, `PF/game ${pointsPerGame.toFixed(1)}`, `Week ${issueWeek} ${Number(x.latestWeekPoints ?? x.performanceIndex).toFixed(1)}`, `Injury risk −${x.injuryRisk.toFixed(1)}`, `Wildcard ${x.wildcardValue.toFixed(1)}`]
        : [`Lineup ${x.lineup.toFixed(1)}`, `Stars ${x.starPower.toFixed(1)}`, `Depth ${x.depth.toFixed(1)}`, `Injury risk −${x.injuryRisk.toFixed(1)}`, `Wildcard ${x.wildcardValue.toFixed(1)}`]).map(v => `<span>${esc(v)}</span>`).join("");
      const description = issueWeek
        ? `<strong>${esc(scoringContext)}</strong> ${esc(x.weekOneHighlight?.player || leaders)}${x.weekOneHighlight ? ` scored ${Number(x.weekOneHighlight.points).toFixed(1)} in Week 1 and` : ""} leads a ${x.teamStrength.toFixed(1)}-point Week ${league?.projectionWeek || issueWeek + 1} roster forecast. PF per game contributes ${performancePercent}% of this Power Score.${esc(injury)} ${esc(wild)}`
        : `<strong>${esc(leaders)}</strong> anchor a ${x.projected.toFixed(1)}-point Week 1 forecast.${esc(injury)} ${esc(wild)}`;
      const score = issueWeek ? x.powerScore : x.projected;
      return `<article class="ranking-card"><div class="rank-number">${i + 1}</div><div class="rank-copy"><small>${record.wins}–${record.losses}–${record.ties} · ${esc(x.team.owner || x.team.manager || "League member")}${trend}</small><h3>${esc(x.team.name)}</h3><p>${description}</p><div class="player-tags factor-tags">${tags}</div></div><div class="rank-score"><strong>${score.toFixed(1)}</strong><small>${issueWeek ? "POWER SCORE" : "PROJECTED POINTS"}</small><em>± ${x.stdDev.toFixed(1)}</em><small>FORECAST SD</small></div></article>`;
    }).join("");
  };
})();
