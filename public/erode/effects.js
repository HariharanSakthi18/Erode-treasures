/* ============================================================
   Erode Explore — effects.js
   Optional motion for the "Kaveri Glass" theme.
   The site works without this file. Nothing here changes data,
   search, favourites or language: it only adds motion and depth.
   ============================================================ */
(() => {
  "use strict";

  const doc = document;
  const root = doc.documentElement;
  const media = (query) => (window.matchMedia ? window.matchMedia(query).matches : false);
  const reduceMotion = media("(prefers-reduced-motion: reduce)");
  const finePointer = media("(hover: hover) and (pointer: fine)");
  const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
  const raf = window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : (callback) => window.setTimeout(callback, 16);

  /* ---------- 1. Scroll progress, and the river map drifting with the page ---------- */
  function initScroll() {
    const row = doc.querySelector(".nav-row");
    let bar = null;
    if (row) {
      bar = doc.createElement("span");
      bar.className = "scroll-progress";
      bar.setAttribute("aria-hidden", "true");
      row.appendChild(bar);
    }
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = root.scrollHeight - window.innerHeight;
      const progress = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
      if (bar) bar.style.setProperty("--progress", progress.toFixed(4));
      if (!reduceMotion) root.style.setProperty("--sy", String(Math.round(window.scrollY)));
    };
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        raf(update);
      },
      { passive: true },
    );
    update();
  }

  /* ---------- 2. Navigation: a pill that slides to the link you point at ---------- */
  function initNav() {
    const nav = doc.querySelector(".nav-links");
    if (!nav) return;
    const links = Array.from(nav.querySelectorAll("a"));
    if (!links.length) return;
    const pill = doc.createElement("span");
    pill.className = "nav-pill";
    pill.setAttribute("aria-hidden", "true");
    nav.insertBefore(pill, nav.firstChild);
    nav.classList.add("has-pill");

    const moveTo = (link) => {
      if (!link) {
        pill.style.opacity = "0";
        return;
      }
      pill.style.width = `${link.offsetWidth}px`;
      pill.style.height = `${link.offsetHeight}px`;
      pill.style.transform = `translate(${link.offsetLeft}px, ${link.offsetTop}px)`;
      pill.style.opacity = "1";
    };
    const rest = () => moveTo(nav.querySelector("a.active"));
    links.forEach((link) => {
      link.addEventListener("pointerenter", () => moveTo(link));
      link.addEventListener("focus", () => moveTo(link));
    });
    nav.addEventListener("pointerleave", rest);
    nav.addEventListener("focusout", rest);
    if (window.MutationObserver) {
      new MutationObserver(rest).observe(nav, { attributes: true, attributeFilter: ["class"], subtree: true });
    }
    window.addEventListener("resize", rest);
    window.setTimeout(rest, 300);

    // Scroll-spy: the link for the section on screen becomes active.
    if (window.IntersectionObserver) {
      const byId = new Map(
        links
          .map((link) => [(link.getAttribute("href") || "").replace("#", ""), link])
          .filter(([id]) => id && doc.getElementById(id)),
      );
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const link = byId.get(entry.target.id);
            if (!link) return;
            links.forEach((other) => other.classList.toggle("active", other === link));
          });
        },
        { rootMargin: "-45% 0px -50% 0px" },
      );
      byId.forEach((_, id) => spy.observe(doc.getElementById(id)));
    }
  }

  /* ---------- 3. Hero: pointer parallax and water ripples ---------- */
  function initHero() {
    const hero = doc.getElementById("home");
    if (!hero || reduceMotion) return;

    if (finePointer) {
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;
      let running = false;
      const step = () => {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        hero.style.setProperty("--mx", currentX.toFixed(4));
        hero.style.setProperty("--my", currentY.toFixed(4));
        if (Math.abs(targetX - currentX) > 0.002 || Math.abs(targetY - currentY) > 0.002) raf(step);
        else running = false;
      };
      const kick = () => {
        if (running) return;
        running = true;
        raf(step);
      };
      hero.addEventListener(
        "pointermove",
        (event) => {
          const rect = hero.getBoundingClientRect();
          targetX = clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
          targetY = clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);
          kick();
        },
        { passive: true },
      );
      hero.addEventListener("pointerleave", () => {
        targetX = 0;
        targetY = 0;
        kick();
      });
    }
    initRipples(hero);
  }

  function initRipples(hero) {
    const canvas = doc.createElement("canvas");
    canvas.className = "hero-ripples";
    canvas.setAttribute("aria-hidden", "true");
    const ctx = canvas.getContext ? canvas.getContext("2d") : null;
    if (!ctx) return;
    hero.insertBefore(canvas, hero.querySelector(".hero-content"));

    let width = 0;
    let height = 0;
    const drops = [];
    let running = false;
    let visible = true;
    let lastX = -999;
    let lastY = -999;
    let lastTime = 0;

    const resize = () => {
      const rect = hero.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
    };
    resize();
    if (window.ResizeObserver) new ResizeObserver(resize).observe(hero);
    else window.addEventListener("resize", resize);

    const spawn = (x, y, big) => {
      drops.push({
        x,
        y,
        radius: 2,
        max: big ? 190 : 110 + Math.random() * 40,
        speed: big ? 2.4 : 1.7,
        gold: Math.random() < 0.2,
        rings: big ? 3 : 2,
      });
      if (drops.length > 14) drops.shift();
      start();
    };
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = drops.length - 1; i >= 0; i--) {
        const drop = drops[i];
        drop.radius += drop.speed;
        if (drop.radius >= drop.max) {
          drops.splice(i, 1);
          continue;
        }
        const fade = 1 - drop.radius / drop.max;
        const tint = drop.gold ? "255, 214, 120" : "255, 255, 255";
        for (let ring = 0; ring < drop.rings; ring++) {
          const radius = drop.radius - ring * 16;
          if (radius <= 0) continue;
          ctx.beginPath();
          ctx.ellipse(drop.x, drop.y, radius, radius * 0.46, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${tint}, ${(0.55 * fade * (1 - ring * 0.3)).toFixed(3)})`;
          ctx.lineWidth = 1.6 - ring * 0.4;
          ctx.stroke();
        }
      }
      if (drops.length && visible) raf(draw);
      else running = false;
    };
    function start() {
      if (running || !visible) return;
      running = true;
      raf(draw);
    }
    hero.addEventListener(
      "pointermove",
      (event) => {
        if (event.pointerType === "touch") return;
        const rect = hero.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const now = performance.now();
        if (now - lastTime < 140 || Math.hypot(x - lastX, y - lastY) < 70) return;
        lastTime = now;
        lastX = x;
        lastY = y;
        spawn(x, y, false);
      },
      { passive: true },
    );
    hero.addEventListener("pointerdown", (event) => {
      if (event.target.closest("a, button, input, select, label")) return;
      const rect = hero.getBoundingClientRect();
      spawn(event.clientX - rect.left, event.clientY - rect.top, true);
    });
    if (window.IntersectionObserver) {
      new IntersectionObserver(
        (entries) => {
          visible = entries.some((entry) => entry.isIntersecting);
          if (visible) start();
        },
        { threshold: 0.05 },
      ).observe(hero);
    }
    window.setInterval(() => {
      if (!visible || doc.hidden) return;
      spawn(width * (0.1 + Math.random() * 0.8), height * (0.2 + Math.random() * 0.65), false);
    }, 2800);
  }

  /* ---------- 4. Hover: a ring spreads from where the pointer enters ----------
     Delegated, so cards drawn later by filters and search get it too. */
  function initRippleHover() {
    if (reduceMotion || !finePointer) return;
    const selector = ".destination-card, .stat, .guide-item, .itinerary";
    doc.addEventListener(
      "pointerover",
      (event) => {
        if (event.pointerType === "touch" || !(event.target instanceof Element)) return;
        const tile = event.target.closest(selector);
        if (!tile) return;
        const from = event.relatedTarget instanceof Element ? event.relatedTarget : null;
        if (from && tile.contains(from)) return;
        const rect = tile.getBoundingClientRect();
        tile.style.setProperty("--rx", `${(event.clientX - rect.left).toFixed(0)}px`);
        tile.style.setProperty("--ry", `${(event.clientY - rect.top).toFixed(0)}px`);
        tile.classList.remove("rippling");
        void tile.offsetWidth;
        tile.classList.add("rippling");
      },
      { passive: true },
    );
    doc.addEventListener("animationend", (event) => {
      if (event.animationName === "ring-out" && event.target instanceof Element) {
        event.target.classList.remove("rippling");
      }
    });
  }

  /* ---------- 5. Smooth colour change when the theme switches ---------- */
  function initThemeFade() {
    const toggle = doc.getElementById("theme-toggle");
    if (!toggle || reduceMotion) return;
    toggle.addEventListener("click", () => {
      root.classList.add("theme-fading");
      window.setTimeout(() => root.classList.remove("theme-fading"), 700);
    });
  }

  function init() {
    initScroll();
    initNav();
    initHero();
    initRippleHover();
    initThemeFade();
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", init);
  else init();
})();
