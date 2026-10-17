# Quanto Veio? V4.4.1 — Correção do ranking por habitante

## Instalação
Envie **todo o conteúdo descompactado** à raiz da branch `main` (ou preferencialmente teste antes numa branch de preview), **preservando `dados/` e `dados/ufs/`**. Não envie apenas o `index.html`.

## O que mudou
- Ranking R$/habitante não chama mais a API SIDRA no clique. Carrega `dados/populacao-ibge-2025.json` do próprio GitHub Pages, uma única vez por visita.
- Arquivo gerado a partir de `POP2025_20260828.ods`, estimativas municipais IBGE para 1º de julho de 2025, fornecido pelo responsável do site.
- 5.570 chaves municipais CGU conciliadas com municípios IBGE, incluindo 22 aliases históricos ou variantes ortográficas documentados abaixo.
- `RO|BOA VISTA` consta na base financeira, mas não corresponde a um município oficial de Rondônia no IBGE 2025; foi **excluído somente do ranking por habitante**, sem alterar os valores financeiros ou remover a linha dos rankings absolutos.
- O cálculo usa `l / pop`, isto é, valores municipais pagos de 2023 a setembro de 2026 divididos pela população estimada em 2025. Não é valor anual nem gasto da prefeitura.
- Preservados dados financeiros CGU, Canvas, mapas, domínio e scripts Umami.

## Validação recomendada
1. Abrir a página no domínio real e selecionar `Todos os municípios` → `R$ por habitante`.
2. Conferir se aparece `5.570 municípios vinculados` e valores em R$/hab. na listagem.
3. Alternar entre rankings absolutos e per capita, capitais e RMC, pesquisar Indaiatuba.
4. Conferir a aba Estados: o ranking per capita municipal permanece desabilitado nesse modo.
5. Verificar no painel de rede que `dados/populacao-ibge-2025.json` responde 200, sem chamadas a `api/v3/agregados/6579`.
6. Testar mapas, gerador PNG e Umami.

## Correspondências especiais CGU → IBGE 2025
- `RS|SANTANA DO LIVRAMENTO` → `Sant'Ana do Livramento` (código 4317103)
- `BA|MUQUEM DE SAO FRANCISCO` → `Muquém do São Francisco` (código 2922250)
- `PA|ELDORADO DOS CARAJAS` → `Eldorado do Carajás` (código 1502954)
- `MG|BARAO DE MONTE ALTO` → `Barão do Monte Alto` (código 3105509)
- `SP|EMBU` → `Embu das Artes` (código 3515004)
- `RN|AUGUSTO SEVERO` → `Campo Grande` (código 2401305)
- `MG|SAO THOME DAS LETRAS` → `São Tomé das Letras` (código 3165206)
- `PE|IGUARACI` → `Iguaracy` (código 2606903)
- `SP|SAO LUIS DO PARAITINGA` → `São Luiz do Paraitinga` (código 3550001)
- `RN|PRESIDENTE JUSCELINO` → `Serra Caiada` (código 2410306)
- `MG|BRASOPOLIS` → `Brazópolis` (código 3108909)
- `CE|ITAPAGE` → `Itapajé` (código 2306306)
- `SE|AMPARO DE SAO FRANCISCO` → `Amparo do São Francisco` (código 2800100)
- `MT|SANTO ANTONIO DO LEVERGER` → `Santo Antônio de Leverger` (código 5107800)
- `TO|FORTALEZA DO TABOCAO` → `Tabocão` (código 1708254)
- `PA|SANTA ISABEL DO PARA` → `Santa Izabel do Pará` (código 1506500)
- `BA|SANTA TERESINHA` → `Santa Terezinha` (código 2928505)
- `RJ|TRAJANO DE MORAIS` → `Trajano de Moraes` (código 3305901)
- `MG|DONA EUSEBIA` → `Dona Euzébia` (código 3122900)
- `MT|POXOREO` → `Poxoréu` (código 5107008)
- `PB|SERIDO` → `São Vicente do Seridó` (código 2515401)
- `SP|FLORINIA` → `Florínea` (código 3516101)

## Exceção de integridade
- `RO|BOA VISTA` — não há município oficial `Boa Vista` em RO; não foi associado arbitrariamente a outro município.

## Próxima fase V4.5 (não incluída nesta versão)
Exploração cartográfica progressiva Brasil → região → UF → município, integrada à busca e com opção de expansão quase em tela cheia. Usar contornos reais IBGE, código municipal oficial quando disponível, busca textual como alternativa para polígonos pequenos, suporte a toque/teclado, carregamento por UF e fallback sem apresentar formas esquemáticas como limites reais.
