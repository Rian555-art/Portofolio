/* ==========================================================================
   Rian Ady Saputra — Portfolio
   Modules: PROJECTS data · nav · active link · reveal · projects · effects
   ========================================================================== */

/* --------------------------------------------------------------------------
   PROJECTS — edit this list to add or replace projects.

   Fields:
     title        Project name
     category     Used for the filter buttons (new categories are added automatically)
     description  1–2 short sentences
     image        Path to the preview image (recommended ratio 16:10, e.g. 1280x800)
     alt          Short description of the image (accessibility)
     url          Link to the project (live demo, repo, case study). Leave "" to show a disabled button
     placeholder  true = shows a "Placeholder" badge. Remove it (or set false) for real projects

   Everything below the PROJECTS list normally does not need to change.
   -------------------------------------------------------------------------- */
const PROJECTS = [
  {
    title: "Project Title 01",
    category: "Web Development",
    description: "Placeholder. Replace this text with a short description of the project, the problem it solves, and your role.",
    image: "assets/images/project-1.svg",
    alt: "Placeholder preview for a web development project",
    url: "",
    placeholder: true,
  },
  {
    title: "Project Title 02",
    category: "3D Multimedia",
    description: "Placeholder. Replace this text with a short description of your 3D or multimedia work and the tools you used.",
    image: "assets/images/project-2.svg",
    alt: "Placeholder preview for a 3D multimedia project",
    url: "",
    placeholder: true,
  },
  {
    title: "Project Title 03",
    category: "Digital Design",
    description: "Placeholder. Replace this text with a short description of your design project and the goal behind it.",
    image: "assets/images/project-3.svg",
    alt: "Placeholder preview for a digital design project",
    url: "",
    placeholder: true,
  },
];

(() => {
  "use strict";

  /* ---------- Helpers ---------- */
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Tiny element factory: el("div", { class: "x" }, child1, "text") */
  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (value === false || value === null || value === undefined) return;
      node.setAttribute(key, value === true ? "" : value);
    });
    children.flat().forEach((child) => {
      node.append(child instanceof Node ? child : document.createTextNode(child));
    });
    return node;
  }

  /* ---------- Navbar: scroll state, progress bar, mobile menu ---------- */
  function initNav() {
    const nav = $(".nav");
    const toggle = $(".nav__toggle");
    const menu = $("#nav-menu");
    if (!nav || !toggle || !menu) return;

    const setOpen = (open) => {
      menu.classList.toggle("is-open", open);
      nav.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target)) setOpen(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) setOpen(false);
    });

    let ticking = false;
    const update = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      nav.style.setProperty("--progress", max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  /* ---------- Highlight the nav link of the section in view ---------- */
  function initActiveLink() {
    if (!("IntersectionObserver" in window)) return;
    const links = $$(".nav__link");
    const byId = new Map(links.map((link) => [link.getAttribute("href").slice(1), link]));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const active = byId.get(entry.target.id);
        if (!active) return;
        links.forEach((link) => {
          link.classList.remove("is-active");
          link.removeAttribute("aria-current");
        });
        active.classList.add("is-active");
        active.setAttribute("aria-current", "location");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    byId.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const items = $$(".reveal");
    if (!items.length) return;

    const show = (item) => {
      item.classList.add("is-visible");
      // Drop the reveal classes after the transition so hover effects aren't delayed.
      const delay = parseInt(item.style.getPropertyValue("--d"), 10) || 0;
      window.setTimeout(() => {
        item.classList.remove("reveal", "is-visible");
        item.style.removeProperty("--d");
      }, 1000 + delay);
    };

    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach((item) => item.classList.remove("reveal"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        show(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    items.forEach((item) => observer.observe(item));
  }

  /* ---------- Projects: render cards + category filters ---------- */
  function initProjects() {
    const grid = $("#project-grid");
    const filters = $("#project-filters");
    if (!grid || !filters) return;

    const cards = PROJECTS.map((project, index) => {
      const hasLink = Boolean(project.url);

      const action = hasLink
        ? el("a", {
            class: "btn btn--ghost btn--sm",
            href: project.url,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": `View project: ${project.title} (opens in a new tab)`,
          }, "View Project")
        : el("button", {
            class: "btn btn--ghost btn--sm",
            type: "button",
            disabled: true,
            title: "Add a link in the PROJECTS list in script.js",
          }, "View Project");

      const meta = el("div", { class: "project__meta" },
        el("span", { class: "badge" }, project.category),
        project.placeholder ? el("span", { class: "badge badge--muted" }, "Placeholder") : ""
      );

      const card = el("li", {
        class: "card project reveal",
        style: `--d:${(index % 3) * 90}ms`,
        "data-category": project.category,
      },
        el("div", { class: "project__thumb" },
          el("img", {
            src: project.image,
            alt: project.alt || project.title,
            width: "800",
            height: "500",
            loading: "lazy",
          })
        ),
        el("div", { class: "project__body" },
          meta,
          el("h3", {}, project.title),
          el("p", {}, project.description),
          action
        )
      );
      return card;
    });

    grid.replaceChildren(...cards);

    // Filters
    const categories = ["All", ...new Set(PROJECTS.map((p) => p.category))];
    const buttons = categories.map((category, i) =>
      el("button", {
        class: "filter",
        type: "button",
        "data-filter": category,
        "aria-pressed": String(i === 0),
      }, category)
    );
    filters.replaceChildren(...buttons);

    // Hide the filter bar when there is nothing to filter
    filters.hidden = categories.length <= 2;

    filters.addEventListener("click", (event) => {
      const button = event.target.closest(".filter");
      if (!button) return;
      const selected = button.dataset.filter;
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      cards.forEach((card) => {
        card.hidden = selected !== "All" && card.dataset.category !== selected;
      });
    });
  }

  /* ---------- Pointer spotlight on cards ---------- */
  function initSpotlight() {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
    document.addEventListener("pointermove", (event) => {
      const card = event.target.closest && event.target.closest(".card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    }, { passive: true });
  }

  /* ---------- Subtle 3D tilt on the hero visual ---------- */
  function initTilt() {
    const visual = $("#hero-visual");
    if (!visual || reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const hero = $("#home");
    hero.addEventListener("pointermove", (event) => {
      const rect = visual.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) / window.innerWidth;
      const y = (event.clientY - (rect.top + rect.height / 2)) / window.innerHeight;
      visual.style.setProperty("--ry", `${(x * 12).toFixed(2)}deg`);
      visual.style.setProperty("--rx", `${(-y * 12).toFixed(2)}deg`);
    }, { passive: true });
    hero.addEventListener("pointerleave", () => {
      visual.style.setProperty("--rx", "0deg");
      visual.style.setProperty("--ry", "0deg");
    });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ---------- Boot ---------- */
  initNav();
  initActiveLink();
  initProjects();   // must run before initReveal so generated cards are observed
  initReveal();
  initSpotlight();
  initTilt();
  initYear();
})();
