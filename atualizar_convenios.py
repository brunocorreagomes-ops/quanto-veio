#!/usr/bin/env python3
"""Regenera os arquivos V5.4 de convênios da CGU.

Uso (na raiz do site):
  python tools/atualizar_convenios.py /caminho/EmendasParlamentares.zip

Aceita um ZIP com EmendasParlamentares_Convenios.csv ou o CSV diretamente.
Não altera os dados financeiros, apenas dados/convenios/*.json.
"""
import argparse,csv,datetime,io,json,re,unicodedata,zipfile
from pathlib import Path
from collections import defaultdict,Counter

def normalize(value):
 text=unicodedata.normalize('NFD',str(value).upper())
 text=''.join(c for c in text if not unicodedata.combining(c))
 return re.sub(r'[^A-Z0-9]+',' ',text).strip()

def main():
 parser=argparse.ArgumentParser(description=__doc__)
 parser.add_argument('source',type=Path,help='EmendasParlamentares.zip ou EmendasParlamentares_Convenios.csv')
 parser.add_argument('--root',type=Path,default=Path(__file__).resolve().parents[1])
 args=parser.parse_args();root=args.root
 core=(root/'qv-data-core.js').read_text(encoding='utf-8')
 cities=json.loads(core.split('window.QV_DATA=',1)[1].strip().rstrip(';'))['cities']
 lookup={(x['uf'],normalize(x['n'])):x['k'] for x in cities}
 assert len(lookup)==len(cities), 'Nomes municipais duplicados após normalização'
 records=defaultdict(lambda:[{},{}]);stats=Counter()
 if args.source.suffix.lower()=='.zip':
  z=zipfile.ZipFile(args.source)
  f=io.TextIOWrapper(z.open('EmendasParlamentares_Convenios.csv'),encoding='latin1',newline='')
 else:
  z=None;f=args.source.open('r',encoding='latin1',newline='')
 try:
  for row in csv.DictReader(f,delimiter=';'):
   stats['linhas']+=1
   match=re.fullmatch(r'(.+?)\s+-\s+([A-Z]{2})',row['Localidade do gasto'].strip())
   if not match:continue
   city=lookup.get((match.group(2),normalize(match.group(1))))
   if not city:continue
   try:date=datetime.datetime.strptime(row['Data Publicação Convênio'].strip(),'%d/%m/%Y').date()
   except ValueError:continue
   if not datetime.date(2019,1,1)<=date<=datetime.date(2026,9,30):continue
   number=row['Número Convênio'].strip()
   if not re.fullmatch(r'\d{3,15}',number):continue
   try:value=max(0,round(float(row['Valor Convênio'].strip().replace('.','').replace(',','.')),2))
   except ValueError:value=0
   index=0 if date.year<=2022 else 1
   code=row['Código da Emenda'].strip()
   existing=records[city][index].get(number)
   if existing:
    if re.fullmatch(r'\d{8,20}',code):existing['codes'].add(code)
    existing['v']=max(value,existing['v'])
   else:
    records[city][index][number]={
     'id':number,'date':date.isoformat(),'v':value,
     'obj':row['Objeto Convênio'].strip(),'cv':row['Convenente'].strip(),
     'codes':{code} if re.fullmatch(r'\d{8,20}',code) else set()
    }
 finally:
  f.close()
  if z:z.close()
 out=root/'dados'/'convenios';out.mkdir(parents=True,exist_ok=True)
 for uf in sorted({x['uf'] for x in cities}):
  result={}
  for city in cities:
   if city['uf']!=uf:continue
   groups=records.get(city['k'])
   if not groups:continue
   counts=[];periods=[]
   for group in groups:
    ordered=sorted(group.values(),key=lambda r:(-r['v'],r['date'],r['id']))
    counts.append(len(ordered))
    periods.append([{**r,'codes':sorted(r['codes'])} for r in ordered[:12]])
   result[city['k']]={'n':counts,'p':periods}
  (out/(uf+'.json')).write_text(json.dumps({'uf':uf,'cities':result},ensure_ascii=False,separators=(',',':')),encoding='utf-8')
  stats['municipios_com_documentos']+=len(result)
  stats['convenios_municipais']+=sum(sum(x['n']) for x in result.values())
 print(dict(stats))
 print('Municípios com resposta sem documento:',len(cities)-stats['municipios_com_documentos'])

if __name__=='__main__':main()
