# Quanto Veio? V5.2 — Destinações comparadas

## Novidade
No painel do município, a seção “O que esse dinheiro financiou?” apresenta duas colunas por período (2019–2022 e 2023–setembro/2026), áreas orçamentárias, resumo automático e os dez maiores agrupamentos de pagamentos por código de emenda. No celular, as colunas são empilhadas.

## Fontes e recorte
- CGU, `EmendasParlamentares.csv` e `EmendasParlamentares_PorFavorecido.csv` do pacote `EmendasParlamentares.zip` fornecido anteriormente, extraído em outubro/2026.
- Pagamentos entre janeiro/2019 e setembro/2026, agrupados por município **de cadastro do favorecido** e natureza jurídica de entidade pública municipal. Os valores de referência são os indicadores `b` e `l` da V5.0.1.
- A área e a ação orçamentárias são identificadas pelo código da emenda no arquivo da CGU. Emendas com classificação múltipla de função ficam como “Não classificada na fonte” para evitar inferência arbitrária.
- **Não são benefícios comprovados**: objeto orçamentário não demonstra compra, obra, entrega ou serviço concluído. O valor agrupado por código de emenda é a soma dos pagamentos aos favorecidos municipais naquele período, não o valor total da emenda.
- Comparação nominal, sem correção monetária; 2026 parcial. Atribuição de pagamentos por período não equivale à autoria do governo do período.

## Integridade
- 5.443 dos 5.571 municípios da base principal tiveram valores conciliados com tolerância de cinco centavos por período.
- Para 128 municípios, incluindo São Paulo, houve divergência entre a extração detalhada e o resumo financeiro publicado. A V5.2 **não mostra** comparativos individuais para esses casos, em vez de produzir números inconsistentes. O painel financeiro V5.0.1 permanece intacto.
- Os 27 arquivos `dados/destinacoes/UF.json` são carregados apenas ao selecionar um município da UF.
- Testes locais de interface desktop e celular, incluindo Indaiatuba, alternância de períodos, botão de 10 maiores e ausência de exceções JavaScript. Testes em navegador foram feitos com respostas locais simuladas para os arquivos, sem acesso ao domínio de produção.

## Publicação
Descompacte na raiz do GitHub Pages (branch `main`), preservando todos os arquivos e pastas, inclusive `dados/destinacoes/`. Substitua o `index.html` e inclua `qv-destinacoes.js`. Não altere o `qv-data-core.js`, os dados financeiros nem os scripts Umami.

## Próxima etapa — benefícios comprovados
Cruzar emendas com objetos, instrumentos e execução no Transferegov/Obrasgov. Exibir separadamente “destinação declarada”, “execução verificada” e “entrega comprovada”, com link oficial, data e nível de evidência. Não gerar afirmações de entrega a partir da função orçamentária.
