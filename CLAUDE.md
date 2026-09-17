# CLAUDE.md — Indesigns

> Instruções de navegação e comportamento para o sistema de IA nesta pasta.
> Leitura obrigatória antes de qualquer tarefa relacionada à Indesigns.

---

## Início de Sessão — Ordem de Leitura

Antes de executar qualquer tarefa, ler nesta ordem:

1. `00_context/briefing.md` — quem é a cliente, situação atual, fase da operação
2. `00_context/decisions.md` — decisões estratégicas já tomadas (não reabrir sem razão)
3. `00_context/status.md` — o que está pendente, o que foi concluído

Somente após essa leitura, ler os documentos específicos para a tarefa.

---

## Estrutura do Repositório

```
00_context/        ← Contexto operacional (ler primeiro)
01_brand/          ← Sistema de marca (identidade, posicionamento, comunicação)
02_offer/          ← Serviços, precificação, proposta de valor
03_acquisition/    ← Estratégia, canais, vendas, conteúdo
04_operations/     ← Processos, ferramentas, templates
05_client_experience/ ← Jornada, onboarding, retenção
06_website/        ← Site (strategy/, copy/, build/)
07_intelligence/   ← KPIs, mercado, revisões
_deliveries/       ← Artefatos entregues à cliente (histórico)
```

---

## Guia de Navegação por Tarefa

### Criar conteúdo para Instagram
1. `01_brand/communication.md` — pilares editoriais, tom de voz
2. `01_brand/positioning.md` — posicionamento e tagline
3. `03_acquisition/instagram_strategy.md` — estratégia e frequência
4. `03_acquisition/content_15_posts.md` + `posts_prontos.md` — roteiro e copy dos 15 posts
5. `03_acquisition/design_posts.md` — direção visual

### Criar direção visual / arte
1. `01_brand/brand_identity.md` — paleta, tipografia, padrões gráficos
2. `01_brand/communication.md` — prompts de IA para geração visual
3. `03_acquisition/design_posts.md` — sistema de design Instagram (1080×1080)
4. `03_acquisition/design_feed.md` — grid do perfil
5. `01_brand/assets/` — manual PDF e screenshots para referência

### Escrever copy (proposta, e-mail, texto do site)
1. `01_brand/positioning.md` — posicionamento central
2. `01_brand/communication.md` — tom de voz, palavras da marca
3. `01_brand/ideal_client.md` — para quem está sendo escrito
4. `06_website/copy/` — para textos do site

### Estruturar ou revisar processos operacionais
1. `04_operations/processes.md` — processos críticos
2. `04_operations/tools.md` — stack de ferramentas
3. `04_operations/templates/` — mensagens e templates

### Responder perguntas estratégicas
1. `00_context/decisions.md` — verificar se a decisão já foi tomada
2. `01_brand/positioning.md` — para questões de posicionamento
3. `07_intelligence/` — para questões de mercado e métricas

### Atualizar status ou registrar progresso
1. Atualizar `00_context/status.md` (marcar [x] nas tarefas concluídas)
2. Se for uma decisão nova: adicionar em `00_context/decisions.md`

---

## Regras de Comportamento

### Paleta de cores — sem exceções
Apenas as 5 cores oficiais: `#173a4a`, `#3c6e71`, `#8ab0ab`, `#d1d3c4`, `#ececea`.
Nunca sugerir: areia, cobre, madeira quente, dourado, laranja, branco puro.

### Tom de voz
Preciso, contemporâneo, brasiliense, contido. Não empolgado, não vendedor, não genérico.
Ver lista completa de palavras da marca em `01_brand/communication.md`.

### Preços — usar os degraus definidos
Degrau atual (Fase 1): R$5.500–6.500 para novos projetos residenciais.
Não sugerir descontos sem redução de escopo — isso está definido como regra inegociável.

### Capacidade
Indira trabalha solo. Máximo de 2–3 projetos simultâneos.
Escassez é argumento de valor — comunicar com naturalidade.

### Canais Fase 1
Apenas Indicações + Instagram. Não sugerir anúncios pagos neste momento.

---

## O Que Não Fazer

- Não sugerir paleta quente (areia, cobre, madeira) — decisão já tomada e documentada
- Não reabrir questões de posicionamento já definidas sem razão explícita
- Não sugerir gerenciamento de obra ou ART de execução — fora do escopo da Indesigns
- Não criar conteúdo genérico de arquitetura — a Indesigns tem perspectiva autoral
- Não adicionar anúncios pagos ao plano antes da Fase 2

---

## Skills Locais

- `.claude/skills/adicionar-depoimento/` — adiciona depoimento de cliente no site (JSON central em `06_website/build/assets/data/depoimentos.json`, aparece automaticamente na home, em `/feedbacks/` e na página do projeto vinculado).

## Convenções do Repositório

- `_deliveries/` — pasta com underscore = histórico de artefatos entregues, não operacional ativa
- `build/` dentro de `06_website/` — arquivos de código do site, não documentos de estratégia
- `assets/` dentro de `01_brand/` — arquivos binários (PDF, imagens), não documentos de estratégia
- Arquivos com prefixo numérico (`01_`, `02_`...) = camadas operacionais em sequência lógica
- `00_context/` = leitura prioritária, sempre antes das camadas numeradas
