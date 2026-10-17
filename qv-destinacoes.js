/* Quanto Veio? V5.2 — pagamentos municipais conciliados com a base CGU. */
(()=>{
 const cache=new Map();let token=0;const $=id=>document.getElementById(id);
 const brl=n=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:2}).format(n||0);
 const pct=n=>new Intl.NumberFormat('pt-BR',{maximumFractionDigits:1}).format(n||0)+'%';
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const source='<a href="https://portaldatransparencia.gov.br/emendas/consulta" target="_blank" rel="noopener noreferrer">Consultar emendas na CGU ↗</a>';
 const area=(a,total)=>`<div class="qv52-sector"><div><span>${esc(a.n)}</span><b>${pct(total?100*a.v/total:0)}</b></div><div class="qv52-track"><div class="qv52-fill" style="width:${Math.min(100,total?100*a.v/total:0).toFixed(2)}%"></div></div></div>`;
 const period=(p,i)=>`<div class="qv52-period"><h5>${i?'2023–set. 2026':'2019–2022'}</h5><strong>${brl(p.total)}</strong><small>Pagamentos a favorecidos municipais</small>${p.areas.length?p.areas.slice(0,5).map(a=>area(a,p.total)).join(''):'<div class="qv52-state">Sem pagamentos identificados</div>'}${p.areas.length>5?'<small>Outras funções não exibidas neste resumo.</small>':''}</div>`;
 function insight(a,b){
  if(!a.total&&!b.total)return 'Não foram identificados pagamentos a estruturas municipais nos períodos analisados.';
  const primary=p=>p.areas.filter(x=>x.n!=='Não classificada na fonte'&&x.n!=='Encargos especiais').sort((x,y)=>y.v-x.v)[0];
  const top=primary(b);
  const diff=b.total-a.total;
  let msg=`O total nominal ${diff>=0?'aumentou':'diminuiu'} ${brl(Math.abs(diff))} entre os períodos. `;
  if(top){const old=a.areas.find(x=>x.n===top.n)?.v||0;msg+=`${top.n} representa ${pct(100*top.v/b.total)} do total recente, ante ${a.total?pct(100*old/a.total):'sem base comparável'} no período anterior. `;}
  if([...a.areas,...b.areas].some(x=>x.n==='Encargos especiais'))msg+='A categoria “Encargos especiais” inclui transferências cuja aplicação final não pode ser deduzida apenas pela função orçamentária. ';
  msg+='Os períodos têm durações diferentes e 2026 é parcial; a comparação não mede entregas nem eficiência.';
  return msg;
 }
 function list(p,expanded){const top=p.top.slice(0,expanded?10:5);if(!top.length)return '<p class="qv52-state">Nenhum pagamento com código de emenda neste período.</p>';
  return top.map((r,i)=>`<div class="qv52-topitem"><div class="qv52-topline"><b>${i+1}. ${esc(r.f)}</b><strong>${brl(r.v)}</strong></div><p>${esc(r.d)}</p><small>${r.id?'Emenda '+esc(r.id)+' · ':''}${esc(r.a)} · ${esc(r.b)}</small></div>`).join('');}
 function renderData(data){const a=data.p[0],b=data.p[1],body=$('qv52-body');if(!body)return;
  body.innerHTML=`<div class="qv52-cols">${period(a,0)}${period(b,1)}</div><div class="qv52-insight"><strong>Em resumo</strong>${esc(insight(a,b))}</div><div class="qv52-section-title">Maiores pagamentos por emenda</div><p class="qv52-lead">Soma dos pagamentos ao favorecido municipal, agrupada pelo código da emenda em cada período. Não é o valor total da emenda nem o custo de uma obra.</p><div class="qv52-toptabs" role="group" aria-label="Período dos maiores pagamentos"><button type="button" data-p="1" aria-pressed="true">2023–2026</button><button type="button" data-p="0" aria-pressed="false">2019–2022</button></div><div id="qv52-top"></div><button class="qv52-showall" type="button" id="qv52-toggle">Ver as 10 maiores</button><p class="qv52-source">Fonte: CGU, EmendasParlamentares.csv e EmendasParlamentares_PorFavorecido.csv, arquivo de outubro de 2026. Pagamentos de jan./2019 a set./2026, classificados pelo município do favorecido público municipal. A função e a ação são classificações orçamentárias da emenda, não prova de aplicação local. Valores nominais; sem correção pela inflação. ${source}</p>`;
  let selected=1,expanded=false;const paint=()=>{const top=$('qv52-top');if(!top)return;top.innerHTML=list(data.p[selected],expanded);const toggle=$('qv52-toggle');toggle.hidden=data.p[selected].top.length<=5;toggle.textContent=expanded?'Mostrar apenas as 5 maiores':'Ver as 10 maiores';body.querySelectorAll('[data-p]').forEach(btn=>btn.setAttribute('aria-pressed',String(Number(btn.dataset.p)===selected)));};
  body.querySelectorAll('[data-p]').forEach(btn=>btn.addEventListener('click',()=>{selected=Number(btn.dataset.p);expanded=false;paint();}));$('qv52-toggle').addEventListener('click',()=>{expanded=!expanded;paint();});paint();
 }
 window.qvRenderDestinacoes=async function(x){const request=++token,body=$('qv52-body');if(!body)return;
  if(x.g==='estado'){body.innerHTML='<p class="qv52-state">O comparativo detalhado é municipal. Selecione uma cidade para explorar as destinações.</p>';return;}
  body.textContent='Carregando destinações registradas pela CGU…';
  try{if(!cache.has(x.uf))cache.set(x.uf,fetch('./dados/destinacoes/'+x.uf+'.json').then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json();}).catch(e=>{cache.delete(x.uf);throw e;}));
   const data=await cache.get(x.uf);if(request!==token)return;
   if(!data||data.uf!==x.uf)throw Error('UF incompatível');
   if(!data.cities[x.k]){body.innerHTML='<p class="qv52-state">Comparativo indisponível para este município: os pagamentos do arquivo detalhado não coincidem com os totais da base principal. Para evitar informação inconsistente, mantivemos apenas os valores financeiros já validados.</p>';return;}
   renderData(data.cities[x.k]);
  }catch(e){if(request===token){body.innerHTML='<p class="qv52-state">Não foi possível carregar o detalhamento. Os valores principais continuam disponíveis. Atualize a página para tentar novamente.</p>';console.warn('V5.2 destinações:',e);}}
 };
})();
