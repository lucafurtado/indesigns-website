/* ============================================================
   INDESIGNS — depoimentos.js
   Lê assets/data/depoimentos.json e renderiza:
   - #depoimentosGrid (home, só os featured)
   - #feedbacksGrid (página /feedbacks/, todos)
   - .project-testimonial[data-project-slug] (dentro de cada projeto)
   ============================================================ */

'use strict';

(function () {
  const DATA_URL = '/assets/data/depoimentos.json';

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  async function loadDepoimentos() {
    try {
      const res = await fetch(DATA_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const json = await res.json();
      return Array.isArray(json.depoimentos) ? json.depoimentos : [];
    } catch (e) {
      console.warn('[depoimentos] falha ao carregar JSON:', e);
      return [];
    }
  }

  const LABEL_OPEN = 'Clique para ver feedback completo';
  const LABEL_CLOSE = 'Ver resumo';

  function paragraphsHTML(text) {
    return String(text)
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => `<p>${escapeHTML(p)}</p>`)
      .join('');
  }

  function cardHTML(d) {
    const author = d.clientRole
      ? `${escapeHTML(d.clientName)}, ${escapeHTML(d.clientRole)}`
      : escapeHTML(d.clientName);
    return `
      <blockquote class="depoimento reveal" data-id="${escapeHTML(d.id)}">
        <p class="depoimento__text depoimento__text--highlight">"${escapeHTML(d.highlight)}"</p>
        <div class="depoimento__text depoimento__text--full" hidden>${paragraphsHTML(d.text)}</div>
        <button type="button" class="depoimento__toggle" aria-expanded="false">${LABEL_OPEN}</button>
        <footer class="depoimento__author">
          <cite class="depoimento__name">${author}</cite>
          <span class="depoimento__project">${escapeHTML(d.projectName)}</span>
        </footer>
      </blockquote>`;
  }

  function wireToggles(root) {
    root.querySelectorAll('.depoimento__toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.depoimento');
        const highlight = card.querySelector('.depoimento__text--highlight');
        const full = card.querySelector('.depoimento__text--full');
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        highlight.hidden = !expanded;
        full.hidden = expanded;
        card.classList.toggle('is-open', !expanded);
        btn.setAttribute('aria-expanded', String(!expanded));
        btn.textContent = expanded ? LABEL_OPEN : LABEL_CLOSE;
      });
    });
  }

  function renderHomeGrid(list) {
    const grid = document.getElementById('depoimentosGrid');
    if (!grid) return;
    const featured = list.filter((d) => d.featured).slice(0, 3);
    const section = grid.closest('section');
    if (!featured.length) {
      section?.setAttribute('hidden', '');
      return;
    }
    grid.innerHTML = featured.map(cardHTML).join('');
    wireToggles(grid);
    grid.querySelectorAll('.reveal').forEach((el) => window.__observeReveal?.(el));
  }

  function renderFeedbacksPage(list) {
    const grid = document.getElementById('feedbacksGrid');
    if (!grid) return;
    if (!list.length) return;
    grid.innerHTML = list.map(cardHTML).join('');
    wireToggles(grid);
    grid.querySelectorAll('.reveal').forEach((el) => window.__observeReveal?.(el));
  }

  function renderProjectTestimonial(list) {
    const host = document.querySelector('.project-testimonial[data-project-slug]');
    if (!host) return;
    const slug = host.dataset.projectSlug;
    const d = list.find((item) => item.projectSlug === slug);
    if (!d) return; // fica vazio; CSS (.project-testimonial:empty) já esconde

    host.classList.add('reveal');
    host.innerHTML = `
      <div class="container">
        <div class="project-testimonial__inner">
          <p class="project-testimonial__text">"${escapeHTML(d.highlight)}"</p>
          <button type="button" class="project-testimonial__toggle" aria-expanded="false">${LABEL_OPEN}</button>
          <div class="project-testimonial__full" hidden>${paragraphsHTML(d.text)}</div>
          <div class="project-testimonial__author">
            <div class="project-testimonial__divider"></div>
            <cite class="project-testimonial__cite">${escapeHTML(d.clientName)} · ${escapeHTML(d.projectName)}</cite>
          </div>
        </div>
      </div>`;

    const btn = host.querySelector('.project-testimonial__toggle');
    const full = host.querySelector('.project-testimonial__full');
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      full.hidden = expanded;
      btn.setAttribute('aria-expanded', String(!expanded));
      btn.textContent = expanded ? LABEL_OPEN : LABEL_CLOSE;
    });
    window.__observeReveal?.(host);
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const list = await loadDepoimentos();
    renderHomeGrid(list);
    renderFeedbacksPage(list);
    renderProjectTestimonial(list);
  });
})();
