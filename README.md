# Quanto Veio?

Site estático de consulta histórica de pagamentos de emendas federais por município, baseado na versão Atlas V3.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `quanto-veio`).
2. Envie **todos os arquivos desta pasta para a raiz** da branch `main`.
3. Acesse **Settings → Pages → Build and deployment → GitHub Actions**.
4. O workflow `.github/workflows/deploy.yml` fará o deploy após o primeiro push.
5. Acesse a URL fornecida pelo GitHub Pages.
6. Para domínio próprio, configure o domínio em **Settings → Pages → Custom domain** e os registros DNS indicados pelo GitHub. Só adicione `CNAME` após decidir o host exato (www ou raiz).

## Executar localmente

```bash
python -m http.server 8000
```

Abra http://localhost:8000/.

## Notas de transparência

- Base histórica incorporada ao HTML, não atualizada em tempo real.
- Comparações são nominais, sem correção inflacionária; 2026 é parcial.
- Classificação territorial usa município do favorecido, não prova de aplicação do recurso naquele território.
- Antes da publicação pública, confirme integridade, cobertura e data da base CGU, bem como metodologia e links das fontes.
- A funcionalidade de alertas por município ainda não foi implementada.

## Arquivos

- `index.html`: aplicação e base incorporada, sem instalação de dependências.
- `.nojekyll`: desativa processamento Jekyll no GitHub Pages.
- `404.html`: encaminha URLs inexistentes para a página principal; resultados usam fragmentos `#`.
