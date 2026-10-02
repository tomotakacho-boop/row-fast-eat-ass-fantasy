# Historical archive audit and decision points

## Available now

The archive supports all-time and seasonal standings; titles, podiums, playoff seeds, and bracket paths; every weekly team score and head-to-head result; all-play records, expected wins, schedule luck, and consistency; complete draft boards; season-ending rosters; transaction activity totals; and rules evolution.

## Ownership turnover visible in ESPN

These observations are not yet canonical franchise assignments:

- 2018: Tom Cummins appears; Abraham Hill's final season is 2017.
- 2023: Peter Rex appears. Tomotaka Cho and Will Cordonnier are shown as co-managers of `Your Wildest Fantasy (Football)`; Tom Cummins' final season is 2022.
- 2024: Will Cordonnier has `Wet Willies` separately and Parker Sikora appears. Sam Kumar and the Tim Ryan / Paul Ryan team last appear in 2023.
- 2025: Ethan Ashley appears; Daniel Meyer last appears in 2024.

ESPN IDs 1–12 can pass between owners. Choose an identity model before publishing owner records:

1. **Owner-based (recommended):** totals belong to the person managing that season; co-managed years are explicit.
2. **Slot-based:** the ESPN team ID is a continuous franchise regardless of owner changes.
3. **Hybrid:** retain slot history and attribute results to each year's owner(s).

## Format changes

- 2017: 17-player rosters and 10 starters. From 2018 onward: 16 players and nine starters.
- Regular season: 14 matchups in 2017, 13 in 2018–2020, and 14 from 2021 onward.
- Waiver priority through 2023; $100 FAAB beginning in 2024.
- PPR head-to-head scoring, snake drafts, 12 teams, and six playoff teams are consistent in the archived settings.
- Keeper flags conflict around the 2019/2020 offseason, so they need commissioner confirmation before being presented as fact.

## Known gaps

- No stable ESPN owner/member or player IDs are rendered.
- The transaction page retains totals, not individual add/drop/trade events; 2017–2018 totals are unavailable.
- Player-level starter/bench scoring would require opening hundreds of box scores. It was not collected because the team-level weekly score archive exactly reproduces every completed-season PF total.
- ESPN's old-season `Most Added / Dropped` page shows current global trends, not league history.

## Recommended first website package

- Owner-based all-time table: seasons, W-L-T, win percentage, PF/game, playoff appearances, podiums, and titles.
- Trophy case and champions by year.
- Scoring records, era-adjusted scoring, and consistency.
- Luck table: actual wins versus all-play/expected wins and PA percentile.
- Head-to-head matrix, owner timeline, and rules timeline.

Draft and transaction analysis should be a second section. True draft-value grading requires player-week fantasy points, the only large dataset not captured in this pass.
