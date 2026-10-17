# Quanto Veio? — V2 geográfica

Site estático para GitHub Pages. `index.html` inclui a base financeira histórica e a navegação Brasil → Região → Estado → Município.

## Implantação
Envie os arquivos para a raiz do repositório `quanto-veio` na branch `main`. Em Settings → Pages, configure Deploy from branch / main / root (ou mantenha seu workflow atual).

## Testes e limitações
- Navegação geográfica e indicadores agregados funcionam com a base incorporada.
- Mapas vetoriais consultam a API de Malhas do IBGE no navegador; exigem rede, disponibilidade do endpoint e CORS. Há fallback para navegação textual.
- A associação de geometrias municipais por nome/código precisa de validação em produção; não representa recursos distribuídos espacialmente dentro da cidade.
- Dados financeiros históricos e parciais, não atualização em tempo real.
- Valide compartilhamento, filtros, rotas e mapas em navegadores desktop e mobile.
