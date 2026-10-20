# Quanto Veio? V5.4 — Rastro documental nacional

## O que muda

A seção **“O que estava previsto fazer?”** aparece em cada município, após o comparativo de destinações V5.3. A consulta usa 27 arquivos JSON leves por UF e apresenta os objetos declarados dos convênios associados a emendas parlamentares, com número, data de publicação, convenente, valor informado do instrumento e códigos das emendas.

**Cobertura:** todos os 5.571 municípios têm uma resposta; em 5.167 deles foram localizados convênios municipais publicados de 2019 a setembro de 2026, totalizando 24.853 números de convênio/município deduplicados. Em 404 não foi localizado convênio nesse recorte e na planilha consultada; isso não indica ausência de emendas, obras ou benefícios.

### Modelo de evidência

1. **Pagamento registrado**: continua no painel CGU V5.3; o valor refere-se ao favorecido municipal cadastrado.
2. **Objeto documental localizado**: convênio associado à emenda e a município/UF explícitos na localidade do gasto, com texto original do objeto. O valor é do instrumento, não da emenda e não do pagamento municipal.
3. **Entrega física**: **não verificada nesta versão**. O CSV de convênios não contém comprovação de conclusão ou entrega. Não atribuímos status de obra concluída sem evidência.

As abas 2019–2022 e 2023–setembro de 2026 são definidas pela **data de publicação do convênio**, não pelo ano da emenda ou pagamento. Convênios nacionais ou estaduais não são atribuídos artificialmente a municípios. O ranking lista até 12 convênios por período/município, ordenados pelo valor do instrumento; não soma valores de convênios.

### Fonte e atualização

- CGU, arquivo de outubro de 2026, `EmendasParlamentares_Convenios.csv` do pacote `EmendasParlamentares.zip`.
- Consultas oficiais: https://portaldatransparencia.gov.br/convenios/consulta e https://portaldatransparencia.gov.br/download-de-dados/emendas-parlamentares.
- O portal de APIs do Transferegov.br tem dados adicionais sobre execução, mas **esses dados não foram cruzados neste pacote**: https://api-publica.transferegov.gestao.gov.br/.

Para atualizar a base a partir de um novo ZIP da CGU, na raiz do projeto execute:

```bash
python tools/atualizar_convenios.py /caminho/EmendasParlamentares.zip
```

O script usa apenas a biblioteca padrão do Python, e atualiza somente `dados/convenios`.

## Instalação

Descompactar todo o pacote na raiz do GitHub Pages, preservando as pastas `dados/ufs`, `dados/destinacoes` e `dados/convenios`. Arquivos novos: `qv54-evidencias.js`, `dados/convenios/*.json`, `tools/atualizar_convenios.py`, documentação. Alterado: `index.html`. Os dados financeiros, o ranking por habitante, o Atlas e o Umami não foram alterados.

## Verificações realizadas

- 27 arquivos JSON válidos, cada um com a UF correta e municípios com chaves da base original.
- Associação estrita de município + UF, exclusão de localidades apenas estaduais/nacionais.
- 24.853 registros deduplicados por número de convênio e município, de 2019 a setembro de 2026.
- Interface testada isoladamente em Chromium com viewport desktop e mobile: alternância entre períodos, ausência de documentos e ficha de convênio.
- O teste de navegação integral do site em servidor local não pôde ser concluído devido ao bloqueio de navegação do ambiente de execução; confirmar após publicar.

## Próximo ciclo: experiência autoral

Redesenhar a jornada em três verbos: **Explorar → Entender → Verificar**. Tratar a documentação como uma trilha de evidências visual, com hierarquia clara entre pagamento, objeto e entrega. Não confundir documentação de convênio com comprovação de execução.
