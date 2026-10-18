/* Quanto Veio? V5.3 — leitura acessível, comparação anualizada e fichas auditáveis. */
(()=>{
 'use strict';
 const cache=new Map();let token=0;const $=id=>document.getElementById(id);
 const brl=n=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:2}).format(Number(n)||0);
 const pct=n=>new Intl.NumberFormat('pt-BR',{maximumFractionDigits:1}).format(n||0)+'%';
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const source='<a href="https://portaldatransparencia.gov.br/emendas/consulta" target="_blank" rel="noopener noreferrer">Consultar emendas na CGU ↗</a>';
 const sourceDownload='https://portaldatransparencia.gov.br/download-de-dados/emendas-parlamentares';
 const periodLabels=['2019–2022','2023–set. 2026'];
 const years=[4,3.75]; // 48 meses e 45 meses, respectivamente.
 const titleRules=[
  [/^transferencias especiais$/, 'Transferência especial — destinação não detalhada'],
  [/custeio dos servicos de assistencia hospitalar e ambulatorial/, 'Custeio hospitalar e ambulatorial'],
  [/custeio dos servicos de atencao primaria a saude/, 'Custeio da atenção primária à saúde'],
  [/politica nacional de desenvolvimento urbano.*qualificacao viaria/, 'Infraestrutura viária urbana'],
  [/fomento ao setor agropecuario/, 'Apoio ao setor agropecuário'],
  [/projetos de desenvolvimento sustentavel local integrado/, 'Desenvolvimento local sustentável'],
  [/infraestrutura para esporte educacional, recreativo e de lazer/, 'Infraestrutura para esporte e lazer'],
  [/projetos de infraestrutura turistica/, 'Infraestrutura turística'],
  [/estruturacao da rede de servicos de atencao primaria/, 'Estruturação da atenção primária à saúde'],
  [/estruturacao de unidades de atencao especializada/, 'Estruturação da atenção especializada à saúde'],
  [/fortalecimento da gestao do sistema unico de assistencia social/, 'Estruturação dos serviços de assistência social'],
  [/infraestrutura basica.*calha norte/, 'Infraestrutura básica — Calha Norte'],
  [/infraestrutura para a educacao basica/, 'Infraestrutura da educação básica'],
  [/veiculos para o transporte escolar/, 'Veículos para transporte escolar'],
  [/infraestrutura hidrica/, 'Infraestrutura hídrica'],
  [/saneamento basico/, 'Saneamento básico'],
  [/melhorias sanitarias domiciliares/, 'Melhorias sanitárias domiciliares'],
  [/esporte amador.*recreativo e de lazer/, 'Infraestrutura para esporte e lazer'],
  [/seguranca publica/, 'Ações de segurança pública'],
  [/promocao e fomento a cultura/, 'Fomento à cultura'],
  [/protecao e defesa civil/, 'Proteção e defesa civil'],
  [/^multiplo$/, 'Ações orçamentárias múltiplas'],
  [/nao identificada/, 'Ação orçamentária não identificada']
 ];
 function actionTitle(description){
  const clean=String(description||'').trim();
  const key=norm(clean);
  for(const [re,title] of titleRules)if(re.test(key))return title;
  if(!clean)return 'Ação orçamentária não identificada';
  const human=clean.charAt(0).toLocaleUpperCase('pt-BR')+clean.slice(1).toLocaleLowerCase('pt-BR');
  return human.length>90?human.slice(0,87).replace(/\s+\S*$/,'')+'…':human;
 }
 function area(a,total){const share=total?100*a.v/total:0;return `<div class="qv52-sector"><div><span>${esc(a.n)}</span><b>${pct(share)}</b></div><div class="qv52-track"><div class="qv52-fill" style="width:${Math.max(0,Math.min(100,share)).toFixed(2)}%"></div></div></div>`;}
 function period(p,i){const avg=p.total/years[i];return `<div class="qv52-period"><h5>${periodLabels[i]}</h5><strong>${brl(p.total)}</strong><small>Pagamentos a favorecidos municipais</small><div class="qv53-annual"><span>Média anual equivalente</span><b>${brl(avg)}<small>/ano</small></b></div>${p.areas.length?p.areas.slice(0,5).map(a=>area(a,p.total)).join(''):'<div class="qv52-state">Sem pagamentos identificados</div>'}${p.areas.length>5?'<small>Outras funções não exibidas neste resumo.</small>':''}</div>`;}
 function insight(a,b,city){
  if(!a.total&&!b.total)return `Não foram identificados pagamentos a favorecidos municipais de ${city} nos períodos analisados.`;
  const primary=p=>p.areas.filter(x=>x.n!=='Não classificada na fonte'&&x.n!=='Encargos especiais'&&x.n!=='Múltiplo').sort((x,y)=>y.v-x.v)[0];
  const top=primary(b);
  const parts=[];
  if(top&&b.total){const share=100*top.v/b.total,old=a.areas.find(x=>x.n===top.n)?.v||0;
   const tenths=Math.round(share/10);
   const approx=(Math.abs(share-tenths*10)<=2.5&&tenths>=1&&tenths<=9)?` Cerca de ${tenths} de cada 10 reais do período foram classificados nessa área.`:'';
   parts.push(`Em ${city}, ${top.n.toLocaleLowerCase('pt-BR')} representa ${pct(share)} dos pagamentos municipais recentes.${approx}`);
   if(a.total)parts.push(`No período anterior, essa área correspondia a ${pct(100*old/a.total)}.`);
  }else if(b.total){parts.push(`Em ${city}, não há uma área finalística predominante identificável para os pagamentos recentes.`);}
  const avga=a.total/years[0],avgb=b.total/years[1];
  if(avga>0&&avgb>0){const diff=avgb-avga;parts.push(`Na comparação por média anual equivalente, os pagamentos ${diff>=0?'aumentaram':'diminuíram'} ${brl(Math.abs(diff))} por ano (${brl(avga)}/ano antes; ${brl(avgb)}/ano no período recente).`);}
  else if(avga===0&&avgb>0)parts.push(`A média anual equivalente recente é de ${brl(avgb)}; não há base anterior para calcular uma variação percentual.`);
  else if(avga>0&&avgb===0)parts.push('Não foram identificados pagamentos municipais no período recente.');
  if([...a.areas,...b.areas].some(x=>x.n==='Encargos especiais'))parts.push('Transferências especiais podem não revelar a aplicação final do dinheiro.');
  parts.push('Os valores são nominais, 2026 está incompleto e os registros não comprovam serviços ou obras entregues.');
  return parts.join(' ');
 }
 function list(p,expanded,periodIndex){const top=p.top.slice(0,expanded?10:5);if(!top.length)return '<p class="qv52-state">Nenhum pagamento com código de emenda neste período.</p>';
  return top.map((r,i)=>`<article class="qv52-topitem"><div class="qv52-topline"><b>${i+1}. ${esc(actionTitle(r.d))}</b><strong>${brl(r.v)}</strong></div><div class="qv53-sectorlabel">${esc(r.f)}</div><p>${esc(r.d)}</p><small>${r.id?'Emenda '+esc(r.id)+' · ':''}${esc(r.a)} · ${esc(r.b)}</small><button class="qv53-explain" type="button" data-explain="${i}" data-period="${periodIndex}" aria-label="Entenda esta emenda: ${esc(actionTitle(r.d))}">Entenda esta emenda <span aria-hidden="true">↗</span></button></article>`).join('');}
 function ensureDialog(){let d=$('qv53-dialog');if(d)return d;d=document.createElement('dialog');d.id='qv53-dialog';d.className='qv53-dialog';d.setAttribute('aria-labelledby','qv53-dialog-title');d.innerHTML='<div class="qv53-dialog-top"><div class="eyebrow">DETALHAMENTO DA EMENDA</div><button type="button" class="qv53-close" aria-label="Fechar detalhamento">✕ Fechar</button></div><div id="qv53-dialog-content"></div>';document.body.appendChild(d);d.querySelector('.qv53-close').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d)d.close();});return d;}
 function field(label,value){return `<div class="qv53-field"><dt>${esc(label)}</dt><dd>${esc(value||'Não informado na base')}</dd></div>`;}
 function showDetail(r,periodIndex,city){const d=ensureDialog();const title=actionTitle(r.d);
  $('qv53-dialog-content').innerHTML=`<h3 id="qv53-dialog-title">${esc(title)}</h3><div class="qv53-detail-money">${brl(r.v)}</div><p class="qv53-detail-caption">Soma dos pagamentos registrados ao favorecido municipal no período ${periodLabels[periodIndex]}. Não representa o valor total autorizado para a emenda nem o custo de uma obra.</p><dl class="qv53-fields">${field('Município do cadastro do favorecido',city)}${field('Código da emenda',r.id)}${field('Autor indicado na base',r.a)}${field('Favorecido',r.b)}${field('Função orçamentária',r.f)}${field('Ação orçamentária — descrição original',r.d)}${field('Período dos pagamentos agrupados',periodLabels[periodIndex])}</dl><div class="qv53-evidence"><strong>O que é possível afirmar?</strong><p>Há registro de pagamento associado a essa emenda e a esse favorecido, classificado pela ação orçamentária indicada. A base utilizada não confirma a destinação final, o objeto executado, a quantidade de atendimentos ou a entrega de obras e equipamentos.</p></div><div class="qv53-dialog-actions"><a href="https://portaldatransparencia.gov.br/emendas/consulta" target="_blank" rel="noopener noreferrer">Pesquisar no Portal da Transparência ↗</a><a href="${sourceDownload}" target="_blank" rel="noopener noreferrer">Baixar base oficial CGU ↗</a>${r.id?'<button type="button" id="qv53-copy">Copiar código da emenda</button>':''}</div><p class="qv53-detail-caption">A consulta oficial abre a página geral da CGU; utilize o código da emenda para localizar o registro. Não há um link direto validado para este agrupamento.</p>`;
  if(typeof d.showModal==='function')d.showModal();else d.setAttribute('open','');
  const copy=$('qv53-copy');if(copy)copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(String(r.id));copy.textContent='Código copiado';}catch(e){copy.textContent='Selecione o código na ficha para copiar';}});
 }
 function renderData(data,city){const a=data.p[0],b=data.p[1],body=$('qv52-body');if(!body)return;
  body.innerHTML=`<div class="qv52-cols">${period(a,0)}${period(b,1)}</div><p class="qv53-annual-note">Média anual equivalente: total de cada período dividido por 4 anos (2019–2022) ou 3,75 anos (jan./2023 a set./2026). Não é média por ano de pagamento e não corrige a inflação.</p><div class="qv52-insight"><strong>Em resumo</strong><p>${esc(insight(a,b,city))}</p></div><div class="qv52-section-title">Maiores pagamentos por emenda</div><p class="qv52-lead">Soma dos pagamentos ao favorecido municipal, agrupada pelo código da emenda em cada período. Não é o valor total da emenda nem o custo de uma obra.</p><div class="qv52-toptabs" role="group" aria-label="Período dos maiores pagamentos"><button type="button" data-p="1" aria-pressed="true">2023–2026</button><button type="button" data-p="0" aria-pressed="false">2019–2022</button></div><div id="qv52-top"></div><button class="qv52-showall" type="button" id="qv52-toggle">Ver as 10 maiores</button><p class="qv52-source">Fonte: CGU, EmendasParlamentares.csv e EmendasParlamentares_PorFavorecido.csv, arquivo de outubro de 2026. Pagamentos de jan./2019 a set./2026, classificados pelo município do favorecido público municipal. A função e a ação são classificações orçamentárias da emenda, não prova de aplicação local. Títulos simplificados para leitura; descrição original preservada. Valores nominais; sem correção pela inflação. ${source}</p>`;
  let selected=1,expanded=false;const paint=()=>{const top=$('qv52-top');if(!top)return;top.innerHTML=list(data.p[selected],expanded,selected);const toggle=$('qv52-toggle');toggle.hidden=data.p[selected].top.length<=5;toggle.textContent=expanded?'Mostrar apenas as 5 maiores':'Ver as 10 maiores';body.querySelectorAll('[data-p]').forEach(btn=>btn.setAttribute('aria-pressed',String(Number(btn.dataset.p)===selected)));};
  body.querySelectorAll('[data-p]').forEach(btn=>btn.addEventListener('click',()=>{selected=Number(btn.dataset.p);expanded=false;paint();}));
  $('qv52-toggle').addEventListener('click',()=>{expanded=!expanded;paint();});
  body.onclick=e=>{const button=e.target.closest('button[data-explain]');if(!button||!body.contains(button))return;const periodIndex=Number(button.dataset.period),index=Number(button.dataset.explain);const record=data.p[periodIndex]?.top[index];if(record)showDetail(record,periodIndex,city);};
  paint();
 }
 window.qvRenderDestinacoes=async function(x){const request=++token,body=$('qv52-body');if(!body)return;
  if(x.g==='estado'){body.innerHTML='<p class="qv52-state">O comparativo detalhado é municipal. Selecione uma cidade para explorar as destinações.</p>';return;}
  const openDialog=$('qv53-dialog');if(openDialog?.open)openDialog.close();
  body.textContent='Carregando destinações registradas pela CGU…';
  try{if(!cache.has(x.uf))cache.set(x.uf,fetch('./dados/destinacoes/'+x.uf+'.json').then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json();}).catch(e=>{cache.delete(x.uf);throw e;}));
   const data=await cache.get(x.uf);if(request!==token)return;
   if(!data||data.uf!==x.uf)throw Error('UF incompatível');
   if(!data.cities[x.k]){body.innerHTML='<p class="qv52-state">Comparativo indisponível para este município: os pagamentos do arquivo detalhado não coincidem com os totais da base principal. Para evitar informação inconsistente, mantivemos apenas os valores financeiros já validados.</p>';return;}
   renderData(data.cities[x.k],x.n);
  }catch(e){if(request===token){body.innerHTML='<p class="qv52-state">Não foi possível carregar o detalhamento. Os valores principais continuam disponíveis. Atualize a página para tentar novamente.</p>';console.warn('V5.3 destinações:',e);}}
 };
})();
