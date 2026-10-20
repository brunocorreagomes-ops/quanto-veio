/* Quanto Veio? V5.4 — rastro documental da CGU. Convênio NÃO comprova entrega. */
(()=>{
 'use strict';
 const cache=new Map();let serial=0;
 const $=id=>document.getElementById(id);
 const money=v=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(v)||0);
 const number=v=>new Intl.NumberFormat('pt-BR').format(Number(v)||0);
 const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const link='https://portaldatransparencia.gov.br/convenios/consulta';
 const src='https://portaldatransparencia.gov.br/download-de-dados/emendas-parlamentares';
 const labels=['2019–2022','2023–set. 2026'];
 let currentCity='';let activeData=null;let period=1;let expanded=false;let lastFocus=null;
 function shortObject(value){const s=String(value||'').replace(/\s+/g,' ').trim();return s.length>200?s.slice(0,197).replace(/\s+\S*$/,'')+'…':s;}
 function human(s){s=String(s||'').trim();return s?s[0].toLocaleUpperCase('pt-BR')+s.slice(1):'Objeto não informado na fonte';}
 function ensureDialog(){let d=$('qv54-dialog');if(d)return d;
  d=document.createElement('dialog');d.id='qv54-dialog';d.className='qv54-dialog';d.setAttribute('aria-labelledby','qv54-dialog-title');
  d.innerHTML='<div class="qv54-dialog-head"><span class="eyebrow">DOCUMENTO DA CGU</span><button type="button" data-qv54-close aria-label="Fechar detalhes">✕ Fechar</button></div><div id="qv54-dialog-content"></div>';
  document.body.appendChild(d);
  d.querySelector('[data-qv54-close]').addEventListener('click',()=>d.close());
  d.addEventListener('click',e=>{if(e.target===d)d.close();});
  d.addEventListener('close',()=>{lastFocus?.focus?.();});return d;
 }
 function field(label,value){return `<div><dt>${escape(label)}</dt><dd>${escape(value||'Não informado')}</dd></div>`;}
 function details(r){lastFocus=document.activeElement;const d=ensureDialog();
  const date=r.date?new Date(r.date+'T12:00:00').toLocaleDateString('pt-BR'):'Não informada';
  $('qv54-dialog-content').innerHTML=`<h3 id="qv54-dialog-title">${escape(human(r.obj))}</h3><p class="qv54-dialog-sub">Convênio nº ${escape(r.id)} · Publicado em ${escape(date)}</p><div class="qv54-dialog-value"><small>Valor informado do convênio</small><strong>${money(r.v)}</strong></div><dl class="qv54-fields">${field('Localidade declarada do gasto',currentCity)}${field('Número do convênio',r.id)}${field('Objeto registrado na CGU',r.obj)}${field('Convenente',r.cv)}${field('Código(s) de emenda associado(s)',r.codes?.length?r.codes.join(', '):'Não informado')} ${field('Data de publicação',date)}</dl><div class="qv54-warning"><strong>O que este registro comprova?</strong><p>Que um convênio com este objeto consta da relação oficial da CGU para a localidade declarada. A planilha não informa se a obra, equipamento ou serviço foi concluído, nem atesta entrega física. O valor do convênio não equivale ao pagamento municipal exibido acima.</p></div><div class="qv54-dialog-actions"><a href="${link}" target="_blank" rel="noopener noreferrer">Consultar convênio na CGU ↗</a><button type="button" id="qv54-copy">Copiar nº do convênio</button></div><p class="qv54-fineprint">A consulta abre o filtro geral da CGU. Cole o número do convênio para consultar situação, vigência, documentos e eventuais informações adicionais.</p>`;
  if(typeof d.showModal==='function')d.showModal();else d.setAttribute('open','');
  $('qv54-copy').addEventListener('click',async e=>{try{await navigator.clipboard.writeText(r.id);e.currentTarget.textContent='Número copiado';}catch{e.currentTarget.textContent='Copie o número na ficha';}});
 }
 function card(r,i){const date=r.date?new Date(r.date+'T12:00:00').toLocaleDateString('pt-BR'):'Data não informada';return `<article class="qv54-item"><div class="qv54-item-top"><span class="qv54-item-num">${String(i+1).padStart(2,'0')}</span><span class="qv54-item-label">Objeto de convênio registrado</span><span class="qv54-item-date">${escape(date)}</span></div><h5>${escape(human(shortObject(r.obj)))}</h5><div class="qv54-item-bottom"><div><small>Valor do convênio, não pagamento</small><strong>${money(r.v)}</strong></div><button type="button" data-qv54-item="${i}" aria-label="Ver documento do convênio ${escape(r.id)}">Ver documento <span aria-hidden="true">↗</span></button></div></article>`;}
 function paint(){const root=$('qv54-body');if(!root||!activeData)return;
  const p=activeData.p[period]||[],n=activeData.n[period]||0;
  const shown=p.slice(0,expanded?12:4);
  root.innerHTML=`<div class="qv54-stats"><div class="qv54-stat"><span>01 · RECURSOS</span><strong>Pagamentos registrados</strong><small>Valores detalhados na seção acima</small></div><div class="qv54-stat qv54-stat-emphasis"><span>02 · DOCUMENTOS</span><strong>${number(n)} convênio${n===1?'':'s'}</strong><small>Com localidade e publicação identificadas</small></div><div class="qv54-stat"><span>03 · ENTREGA FÍSICA</span><strong>Não verificada</strong><small>A planilha não informa conclusão</small></div></div><div class="qv54-results-head"><div><h5>Objetos registrados para ${escape(currentCity)}</h5><p>Convênios por data de publicação. Ordenados pelo valor informado do instrumento, não pelo pagamento da emenda.</p></div><div class="qv54-tabs" role="group" aria-label="Período de publicação dos convênios"><button type="button" data-qv54-period="1" aria-pressed="${period===1}">2023–2026</button><button type="button" data-qv54-period="0" aria-pressed="${period===0}">2019–2022</button></div></div>${n?`<p class="qv54-count">${number(n)} instrumento${n===1?'':'s'} publicado${n===1?'':'s'} neste período. ${n>shown.length?'Veja abaixo os de maior valor.':''}</p><div class="qv54-items">${shown.map(card).join('')}</div>${p.length>4?`<button type="button" class="qv54-more" id="qv54-more">${expanded?'Mostrar apenas os 4 primeiros':'Ver até 12 convênios de maior valor'}</button>`:''}`:`<div class="qv54-empty"><strong>Nenhum convênio municipal localizado neste recorte.</strong><p>Isso não significa que a cidade não recebeu recursos, nem que obras ou serviços não ocorreram. Outros instrumentos e transferências podem não constar desta relação.</p></div>`}<p class="qv54-method">Fonte: CGU, <em>EmendasParlamentares_Convenios.csv</em> (arquivo de outubro de 2026). Associação por município e UF da <strong>localidade do gasto</strong> declarada; convênios estaduais e nacionais não são atribuídos automaticamente a municípios. Os valores são dos instrumentos, não são somados aos pagamentos e não comprovam execução ou entrega. <a href="${src}" target="_blank" rel="noopener noreferrer">Base oficial ↗</a> · <a href="${link}" target="_blank" rel="noopener noreferrer">Consultar situação na CGU ↗</a></p>`;
  root.querySelectorAll('[data-qv54-period]').forEach(btn=>btn.addEventListener('click',()=>{period=Number(btn.dataset.qv54Period);expanded=false;paint();}));
  root.querySelectorAll('[data-qv54-item]').forEach(btn=>btn.addEventListener('click',()=>{const item=activeData?.p[period]?.[Number(btn.dataset.qv54Item)];if(item)details(item);}));
  $('qv54-more')?.addEventListener('click',()=>{expanded=!expanded;paint();});
 }
 async function render(x){const request=++serial,section=$('qv54-panel'),root=$('qv54-body');if(!section||!root)return;
  const dlg=$('qv54-dialog');if(dlg?.open)dlg.close();activeData=null;expanded=false;period=1;
  if(!x||x.g==='estado'){section.hidden=true;root.textContent='';return;}
  section.hidden=false;currentCity=`${x.n} (${x.uf})`;
  root.innerHTML='<p class="qv54-loading" role="status">Consultando documentos de convênios para este município…</p>';
  try{
   if(!cache.has(x.uf))cache.set(x.uf,fetch('./dados/convenios/'+x.uf+'.json').then(res=>{if(!res.ok)throw Error('HTTP '+res.status);return res.json();}).catch(err=>{cache.delete(x.uf);throw err;}));
   const data=await cache.get(x.uf);if(request!==serial)return;
   if(data.uf!==x.uf||typeof data.cities!=='object')throw Error('Base documental incompatível');
   activeData=data.cities[x.k]||{n:[0,0],p:[[],[]]};paint();
  }catch(e){if(request===serial){root.innerHTML=`<div class="qv54-empty"><strong>Documentos temporariamente indisponíveis.</strong><p>Os valores financeiros do município continuam disponíveis. Tente novamente mais tarde.</p><button type="button" id="qv54-retry">Tentar carregar novamente</button></div>`;$('qv54-retry')?.addEventListener('click',()=>render(x));console.warn('QV5.4 convênios',e);}}
 }
 const original=window.qvRenderDestinacoes;
 if(typeof original==='function')window.qvRenderDestinacoes=function(x){const response=original(x);render(x);return response;};
 window.qv54RenderEvidencias=render;
})();
