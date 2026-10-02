#!/usr/bin/env python3
"""Build analysis-friendly CSVs from the authenticated ESPN archive."""

import csv
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parent
RAW = ROOT / "raw-json"
OUT = ROOT / "derived"
OUT.mkdir(exist_ok=True)


def load(name):
    return json.loads((RAW / f"{name}.json").read_text())["data"]


def write_csv(name, fields, rows):
    with (OUT / name).open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


scoreboards = load("scoreboards")
standings = load("standings")
drafts = load("drafts")
rosters = load("rosters")
settings = load("settings")
transactions = load("transactions")
playoffs = load("playoffs")

matchups = []
team_weeks = []
for season, season_data in scoreboards.items():
    for week in season_data["weeks"]:
        for game in week["games"]:
            teams = game.get("teams", [])
            a = teams[0] if teams else {}
            b = teams[1] if len(teams) > 1 else {}
            row = {
                "season": season,
                "period": week["period"],
                "period_label": week["label"],
                "game_index": game["index"],
                "game_label": game.get("label"),
                "status": game.get("status"),
                "team_1_id": a.get("teamId"),
                "team_1_name": a.get("name"),
                "team_1_score": a.get("score"),
                "team_1_result": a.get("result"),
                "team_2_id": b.get("teamId"),
                "team_2_name": b.get("name"),
                "team_2_score": b.get("score"),
                "team_2_result": b.get("result"),
                "box_score_url": game.get("boxScore"),
            }
            matchups.append(row)
            for team, opponent in ((a, b), (b, a)):
                if not team:
                    continue
                team_weeks.append(
                    {
                        "season": season,
                        "period": week["period"],
                        "period_label": week["label"],
                        "game_index": game["index"],
                        "team_id": team.get("teamId"),
                        "team_name": team.get("name"),
                        "score": team.get("score"),
                        "result": team.get("result"),
                        "record_display": team.get("record"),
                        "opponent_id": opponent.get("teamId"),
                        "opponent_name": opponent.get("name"),
                        "opponent_score": opponent.get("score"),
                    }
                )

write_csv(
    "weekly-matchups-2017-2026.csv",
    list(matchups[0]),
    matchups,
)
write_csv(
    "team-week-scores-2017-2026.csv",
    list(team_weeks[0]),
    team_weeks,
)

standing_rows = []
for season, season_data in standings.items():
    for row in season_data["rows"]:
        standing_rows.append(
            {
                "season": season,
                **row,
                "owners": " | ".join(row.get("owners", [])),
                "snapshot_status": season_data.get("status", "final"),
                "as_of": season_data.get("asOf", ""),
            }
        )
standing_fields = [
    "season", "rank", "division", "divisionRank", "team", "owners", "record",
    "winPct", "gamesBack", "playoffPct", "pf", "pa", "pfPerGame", "paPerGame",
    "diff", "divisionRecord", "homeRecord", "awayRecord", "streak", "moves",
    "snapshot_status", "as_of",
]
write_csv("season-standings-2017-2026.csv", standing_fields, standing_rows)

draft_rows = []
for season, season_data in drafts.items():
    for pick in season_data["picks"]:
        draft_rows.append(
            {
                "season": season,
                "round": pick["round"],
                "slot": pick["slot"],
                "overall_pick": (pick["round"] - 1) * 12 + pick["slot"],
                "player": pick["player"],
                "pro_team": pick["proTeam"],
                "position": pick["position"],
                "fantasy_team": pick["fantasyTeam"],
            }
        )
write_csv("draft-picks-2017-2026.csv", list(draft_rows[0]), draft_rows)

roster_rows = []
for season, season_data in rosters.items():
    for team in season_data["teams"]:
        for player in team["players"]:
            roster_rows.append(
                {
                    "season": season,
                    "fantasy_team": team["team"],
                    "record": team.get("record"),
                    **player,
                }
            )
write_csv("roster-snapshots-2017-2026.csv", list(roster_rows[0]), roster_rows)

transaction_rows = []
for season, season_data in transactions.items():
    for row in season_data["rows"]:
        transaction_rows.append({"season": season, **row})
write_csv("transaction-counts-2017-2026.csv", list(transaction_rows[0]), transaction_rows)

playoff_rows = []
for season, season_data in playoffs.items():
    for tier in season_data["tiers"]:
        for round_data in tier["rounds"]:
            for index, game in enumerate(round_data["games"], 1):
                teams = game.get("teams", [])
                a = teams[0] if teams else {}
                b = teams[1] if len(teams) > 1 else {}
                playoff_rows.append(
                    {
                        "season": season,
                        "tier": tier["name"],
                        "round_index": round_data["roundIndex"],
                        "round_label": round_data.get("roundLabel"),
                        "game_index": index,
                        "period": game.get("period"),
                        "game_info": game.get("gameInfo"),
                        "bye": game.get("bye"),
                        "team_1_seed": a.get("seed"),
                        "team_1_id": a.get("teamId"),
                        "team_1_name": a.get("name"),
                        "team_1_score": a.get("score"),
                        "team_1_result": a.get("result"),
                        "team_2_seed": b.get("seed"),
                        "team_2_id": b.get("teamId"),
                        "team_2_name": b.get("name"),
                        "team_2_score": b.get("score"),
                        "team_2_result": b.get("result"),
                    }
                )
write_csv("playoff-brackets-2017-2025.csv", list(playoff_rows[0]), playoff_rows)

setting_rows = []
for season, season_data in settings.items():
    for table in season_data["tables"]:
        headers = " | ".join(table.get("headers", []))
        for row_index, row in enumerate(table["rows"], 1):
            setting_rows.append(
                {
                    "season": season,
                    "table_index": table["index"],
                    "headers": headers,
                    "row_index": row_index,
                    "field": row[0] if row else "",
                    "value": " | ".join(row[1:]) if len(row) > 1 else "",
                }
            )
write_csv("league-settings-2017-2026.csv", list(setting_rows[0]), setting_rows)

owner_history = []
for season, season_data in scoreboards.items():
    teams = {}
    for week in season_data["weeks"]:
        for game in week["games"]:
            for team in game.get("teams", []):
                if team.get("teamId") and team.get("name"):
                    teams[team["teamId"]] = team["name"]
    standings_by_name = {
        row["team"]: list(dict.fromkeys(row.get("owners", [])))
        for row in standings.get(season, {}).get("rows", [])
    }
    for team_id, team_name in sorted(teams.items()):
        owners = standings_by_name.get(team_name, [])
        owner_history.append(
            {
                "season": season,
                "espn_team_id": team_id,
                "team_name": team_name,
                "owners_displayed_by_espn": " | ".join(owners),
            }
        )
write_csv("owner-team-history-2017-2026.csv", list(owner_history[0]), owner_history)

inventory = {
    "completed_seasons": 9,
    "current_season": 2026,
    "scoreboard_periods": sum(len(x["weeks"]) for x in scoreboards.values()),
    "matchup_records": len(matchups),
    "team_week_records": len(team_weeks),
    "standings_rows": len(standing_rows),
    "draft_picks": len(draft_rows),
    "roster_entries": len(roster_rows),
    "transaction_rows": len(transaction_rows),
    "playoff_games": len(playoff_rows),
    "settings_rows": len(setting_rows),
    "owner_team_rows": len(owner_history),
}
(OUT / "inventory.json").write_text(json.dumps(inventory, indent=2) + "\n")
print(json.dumps(inventory, indent=2))
