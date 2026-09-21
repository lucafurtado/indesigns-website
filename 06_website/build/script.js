/* ============================================================
   INDESIGNS — script.js
   ============================================================ */

'use strict';

/* -- CONFIGURAÇÃO CRM --------------------------------------- */
// Cole aqui a URL do webhook do Make após configurar o cenário.
// Deixe vazio ('') para desativar o envio automático.
const WEBHOOK_URL = '';

/* -- INTRO OVERLAY ----------------------------------------- */
(function() {
  const intro = document.getElementById('site-intro');
  const video = document.getElementById('introVideo');
  if (!intro) return;

  /* Só toca no primeiro acesso da sessão. Reload/volta pra home não reseta a entrada. */
  let seen = false;
  try { seen = sessionStorage.getItem('introSeen') === '1'; } catch (e) {}

  if (seen) {
    intro.style.display = 'none';
    if (video) { try { video.pause(); video.removeAttribute('src'); } catch (e) {} }
    return;
  }

  try { sessionStorage.setItem('introSeen', '1'); } catch (e) {}

  function exitIntro() {
    intro.classList.add('is-exiting');
    setTimeout(() => { intro.style.display = 'none'; }, 900);
  }

  if (video) {
    const fallback = setTimeout(exitIntro, 15000);
    video.addEventListener('ended', () => {
      clearTimeout(fallback);
      exitIntro();
    });
    video.addEventListener('error', () => {
      clearTimeout(fallback);
      exitIntro();
    });
  } else {
    setTimeout(exitIntro, 1600);
  }
})();

