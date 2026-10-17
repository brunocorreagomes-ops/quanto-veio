/* Quanto Veio? — instrumentação de métricas V4.3.1
 * Privacidade: sem cookies próprios, sem identificadores de pessoas,
 * sem texto digitado na busca e sem dados financeiros enviados.
 * A coleta exige um Website ID válido no arquivo qv-analytics-config.js.
 */
(() => {
  'use strict';
  const cfg = window.QV_ANALYTICS || {};
  const allowed = Array.isArray(cfg.allowedHosts) && cfg.allowedHosts.includes(location.hostname);
  const validId = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cfg.websiteId || '');
  const enabled = allowed && validId && cfg.scriptUrl === 'https://cloud.umami.is/script.js';
  const queued = [];
  const recent = new Map();
  let ready = false;
  const debug = new URLSearchParams(location.search).has('qv_analytics_debug');
  const slug = str => String(str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0,70);
  const routeInfo = () => {
    const path = decodeURIComponent(location.hash.replace(/^#/, ''));
    const city = path.match(/^\/municipios\/([a-z]{2})\/([a-z0-9-]+)$/i);
    if (city) return {scope:'municipio',uf:city[1].toUpperCase(),cidade:city[2].slice(0,70)};
    const state = path.match(/^\/estados\/([a-z]{2})$/i);
    if (state) return {scope:'estado',uf:state[1].toUpperCase()};
    return {scope:'inicio'};
  };
  function track(name, data = {}) {
    const safe = {};
    for (const [k,v] of Object.entries(data)) {
      if (/^(scope|uf|cidade|formato|origem|aba)$/.test(k) && /^(string|number)$/.test(typeof v)) safe[k] = String(v).slice(0,70);
    }
    const sig = name + JSON.stringify(safe);
    const now = Date.now();
    if (now - (recent.get(sig) || 0) < 650) return;
    recent.set(sig, now);
    if (debug) console.info('[Quanto Veio? analytics]', name, safe, enabled ? 'enabled' : 'disabled');
    if (!enabled) return;
    if (ready && typeof window.umami?.track === 'function') window.umami.track(name, safe);
    else if (queued.length < 100) queued.push([name,safe]);
  }
  window.qvAnalytics = Object.freeze({track, enabled});
  if (enabled) {
    const script = document.createElement('script');
    script.defer = true;
    script.src = cfg.scriptUrl;
    script.setAttribute('data-website-id', cfg.websiteId);
    script.setAttribute('data-domains', cfg.allowedHosts.join(','));
    script.onload = () => {
      ready = typeof window.umami?.track === 'function';
      if (ready) for (const [event, data] of queued.splice(0)) window.umami.track(event, data);
    };
    script.onerror = () => { queued.length = 0; if (debug) console.warn('[Quanto Veio? analytics] Umami indisponível'); };
    document.head.append(script);
  }
  function resultView() {
    const info = routeInfo();
    if (info.scope !== 'inicio') track('resultado_visualizado',info);
  }
  function bind() {
    document.addEventListener('click', event => {
      const el = event.target.closest('button, a, [role="option"], .location');
      if (!el) return;
      const id = el.id;
      const info = routeInfo();
      if (id === 'go') track('busca_confirmada',{origem:'botao'});
      if (el.closest('#suggestions')) track('busca_confirmada',{origem:'sugestao'});
      if (id === 'shareResult') track('gerador_aberto',info);
      if (id === 'qvgGenerate') track('previa_atualizada',{formato:document.getElementById('qvgFormat')?.value||'feed'});
      if (id === 'qvgWhatsapp') track('whatsapp_aberto',info);
      if (id === 'qvgCopy' || id === 'copyResult' || id === 'copyShare') track('link_copiado',info);
      if (id === 'cityMapExpand') track('atlas_aberto',info);
      if (el.matches('#tabs button[data-mode]')) track('ranking_aba',{aba:el.dataset.mode});
      if (el.closest('#rows') && el.matches('.location, .location *')) track('ranking_selecao',{aba:document.querySelector('#tabs button.active')?.dataset.mode||'all'});
      if (id === 'nativeShare' || id === 'qvgShare') track('compartilhamento_iniciado',info);
      if (id === 'downloadStory') track('story_download_solicitado',info);
    }, {passive:true});
    document.addEventListener('change', event => {
      if (event.target?.id === 'qvgFormat') track('formato_selecionado',{formato:event.target.value});
    }, {passive:true});
    // A navegação do app usa history.replaceState, que não dispara hashchange.
    // Observar o nome exibido evita alterar a lógica de rotas existente.
    const name = document.getElementById('name');
    if (name) {
      let handle;
      new MutationObserver(() => {clearTimeout(handle);handle=setTimeout(resultView,120);})
        .observe(name,{childList:true,characterData:true,subtree:true});
    }
    window.addEventListener('hashchange',resultView);
    if (routeInfo().scope !== 'inicio') resultView();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',bind,{once:true});
  else bind();
})();
