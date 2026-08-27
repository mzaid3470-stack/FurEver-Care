import React, { useEffect, useMemo, useRef, useState } from 'react';
import pageMeta from './pageMeta.js';

const DEFAULT_PAGE = 'index.html';

function getFallbackImage(el) {
  const alt = (el.getAttribute('alt') || '').toLowerCase();
  if (alt.includes('groom') || alt.includes('coat')) return '/assets/videos/care-in-motion-poster.jpg';
  if (alt.includes('veter') || alt.includes('doctor') || alt.includes('dvm') || alt.includes('maya patel')) return '/images/hero-vet-dog.png';
  return '/images/hero-vet-dog.png';
}

function getPageName() {
  const last = window.location.pathname.split('/').filter(Boolean).pop();
  if (!last || !last.includes('.html')) return DEFAULT_PAGE;
  return pageMeta[last] ? last : DEFAULT_PAGE;
}

function normalizeHref(href) {
  if (!href) return null;
  if (href.startsWith('#') || /^(https?:|mailto:|tel:|javascript:)/i.test(href)) return null;
  const clean = href.split('#')[0].split('?')[0];
  if (!clean) return null;
  const name = clean.split('/').pop();
  return pageMeta[name] ? name : null;
}


function isPetProfilePage(name) {
  return /^pet-0[1-8]\.html$/.test(name);
}