document.addEventListener('DOMContentLoaded', () => {

  /* -- REFER�NCIAS DO DOM ------------------------------------ */

  const nav         = document.getElementById('nav');
  const navToggle   = document.getElementById('navToggle');
  const navLinks    = document.getElementById('navLinks');
  const navBackdrop = document.getElementById('navBackdrop');
  const ctaForm     = document.getElementById('ctaForm');
  const submitBtn   = document.getElementById('submitBtn');

  /* -- NAV: TRANSPARENTE NO HERO, PETRÓLEO APÓS SCROLL ------- */

  const heroEl = document.getElementById('hero');

  const updateNav = () => {
    const heroBottom = heroEl
      ? heroEl.getBoundingClientRect().bottom
      : 0;
    const heroHeight = heroEl ? heroEl.offsetHeight : 0;
    const progress = Math.min(
      Math.max((heroHeight - heroBottom) / heroHeight, 0),
      1
    );

    if (heroBottom <= 80) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* -- MENU MOBILE ------------------------------------------- */

  const openMenu = () => {
    navLinks.classList.add('open');
    navBackdrop.classList.add('visible');
    navBackdrop.style.display = 'block';
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    navLinks.classList.remove('open');
    navBackdrop.classList.remove('visible');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    // esconde backdrop ap�s transi��o
    setTimeout(() => { navBackdrop.style.display = ''; }, 350);
  };

  navToggle?.addEventListener('click', () => {
    navLinks.classList.contains('open') ? closeMenu() : openMenu();
  });

  navBackdrop?.addEventListener('click', closeMenu);

  // Fecha menu ao clicar em qualquer link
  navLinks?.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha menu ao pressionar ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });

  /* -- SMOOTH SCROLL PARA �NCORAS --------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navHeight = nav.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  /* -- ANIMA��ES DE SCROLL (IntersectionObserver) ------------ */

  // Elementos .reveal � anima��o ao entrar na viewport
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // Stagger progressivo para elementos no mesmo grupo (ex: cards)
        const parent = entry.target.parentElement;
        const siblings = parent
          ? Array.from(parent.querySelectorAll(':scope > .reveal'))
          : [];
        const index = siblings.indexOf(entry.target);
        const delay = Math.min(index * 90, 450);

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -48px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // Hook pra conteúdo injetado depois deste DOMContentLoaded (ex: depoimentos.js
  // via fetch assíncrono) poder entrar no mesmo observer de reveal.
  window.__observeReveal = (el) => revealObserver.observe(el);

  const showcaseSection = document.querySelector('.showcase');
  if (showcaseSection) {
    new IntersectionObserver(
      ([entry], observer) => {
        if (!entry.isIntersecting) return;
        showcaseSection.classList.add('is-visible');
        observer.disconnect();
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -80px 0px',
      }
    ).observe(showcaseSection);
  }

  // Elementos .fade-up do hero � anima��o de carregamento inicial
  const heroFadeEls = document.querySelectorAll('.hero .fade-up');
  heroFadeEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 180 + i * 190);
  });

  /* -- HIGHLIGHT DO LINK DE NAV ATIVO ----------------------- */

  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav__link:not(.nav__link--cta)');

  const activeLinkObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(link => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.style.color = isActive
            ? 'rgba(236, 236, 234, 1)'
            : '';
        });
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => activeLinkObserver.observe(s));

  /* -- FORMUL�RIO -------------------------------------------- */

  if (ctaForm) {
    const originInput = ctaForm.querySelector('[name="origem"]');
    const allowedOrigins = new Set(['instagram', 'site', 'google', 'meta']);
    const rawOrigin = new URLSearchParams(window.location.search).get('origem')?.trim().toLowerCase();
    const leadOrigin = allowedOrigins.has(rawOrigin) ? rawOrigin : 'site direto';
    if (originInput) originInput.value = leadOrigin;

    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Valida campos manualmente (j� garantido pelo `required`, mas garante UX)
      const isValid = ctaForm.checkValidity();
      if (!isValid) {
        ctaForm.reportValidity();
        return;
      }

      // Captura os dados do formul�rio
      const data = new FormData(ctaForm);
      if ((data.get('empresa_site') || '').trim()) return;

      const nome    = data.get('nome')?.trim() || '';
      const tel     = data.get('tel')?.trim() || '';
      const email   = data.get('email')?.trim() || '';
      const tipo    = formatTipo(data.get('tipo') || '');
      const bairro  = data.get('bairro')?.trim() || '';
      const imagina = data.get('imagina')?.trim() || '';
      const prazo   = formatPrazo(data.get('prazo') || '');
      const origem  = data.get('origem')?.trim() || 'site direto';
      const leadPayload = {
        nome,
        whatsapp: tel,
        email,
        tipo_projeto: tipo,
        urgencia_prazo: prazo,
        origem,
        local: bairro,
        mensagem: imagina,
        pagina: window.location.pathname,
        capturado_em: new Date().toISOString(),
      };

      // Estado de loading
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;

      // Envia para o Make (webhook) se configurado — fire and forget, não bloqueia o WhatsApp
      if (WEBHOOK_URL) {
        fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadPayload),
        }).catch(() => {}); // falha silenciosa — WhatsApp abre de qualquer forma
      }

      // Monta e abre mensagem no WhatsApp
      const msg = encodeURIComponent(
        `Olá Indira! Vim pelo site.\n\n` +
        `Nome: ${nome}\n` +
        `WhatsApp: ${tel}\n` +
        `E-mail: ${email}\n` +
        `Tipo de projeto: ${tipo}\n` +
        `Prazo: ${prazo}\n` +
        `Origem: ${origem}\n` +
        (bairro ? `Local: ${bairro}\n` : '') +
        `\nMensagem: ${imagina}`
      );

      // Pequeno delay intencional para o feedback de "enviando"
      setTimeout(() => {
        window.open(`https://wa.me/5561998586151?text=${msg}`, '_blank', 'noopener');
        showFormSuccess();
      }, 600);
    });
  }

  const formatTipo = (val) => {
    const map = {
      'residencial-novo': 'Projeto residencial novo',
      'reforma':          'Reforma residencial',
      'coletivo':         'Espaço coletivo',
      'comercial':        'Espaço comercial',
      'consultoria':      'Consultoria',
      'planejando':       'Ainda planejando',
    };
    return map[val] || val;
  };

  const formatPrazo = (val) => {
    const map = {
      'flexivel': 'Prazo flexível',
      'meses':    'Nos próximos meses',
      'urgente':  'Com urgência de prazo',
    };
    return map[val] || val;
  };

  const showFormSuccess = () => {
    // Oculta o formul�rio e mostra mensagem de sucesso
    ctaForm.style.opacity = '0';
    ctaForm.style.transition = 'opacity 0.4s ease';

    setTimeout(() => {
      ctaForm.style.display = 'none';

      // Cria e insere mensagem de sucesso
      const success = document.createElement('div');
      success.className = 'cta-form__success visible';
      success.innerHTML = `
        <h3>Mensagem recebida.</h3>
        <p>Obrigada pelo contato. Vou retornar em até 24 horas.<br>
           Enquanto isso, você pode explorar o portfólio no Instagram.</p>
      `;
      ctaForm.insertAdjacentElement('afterend', success);
    }, 400);
  };

  /* -- EFEITO DE DIMMING NOS CARDS DO PORTF�LIO ------------- */
  // Fallback JS para browsers que n�o suportam :has()

  const portfolioCards = document.querySelectorAll('.portfolio__card');
  const supportsHas = CSS.supports('selector(:has(+ *))');

  if (!supportsHas && portfolioCards.length) {
    portfolioCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        portfolioCards.forEach(c => {
          if (c !== card) c.style.opacity = '0.5';
        });
      });
      card.addEventListener('mouseleave', () => {
        portfolioCards.forEach(c => { c.style.opacity = ''; });
      });
    });
  }

  /* -- LINHA DE PROCESSO ANIMADA ----------------------------- */

  const processoSteps = document.querySelector('.processo__steps');
  if (processoSteps) {
    const lineObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          processoSteps.classList.add('line-visible');
          lineObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    lineObserver.observe(processoSteps);
  }

  /* -- SHOWCASE DE PROJETOS ---------------------------------- */

  const showcaseProjects = [
    {
      theme:     'light',
      counter:   '01 / 03',
      category:  'RESIDENCIAL',
      title:     'Cobertura<br>Monis',
      place:     'Noroeste · Brasília, DF',
      narrative: 'Uma família sai de uma casa ampla para uma cobertura mais compacta. O projeto preserva conforto, convivência e continuidade afetiva.',
      href:      'residencia-noroeste/',
      img:       'assets/projects/noroeste/cover.jpg',
      imgAlt:    'Cobertura Monis, living da cobertura',
    },
    {
      theme:     'light',
      counter:   '02 / 03',
      category:  'ÁREA COLETIVA · REFORMA',
      title:     'Cobertura<br>Porto Seguro',
      place:     'Asa Sul · Brasília',
      narrative: 'Gourmet, academia e circulação clara em uma cobertura coletiva pensada para encontros, permanência e convivência.',
      href:      'cobertura-porto-seguro/',
      img:       'assets/hero-bg.jpg',
      imgAlt:    'Cobertura Porto Seguro, área coletiva com espaço gourmet e convivência',
    },
    {
      theme:     'light',
      counter:   '03 / 03',
      category:  'SAÚDE · REFORMA',
      title:     'Orbis<br>Psicologia',
      place:     'Brasília, DF · 2025',
      narrative: 'Um consultório psicológico compacto, resolvido para acolher, atender e reunir até 30 pessoas sem perder sensibilidade.',
      href:      'clinica-orbis/',
      img:       'assets/projects/orbis/hero.jpg',
      imgAlt:    'Orbis Psicologia, sala de atendimento com sofá, poltrona e mobiliário amadeirado',
    },
  ];

  const showcaseEl  = document.querySelector('.showcase');
  const scCounter   = document.getElementById('sc-counter');
  const scCategory  = document.getElementById('sc-category');
  const scTitle     = document.getElementById('sc-title');
  const scPlace     = document.getElementById('sc-place');
  const scNarrative = document.getElementById('sc-narrative');
  const scLink      = document.getElementById('sc-link');
  const scImg       = document.getElementById('sc-img');
  const scDots      = document.querySelectorAll('.showcase__dot');
  const scArrows    = document.querySelectorAll('[data-carousel-dir]');

  let currentProject = 0;
  let isAnimating    = false;

  const switchProject = (index) => {
    if (isAnimating || index === currentProject) return;
    isAnimating = true;

    const proj = showcaseProjects[index];

    scDots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
      dot.setAttribute('aria-current', i === index ? 'true' : 'false');
    });

    const textEls = [scCounter, scCategory, scTitle, scPlace, scNarrative, scLink].filter(Boolean);
    if (scImg) scImg.classList.add('is-transitioning');
    textEls.forEach(el => el.classList.add('is-transitioning'));
    if (showcaseEl) showcaseEl.setAttribute('data-theme', proj.theme);

    setTimeout(() => {
      if (scCounter)   scCounter.textContent   = proj.counter;
      if (scCategory)  scCategory.textContent  = proj.category;
      if (scTitle)     scTitle.innerHTML        = proj.title;
      if (scPlace)     scPlace.textContent      = proj.place;
      if (scNarrative) scNarrative.textContent  = proj.narrative;
      if (scLink)      scLink.setAttribute('href', proj.href);
      if (scImg) {
        scImg.src = proj.img;
        scImg.alt = proj.imgAlt;
        setTimeout(() => {
          scImg.classList.remove('is-transitioning');
          textEls.forEach(el => el.classList.remove('is-transitioning'));
          isAnimating = false;
        }, 70);
      } else {
        textEls.forEach(el => el.classList.remove('is-transitioning'));
        isAnimating = false;
      }
    }, 320);

    currentProject = index;
  };

  scDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      switchProject(parseInt(dot.dataset.project, 10));
    });
  });

  scArrows.forEach((arrow) => {
    arrow.addEventListener('click', () => {
      const dir = parseInt(arrow.dataset.carouselDir, 10);
      switchProject((currentProject + dir + showcaseProjects.length) % showcaseProjects.length);
    });
  });

  // Keyboard navigation within showcase
  if (showcaseEl) {
    showcaseEl.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') switchProject((currentProject + 1) % showcaseProjects.length);
      if (e.key === 'ArrowLeft')  switchProject((currentProject - 1 + showcaseProjects.length) % showcaseProjects.length);
    });
  }

  (function() {
    const filterBtns = document.querySelectorAll('.projetos-filter__inline');
    const gridItems = document.querySelectorAll('.projetos-grid__item');
    const emptyMsg = document.getElementById('projetosEmpty');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const filter = this.dataset.filter;

        filterBtns.forEach(b => b.classList.remove('is-active'));
        this.classList.add('is-active');

        let visible = 0;
        gridItems.forEach(item => {
          const match = filter === 'todos' || item.dataset.category === filter;
          item.classList.toggle('is-hidden', !match);
          if (match) visible++;
        });

        if (emptyMsg) {
          emptyMsg.style.display = visible === 0 ? 'block' : 'none';
        }
      });
    });
  })();

  /* -- VIDEO REEL � P�ginas de projeto ---------------------- */

  const allReels = Array.from(document.querySelectorAll('.project-reel'));
  allReels.filter((reel) => !reel.dataset.video).forEach((reel) => { reel.style.display = 'none'; });
  const reels = allReels.filter((reel) => reel.dataset.video);

  if (reels.length) {
    const modal       = document.getElementById('projectVideoModal');
    const modalVid    = modal?.querySelector('.video-modal__player');
    const modalClose  = modal?.querySelector('.video-modal__close');
    const modalKicker = modal?.querySelector('.video-modal__panel .label');
    const modalTitle  = modal?.querySelector('.video-modal__title');
    const modalMute   = modal?.querySelector('.video-modal__mute');
    const modalShare  = modal?.querySelector('[data-video-share]');
    const relatedWrap = modal?.querySelector('.video-modal__related');
    const pageTitle   = document.getElementById('project-title')?.textContent?.trim();

    const videoOf = (reel) => ({
      src:      reel.dataset.video,
      poster:   reel.dataset.poster || '',
      title:    reel.dataset.title || pageTitle || 'Projeto Indesigns',
      label:    reel.querySelector('.project-reel__label')?.textContent?.trim() || '',
      portrait: reel.dataset.orientation === 'portrait',
    });

    // Bolinhas dentro de um .project-reels formam um grupo: o modal alterna entre elas.
    let group = [];
    let current = null;
    let related = [];

    const showVideo = (video, resetMute) => {
      current = video;
      modal.classList.toggle('is-portrait', video.portrait);
      if (modalTitle) modalTitle.textContent = video.title;
      if (modalKicker && group.length > 1 && video.label) modalKicker.textContent = `Vídeo · ${video.label}`;
      if (!modalVid) return;
      if (video.poster) modalVid.setAttribute('poster', video.poster);
      else modalVid.removeAttribute('poster');
      modalVid.src = video.src;
      modalVid.load();
      if (resetMute) {
        modalVid.muted = true;
        modalVid.setAttribute('muted', '');
        if (modalMute) modalMute.textContent = 'Ativar som';
      }
      modalVid.play().catch(() => {});
    };

    const openModal = (reel) => {
      if (!modal) return;
      const groupEl = reel.closest('.project-reels');
      group = groupEl
        ? Array.from(groupEl.querySelectorAll('.project-reel[data-video]')).map(videoOf)
        : [];
      const video = videoOf(reel);
      const explicitRelated = parseRelatedVideos(reel.dataset.relatedVideos);
      modal.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      showVideo(video, true);
      related = explicitRelated.length ? explicitRelated : group.filter((v) => v.src !== video.src);
      renderRelatedVideos(relatedWrap, related);
      requestAnimationFrame(() => modal.classList.add('is-open'));
    };

    const closeModal = () => {
      if (!modal) return;
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(() => {
        modal.setAttribute('hidden', '');
        if (modalVid) {
          modalVid.pause();
          modalVid.removeAttribute('src');
          modalVid.load();
        }
      }, 520);
    };

    // Inline -> flutuante: só quando existe uma única bolinha (várias ficariam empilhadas no canto)
    const testimonialEl = document.querySelector('.project-testimonial');
    if (testimonialEl && reels.length === 1) {
      const projectReel = reels[0];
      new IntersectionObserver(
        ([entry]) => {
          const pastIt = !entry.isIntersecting && entry.boundingClientRect.top < 0;
          if (pastIt && !projectReel.classList.contains('is-floating')) {
            projectReel.classList.add('is-floating');
            requestAnimationFrame(() => {
              setTimeout(() => projectReel.classList.add('is-visible'), 80);
            });
          } else if (!pastIt && projectReel.classList.contains('is-floating')) {
            projectReel.classList.remove('is-floating', 'is-visible');
          }
        },
        { threshold: 0.5 }
      ).observe(testimonialEl);
    }

    modalMute?.addEventListener('click', () => {
      if (!modalVid) return;
      modalVid.muted = !modalVid.muted;
      modalMute.textContent = modalVid.muted ? 'Ativar som' : 'Silenciar';
    });

    modalShare?.addEventListener('click', async () => {
      const name = current?.title || pageTitle || 'Projeto Indesigns';
      const shareData = {
        title: name,
        text: `${name} | Indesigns`,
        url: window.location.href,
      };
      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href);
          modalShare.textContent = 'Link copiado';
          setTimeout(() => { modalShare.textContent = 'Compartilhar'; }, 1800);
        }
      } catch (_) {}
    });

    relatedWrap?.addEventListener('click', (e) => {
      const item = e.target.closest('[data-related-index]');
      if (!item || !modalVid) return;
      const next = related[parseInt(item.dataset.relatedIndex, 10)];
      if (!next?.src) return;
      showVideo({ ...current, ...next }, false);
      if (group.length > 1) {
        related = group.filter((v) => v.src !== current.src);
        renderRelatedVideos(relatedWrap, related);
      }
    });

    reels.forEach((reel) => {
      reel.addEventListener('click', () => openModal(reel));
      reel.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && reel.getAttribute('role') === 'button') {
          e.preventDefault();
          openModal(reel);
        }
      });
    });
    modalClose?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && !modal.hasAttribute('hidden')) closeModal();
    });
  } // close if (reels.length)

  /* -- GSAP: REFINOS SUTIS --------------------------------- */

  function parseRelatedVideos(raw) {
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter(item => item && item.src) : [];
    } catch (_) {
      return [];
    }
  }

  function renderRelatedVideos(container, videos) {
    if (!container) return;
    if (!videos.length) {
      container.setAttribute('hidden', '');
      container.innerHTML = '';
      return;
    }
    container.removeAttribute('hidden');
    container.innerHTML = videos.map((video, index) => `
      <button type="button" class="video-modal__related-item" data-related-index="${index}">
        <span>${video.label || 'Vídeo relacionado'}</span>
      </button>
    `).join('');
  }

  if (window.gsap && window.ScrollTrigger) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion) {
      gsap.registerPlugin(window.ScrollTrigger);

      gsap.utils.toArray('.brand-break').forEach((el) => {
        gsap.fromTo(el, { opacity: 0.78 }, {
          opacity: 1,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            once: true,
          },
        });
      });

      gsap.utils.toArray('.section-header, .sobre__content, .project-intro, .project-detail-grid, .project-continue').forEach((el) => {
        gsap.fromTo(el, { y: 28, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 84%',
            once: true,
          },
        });
      });

      gsap.utils.toArray('.project-hero__img, .showcase__img, .sobre__img').forEach((img) => {
        gsap.to(img, {
          yPercent: -3,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('section') || img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8,
          },
        });
      });
    }
  }

});

