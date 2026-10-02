# ESPN historical-data research

This private research archive is for league `416026`. It is not imported by or deployed with the public website.

## Coverage

- Completed seasons: 2017–2025 (nine seasons)
- Current season: 2026 (Season 10), captured on 2026-10-02 after Week 3; Week 4 was active
- 1,830 team-week score rows; 1,932 draft picks; 2,055 roster entries
- 120 standings, owner/team, and transaction-counter rows each
- 171 playoff bracket records and 1,720 setting rows

## Files

`raw-json/` holds authenticated ESPN web-UI exports:

- `scoreboards.json` — weekly scores, matchups, and playoffs
- `standings.json` — records, PF/PA, splits, moves, and current playoff odds
- `drafts.json` — every pick, round, slot, player, position, and fantasy team
- `rosters.json` — archived season rosters and acquisition type
- `settings.json` — all season settings ESPN exposes
- `transactions.json` — team-level transaction counters
- `playoffs.json` — seeded bracket cards and scores

`derived/` provides CSVs for standings, owner/team history, weekly matchups, team-week scores, drafts, rosters, transactions, playoffs, settings, and `inventory.json`.

Run `python3 research/espn-history/build_derived.py` after changing a raw export.

## Interpretation and validation

- Completed-season rank is ESPN's playoff-adjusted final finish; W-L-T, PF, and PA are regular-season values.
- 2026 is an in-progress snapshot, not a finished season.
- Team IDs are ESPN league slots, not confirmed permanent franchises. Do not publish owner aggregates until identity rules are chosen.
- ESPN does not render stable owner/member or player IDs in these historical tables.
- ESPN returned blank transaction counters for 2017–2018; those values are unavailable, not zero.
- The league used a snake draft every season, so auction values do not exist.
- Every raw JSON file parses; all completed seasons contain 12 standings rows; each completed-season place 1–12 is unique; and weekly regular-season scores reproduce ESPN PF exactly for all 108 completed team-seasons.

See `DATA-AUDIT.md` for ownership turnover, format changes, known gaps, and the recommended publication plan.
