# Quanto Veio? V4.4 — pacote de testes (não publicado)

## O que mudou
- Ranking por habitante (2023–setembro/2026 ÷ população estimada IBGE em 1º de julho de 2025), carregado sob demanda pela API SIDRA 6579/9324.
- Valores nominais absolutos e classificação por variação preservados.
- Sem dados populacionais validados, o ranking per capita não é exibido; os demais rankings continuam.
- O mapa do atlas usa um **esquema de 27 UFs, sem escala**, enquanto carrega o IBGE ou se houver erro. Não é apresentado como contorno geográfico oficial.
- O minimapa municipal exibe a sigla da UF, sem alegar um contorno, quando o IBGE falha.
- Histórico anual e autores divididos em `dados/ufs/XX.json`; carregados quando uma UF é consultada. O `qv-data-core.js` mantém os resumos nacionais para busca e rankings.
- Integração Umami preservada. O site público em main não foi alterado por este pacote.

## Implantação
Envie **a estrutura completa** do ZIP para a raiz da branch de prévia: index.html, qv-data-core.js, qv-details.js, qv-analytics.js, qv-analytics-config.js, dados/ufs/*.json, 404.html, .nojekyll. Não envie apenas o index.html. Preserve CNAME em main.

## Dependências de rede
- IBGE população: https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/2025/variaveis/9324?localidades=N6[all]&view=flat
- IBGE malhas e localidades para mapas.
- Umami carregado somente no domínio de produção, como já configurado.

## Metodologia
O ranking divide valores nominais **acumulados** de 2023 a setembro de 2026 pela população estimada de 2025. Não representa investimento por habitante realizado dentro da cidade; a classificação da CGU considera a sede do favorecido. O período 2026 é parcial. Comparação de governos não implica autoria individual.

## Checklist de homologação
1. Abrir localhost com servidor HTTP ou deploy isolado (não `file://`).
2. Confirmar 5.571 registros na busca e valores de Indaiatuba (R$ 2,35 mi e R$ 16,82 mi).
3. Buscar Campinas, navegar por rota, verificar detalhamento anual e autores após fetch da UF.
4. Ativar ranking R$/habitante; conferir correspondência IBGE (2025), número de cidades e ordenação. Simular falha IBGE e verificar mensagem honesta.
5. Bloquear endpoints de malhas e confirmar esquema UF navegável, não mapa vazio.
6. Gerar Feed 1080x1620 e Stories 1080x1920; validar QR, geometrias e valores em produção de teste.
7. Confirmar eventos Umami apenas em domínio autorizado, sem duplicação.
8. Conferir 320, 390, 768, 1440 px, rolagem horizontal e tempo de carregamento.