/* -- CARROSSEL /projetos/ ----------------------------------- */
(function() {
  const track = document.getElementById('carouselTrack');
  if (!track) return;

  const slides = track.querySelectorAll('.projetos-carousel__slide');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  let current = 0;
  let autoPlayTimer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'projetos-carousel__dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dotsContainer.querySelectorAll('.projetos-carousel__dot').forEach((d, i) => {
      d.classList.toggle('is-active', i === current);
    });
  }

  function startAutoPlay() {
    autoPlayTimer = setInterval(() => goTo(current + 1), 5000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayTimer);
  }

  prevBtn.addEventListener('click', () => { stopAutoPlay(); goTo(current - 1); startAutoPlay(); });
  nextBtn.addEventListener('click', () => { stopAutoPlay(); goTo(current + 1); startAutoPlay(); });

  track.addEventListener('mouseenter', stopAutoPlay);
  track.addEventListener('mouseleave', startAutoPlay);

  startAutoPlay();

  /* Teclado */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      stopAutoPlay();
      goTo(current - 1);
      startAutoPlay();
    }
    if (e.key === 'ArrowRight') {
      stopAutoPlay();
      goTo(current + 1);
      startAutoPlay();
    }
  });

  /* Swipe mobile */
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoPlay();
  }, { passive: true });

  track.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
    }
    startAutoPlay();
  }, { passive: true });
})();

