# Quanto Veio? V5.3 — Emendas explicadas

## O que mudou
- Títulos descritivos e conservadores para as maiores emendas, derivados da descrição da ação orçamentária publicada na CGU. A descrição original continua visível. Títulos genéricos são identificados como tal, sem atribuir entregas não comprovadas.
- Botão **Entenda esta emenda** abre uma ficha acessível com código, autor, favorecido, função, descrição original, período e valor pago ao favorecido municipal no recorte.
- Links para a **consulta geral de emendas** e para a **base de dados da CGU**. Não são links diretos verificados para cada emenda. O código pode ser copiado para pesquisa no portal oficial.
- Resumo automático com linguagem mais simples e contexto municipal.
- Média anual equivalente para ambos os períodos: 2019–2022 = 48 meses (4 anos); 2023–setembro/2026 = 45 meses (3,75 anos). A comparação é nominal e 2026 está incompleto.
- Layout responsivo e fechamento da ficha via botão, clique fora ou Escape.

## Integridade e limites
- **Nenhuma alteração** aos valores financeiros, aos arquivos `dados/destinacoes/*.json`, ao ranking R$/habitante, ao Atlas ou ao Umami.
- A média anual equivalente é o total de cada intervalo dividido pela sua duração em anos. Não é a média de anos completos observados, nem taxa corrigida pela inflação.
- A base V5.2 contém agrupamentos por **código de emenda e período**; os valores mostrados não representam a autorização total da emenda nem comprovam serviços, obras, aquisição ou execução física.
- O campo `d` da base é a descrição da **ação orçamentária**. O título simplificado não é objeto contratual nem descrição de uma entrega.
- O ano contido no código de emenda não deve ser confundido com o ano do pagamento.
- Em municípios sem conciliação financeira, a V5.3 mantém a indisponibilidade do comparativo da V5.2.

## Publicação
Descompactar todo o conteúdo na raiz da branch `main` do GitHub Pages. Preservar as pastas `dados/ufs` e `dados/destinacoes`. Atualizar a página com Ctrl+F5 após a publicação. Validar Indaiatuba, alternar os períodos e abrir uma ficha em cada período.
