# Decisões Estratégicas — Indesigns

> Log de decisões já tomadas. Não reabrir sem razão explícita.
> Formato: [Data] | [Área] | [Decisão] | [Razão]

---

## Marca e Identidade

**Mai/2026 | Paleta de cores**
A paleta oficial é mineral: `#173a4a` (petróleo), `#3c6e71` (teal), `#8ab0ab` (sage), `#d1d3c4` (greige), `#ececea` (off-white).
Paleta quente (areia, cobre, madeira) foi descartada após análise do Manual de Identidade Visual 2024.
*Razão: a paleta real da marca é extraída de Brasília — lago, cerrado, concreto, céu. Não de estética mediterrânea ou escandinava.*

**Mai/2026 | Tom de voz**
Tom de voz: preciso, contemporâneo, brasiliense, contido. Não vendedor, não corporativo, não genérico.
Palavras da marca: concreto, geometria, luz, planalto, traço, precisão, raiz, intenção.
Palavras proibidas: incrível, exclusivo, sofisticado (autoaplicado), luxo, top, aconchegante.

**Mai/2026 | Referências estéticas**
Referências corretas: Niemeyer contemporâneo, Isay Weinfeld, editorial Domus/Casabella, Marcel Gautherot.
Referências descartadas: Norm Architects, Axel Vervoordt, Bottega Veneta, Julius Shulman.
*Razão: a marca é radicalmente brasileira e brasiliense — não importação escandinava ou europeia.*

---

## Posicionamento

**Mai/2026 | Posicionamento central**
> "A Indesigns é a arquitetura do modernismo brasiliense no presente — com a precisão de Niemeyer, a sensibilidade de quem entende a vida contemporânea e a autoria de quem nunca projeta o genérico."

**Mai/2026 | Tagline**
> "Cada espaço conta uma história. A sua."

**Mai/2026 | Território de atuação**
Primário: Residencial premium em Brasília (Asa Sul, Asa Norte, Lago Sul, Lago Norte, Sudoeste, Noroeste).
Secundário: Espaços coletivos e corporativos de alto padrão.

**Mai/2026 | ICP definido**
Avatar principal: Mariana, 42 anos, procuradora federal, Sudoeste. Classe A/B, agenda cheia, delega com confiança, valoriza detalhe, já foi frustrada antes.
*Razão: baseado em evidências reais dos projetos entregues (cobertura 116 Sul e outros).*

---

## Oferta

**Mai/2026 | Estrutura de serviços**
3 serviços: Projeto Residencial, Projeto Coletivo/Corporativo, Consultoria de Direcionamento (90min).
A consultoria funciona como porta de entrada — valor descontado se avançar para projeto completo.

**Mai/2026 | O que a Indesigns não faz**
Não emite ART de execução. Não gerencia canteiro. Não atende projetos sem espaço criativo.
*Razão: protege o posicionamento e a proposta de valor.*

**Mai/2026 | Transição de ticket em 3 degraus**
- Degrau 1 (agora): R$5.500–6.500 nos novos projetos
- Degrau 2 (com 3 depoimentos + fotos): R$8.000–10.000
- Degrau 3 (6–12 meses): R$12.000–18.000
*Razão: o ticket atual (R$4K médio) está abaixo do posicionamento. O aumento é gradual e acompanha a construção de evidências.*

**Mai/2026 | Regras inegociáveis**
Nenhum trabalho começa sem contrato assinado e entrada paga (40%).
Desconto nunca sem redução de escopo.

---

## Aquisição

**Mai/2026 | Canais Fase 1**
Apenas: Indicações + Instagram. Sem anúncios pagos até ter posicionamento, site e casos de transformação prontos.
*Razão: anúncios antes do posicionamento desperdiçam orçamento e atraem leads errados.*

**Mai/2026 | Frequência de conteúdo**
3–4 posts/semana (feed) + Stories diários quando houver + 1–2 Reels/semana.
Sistema de batching: 1 bloco de 2h/semana para produzir tudo.
*Razão: o perfeccionismo da Indira trava a consistência. Batching reduz o atrito.*

