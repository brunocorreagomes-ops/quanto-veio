# Quanto Veio? V4.3.1 | Prévia + métricas

## Ativação
1. Crie uma conta/site em https://cloud.umami.is (domínio quantoveio.com.br).
2. O Website ID `cb403525-59fe-416d-aa45-fbd246dda67a` já está configurado em `qv-analytics-config.js`.
3. Não adicione o snippet do Umami novamente no HTML; o arquivo `qv-analytics.js` injeta o script uma única vez no domínio permitido.
4. Faça commit dos quatro arquivos do site (index.html, qv-analytics-config.js, qv-analytics.js, 404.html) na branch de prévia e teste.
5. Somente após aprovação, faça merge na `main`. O `CNAME` existente deve ser mantido.

**Importante:** a branch de prévia isolada não recebe URL pública automaticamente no GitHub Pages tradicional. Para testar online sem afetar o domínio principal, é necessário um deploy de preview independente (outro site/host) ou um fluxo de GitHub Actions dedicado.

## Eventos configurados
- `resultado_visualizado`: cidade (slug público) e UF, ou estado.
- `busca_confirmada`: botão ou sugestão, sem texto digitado.
- `ranking_aba`, `ranking_selecao`, `atlas_aberto`.
- `gerador_aberto`, `previa_atualizada`, `formato_selecionado`, `card_png_baixado`.
- `story_download_solicitado`, `compartilhamento_iniciado`, `whatsapp_aberto`, `link_copiado`.

O Umami registra pageviews e fontes de tráfego automaticamente quando ativado. O evento `resultado_visualizado` captura trocas de rota feitas via `history.replaceState`.

## Privacidade
- Nenhum script de analytics é carregado enquanto `websiteId` estiver vazio.
- Não são coletados textos de busca, nome de visitante, e-mail, valores financeiros ou identificadores pessoais pelo código de eventos.
- A plataforma de analytics pode processar informações técnicas para métricas agregadas; publicar aviso de privacidade completo antes da ativação.
- Eventos de clique não são garantia de que um compartilhamento externo foi concluído.

## Teste
Adicione `?qv_analytics_debug=1` à URL de teste e abra o console do navegador. Eventos aparecem como `disabled` enquanto não houver Website ID válido.

## Atenção à prévia
A coleta está restrita a `quantoveio.com.br` e `www.quantoveio.com.br`. No localhost e em domínios de prévia, a instrumentação fica desativada por padrão para não contaminar os relatórios reais. Para testar a instrumentação localmente, use `?qv_analytics_debug=1` e o console; para testar o envio real sem contaminar produção, crie uma propriedade de teste separada no Umami.
