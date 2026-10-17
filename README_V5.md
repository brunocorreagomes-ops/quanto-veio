# Quanto Veio? V5.0 — Atlas territorial interativo

## Instalação
Envie **todos os arquivos e pastas descompactados** à raiz da branch `main` do GitHub Pages. Não substitua apenas `index.html`. Preserve `dados/ufs/`, `dados/populacao-ibge-2025.json`, `qv-data-core.js`, `qv-details.js`, scripts de analytics, `CNAME`, `404.html` e `.nojekyll`.

## Experiência
- Busca textual permanece no topo; mapa é segunda porta de entrada, logo abaixo.
- Brasil → região → estado → município; clicar município abre seus dados financeiros na mesma página.
- Mapa expansível, fechar com Esc, zoom +/−, restaurar e pan por arrasto.
- Hover e foco por teclado mostram nome; em telas de toque o primeiro toque mostra nome e um segundo toque abre, com botão explícito no balão.
- Lista integral de municípios por UF, com filtro local; sem corte arbitrário de 180 cidades.
- Contornos oficiais IBGE carregados sob demanda. Quando a API IBGE falha ou não fornece polígonos identificáveis, navegação por regiões, estados e lista pesquisável continua funcional. Nenhuma forma esquemática é apresentada como contorno oficial.
- IBGE 2025 local para ranking por habitante e códigos municipais; CGU financeiro intacto; Umami preservado.

## Validação pós-publicação
1. Verificar Brasil → Sudeste → SP → Indaiatuba via lista e, quando disponível, via contorno IBGE.
2. Testar mapa expandido, zoom, toque duplo e Esc.
3. Verificar SP e municípios pequenos; busca deve localizar todos os registros da UF.
4. Testar ranking por habitante e histórico municipal, PNG Story/Feed e links compartilháveis.
5. Com API IBGE indisponível, a lista deve funcionar sem contornos fictícios.
6. Validar contornos reais e nomes em rede no domínio final: a disponibilidade do serviço externo não é garantida.

## Limites e transparência
O atlas depende do serviço de malhas IBGE para contornos reais. Em caso de indisponibilidade, mantém a navegação por lista. Os pagamentos da CGU são classificados pelo município cadastrado do favorecido; isso não comprova execução local. 2026 é parcial.