**Mai/2026 | Pilares editoriais**
I — Transformação Brasiliense (40%) | II — Processo com Rigor (25%) | III — Autoridade Modernista (15%) | IV — Desejo Mineral (10%) | V — Indira de Brasília (10%).

---

## Website

**Mai/2026 | Lógica da landing page**
Emoção → Reconhecimento → Evidência → Decisão.
O formulário fica no final — quem chega até lá já está comprometido.
*Razão: em LP premium, o visitante precisa desejar o nível do serviço antes de qualquer ação.*

**Mai/2026 | Duas versões do site documentadas**
- v1 (em `_deliveries/2026-05/site_v1/`): versão anterior com número placeholder e copy draft
- v2 (em `06_website/build/`): versão atual com dados reais (61 99858-6151, indesigns@gmail.com) e copy refinada
*A v2 é a versão a ser publicada.*

**Set/2026 | Sistema de depoimentos centralizado em JSON**
Depoimentos passaram a ser data-driven: uma entrada em `06_website/build/assets/data/depoimentos.json` aparece automaticamente na home (se `featured`), na aba `/feedbacks/` e na página do projeto vinculado (`projectSlug`) — sem editar HTML a cada depoimento novo. A frase-resumo (`highlight`) é sempre curadoria manual, nunca corte automático de texto.
*Razão: pedido da cliente pra publicar feedbacks sem retrabalho manual em cada projeto. Skill `.claude/skills/adicionar-depoimento/` cobre o fluxo.*

**Set/2026 | Categoria "Eventos" no grid de projetos (placeholder)**
5ª categoria adicionada ao bento da home, grid reorganizado em 3+2. Ainda não existe projeto real de eventos — usa a foto de Espaços Coletivos como placeholder até a cliente enviar projeto e foto próprios.

---

## Operação

**Mai/2026 | Capacidade atual**
2–3 projetos ativos simultâneos (Indira trabalha solo).
Escassez comunicada com naturalidade como argumento de valor.

**Mai/2026 | Ação mais estratégica do momento**
Obter depoimento da síndica da 116 Sul.
*Razão: desbloqueia site, primeiros posts, prova social e negociação de ticket.*

---

## Conteúdo — Estratégia de Junho

**Mai/2026 | Consultora de conteúdo parceira**
@SABRINAQRZ foi contratada para estruturar a comunicação do @indesigns. Ela entregou análise de marca e calendário de conteúdo para junho/2026. A Cria AI produz os assets (posts feed, roteiros stories/reels); a Indira executa o que precisar de ela em câmera.

**Mai/2026 | Pilares editoriais redefinidos — 3 pilares (@SABRINAQRZ)**
Os 5 pilares originais (análise Cria AI) foram substituídos pelos 3 da consultora como estrutura operacional de junho em diante:
1. **Storytelling de Projetos** — processo criativo, antes/depois, bastidores, expectativa vs. realidade
2. **Construção de Autoridade Pessoal / Lifestyle** — referências, rotina, POV de obra, opiniões — ponto focal: Stories
3. **Humanização da Arquitetura / Educativo Descomplicado** — arquitetura para a vida real, erros comuns, dicas práticas
*Razão: alinhamento com a consultora responsável pela implementação do conteúdo.*

**Mai/2026 | Calendário de junho 2026 definido**
9 posts de feed programados + mínimo 2 stories/dia:
- Seg 1/6: Storytelling (Estudo Preliminar/Anteprojeto)
- Qua 3/6: Humanização/Educativo
- Seg 9/6: Storytelling (Visitas ao Projeto)
- Qui 11/6: Autoridade/Lifestyle
- Seg 15/6: Storytelling (Resultado Final)
- Qui 18/6: Autoridade/Lifestyle
- Ter 23/6: Humanização/Educativo
- Sex 26/6: Autoridade/Lifestyle
- Seg 29/6: Storytelling (Estudo Preliminar/Anteprojeto)

**Mai/2026 | Abordagem de produção de conteúdo**
- Feed: posts prontos em HTML+PNG (carrosséis, posts texto, imagem IA)
- Stories: roteiros prontos para a Indira executar com celular
- Reels: roteiros prontos; Indira grava quando puder
- Entrega: PDF cronograma de junho com mockups, legendas e datas