(function() {
  const triggers = document.querySelectorAll('.servico-accordion__trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const isOpen = this.getAttribute('aria-expanded') === 'true';
      triggers.forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        t.nextElementSibling.classList.remove('is-open');
      });
      if (!isOpen) {
        this.setAttribute('aria-expanded', 'true');
        this.nextElementSibling.classList.add('is-open');
      }
    });
  });
})();

(function() {
  const items = document.querySelectorAll('[data-lightbox]');
  if (!items.length) return;

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  let current = 0;
  const srcs = Array.from(items).map(i => i.href);

  function open(index) {
    current = index;
    lightboxImg.src = srcs[current];
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function prev() {
    current = (current - 1 + srcs.length) % srcs.length;
    lightboxImg.src = srcs[current];
  }

  function next() {
    current = (current + 1) % srcs.length;
    lightboxImg.src = srcs[current];
  }

  items.forEach(function(item, i) {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      open(i);
    });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
})();

/* -- LIGHTBOX "COMO ERA ANTES" ------------------------------ */
(function () {
  const lb = document.createElement('div');
  lb.className = 'antes-lb';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.innerHTML =
    '<div class="antes-lb__backdrop"></div>' +
    '<button class="antes-lb__nav antes-lb__nav--prev" aria-label="Anterior">&#8249;</button>' +
    '<img class="antes-lb__img" src="" alt="">' +
    '<button class="antes-lb__nav antes-lb__nav--next" aria-label="Pr&#xF3;xima">&#8250;</button>' +
    '<button class="antes-lb__close" aria-label="Fechar">&#x2715;</button>';
  document.body.appendChild(lb);

  const lbImg   = lb.querySelector('.antes-lb__img');
  const prevBtn = lb.querySelector('.antes-lb__nav--prev');
  const nextBtn = lb.querySelector('.antes-lb__nav--next');
  let srcs = [];
  let cur  = 0;

  function updateNav() {
    const show = srcs.length > 1 ? '' : 'none';
    prevBtn.style.display = show;
    nextBtn.style.display = show;
  }

  function open(index) {
    cur = index;
    lbImg.src = srcs[cur];
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    updateNav();
  }

  function close() {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function prev() { cur = (cur - 1 + srcs.length) % srcs.length; lbImg.src = srcs[cur]; }
  function next() { cur = (cur + 1) % srcs.length; lbImg.src = srcs[cur]; }

  lb.querySelector('.antes-lb__backdrop').addEventListener('click', close);
  lb.querySelector('.antes-lb__close').addEventListener('click', close);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });

  document.addEventListener('click', function (e) {
    const item = e.target.closest('.projeto-antes__item');
    if (!item) return;
    const section = item.closest('.projeto-antes');
    if (!section) return;
    const all = Array.from(section.querySelectorAll('.projeto-antes__img'));
    srcs = all.map(function (img) { return img.src; });
    const clicked = item.querySelector('.projeto-antes__img');
    open(all.indexOf(clicked));
  });

  document.querySelectorAll('.projeto-antes').forEach(function (sec) {
    if (!sec.querySelector('.projeto-antes__item')) sec.style.display = 'none';
  });
})();

