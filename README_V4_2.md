# Quanto Veio? — Gerador de compartilhamento V4.2

Esta atualização mantém a base histórica CGU incorporada e não implementa atualização automática.

## Novidades
- Períodos explicitamente identificados como Governo Bolsonaro (2019–2022) e Governo Lula (2023–setembro de 2026). O rótulo é temporal e **não atribui autoria ou execução das emendas**.
- Valores anuais sobre as barras em R$ milhões, com uma casa decimal (valores menores que R$ 0,05 mi exibidos como `<0,1 mi`).
- Eixo vertical em R$ milhões, rótulos de anos e nota clara sobre 2026 parcial.
- Contorno municipal e localizador do estado com geometrias consultadas ao IBGE; marcador indica o centro do envelope geográfico do município, apenas como referência visual.
- QR e link de compartilhamento com URL canônica https://quantoveio.com.br/.
- Canvas de prévia é o mesmo usado para exportação PNG.

## Implantação
Substitua apenas o `index.html` no repositório publicado; mantenha `404.html`, `CNAME` e `.nojekyll` existentes. Faça backup do `index.html` anterior.

## Limitações
Os mapas exigem acesso à API do IBGE. QR requer a biblioteca qrcodejs via CDN. Na indisponibilidade, há fallback textual. A V4.2 não foi publicada automaticamente.
