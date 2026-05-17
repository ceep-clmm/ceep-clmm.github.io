/**
 * Баррель Плюс — основной скрипт сайта
 * Данные товаров/новостей, каталог, калькулятор, формы, поиск, модальное окно
 */
(function () {
  "use strict";

  const LITERS_PER_TON = 1200;
  const DELIVERY_RATE_PER_KM = 50;

  /** Реквизиты и данные ООО «Баррель Плюс» (Калининград) */
  const COMPANY = {
    shortName: "ООО «Баррель Плюс»",
    fullName: "Общество с ограниченной ответственностью «Баррель Плюс»",
    address: "236029, Калининградская обл., г.о. город Калининград, г. Калининград, ул. Дзержинского, д. 242, литер П, офис 1",
    director: "Сергутин Сергей Алексеевич",
    directorRole: "Генеральный директор",
    founder: "Сергутина Светлана Николаевна",
    inn: "3906408059",
    ogrn: "1213900013645",
    kpp: "390601001",
    okpo: "48182559",
    registered: "29.10.2021",
    capital: "10 000 ₽",
    okvedMain: "47.30 — торговля розничная моторным топливом в специализированных магазинах",
    region: "Калининградская область",
    email: "info@barrel-plus.ru",
    workHours: "пн–пт 9:00–18:00 (МСК, UTC+2)",
    priceRegionNote: "Ориентировочные оптовые цены для Калининградской области, май 2026",
  };

  /* ========== Данные (имитация БД) ========== */

  const PRODUCTS = [
    {
      id: 1,
      name: "ДТ летнее",
      category: "diesel",
      categoryLabel: "Дизель",
      pricePerLiter: 57.5,
      density: "0,82–0,84 г/см³",
      cetane: "51",
      octane: "—",
      gost: "ГОСТ 32511-2013",
      description:
        "Летнее дизельное топливо для сельхозтехники, генераторов и автопарка в Калининградской области. Паспорт качества на каждую партию.",
      image: "images/product-dt-summer.jpg",
    },
    {
      id: 2,
      name: "ДТ зимнее",
      category: "diesel",
      categoryLabel: "Дизель",
      pricePerLiter: 60.83,
      density: "0,82–0,84 г/см³",
      cetane: "50",
      octane: "—",
      gost: "ГОСТ 32511-2013",
      description:
        "Зимнее дизельное топливо с пониженной температурой фильтруемости. Подходит для эксплуатации при низких температурах.",
      image: "images/product-dt-winter.jpg",
    },
    {
      id: 3,
      name: "Бензин АИ-92",
      category: "gasoline",
      categoryLabel: "Бензин",
      pricePerLiter: 46.5,
      density: "0,72–0,76 г/см³",
      cetane: "—",
      octane: "92",
      gost: "ГОСТ 32513-2013",
      description:
        "Автомобильный бензин АИ-92 для легкового транспорта и спецтехники. Поставки оптом с доставкой.",
      image: "images/product-ai92.jpg",
    },
    {
      id: 4,
      name: "Бензин АИ-95",
      category: "gasoline",
      categoryLabel: "Бензин",
      pricePerLiter: 51.2,
      density: "0,72–0,76 г/см³",
      cetane: "—",
      octane: "95",
      gost: "ГОСТ 32513-2013",
      description:
        "Бензин АИ-95 повышенного октанового числа. Рекомендуется для современных двигателей с турбонаддувом.",
      image: "images/product-ai95.jpg",
    },
    {
      id: 5,
      name: "Масло моторное 15W-40",
      category: "oils",
      categoryLabel: "Масла",
      pricePerLiter: 248.0,
      density: "0,87 г/см³",
      cetane: "—",
      octane: "—",
      gost: "ГОСТ 8581-78",
      description:
        "Универсальное моторное масло для дизельных и бензиновых двигателей коммерческого транспорта.",
      image: "images/product-oil.jpg",
    },
    {
      id: 6,
      name: "ДТ межсезонное",
      category: "diesel",
      categoryLabel: "Дизель",
      pricePerLiter: 58.9,
      density: "0,82–0,84 г/см³",
      cetane: "50",
      octane: "—",
      gost: "ГОСТ 32511-2013",
      description: "Межсезонное дизельное топливо для умеренного климата.",
      image: "images/product-dt.jpg",
    },
  ];

  const NEWS = [
    {
      id: 1,
      title: "Скидка 3% на оптовые партии ДТ в Калининградской области",
      date: "2026-05-10",
      excerpt: "При заказе от 20 тонн дизельного топлива — специальная цена до конца мая 2026 года.",
      image: "images/news-1.jpg",
      content:
        "<p>" +
        COMPANY.shortName +
        " предлагает скидку 3% на летнее и зимнее ДТ при объёме от 20 тонн для клиентов Калининграда и области. Акция действует до 31 мая 2026 года.</p><p>Оформите заявку через каталог или свяжитесь с отделом продаж.</p>",
      promo: true,
    },
    {
      id: 2,
      title: "Доставка ГСМ по Калининградской области",
      date: "2026-04-22",
      excerpt: "Поставки в Светлогорск, Гурьевск, Гусев и другие населённые пункты области.",
      image: "images/news-2.jpg",
      content:
        "<p>Расширили маршруты доставки по Калининградской области. Рассчитайте стоимость в <a href=\"calculator.html\">калькуляторе</a> или запросите коммерческое предложение.</p>",
      promo: false,
    },
    {
      id: 3,
      title: "Актуальные цены на май 2026",
      date: "2026-05-01",
      excerpt: "Обновили прайс на дизель, бензин и моторные масла для региона.",
      image: "images/product-ai92.jpg",
      content:
        "<p>Цены в каталоге приведены с учётом оптовых котировок Калининградской области. Точная стоимость партии зависит от объёма и базиса поставки — уточняйте у менеджера.</p>",
      promo: false,
    },
    {
      id: 4,
      title: "Акция на бензин АИ-95",
      date: "2026-02-01",
      excerpt: "Фиксированная цена при предоплате на квартал для юридических лиц.",
      image: "images/product-ai95.jpg",
      content:
        "<p>Закрепите цену на АИ-95 при подписании договора на 3 месяца. Подробности по e-mail " +
        COMPANY.email +
        ".</p>",
      promo: true,
    },
  ];

  const SITE_PAGES = [
    { title: "Главная", url: "index.html", keywords: ["баррель", "гсм", "нефтепродукты"] },
    { title: "О компании", url: "about.html", keywords: ["о компании", "история", "баррель"] },
    { title: "Каталог продукции", url: "catalog.html", keywords: ["каталог", "топливо", "дизель", "бензин"] },
    { title: "Услуги", url: "services.html", keywords: ["услуги", "доставка", "хранение"] },
    { title: "Калькулятор доставки", url: "calculator.html", keywords: ["калькулятор", "расчёт", "доставка"] },
    { title: "Новости и акции", url: "news.html", keywords: ["новости", "акции"] },
    { title: "Контакты", url: "contacts.html", keywords: ["контакты", "телефон", "адрес"] },
    { title: "Политика конфиденциальности", url: "privacy.html", keywords: ["персональные данные", "политика"] },
  ];

  const CATEGORY_LABELS = {
    diesel: "Дизель",
    gasoline: "Бензин",
    oils: "Масла",
  };

  /* ========== Утилиты ========== */

  function formatPrice(value) {
    return value.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ₽/л";
  }

  function formatMoney(value) {
    return value.toLocaleString("ru-RU", { maximumFractionDigits: 0 }) + " ₽";
  }

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
  }

  function getProductById(id) {
    return PRODUCTS.find(function (p) {
      return p.id === Number(id);
    });
  }

  function getNewsById(id) {
    return NEWS.find(function (n) {
      return n.id === Number(id);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /* ========== Шапка, меню, поиск ========== */

  function initHeader() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".main-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        nav.classList.toggle("is-open");
        const open = nav.classList.contains("is-open");
        toggle.setAttribute("aria-expanded", String(open));
        document.body.classList.toggle("nav-open", open);
      });
      document.addEventListener("click", function (e) {
        if (!nav.classList.contains("is-open")) return;
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          document.body.classList.remove("nav-open");
        }
      });
    }

    const current = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".main-nav a, .footer-nav a").forEach(function (link) {
      const href = link.getAttribute("href");
      if (href === current || (current === "" && href === "index.html")) {
        link.classList.add("is-active");
      }
    });

    document.querySelectorAll("[data-search-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const input = form.querySelector('input[name="q"], input[type="search"]');
        const q = input ? input.value.trim() : "";
        window.location.href = "search.html" + (q ? "?q=" + encodeURIComponent(q) : "");
      });
    });
  }

  /* ========== Хлебные крошки ========== */

  function initBreadcrumbs() {
    const el = document.querySelector("[data-breadcrumbs]");
    if (!el) return;

    const page = document.body.getAttribute("data-page");
    if (!page || page === "home") return;

    const crumbs = [{ label: "Главная", href: "index.html" }];
    const map = {
      about: [{ label: "О компании" }],
      catalog: [{ label: "Каталог", href: "catalog.html" }],
      product: [
        { label: "Каталог", href: "catalog.html" },
        { label: document.body.getAttribute("data-product-name") || "Товар" },
      ],
      services: [{ label: "Услуги" }],
      calculator: [{ label: "Калькулятор доставки" }],
      news: [{ label: "Новости и акции", href: "news.html" }],
      "news-single": [
        { label: "Новости", href: "news.html" },
        { label: document.body.getAttribute("data-news-title") || "Новость" },
      ],
      contacts: [{ label: "Контакты" }],
      privacy: [{ label: "Политика конфиденциальности" }],
      search: [{ label: "Поиск" }],
      404: [{ label: "Страница не найдена" }],
    };

    const extra = map[page] || [{ label: "Страница" }];
    extra.forEach(function (c) {
      crumbs.push(c);
    });

    let html = '<ol class="breadcrumbs-list">';
    crumbs.forEach(function (c, i) {
      const isLast = i === crumbs.length - 1;
      if (isLast || !c.href) {
        html += "<li>" + escapeHtml(c.label) + "</li>";
      } else {
        html += '<li><a href="' + c.href + '">' + escapeHtml(c.label) + "</a></li>";
      }
    });
    html += "</ol>";
    el.innerHTML = html;
  }

  /* ========== Модальное окно заявки ========== */

  function initModal() {
    const modal = document.getElementById("request-modal");
    if (!modal) return;

    const overlay = modal.querySelector(".modal-overlay");
    const closeBtns = modal.querySelectorAll("[data-modal-close]");

    function close() {
      modal.hidden = true;
      document.body.classList.remove("modal-open");
    }

    function open(productName) {
      modal.hidden = false;
      document.body.classList.add("modal-open");
      const subject = modal.querySelector("#modal-subject");
      if (subject && productName) {
        subject.value = "Заявка: " + productName;
      }
      const first = modal.querySelector("input:not([type=hidden])");
      if (first) first.focus();
    }

    window.openRequestModal = open;

    document.querySelectorAll("[data-open-modal]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        open(btn.getAttribute("data-product-name") || btn.getAttribute("data-modal-title") || "");
      });
    });

    closeBtns.forEach(function (btn) {
      btn.addEventListener("click", close);
    });
    if (overlay) overlay.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) close();
    });

    const form = modal.querySelector("[data-feedback-form]");
    if (form) bindFeedbackForm(form, close);
  }

  /* ========== Уведомления ========== */

  function showToast(message) {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 4000);
  }

  /* ========== Маска телефона и валидация формы ========== */

  function formatPhoneInput(input) {
    let digits = input.value.replace(/\D/g, "");
    if (digits.startsWith("8")) digits = "7" + digits.slice(1);
    if (!digits.startsWith("7")) digits = "7" + digits;
    digits = digits.slice(0, 11);
    let formatted = "+7";
    if (digits.length > 1) formatted += " (" + digits.slice(1, 4);
    if (digits.length >= 4) formatted += ") " + digits.slice(4, 7);
    if (digits.length >= 7) formatted += "-" + digits.slice(7, 9);
    if (digits.length >= 9) formatted += "-" + digits.slice(9, 11);
    input.value = formatted;
  }

  function isValidPhone(value) {
    return /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value);
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function bindFeedbackForm(form, onSuccess) {
    const phoneInput = form.querySelector('input[name="phone"], input[type="tel"]');
    if (phoneInput) {
      phoneInput.addEventListener("input", function () {
        formatPhoneInput(phoneInput);
      });
      phoneInput.addEventListener("focus", function () {
        if (!phoneInput.value) phoneInput.value = "+7 (";
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;

      const name = form.querySelector('[name="name"]');
      const phone = form.querySelector('[name="phone"]');
      const email = form.querySelector('[name="email"]');
      const message = form.querySelector('[name="message"]');
      const consent = form.querySelector('[name="consent"]');

      function setError(field, msg) {
        const group = field.closest(".form-group");
        const err = group && group.querySelector(".field-error");
        if (err) err.textContent = msg;
        field.classList.toggle("is-invalid", !!msg);
        if (msg) valid = false;
      }

      setError(name, !name || name.value.trim().length < 2 ? "Укажите ФИО (минимум 2 символа)" : "");
      setError(phone, !phone || !isValidPhone(phone.value) ? "Введите телефон в формате +7 (___) ___-__-__" : "");
      setError(email, !email || !isValidEmail(email.value) ? "Введите корректный email" : "");
      if (message && message.hasAttribute("required")) {
        setError(message, message.value.trim().length < 5 ? "Сообщение слишком короткое" : "");
      } else if (message) setError(message, "");

      const consentGroup = consent && consent.closest(".form-group");
      const consentErr = consentGroup && consentGroup.querySelector(".field-error");
      if (consent && !consent.checked) {
        if (consentErr) consentErr.textContent = "Необходимо согласие на обработку ПД";
        valid = false;
      } else if (consentErr) consentErr.textContent = "";

      if (!valid) return;

      form.reset();
      if (phoneInput) phoneInput.value = "";
      showToast("Заявка отправлена! Менеджер свяжется с вами в течение 30 минут.");
      if (typeof onSuccess === "function") onSuccess();
    });
  }

  /* ========== Карточка товара (разметка) ========== */

  function productCardHtml(p) {
    return (
      '<article class="product-card" data-category="' +
      p.category +
      '" data-name="' +
      escapeHtml(p.name.toLowerCase()) +
      '">' +
      '<div class="product-card__img-wrap">' +
      '<img src="' +
      p.image +
      '" alt="' +
      escapeHtml(p.name) +
      '" class="product-card__img" loading="lazy" width="360" height="220" onerror="this.src=\'images/placeholder.svg\'">' +
      '<span class="product-card__badge">' +
      escapeHtml(p.categoryLabel) +
      "</span></div>" +
      '<div class="product-card__body">' +
      "<h3><a href=\"product.html?id=" +
      p.id +
      '">' +
      escapeHtml(p.name) +
      "</a></h3>" +
      '<p class="product-card__price">' +
      formatPrice(p.pricePerLiter) +
      "</p>" +
      '<p class="product-card__desc">' +
      escapeHtml(p.description.slice(0, 90)) +
      "…</p>" +
      '<div class="product-card__actions">' +
      '<a href="product.html?id=' +
      p.id +
      '" class="btn btn-outline btn-sm">Подробнее</a>' +
      '<button type="button" class="btn btn-primary btn-sm" data-open-modal data-product-name="' +
      escapeHtml(p.name) +
      '">Заявка</button>' +
      "</div></div></article>"
    );
  }

  /* ========== Главная ========== */

  function initCompanyInfo() {
    const map = {
      "company-short": COMPANY.shortName,
      "company-full": COMPANY.fullName,
      "company-address": COMPANY.address,
      "company-director": COMPANY.director,
      "company-director-full": COMPANY.director + ", " + COMPANY.directorRole,
      "company-founder": COMPANY.founder,
      "company-inn": COMPANY.inn,
      "company-ogrn": COMPANY.ogrn,
      "company-kpp": COMPANY.kpp,
      "company-okpo": COMPANY.okpo,
      "company-registered": COMPANY.registered,
      "company-capital": COMPANY.capital,
      "company-okved": COMPANY.okvedMain,
      "company-email": COMPANY.email,
      "company-workhours": COMPANY.workHours,
      "company-legal-footer":
        "© 2026 " +
        COMPANY.shortName +
        ". ИНН " +
        COMPANY.inn +
        " | ОГРН " +
        COMPANY.ogrn +
        " | КПП " +
        COMPANY.kpp,
      "price-region-note": COMPANY.priceRegionNote,
    };
    Object.keys(map).forEach(function (key) {
      document.querySelectorAll("[data-" + key + "]").forEach(function (el) {
        if (key === "company-email") {
          el.innerHTML = '<a href="mailto:' + COMPANY.email + '">' + COMPANY.email + "</a>";
        } else {
          el.textContent = map[key];
        }
      });
    });
  }

  function newsCardHtml(n, headingTag) {
    const tag = headingTag || "h3";
    const promoClass = n.promo ? " news-card--promo" : "";
    const img = n.image
      ? '<img src="' + n.image + '" alt="" class="news-card__img" loading="lazy" width="400" height="220">'
      : "";
    return (
      '<article class="news-card' +
      promoClass +
      '">' +
      img +
      '<time datetime="' +
      n.date +
      '">' +
      formatDate(n.date) +
      "</time>" +
      "<" +
      tag +
      '><a href="news-single.html?id=' +
      n.id +
      '">' +
      escapeHtml(n.title) +
      "</a></" +
      tag +
      ">" +
      "<p>" +
      escapeHtml(n.excerpt) +
      "</p>" +
      '<a href="news-single.html?id=' +
      n.id +
      '" class="link-arrow">Читать</a>' +
      "</article>"
    );
  }

  function initHome() {
    const priceNote = document.querySelector("[data-price-region-note]");
    if (priceNote) priceNote.textContent = COMPANY.priceRegionNote;

    const pricesGrid = document.getElementById("prices-grid");
    if (pricesGrid) {
      PRODUCTS.slice(0, 3).forEach(function (p) {
        pricesGrid.insertAdjacentHTML(
          "beforeend",
          '<div class="price-widget-card">' +
            '<h3>' +
            escapeHtml(p.name) +
            "</h3>" +
            '<p class="price-widget-card__price">' +
            formatPrice(p.pricePerLiter) +
            "</p>" +
            '<a href="product.html?id=' +
            p.id +
            '" class="btn btn-primary btn-sm">Подробнее</a>' +
            "</div>"
        );
      });
    }

    const newsGrid = document.getElementById("news-grid-home");
    if (newsGrid) {
      NEWS.slice(0, 3).forEach(function (n) {
        newsGrid.insertAdjacentHTML("beforeend", newsCardHtml(n, "h3"));
      });
    }
  }

  /* ========== Каталог ========== */

  function initCatalog() {
    const grid = document.getElementById("catalog-grid");
    if (!grid) return;

    function render(list) {
      grid.innerHTML = list.length ? list.map(productCardHtml).join("") : '<p class="empty-msg">Товары не найдены</p>';
      bindModalButtons();
    }

    function bindModalButtons() {
      grid.querySelectorAll("[data-open-modal]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (window.openRequestModal) {
            window.openRequestModal(btn.getAttribute("data-product-name") || "");
          }
        });
      });
    }

    render(PRODUCTS);

    const filterBtns = document.querySelectorAll("[data-catalog-filter]");
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) {
          b.classList.remove("is-active");
        });
        btn.classList.add("is-active");
        applyFilters();
      });
    });

    const searchInput = document.getElementById("catalog-search");
    if (searchInput) {
      searchInput.addEventListener("input", applyFilters);
    }

    function applyFilters() {
      const active = document.querySelector("[data-catalog-filter].is-active");
      const cat = active ? active.getAttribute("data-catalog-filter") : "all";
      const q = (searchInput && searchInput.value.trim().toLowerCase()) || "";
      const filtered = PRODUCTS.filter(function (p) {
        const matchCat = cat === "all" || p.category === cat;
        const matchQ = !q || p.name.toLowerCase().includes(q);
        return matchCat && matchQ;
      });
      render(filtered);
    }
  }

  /* ========== Страница товара ========== */

  function initProductPage() {
    const root = document.getElementById("product-detail");
    if (!root) return;

    const id = new URLSearchParams(window.location.search).get("id") || "1";
    const p = getProductById(id);
    if (!p) {
      root.innerHTML = '<p class="empty-msg">Товар не найден. <a href="catalog.html">В каталог</a></p>';
      return;
    }

    document.title = p.name + " — Баррель Плюс";
    document.body.setAttribute("data-product-name", p.name);
    initBreadcrumbs();

    const specCetane =
      p.category === "diesel"
        ? "<tr><th>Цетановое число</th><td>" + escapeHtml(p.cetane) + "</td></tr>"
        : "";
    const specOctane =
      p.category === "gasoline"
        ? "<tr><th>Октановое число</th><td>" + escapeHtml(p.octane) + "</td></tr>"
        : "";

    root.innerHTML =
      '<div class="product-detail__grid">' +
      '<div class="product-detail__media">' +
      '<img src="' +
      p.image +
      '" alt="' +
      escapeHtml(p.name) +
      '" loading="lazy" width="600" height="400" onerror="this.src=\'images/placeholder.svg\'">' +
      "</div>" +
      '<div class="product-detail__info">' +
      '<span class="product-card__badge">' +
      escapeHtml(p.categoryLabel) +
      "</span>" +
      "<h1>" +
      escapeHtml(p.name) +
      "</h1>" +
      '<p class="product-detail__price">' +
      formatPrice(p.pricePerLiter) +
      "</p>" +
      "<p>" +
      escapeHtml(p.description) +
      "</p>" +
      '<table class="spec-table"><tbody>' +
      "<tr><th>Цена за литр</th><td>" +
      formatPrice(p.pricePerLiter) +
      "</td></tr>" +
      "<tr><th>Плотность</th><td>" +
      escapeHtml(p.density) +
      "</td></tr>" +
      specCetane +
      specOctane +
      "<tr><th>ГОСТ</th><td>" +
      escapeHtml(p.gost) +
      "</td></tr>" +
      "</tbody></table>" +
      '<button type="button" class="btn btn-primary" data-open-modal data-product-name="' +
      escapeHtml(p.name) +
      '">Оставить заявку</button>' +
      "</div></div>";

    document.querySelectorAll("[data-open-modal]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (window.openRequestModal) window.openRequestModal(p.name);
      });
    });
  }

  /* ========== Калькулятор ========== */

  function initCalculator() {
    const form = document.getElementById("delivery-calculator");
    if (!form) return;

    const fuelSelect = document.getElementById("calc-fuel");
    if (fuelSelect) {
      PRODUCTS.forEach(function (p) {
        const opt = document.createElement("option");
        opt.value = p.id;
        opt.textContent = p.name + " — " + p.pricePerLiter + " ₽/л";
        opt.dataset.price = p.pricePerLiter;
        fuelSelect.appendChild(opt);
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const fuelId = fuelSelect.value;
      const product = getProductById(fuelId);
      const price = product ? product.pricePerLiter : 0;
      let volume = parseFloat(document.getElementById("calc-volume").value) || 0;
      const unit = document.getElementById("calc-unit").value;
      const distance = parseFloat(document.getElementById("calc-distance").value) || 0;

      if (unit === "tons") volume *= LITERS_PER_TON;

      const baseCost = volume * price;
      const deliveryCost = distance * DELIVERY_RATE_PER_KM;
      const total = baseCost + deliveryCost;

      document.getElementById("calc-base").textContent = formatMoney(baseCost);
      document.getElementById("calc-delivery").textContent = formatMoney(deliveryCost);
      document.getElementById("calc-total").textContent = formatMoney(total);
      document.getElementById("calc-results").hidden = false;
    });

    const requestBtn = document.getElementById("calc-request-btn");
    if (requestBtn) {
      requestBtn.addEventListener("click", function () {
        if (window.openRequestModal) {
          window.openRequestModal("Точный расчёт доставки");
        }
      });
    }
  }

  /* ========== Новости ========== */

  function initNewsList() {
    const list = document.getElementById("news-list");
    if (!list) return;

    NEWS.forEach(function (n) {
      list.insertAdjacentHTML("beforeend", newsCardHtml(n, "h2").replace('class="link-arrow"', 'class="btn btn-outline btn-sm"'));
    });
  }

  function initNewsSingle() {
    const root = document.getElementById("news-article");
    if (!root) return;

    const id = new URLSearchParams(window.location.search).get("id") || "1";
    const n = getNewsById(id);
    if (!n) {
      root.innerHTML = '<p class="empty-msg">Новость не найдена. <a href="news.html">К списку</a></p>';
      return;
    }

    document.title = n.title + " — Баррель Плюс";
    document.body.setAttribute("data-news-title", n.title);
    initBreadcrumbs();

    const newsImg = n.image
      ? '<img src="' + n.image + '" alt="" class="news-article__img" loading="lazy" width="800" height="450">'
      : "";
    root.innerHTML =
      '<article class="news-article' +
      (n.promo ? " news-article--promo" : "") +
      '">' +
      '<time datetime="' +
      n.date +
      '">' +
      formatDate(n.date) +
      "</time>" +
      "<h1>" +
      escapeHtml(n.title) +
      "</h1>" +
      newsImg +
      '<div class="article-content">' +
      n.content +
      "</div>" +
      '<p><a href="news.html" class="link-arrow">← Все новости</a></p>' +
      "</article>";
  }

  /* ========== Поиск ========== */

  function initSearchPage() {
    const qEl = document.querySelector("[data-search-query]");
    const resultsEl = document.getElementById("search-results");
    if (!resultsEl) return;

    const params = new URLSearchParams(window.location.search);
    const q = (params.get("q") || "").trim().toLowerCase();
    if (qEl) qEl.textContent = q || "—";

    const pageInput = document.getElementById("search-page-input");
    if (pageInput && q) pageInput.value = q;

    const items = [];

    PRODUCTS.forEach(function (p) {
      if (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) {
        if (q) {
          items.push({
            type: "product",
            title: p.name,
            url: "product.html?id=" + p.id,
            snippet: p.description.slice(0, 120),
          });
        }
      }
    });

    SITE_PAGES.forEach(function (page) {
      const hay = (page.title + " " + page.keywords.join(" ")).toLowerCase();
      if (!q || hay.includes(q)) {
        if (q) items.push({ type: "page", title: page.title, url: page.url, snippet: page.keywords.join(", ") });
      }
    });

    NEWS.forEach(function (n) {
      if (!q || n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q)) {
        if (q) {
          items.push({
            type: "news",
            title: n.title,
            url: "news-single.html?id=" + n.id,
            snippet: n.excerpt,
          });
        }
      }
    });

    if (!q) {
      resultsEl.innerHTML = '<p class="empty-msg">Введите запрос в поле поиска.</p>';
      return;
    }

    if (!items.length) {
      resultsEl.innerHTML = '<p class="empty-msg">По запросу «' + escapeHtml(q) + '» ничего не найдено.</p>';
      return;
    }

    resultsEl.innerHTML = items
      .map(function (item) {
        return (
          '<div class="search-result">' +
          '<span class="search-result__type">' +
          (item.type === "product" ? "Товар" : item.type === "news" ? "Новость" : "Страница") +
          "</span>" +
          '<h3><a href="' +
          item.url +
          '">' +
          escapeHtml(item.title) +
          "</a></h3>" +
          "<p>" +
          escapeHtml(item.snippet) +
          "</p></div>"
        );
      })
      .join("");
  }

  /* ========== Контакты ========== */

  function initContacts() {
    const form = document.querySelector("#contacts-form[data-feedback-form]");
    if (form) bindFeedbackForm(form);
  }

  /* ========== Старт ========== */

  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    initCompanyInfo();
    initBreadcrumbs();
    initModal();
    initHome();
    initCatalog();
    initProductPage();
    initCalculator();
    initNewsList();
    initNewsSingle();
    initSearchPage();
    initContacts();
  });
})();
