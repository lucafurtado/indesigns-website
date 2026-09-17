---
name: adicionar-depoimento
description: >
  Adiciona um depoimento novo de cliente ao site da Indesigns. Escreve a
  entrada no JSON central (06_website/build/assets/data/depoimentos.json) e o
  depoimento passa a aparecer automaticamente em três lugares: home (se
  featured), aba /feedbacks/ e dentro da página do projeto vinculado — sem
  precisar tocar em HTML.
  Use quando o usuário disser "adicionar depoimento", "novo feedback do
  cliente", "chegou um depoimento", "coloca esse depoimento no site",
  "publica esse feedback", ou colar/ditar o texto de um depoimento de
  cliente pra publicar no site.
---

# /adicionar-depoimento — Publicar depoimento de cliente no site

## Onde isso vive

- Fonte de dados: `06_website/build/assets/data/depoimentos.json`
- Renderização: `06_website/build/depoimentos.js` (fetch + render, sem precisar editar HTML)
- Aparece em: seção `#depoimentos` da home (só os `featured`), página `/feedbacks/` (todos) e dentro da página do projeto vinculado (`.project-testimonial[data-project-slug]`)

## Schema de cada entrada

```json
{
  "id": "slug-do-projeto-NN",
  "projectSlug": "slug-da-pasta-do-projeto",
  "projectName": "Nome de exibição do projeto",
  "clientName": "Nome do cliente (ou \"Cliente\" se anônimo)",
  "clientRole": "",
  "highlight": "frase curta de destaque, curada à mão",
  "text": "depoimento completo, sem aspas (o CSS/JS adiciona)",
  "featured": true
}
```

- `projectSlug` precisa bater exatamente com o nome da pasta em `06_website/build/<slug>/`. Pastas atuais: `apto-ci`, `brinquedoteca`, `chacara-recanto-do-jaburu`, `clinica-orbis`, `cobertura-porto-seguro`, `consultorio-ml`, `escritorio-ip`, `escritorio-mr`, `mj-vx-maju-vitor`, `penteadeira`, `quartinho-mc`, `residencia-noroeste`.
- `highlight` **nunca é gerado automaticamente por corte de texto** — é curadoria manual (decisão do projeto). Ver Passo 2.
- `featured` controla os até 3 cards que aparecem na home. A página `/feedbacks/` sempre mostra todos, independente de `featured`.

## Workflow

### Passo 1 — Receber o depoimento

Pedir (se o usuário não tiver mandado junto):
- Texto completo do depoimento
- De qual projeto (mapear pro slug certo da lista acima — se o projeto for novo e a pasta ainda não existir, avisar que primeiro precisa existir a página do projeto)
- Nome do cliente (ou confirmar "Cliente" genérico, que é o padrão hoje)
- Cargo/papel do cliente, se fizer sentido citar (ex: "Síndica") — geralmente fica vazio

### Passo 2 — Curar a frase de destaque (highlight)

Propor 1 frase curta e de impacto extraída do espírito do depoimento (não é substring literal, é a essência reescrita se precisar). Mostrar a proposta e confirmar com o usuário antes de gravar — é o único passo que precisa aprovação humana, o resto é mecânico.

### Passo 3 — Decidir featured

Perguntar (ou sugerir) se esse depoimento deve aparecer entre os destaques da home. A home mostra só os 3 primeiros `featured:true` do array — se já houver 3, perguntar se substitui algum ou fica só na aba /feedbacks/ e na página do projeto.

### Passo 4 — Escrever no JSON

Ler `06_website/build/assets/data/depoimentos.json`, adicionar o objeto novo ao array `depoimentos` (id novo = `slug-0N`, incrementando a partir do que já existe pra aquele slug), validar que o JSON continua válido.

Se a página do projeto ainda não tiver o contêiner `<div class="project-testimonial" data-project-slug="...">` (só acontece se for um projeto novo criado depois deste sistema existir), adicionar esse `<div>` vazio imediatamente antes de `<section class="projeto-cta">` na página do projeto — uma vez feito isso, todo depoimento futuro daquele projeto já aparece sem editar HTML de novo.

### Passo 5 — Commit e push

Seguindo o padrão já estabelecido pro site da Indesigns: commitar e dar push (Vercel faz deploy automático). Mensagem de commit no padrão `feat(depoimentos): adiciona depoimento de <cliente/projeto>`.

### Passo 6 — Confirmar

Avisar em que 2–3 lugares o depoimento vai aparecer (home se featured, `/feedbacks/`, página do projeto) depois do deploy.

## Regras

- Nunca inventar texto de depoimento — só publicar o que o cliente/usuário realmente forneceu.
- Nunca gerar `highlight` por corte automático de string — sempre curadoria (Passo 2), mesmo que rápida.
- Não remover nem reescrever depoimentos existentes no JSON sem o usuário pedir explicitamente.
- Manter `clientName` como veio; se vier vazio/anônimo, usar "Cliente" (padrão já usado nos dois depoimentos existentes).
