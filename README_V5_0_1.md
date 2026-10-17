# Quanto Veio? V5.0.1 — Mapas resilientes

Correção para a V5.0: o Atlas não depende da disponibilidade imediata da API de malhas do IBGE para mostrar uma navegação interativa.

- Brasil/regiões: esquema clicável com UFs, enquanto os contornos oficiais carregam.
- Estados: esquema com até 36 municípios por volume recente, além da lista pesquisável com todos os municípios da base.
- Ao carregar contornos oficiais, o esquema é substituído automaticamente pelo mapa cartográfico.
- Cache persistente no navegador para respostas menores que 1,8 MB; evita repetir downloads entre visitas.
- Botão ⟳ para nova tentativa dos contornos; não remove a navegação alternativa.
- Removida a chamada inicial duplicada ao Atlas.
- Sem alterações nos valores financeiros, ranking R$/hab., gerador de cards ou Umami.

**Importante:** o fallback é um **esquema de navegação**, não uma representação cartográfica. Não representa fronteiras reais ou coordenadas precisas. O mapa geográfico continua dependente do serviço de malhas do IBGE quando não está no cache.

Publicação: descompacte o ZIP na raiz do repositório GitHub Pages, mantendo as pastas `dados`.