/* -- NAVEGAÇÃO DO CAROUSEL "COMO ERA ANTES" ----------------- */
(function () {
  document.querySelectorAll('.projeto-antes').forEach(function (section) {
    const wrap  = section.querySelector('.projeto-antes__track-wrap');
    const items = section.querySelectorAll('.projeto-antes__item');
    if (!wrap || !items.length) return;

    function itemStep() {
      return (items[0] ? items[0].offsetWidth : 200) + 10;
    }

    function updateBtns() {
      const prev = section.querySelector('[data-antes-dir="-1"]');
      const next = section.querySelector('[data-antes-dir="1"]');
      if (prev) prev.disabled = wrap.scrollLeft <= 4;
      if (next) next.disabled = wrap.scrollLeft >= wrap.scrollWidth - wrap.clientWidth - 4;
    }

    section.querySelectorAll('[data-antes-dir]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const dir = parseInt(btn.dataset.antesDir, 10);
        wrap.scrollBy({ left: dir * itemStep(), behavior: 'smooth' });
      });
    });

    wrap.addEventListener('scroll', updateBtns, { passive: true });

    document.addEventListener('keydown', function (e) {
      if (document.querySelector('.antes-lb.is-open')) return;
      const rect = section.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.8 || rect.bottom < window.innerHeight * 0.2) return;
      if (e.key === 'ArrowLeft')  { e.preventDefault(); wrap.scrollBy({ left: -itemStep(), behavior: 'smooth' }); }
      if (e.key === 'ArrowRight') { e.preventDefault(); wrap.scrollBy({ left:  itemStep(), behavior: 'smooth' }); }
    });

    // touch swipe
    let tx = 0;
    wrap.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
    wrap.addEventListener('touchend', function (e) {
      const dx = tx - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 40) wrap.scrollBy({ left: dx > 0 ? itemStep() : -itemStep(), behavior: 'smooth' });
    });

    updateBtns();
  });
})();
