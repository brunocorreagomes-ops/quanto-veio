# Quanto Veio? V5.4 — Rastro documental nacional

## O que foi incorporado

- `dados/convenios/UF.json`: 27 arquivos com convênios publicados de janeiro de 2019 a setembro de 2026, provenientes de `EmendasParlamentares_Convenios.csv` (CGU, arquivo de outubro/2026).
- Associação territorial **exclusivamente** quando `Localidade do gasto` informa explicitamente `MUNICÍPIO - UF`, com nome e UF coincidentes com a base municipal do site. Registros classificados apenas como `UF` ou `Nacional` são excluídos desta visualização municipal.
- Duplicatas por número do convênio e município, no mesmo intervalo de publicação, são consolidadas; o número de emendas associadas é preservado no detalhe.
- Data de publicação define a aba temporal, **não** o ano de pagamento nem o ano da emenda.
- Listas apresentam até 12 instrumentos por município/período, classificados pelo valor do convênio; o total de instrumentos localizados por período é exibido.
- O valor do convênio **não** é somado aos pagamentos municipais e **não** representa necessariamente o valor da emenda, da despesa executada ou do benefício entregue.
- Não há dados de situação de execução física nem atesto de entrega nesta planilha. Todos os municípios recebem uma resposta, inclusive quando não há instrumento correspondente.

## Auditoria da extração

- cities_with_docs: 5167
- duplicate_convenio_rows: 200
- input_rows: 85343
- invalid_convenio_number: 70
- matched_unique: 24853
- nonmunicipal_locality: 30656
- outside_period: 29564
- published_records: 24853
- Municípios na base principal: 5571
- Municípios sem convênio identificado neste recorte: 404

## Fontes e atualização

CGU, Portal da Transparência, arquivos `EmendasParlamentares.csv`, `EmendasParlamentares_PorFavorecido.csv` e `EmendasParlamentares_Convenios.csv`, outubro de 2026. O Portal da Transparência permite consultar convênios por número e aprofundar situação, execução e documentos: https://portaldatransparencia.gov.br/convenios/consulta . O Transferegov oferece dados abertos adicionais, mas **não foram ingeridos nesta versão**.

## Publicação

Descompactar na raiz do repositório GitHub Pages, preservando `dados/ufs`, `dados/destinacoes`, `dados/convenios` e os scripts.