function renderPetProfile(container, pet) {
  if (!container || !pet) return;
  const traitsHtml = (pet.personality || []).map((t) =>
    `<span style="background: rgba(74, 21, 33, 0.08); padding: 0.35rem 0.85rem; border-radius: var(--radius-pill); font-size: 0.82rem; font-weight: 600;">✦ ${t}</span>`
  ).join(' ');
  const safeName = String(pet.name).replace(/'/g, "\\'");
  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1.1fr 1fr; gap: 4rem; align-items: start;">
      <div>
        <div class="hero-image-frame" style="border-radius: var(--radius-md);">
          <img src="${pet.image}" alt="${pet.name}" style="height: 480px; width:100%; object-fit:contain; object-position:center;" referrerpolicy="no-referrer">
        </div>
        <div style="background: var(--dusty-pink-light); border: 1px solid var(--burgundy-tint-20); border-radius: var(--radius-md); padding: 1.5rem; margin-top: 1.5rem;">
          <div style="font-size: 0.76rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--burgundy-light); margin-bottom: 0.4rem;">Location</div>
          <div style="font-size: 1.1rem; font-weight: 600; color: var(--burgundy-deep);">${pet.location}</div>
          <div style="font-size: 0.85rem; opacity: 0.85; margin-top: 0.25rem;">Visits available Wed–Sun by private appointment.</div>
        </div>
      </div>
      <div>
        <div style="display: flex; gap: 0.6rem; align-items: center; margin-bottom: 0.6rem;">
          <span class="card-badge card-badge-dusty" style="position: static; display: inline-block;">${pet.badge}</span>
          <span class="label-editorial" style="color: var(--burgundy-light);">${pet.species} • ${pet.breed}</span>
        </div>
        <h1 style="font-size: clamp(2.4rem, 4.5vw, 3.4rem); margin-bottom: 0.5rem; line-height: 1.1;">${pet.name}</h1>
        <div style="font-family: var(--font-serif); font-size: 1.25rem; font-style: italic; color: var(--burgundy-light); margin-bottom: 1.5rem;">${pet.age} • ${pet.gender} • ${pet.size}</div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">${traitsHtml}</div>
        <div style="background: var(--dusty-pink-light); border: 1px solid var(--burgundy-tint-20); border-radius: var(--radius-md); padding: 1.75rem; margin-bottom: 1.75rem;">
          <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem;">Adoption Story & Background</h3>
          <p style="font-size: 0.95rem; line-height: 1.65;">${pet.story}</p>
        </div>
        <div style="background: var(--dusty-pink-light); border: 1px solid var(--burgundy-tint-20); border-radius: var(--radius-md); padding: 1.75rem; margin-bottom: 2rem;">
          <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem;">Clinical Health Clearance</h3>
          <p style="font-size: 0.9rem; opacity: 0.9;">${pet.health}</p>
        </div>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <button class="btn btn-burgundy btn-lg" style="flex: 1;" onclick="openAdoptionModalDirect('${safeName}')">Start Adoption Request</button>
          <a href="adoption.html" class="btn btn-outline-burgundy btn-lg">Browse Adoptions</a>
        </div>
      </div>
    </div>`;
}

export default function App() {
  const [page, setPage] = useState(getPageName);
  const [html, setHtml] = useState('');
  const rootRef = useRef(null);
  const generation = useRef(0);

  const meta = useMemo(() => pageMeta[page] || pageMeta[DEFAULT_PAGE], [page]);

  useEffect(() => {
    const onPop = () => setPage(getPageName());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const id = ++generation.current;
    setHtml('');
    window.scrollTo(0, 0);

    fetch(`/pages/${page}`)
      .then((r) => { if (!r.ok) throw new Error(`Unable to load ${page}`); return r.text(); })
      .then((text) => {
        if (cancelled || id !== generation.current) return;
        const doc = new DOMParser().parseFromString(text, 'text/html');
        const body = doc.body;
        body.querySelectorAll('script').forEach((s) => s.remove());
        // The original pages were authored as sibling .html files. In the React SPA they live under /pages,
        // so root-local asset/data references must point back to /assets and /data. Visual content is unchanged.
        body.querySelectorAll('img[src]').forEach((el) => {
          const value = el.getAttribute('src');
          if (value?.startsWith('assets/')) el.setAttribute('src', `/${value}`);

          // Preserve every original image URL. If a legacy external URL is unavailable,
          // use the project's existing local visual only as a last-resort fallback so
          // the layout never collapses or shows a broken image icon.
          if (value && /^https?:\/\//i.test(value)) {
            el.dataset.originalSrc = value;
            el.setAttribute('referrerpolicy', 'no-referrer');
            const fallback = getFallbackImage(el);
            el.setAttribute('onerror', `this.onerror=null;this.src='${fallback}'`);
          }
        });
        body.querySelectorAll('video source[src], video[src]').forEach((el) => {
          const value = el.getAttribute('src');
          if (value?.startsWith('assets/')) el.setAttribute('src', `/${value}`);
          else if (value?.startsWith('videos/')) el.setAttribute('src', `/assets/videos/${value.slice(7)}`);
        });
        body.querySelectorAll('video').forEach((video) => {
          video.setAttribute('playsinline', '');
          video.setAttribute('preload', 'metadata');
        });
        body.querySelectorAll('[href]').forEach((el) => {
          const value = el.getAttribute('href');
          if (value?.startsWith('assets/')) el.setAttribute('href', `/${value}`);
        });
        // Preserve page-level body metadata used by page controllers (especially veterinarian profiles).
        if (body.dataset.vetId) document.body.dataset.vetId = body.dataset.vetId;
        else document.body.removeAttribute('data-vet-id');
        if (page !== DEFAULT_PAGE && body.querySelector('main') && !body.querySelector('.furever-page-back, .furever-page-back-wrap, .back, .back-link')) {
          const main = body.querySelector('main');
          const wrap = document.createElement('div');
          wrap.className = 'furever-page-back-wrap';
          wrap.innerHTML = '<button type="button" class="btn btn-outline-burgundy btn-sm furever-page-back" aria-label="Go back to the previous page">← Back</button>';
          main.insertBefore(wrap, main.firstChild);
        }
        setHtml(body.innerHTML);
      })
      .catch((err) => setHtml(`<main class="section"><div class="container"><h1>Unable to load page</h1><p>${err.message}</p></div></main>`));

    return () => { cancelled = true; };
  }, [page]);

  useEffect(() => {
    if (!html || !rootRef.current) return;
    const currentRoot = rootRef.current;

    const handleClick = (event) => {
      const back = event.target.closest?.('.furever-page-back');
      if (back) {
        event.preventDefault();
        if (window.history.length > 1) window.history.back();
        else { window.history.pushState({}, '', '/index.html'); setPage(DEFAULT_PAGE); }
        return;
      }
      const anchor = event.target.closest?.('a[href]');
      if (!anchor) return;
      const target = normalizeHref(anchor.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      const href = anchor.getAttribute('href');
      const hash = href.includes('#') ? href.slice(href.indexOf('#')) : '';
      window.history.pushState({}, '', `/${target}${hash}`);
      setPage(target);
    };
    currentRoot.addEventListener('click', handleClick);

    const scripts = meta.scripts || [];
    // Pet profiles are rendered from the single pets.json source using the route's pet ID.
    // This prevents one profile's hard-coded/default data from leaking into every profile.
    const isVetProfilePage = /^(sarah-mitchell|ryan-carter|maya-patel|daniel-brooks)\.html$/.test(page);
    const inline = (isPetProfilePage(page) || isVetProfilePage) ? [] : (meta.inline || []);

    if (isPetProfilePage(page)) {
      const petNumber = page.match(/pet-(\d{2})\.html$/)?.[1];
      fetch('/data/pets.json')
        .then((r) => r.json())
        .then((pets) => {
          const pet = pets.find((item) => item.id === `pet-${petNumber}`);
          renderPetProfile(currentRoot.querySelector('#pet-dossier-container'), pet);
        })
        .catch(() => {});
    }
    const nodes = [];
    let chain = Promise.resolve();

    const loadScript = (src) => new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src.startsWith('/') ? src : `/${src}`;
      script.onload = () => resolve();
      script.onerror = () => resolve();
      document.body.appendChild(script);
      nodes.push(script);
    });

    // Existing page scripts are intentionally reused so the design's current interactions are not rewritten.
    for (const src of scripts) chain = chain.then(() => loadScript(src));
    for (const code of inline) {
      chain = chain.then(() => {
        const script = document.createElement('script');
        script.textContent = code;
        document.body.appendChild(script);
        nodes.push(script);
      });
    }
    chain.then(() => {
      document.dispatchEvent(new Event('DOMContentLoaded'));
    });

    return () => {
      currentRoot.removeEventListener('click', handleClick);
      nodes.forEach((n) => n.remove());
      // Clear page-specific DOM listeners by replacing the rendered root on next route.
    };
  }, [html, meta]);

  return <div id="react-site-shell" ref={rootRef} dangerouslySetInnerHTML={{ __html: html }} />;
}
