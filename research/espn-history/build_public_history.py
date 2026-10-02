#!/usr/bin/env python3
"""Build the public, compact History-tab data from the verified archive."""
from collections import defaultdict
from pathlib import Path
import json, math

ROOT=Path(__file__).resolve().parent
def load(name): return json.loads((ROOT/'raw-json'/f'{name}.json').read_text())['data']
standings,scoreboards,playoffs,settings=map(load,['standings','scoreboards','playoffs','settings'])
years=[str(y) for y in range(2017,2026)]
def owner(row): return ' & '.join(dict.fromkeys(row.get('owners',[]))) or 'Former manager'
weeks={y:next(int(r[1]) for t in settings[y]['tables'] for r in t['rows'] if r and r[0]=='Regular Season Matchups') for y in years}
names={y:{r['team']:owner(r) for r in standings[y]['rows']} for y in years}
playoff=defaultdict(set)
for y in years:
 for tier in playoffs[y]['tiers']:
  if tier['name']=='WINNER\'S BRACKET':
   for rnd in tier['rounds']:
    for game in rnd['games']:
     for team in game['teams']:
      if team.get('name') and team['name']!='BYE': playoff[y].add(names[y].get(team['name'],'Former manager'))
totals=defaultdict(lambda:{'seasons':0,'wins':0,'losses':0,'ties':0,'pf':0,'titles':0,'podiums':0,'playoffs':0})
champions=[]; scoring=[]
for y in years:
 rows=standings[y]['rows']; mean=sum(float(r['pfPerGame']) for r in rows)/12; sd=math.sqrt(sum((float(r['pfPerGame'])-mean)**2 for r in rows)/12) or 1
 for r in rows:
  o=owner(r); w,l,t=map(int,r['record'].split('-')); x=totals[o]; x['seasons']+=1; x['wins']+=w; x['losses']+=l; x['ties']+=t; x['pf']+=float(r['pf']); x['titles']+=r['rank']==1; x['podiums']+=r['rank']<=3; x['playoffs']+=o in playoff[y]
  scoring.append({'season':int(y),'owner':o,'team':r['team'],'ppg':round(float(r['pfPerGame']),1),'pf':round(float(r['pf']),1),'era_z':round((float(r['pfPerGame'])-mean)/sd,2)})
  if r['rank']==1: champions.append({'season':int(y),'team':r['team'],'owner':o,'record':r['record'],'pf':round(float(r['pf']),1)})
alltime=[]
for o,x in totals.items():
 g=x['wins']+x['losses']+x['ties']; alltime.append({'owner':o,**x,'pf':round(x['pf'],1),'win_pct':round((x['wins']+.5*x['ties'])/g,3),'pf_per_game':round(x['pf']/g,1)})
alltime.sort(key=lambda x:(-x['titles'],-x['podiums'],-x['win_pct'],-x['pf_per_game'],x['owner']))
scores=defaultdict(list); h2h=defaultdict(lambda:[0,0,0]); luck=defaultdict(lambda:{'actual':0,'allplay':0,'games':0,'pa':0})
for y in years:
 for week in scoreboards[y]['weeks']:
  if week['period']>weeks[y]: continue
  field=[t for game in week['games'] for t in game['teams']]
  for game in week['games']:
   a,b=game['teams']; ao,bo=names[y][a['name']],names[y][b['name']]; av,bv=float(a['score']),float(b['score']); scores[ao].append(av); scores[bo].append(bv)
   if av>bv: h2h[(ao,bo)][0]+=1; h2h[(bo,ao)][1]+=1
   elif bv>av: h2h[(bo,ao)][0]+=1; h2h[(ao,bo)][1]+=1
   else: h2h[(ao,bo)][2]+=1; h2h[(bo,ao)][2]+=1
   for t,o in ((a,ao),(b,bo)): luck[o]['allplay']+=sum(float(t['score'])>float(q['score']) for q in field)/11; luck[o]['games']+=1
 for r in standings[y]['rows']:
  o=owner(r); w,l,t=map(int,r['record'].split('-')); luck[o]['actual']+=w+.5*t; luck[o]['pa']+=float(r['pa'])
weekly=[]
for o,v in scores.items():
 m=sum(v)/len(v); weekly.append({'owner':o,'mean':round(m,1),'stdev':round(math.sqrt(sum((n-m)**2 for n in v)/len(v)),1),'high':round(max(v),2),'low':round(min(v),2)})
weekly.sort(key=lambda x:(-x['high'],x['owner']))
luckrows=[]
for o,x in luck.items():
 # Each weekly all-play result already represents one expected win fraction;
 # summing it across weeks yields expected wins for the full archive.
 e=x['allplay']; luckrows.append({'owner':o,'actual_wins':round(x['actual'],1),'expected_wins':round(e,1),'luck':round(x['actual']-e,1),'pa_per_game':round(x['pa']/x['games'],1)})
# Higher percentile means a tougher historical points-against draw. This is a
# descriptive schedule-strength indicator, not a claim that matchup results
# were caused by luck alone.
for i,row in enumerate(sorted(luckrows,key=lambda x:x['pa_per_game'])):
 row['pa_percentile']=round(100*i/(len(luckrows)-1)) if len(luckrows)>1 else 50
luckrows.sort(key=lambda x:(-x['luck'],x['owner']))
owners=[x['owner'] for x in alltime]
matrix=[{'owner':o,'results':{p:'—' if p==o else '{}-{}-{}'.format(*h2h[(o,p)]) for p in owners}} for o in owners]
payload={'as_of':'October 2, 2026','note':'Completed seasons are 2017–2025. The 2026 season is excluded from all-time totals. Co-managed 2023 results are shown as a shared owner entry.','all_time':alltime,'champions':champions,'scoring_records':{'best_era':sorted(scoring,key=lambda x:(-x['era_z'],-x['ppg']))[:5],'weekly':weekly[:5],'consistency':sorted(weekly,key=lambda x:(x['stdev'],-x['mean']))[:5]},'luck':luckrows,'head_to_head':{'owners':owners,'rows':matrix},'timeline':[{'year':'2017','detail':'League launches with 12 teams.'},{'year':'2018','detail':'Tom Cummins joins; Abraham Hill exits.'},{'year':'2023','detail':'Peter Rex joins; Cho and Cordonnier co-manage one team.'},{'year':'2024','detail':'Will Cordonnier returns with Wet Willies; Parker Sikora joins.'},{'year':'2025','detail':'Ethan Ashley joins; Daniel Meyer exits.'}],'rules':[{'year':'2017','title':'Original format','detail':'17-player rosters, 10 starters, 14 matchups, waiver priority.'},{'year':'2018–20','title':'Shorter regular season','detail':'16-player rosters, nine starters, 13 regular-season matchups.'},{'year':'2021–23','title':'14-game era','detail':'Regular season returns to 14 matchups; waiver priority remains.'},{'year':'2024–present','title':'$100 FAAB','detail':'FAAB replaces waiver priority. Full PPR, 12 teams, and six playoff teams remain.'}]}
out=ROOT.parent.parent/'public'/'data'/'history.json'; out.parent.mkdir(parents=True,exist_ok=True); out.write_text(json.dumps(payload,indent=2)+'\n'); print(out)
