// ---------- Year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Theme toggle ----------
(() => {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const initial = saved || (prefersLight ? "light" : "dark");
  root.setAttribute("data-theme", initial);
  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }
})();

// ---------- Preloader ----------
window.addEventListener("load", () => {
  const pre = document.getElementById("preloader");
  setTimeout(() => pre.classList.add("done"), 500);
});

// ---------- Reduced motion ----------
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Nav scroll state + scroll progress ----------
const nav = document.getElementById("nav");
const progress = document.getElementById("scrollProgress");
function onScroll() {
  nav.classList.toggle("scrolled", window.scrollY > 24);
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = scrolled + "%";
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Mobile nav ----------
const toggle = document.getElementById("navToggle");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll(".nav-links a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// ---------- Active section highlight ----------
const navMap = new Map();
document.querySelectorAll(".nav-links a").forEach((a) =>
  navMap.set(a.getAttribute("href").slice(1), a)
);
const sectionIo = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        navMap.forEach((a) => a.classList.remove("active"));
        const link = navMap.get(e.target.id);
        if (link) link.classList.add("active");
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("main section[id]").forEach((s) => sectionIo.observe(s));

// ---------- Reveal on scroll ----------
const revealIo = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        revealIo.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = Math.min(i % 6, 5) * 0.06 + "s";
  revealIo.observe(el);
});

// ---------- Animated counters ----------
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || "";
  const dur = 1500;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(easeOut(p) * target).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const statIo = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCount(e.target);
        statIo.unobserve(e.target);
      }
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll(".stat-num").forEach((el) => statIo.observe(el));

// ---------- Typing effect ----------
const phrases = [
  "scale without losing clarity.",
  "recover themselves at 3am.",
  "turn AI into real automation.",
  "resolve identities, race-safe.",
  "quietly make teams faster.",
];
const typedEl = document.getElementById("typed");
if (typedEl && !reduce) {
  let pi = 0, ci = 0, deleting = false;
  function type() {
    const word = phrases[pi];
    typedEl.textContent = word.slice(0, ci);
    if (!deleting && ci < word.length) {
      ci++;
    } else if (!deleting && ci === word.length) {
      deleting = true;
      return setTimeout(type, 2600);
    } else if (deleting && ci > 0) {
      ci--;
    } else {
      deleting = false;
      pi = (pi + 1) % phrases.length;
      return setTimeout(type, 420);
    }
    setTimeout(type, deleting ? 42 : 88);
  }
  type();
} else if (typedEl) {
  typedEl.textContent = phrases[0];
}

// ---------- Marquee duplicate for seamless loop ----------
const marquee = document.getElementById("marquee");
if (marquee) marquee.innerHTML += marquee.innerHTML;

// ---------- Cursor spotlight (desktop) ----------
const spotlight = document.getElementById("spotlight");
const fine = window.matchMedia("(pointer: fine)").matches;
if (spotlight && fine && !reduce) {
  let tx = 0, ty = 0, cx = 0, cy = 0;
  window.addEventListener("mousemove", (e) => {
    tx = e.clientX; ty = e.clientY; spotlight.style.opacity = "1";
  });
  (function loop() {
    cx += (tx - cx) * 0.14; cy += (ty - cy) * 0.14;
    spotlight.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();
}

// ---------- 3D tilt ----------
if (fine && !reduce) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
}

// ---------- Magnetic buttons ----------
if (fine && !reduce) {
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - r.left - r.width / 2;
      const my = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${mx * 0.22}px, ${my * 0.32}px)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });
}

// ---------- Contact tabs ----------
const tabs = document.querySelectorAll(".contact-tabs .tab");
const panes = document.querySelectorAll(".tab-pane");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
    tab.classList.add("active"); tab.setAttribute("aria-selected", "true");
    const target = tab.dataset.tab;
    panes.forEach((p) => p.classList.toggle("active", p.dataset.pane === target));
  });
});

// ---------- Copy to clipboard ----------
const toast = document.getElementById("toast");
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}
document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const val = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(val);
      showToast("Copied: " + val);
    } catch {
      showToast(val);
    }
  });
});
