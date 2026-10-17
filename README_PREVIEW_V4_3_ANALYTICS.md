# Quanto Veio? | Preview V4.3 + Analytics

Esta branch é um ambiente de trabalho isolado. **Não alterar a branch main nem o domínio quantoveio.com.br antes dos testes.**

A versão V4.3.1 foi preparada em um pacote ZIP no ChatGPT. Para testá-la, envie para esta branch os arquivos `index.html`, `qv-analytics.js`, `qv-analytics-config.js`, `404.html` e `.nojekyll` do pacote.

O identificador do Umami (`websiteId`) permanece vazio por padrão, portanto **nenhuma medição é enviada até a configuração**. Configure o site em https://cloud.umami.is e copie o Website ID para `qv-analytics-config.js` apenas após revisar o aviso de privacidade.

**Atenção:** o GitHub Pages tradicional não publica automaticamente uma URL de prévia para cada branch. É necessário um deploy independente para visualizar a branch online, ou testes locais. Preserve o `CNAME` e a versão atual em `main`.

## Verificações
- Desktop e mobile, sem scroll horizontal.
- Busca e rotas municipais.
- Canvas Feed (1080x1620) e Stories (1080x1920).
- Mapa do IBGE e QR real, em ambiente com acesso à rede.
- Eventos: resultado_visualizado, busca_confirmada, gerador_aberto, card_png_baixado, whatsapp_aberto, link_copiado.
- Nenhum envio de termos de busca ou dados pessoais nos eventos.
