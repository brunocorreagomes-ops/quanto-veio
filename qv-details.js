/* V4.4: detalhamento financeiro por UF, preservando os valores CGU originais. */
window.QV_DETAILS=(()=>{
  const loaded=new Set(), pending=new Map();
  async function ensure(uf){
    if(!/^[A-Z]{2}$/.test(uf))throw new Error('UF inválida');
    if(loaded.has(uf))return;
    if(pending.has(uf))return pending.get(uf);
    const promise=(async()=>{
      const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
      try{
        const res=await fetch('./dados/ufs/'+uf+'.json',{signal:controller.signal});
        if(!res.ok)throw new Error('Detalhamento '+uf+': HTTP '+res.status);
        const data=await res.json();
        if(data.uf!==uf||!data.history||!data.authors)throw new Error('Detalhamento incompatível');
        Object.assign(window.QV_DATA.history,data.history);
        Object.assign(window.QV_DATA.authors,data.authors);
        loaded.add(uf);
      }finally{clearTimeout(timer);}
    })();
    pending.set(uf,promise);
    try{await promise;}finally{pending.delete(uf);}
  }
  return Object.freeze({ensure,loaded:uf=>loaded.has(uf)});
})();
