// Erode Explore: vanilla JavaScript. No framework or installation needed.
(() => {
  "use strict";
  let destinations = [
    {
      id: "kodiveri",
      name: "Kodiveri Dam",
      category: "Dams & Rivers",
      location: "Kodiveri, near Gobichettipalayam",
      description:
        "A beautiful cascade across the Bhavani River, framed by greenery. A favourite escape for a relaxed day by the water.",
      tagline: "Waterfront escape",
      note: "Check current water releases and local access restrictions. Bathing may be prohibited during high flows.",
      source: "https://erode.nic.in/tourism/places-of-interest/",
      image: "images/erode-kodiveri.jpg",
      mapQuery: "Kodiveri Dam, Kodiveri, near Gobichettipalayam, Tamil Nadu, India",
    },
    {
      id: "bannari",
      name: "Bannari Amman Temple",
      category: "Temples",
      location: "Bannari, near Sathyamangalam",
      description:
        "A revered Amman shrine at the forest foothills, where faith, tradition and the beauty of the hills come together.",
      tagline: "Sacred traditions",
      note: "Dress respectfully. Festival dates and visiting arrangements should be confirmed with the temple.",
      source: "https://erode.nic.in/religious-tourism/",
      image: "images/erode-bannari.jpg",
      mapQuery: "Bannari Amman Temple, Bannari, near Sathyamangalam, Tamil Nadu, India",
    },
    {
      id: "vellode",
      name: "Vellode Bird Sanctuary",
      category: "Nature & Wildlife",
      location: "Vellode, near Erode",
      description:
        "A peaceful wetland on Periyakulam Lake, home to resident birds and seasonal visitors. Slow down and listen to nature.",
      tagline: "Birdwatcher’s favourite",
      note: "Winter is generally rewarding for birdwatching. Carry binoculars and avoid disturbing nesting birds.",
      source: "https://erode.nic.in/tourism/places-of-interest/",
      image: "images/erode-vellode.jpg",
      mapQuery: "Vellode Bird Sanctuary, Vellode, near Erode, Tamil Nadu, India",
    },
    {
      id: "bhavanisagar",
      name: "Bhavanisagar Dam",
      category: "Dams & Rivers",
      location: "Bhavanisagar, near Sathyamangalam",
      description:
        "An impressive earthen dam on the Bhavani River, with expansive reservoir scenery and a nearby public park.",
      tagline: "Reservoir views",
      note: "Confirm park access before visiting. Restricted dam areas are not open for casual exploration.",
      source: "https://erode.nic.in/water-bodies-dams/",
      image: "images/erode-bhavanisagar.jpg",
      mapQuery: "Bhavanisagar Dam, Bhavanisagar, near Sathyamangalam, Tamil Nadu, India",
    },
    {
      id: "sangameshwarar",
      name: "Bhavani Sangameshwarar Temple",
      category: "Temples",
      location: "Kooduthurai, Bhavani",
      description:
        "An ancient Shiva temple beside the meeting of the Cauvery and Bhavani rivers, a cherished spiritual landmark of Kongu Nadu.",
      tagline: "Riverside heritage",
      note: "The Amudha river is part of religious tradition. Riverbank access depends on water levels.",
      source: "https://erode.nic.in/religious-tourism/",
      image: "images/erode-sangameshwarar.jpg",
      mapQuery: "Bhavani Sangameshwarar Temple, Kooduthurai, Bhavani, Tamil Nadu, India",
    },
    {
      id: "jamakkalam",
      name: "Bhavani Jamakkalam Weaving Heritage",
      category: "Heritage & Culture",
      location: "Bhavani",
      description:
        "Discover the colourful handwoven carpets of Bhavani and the skilled craft traditions passed down through generations.",
      tagline: "Living craft traditions",
      note: "This is a local craft tradition rather than a single ticketed attraction. Arrange workshop visits directly with artisans.",
      source: "https://erode.nic.in/rural-handy-crafts-tourism/",
      image: "images/erode-jamakkalam.jpg",
      mapQuery: "Bhavani Jamakkalam weaving Bhavani Tamil Nadu",
    },
    {
      id: "varattupallam",
      name: "Varattupallam Dam",
      category: "Dams & Rivers",
      location: "Near Anthiyur, Bargur foothills",
      description:
        "An irrigation reservoir near the Bargur hills, surrounded by rural scenery and forest-edge landscapes.",
      tagline: "A quieter escape",
      note: "Visitor access is subject to local restrictions. Keep away from forest areas and wildlife.",
      source: "https://erode.nic.in/water-bodies-dams/",
      image: "images/erode-varattupallam.jpg",
      mapQuery: "Varattupallam Dam, Near Anthiyur, Bargur foothills, Tamil Nadu, India",
    },
    {
      id: "kunderipallam",
      name: "Kunderipallam Dam",
      category: "Dams & Rivers",
      location: "Near Kongarpalayam, Gobichettipalayam region",
      description:
        "A reservoir nestled against the hills in northern Erode district, valued for irrigation and its scenic setting.",
      tagline: "Hill-framed waters",
      note: "Check access locally. Do not swim or enter restricted water-management areas.",
      source: "https://erode.nic.in/water-bodies-dams/",
      image: "images/erode-kunderipallam.jpg",
      mapQuery:
        "Kunderipallam Dam, Near Kongarpalayam, Gobichettipalayam region, Tamil Nadu, India",
    },
    {
      id: "sathyamangalam",
      photoAlt: "Dhimbam hills in the Sathyamangalam region",
      name: "Sathyamangalam Tiger Reserve",
      category: "Nature & Wildlife",
      location: "Sathyamangalam region",
      description:
        "A remarkable forest landscape linking the Western and Eastern Ghats, protecting tigers, elephants and rich biodiversity.",
      tagline: "Wild at heart",
      note: "Only authorised forest visits are permitted. Check current arrangements with the Forest Department; sightings are never guaranteed.",
      source: "https://erode.nic.in/eco-tourism/",
      image: "images/erode-sathyamangalam.jpg",
      mapQuery: "Sathyamangalam Tiger Reserve, Sathyamangalam region, Tamil Nadu, India",
    },
    {
      id: "chennimalai",
      name: "Chennimalai Murugan Temple",
      category: "Temples",
      location: "Chennimalai",
      description:
        "A celebrated hilltop Murugan shrine with sweeping views of the Kongu countryside and a long devotional tradition.",
      tagline: "Hilltop serenity",
      note: "Plan for steps or confirm hill-road transport arrangements. Respect worship and photography restrictions.",
      source: "https://erode.nic.in/religious-tourism/",
      image: "images/erode-chennimalai.jpg",
      mapQuery: "Chennimalai Murugan Temple, Chennimalai, Tamil Nadu, India",
    },
    {
      id: "thindal",
      name: "Thindal Murugan Temple",
      category: "Temples",
      location: "Thindal, Erode",
      description:
        "A hill shrine dedicated to Lord Murugan on the western side of Erode, offering a peaceful pause above the city.",
      tagline: "Above the city",
      note: "Steps and uneven surfaces may affect accessibility. Confirm temple timings locally.",
      source: "https://erode.nic.in/religious-tourism/",
      image: "images/erode-thindal.jpg",
      mapQuery: "Thindal Murugan Temple, Thindal, Erode, Tamil Nadu, India",
    },
    {
      id: "magudeswarar",
      name: "Magudeswarar Temple",
      category: "Temples",
      location: "Kodumudi",
      description:
        "A historic temple complex by the Cauvery, with shrines associated with Shiva, Vishnu and Brahma.",
      tagline: "Cauvery-side devotion",
      note: "Dress respectfully and follow local instructions near the river.",
      source: "https://erode.nic.in/religious-tourism/",
      image: "images/erode-magudeswarar.jpg",
      mapQuery: "Magudeswarar Temple, Kodumudi, Tamil Nadu, India",
    },
    {
      id: "museum",
      name: "Government Museum Erode",
      category: "Heritage & Culture",
      location: "Erode city",
      description:
        "Explore the region’s archaeological and cultural history through sculptures, hero stones and objects connected with Kodumanal.",
      tagline: "Stories of Kongu Nadu",
      note: "Confirm the current museum location, opening days and visitor arrangements before travelling.",
      source: "https://erode.nic.in/heritage-tourism/",
      image: "images/erode-museum.jpg",
      mapQuery: "Government Museum Erode, Erode city, Tamil Nadu, India",
    },
    {
      id: "periyar",
      name: "Periyar Memorial House",
      category: "Heritage & Culture",
      location: "Periyar Street, Erode",
      description:
        "A memorial in the ancestral home of social reformer E. V. Ramasamy, preserving the story of his life and public work.",
      tagline: "A reformer’s legacy",
      note: "Confirm visiting hours locally; photography inside may be restricted.",
      source: "https://erode.nic.in/heritage-tourism/",
      image: "images/erode-periyar.jpg",
      mapQuery: "Periyar Memorial House, Periyar Street, Erode, Tamil Nadu, India",
    },
    {
      id: "kodumanal",
      name: "Kodumanal Archaeological Site",
      category: "Heritage & Culture",
      location: "Kodumanal, near the Noyyal River",
      description:
        "An ancient trade and industrial settlement known for bead-making, iron working and archaeological evidence of far-reaching trade.",
      tagline: "Ancient stories",
      note: "An archaeological site, not a daily visitor attraction. Seek permission and current access information; never disturb remains.",
      source: "https://erode.nic.in/heritage-tourism/",
      image: "images/erode-kodumanal.jpg",
      mapQuery:
        "Kodumanal Archaeological Site, Kodumanal, near the Noyyal River, Tamil Nadu, India",
    },
    {
      id: "voc",
      photoSource: "https://erodeinfo.com/erode-photos/erode-voc-park-photos.htm",
      photoCredit: "Erode Info",
      name: "VOC Park",
      category: "Nature & Wildlife",
      location: "Erode city",
      description:
        "A well-known public recreation space in Erode for a leisurely walk and an easy-going break within the city.",
      tagline: "A city pause",
      note: "Facilities and accessible areas can change. Confirm current park access locally.",
      source: "https://erode.nic.in/tourism/places-of-interest/",
      image: "images/erode-voc.jpg",
      mapQuery: "VOC Park, Erode city, Tamil Nadu, India",
    },
    {
      id: "kalingarayan",
      name: "Kalingarayan Canal and Anicut",
      category: "Dams & Rivers",
      location: "Bhavani and the Erode countryside",
      description:
        "A historic irrigation system drawing from the Bhavani River, reflecting the engineering heritage of the Kongu region.",
      tagline: "Engineering heritage",
      note: "The canal spans multiple places; the map link points to the anicut. Keep clear of flowing water.",
      source: "https://erode.nic.in/water-bodies-dams/",
      image: "images/erode-kalingarayan.jpg",
      mapQuery: "Kalingarayan Anicut Bhavani Tamil Nadu",
    },
    {
      id: "kongalamman",
      name: "Kongalamman Temple",
      category: "Temples",
      location: "Central Erode",
      description:
        "A long-established temple dedicated to Goddess Kongalamman, closely connected with the spiritual life of Erode’s old town.",
      tagline: "Old-town traditions",
      note: "Confirm temple visiting arrangements locally and follow respectful dress and photography rules.",
      source: "https://erode.nic.in/religious-tourism/",
      image: "",
      mapQuery: "Kongalamman Temple, Central Erode, Tamil Nadu, India",
    },
    {
      id: "aarudra",
      photoSource:
        "https://nrameshrao.wordpress.com/2018/10/27/sri-arudra-kapaleeswara-temple-erode/",
      photoCredit: "N. Ramesh Rao",
      name: "Aarudra Kabaaleeswarar Temple",
      category: "Temples",
      location: "Fort area, Erode",
      description:
        "A historic Shiva shrine in Erode’s old Fort area, also known as Arudra Kabaleeswarar Temple.",
      tagline: "In the heart of old Erode",
      note: "Look for the Erode Fort temple when navigating, not Chennai’s similarly named temple.",
      source: "https://erode.nic.in/religious-tourism/",
      image: "images/erode-aarudra-gopuram.jpg",
      mapQuery: "Aarudra Kabaaleeswarar Temple, Fort area, Erode, Tamil Nadu, India",
    },
    {
      id: "chillout",
      name: "Chillout Theme Park",
      category: "Nature & Wildlife",
      location: "Perundurai–Vellode Road, near Perundurai",
      description:
        "A family recreation destination with water-based entertainment and leisure facilities near Perundurai.",
      tagline: "A family day out",
      note: "Confirm operating status, opening hours, ticket prices and available attractions directly with the park.",
      source: "https://erode.nic.in/tourism/places-of-interest/",
      image: "images/erode-chillout.jpg",
      mapQuery: "Chillout Theme Park, Perundurai–Vellode Road, near Perundurai, Tamil Nadu, India",
    },
  ];
  const heroImage = "images/erode-hero.jpg";
  // Icon shapes are replaced by Font Awesome below; the old SVG paths stay as a fallback list.
  const paths = {
    mountain:
      '<path d="m2 19 7-13 5 8 3-5 5 10H2Z"/><path d="m6 12 3 2 2-2m4 1 2 1 2-1"/><circle cx="18" cy="5" r="2"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    heart:
      '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    search: '<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    leaf: '<path d="M20 3C7 2 2 8 5 15s15 5 15-12Z"/><path d="M3 21 16 8"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/>',
    moon: '<path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/>',
    train:
      '<rect x="5" y="3" width="14" height="15" rx="3"/><path d="M5 10h14M9 18l-3 4m9-4 3 4M12 3v7"/><circle cx="8" cy="14" r="1"/><circle cx="16" cy="14" r="1"/>',
    bag: '<rect x="4" y="7" width="16" height="14" rx="2"/><path d="M8 7V5a4 4 0 0 1 8 0v2"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-3 5-5 3 3-5 5-3Z"/>',
    waves:
      '<path d="M2 7c4-5 6 5 10 0s6 5 10 0M2 13c4-5 6 5 10 0s6 5 10 0M2 19c4-5 6 5 10 0s6 5 10 0"/>',
    temple: '<path d="M3 21h18M5 21v-7h14v7M4 14l3-4h10l3 4M8 10V7h8v3M9 7l3-5 3 5M10 21v-4h4v4"/>',
    heritage: '<path d="m3 7 9-5 9 5H3Zm2 3v8m5-8v8m4-8v8m5-8v8M3 21h18M3 18h18"/>',
    park: '<path d="M12 2 5 10h4l-6 7h8v5m2-5h8l-6-7h4l-7-8Z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    external: '<path d="M14 3h7v7m-1-6-9 9M10 3H3v18h18v-7"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    image:
      '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="m3 17 5-5 4 4 4-6 5 7"/><circle cx="8" cy="8" r="1"/>',
  };
  Object.assign(paths, {
    utensils: '<path d="M7 2v8m-3-8v4a3 3 0 0 0 6 0V2M7 10v12m10-20v20m0-20c3 3 4 7 0 10"/>',
    loom: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M7 6v12m3-12v12m4-12v12m3-12v12M4 8h16M4 16h16"/>',
    bed: '<path d="M3 5v14m0-5h18v5M3 10h18v4M7 10V8a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2m0 0V8a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2"/>',
  });
  // Icons come from Font Awesome Free (loaded in index.html).
  const faIcons = {
    mountain: "mountain-sun", pin: "location-dot", heart: "heart", search: "magnifying-glass",
    arrow: "arrow-right", leaf: "leaf", sun: "sun", moon: "moon", train: "train",
    bag: "bag-shopping", compass: "compass", waves: "water", temple: "place-of-worship",
    heritage: "landmark", park: "tree", grid: "border-all", clock: "clock",
    external: "arrow-up-right-from-square", close: "xmark", menu: "bars", image: "image",
    utensils: "utensils", loom: "swatchbook", bed: "bed",
  };
  function icon(name) {
    return `<i class="fa-solid fa-${faIcons[name] || faIcons.pin} icon" aria-hidden="true"></i>`;
  }
  function fillIcons(root = document) {
    root.querySelectorAll("[data-icon]").forEach((el) => (el.innerHTML = icon(el.dataset.icon)));
  }
  function escapeHTML(value) {
    return String(value).replace(
      /[&<>"']/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
    );
  }
  function safeURL(value, image = false) {
    if (typeof value !== "string") return false;
    if (
      image &&
      (value === "" ||
        /^(images\/[a-zA-Z0-9_.-]+|\/__l5e\/assets-v1\/[a-zA-Z0-9/_.-]+)$/.test(value))
    )
      return true;
    try {
      return new URL(value).protocol === "https:";
    } catch {
      return false;
    }
  }
  const CATEGORY_CONFIG = Object.freeze([
    { name: "All Places", icon: "grid" },
    { name: "Dams & Rivers", icon: "waves" },
    { name: "Temples", icon: "temple" },
    { name: "Nature & Wildlife", icon: "leaf" },
    { name: "Heritage & Culture", icon: "heritage" },
    { name: "Stay & Hotels", icon: "bed" },
  ]);
  const categories = Object.fromEntries(
    CATEGORY_CONFIG.map(({ name, icon: iconName }) => [name, iconName]),
  );
  const legacyCategoryAliases = { "Leisure & Parks": "Nature & Wildlife" };
  function normalizeDestinationCategory(name) {
    return legacyCategoryAliases[name] || name;
  }
  function validCatalogue(rows) {
    if (!Array.isArray(rows)) return false;
    const ids = new Set(),
      names = new Set();
    return rows.every((d) => {
      if (
        !d ||
        typeof d !== "object" ||
        typeof d.id !== "string" ||
        !/^[a-z0-9-]+$/.test(d.id) ||
        ids.has(d.id) ||
        !Object.hasOwn(categories, normalizeDestinationCategory(d.category)) ||
        normalizeDestinationCategory(d.category) === "All Places" ||
        normalizeDestinationCategory(d.category) === "Stay & Hotels"
      )
        return false;
      const fields = ["name", "location", "description", "tagline", "note", "mapQuery"];
      if (fields.some((k) => typeof d[k] !== "string" || !d[k].trim() || d[k].length > 10000))
        return false;
      const name = d.name.trim().toLowerCase();
      if (
        names.has(name) ||
        !safeURL(d.source) ||
        !safeURL(d.image, true) ||
        (d.photoSource && !safeURL(d.photoSource))
      )
        return false;
      ids.add(d.id);
      names.add(name);
      return true;
    });
  }
  const hotels = window.erodeHotels;
  const storageKey = "erode-explore-favourites-v1";
  const languageStorageKey = "erode-explore-language-v1";
  const themeStorageKey = "erode-explore-theme-v1";
  const translations = window.ERODE_TRANSLATIONS;
  if (!translations) throw new Error("Erode translations failed to load.");
  const supportedLanguages = new Set(translations.languages.map((language) => language.code));
  let language = "en";
  let languageStorageUnavailable = false;
  try {
    const storedLanguage = localStorage.getItem(languageStorageKey);
    if (supportedLanguages.has(storedLanguage)) language = storedLanguage;
  } catch {
    languageStorageUnavailable = true;
  }
  let theme = "light",
    themeStorageUnavailable = false;
  try {
    const storedTheme = localStorage.getItem(themeStorageKey);
    if (storedTheme === "light" || storedTheme === "dark") theme = storedTheme;
  } catch {
    themeStorageUnavailable = true;
  }
  document.documentElement.dataset.theme = theme;
  function t(key, values = {}) {
    const text = translations.ui[language]?.[key] ?? translations.ui.en[key] ?? key;
    return typeof text === "string"
      ? text.replace(/\{\{(\w+)\}\}/g, (_, name) => String(values[name] ?? ""))
      : text;
  }
  function number(value) {
    return new Intl.NumberFormat(translations.ui[language].numberLocale).format(value);
  }
  function localizedDestination(destination) {
    return { ...destination, ...(translations.destinations[language]?.[destination.id] || {}) };
  }
  function setElementText(element, text) {
    if (!element) return;
    const node = Array.from(element.childNodes).find((child) => child.nodeType === Node.TEXT_NODE);
    if (node) node.nodeValue = text;
    else element.textContent = text;
  }
  function updateThemeToggle() {
    const toggle = document.getElementById("theme-toggle");
    toggle.setAttribute("aria-label", t(theme === "light" ? "switchToDark" : "switchToLight"));
    toggle.setAttribute("title", t(theme === "light" ? "switchToDark" : "switchToLight"));
    toggle.setAttribute("aria-pressed", String(theme === "dark"));
    toggle.innerHTML = icon(theme === "light" ? "moon" : "sun");
  }
  function applyStaticTranslations() {
    document.documentElement.lang = language;
    document.getElementById("language-select").value = language;
    for (const [selector, key] of Object.entries(translations.selectors)) {
      document.querySelectorAll(selector).forEach((element) => setElementText(element, t(key)));
    }
    for (const [selector, attributes] of Object.entries(translations.attributes)) {
      document.querySelectorAll(selector).forEach((element) => {
        for (const [attribute, key] of Object.entries(attributes))
          element.setAttribute(attribute, t(key));
      });
    }
    const menuToggle = document.getElementById("menu-toggle");
    menuToggle.setAttribute(
      "aria-label",
      t(menuToggle.getAttribute("aria-expanded") === "true" ? "closeNavigation" : "openNavigation"),
    );
    updateThemeToggle();
    const titleLine = document.querySelector(".hero-title-line-two"),
      hasSecondLine = Boolean(t("heroTitleOf") || t("heroPlace"));
    titleLine.classList.toggle("empty", !hasSecondLine);
    document.querySelector(".hero-title-break").classList.toggle("empty", !hasSecondLine);
    const aboutNodes = Array.from(document.querySelector(".about h2").childNodes).filter(
      (node) => node.nodeType === Node.TEXT_NODE,
    );
    t("aboutTitle")
      .split("|")
      .forEach((line, index) => {
        if (aboutNodes[index]) aboutNodes[index].nodeValue = line;
      });
    document.title = `Erode Explore – ${t("pageTitle")}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t("pageDescription"));
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", t("pageDescription"));
  }
  const validIds = new Set(destinations.map((d) => d.id));
  let favourites = new Set();
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (Array.isArray(stored)) favourites = new Set(stored.filter((id) => validIds.has(id)));
  } catch {
    /* Continue without stored favourites if storage is unavailable. */
  }
  const pageParams = new URLSearchParams(window.location.search);
  const requestedCategory = pageParams.get("category");
  let category = CATEGORY_CONFIG.some((item) => item.name === requestedCategory)
      ? requestedCategory
      : "All Places",
    query = "",
    favouritesOnly = false,
    itineraryIds = null,
    limit = 6,
    openedDestination = null,
    toastTimer;
  const grid = document.getElementById("destination-grid"),
    filters = document.getElementById("filters"),
    dialog = document.getElementById("destination-dialog"),
    searchInput = document.getElementById("search-input");
  const destinationPage = document.getElementById("destination-page"),
    pageDestinationId = pageParams.get("destination"),
    pageHotelId = pageParams.get("hotel");
  const introSplash = document.getElementById("intro-splash");
  if (document.documentElement.classList.contains("erode-intro-active"))
    window.setTimeout(() => {
      document.documentElement.classList.remove("erode-intro-active");
      window.setTimeout(() => introSplash?.setAttribute("hidden", ""), 500);
    }, 2550);
  if (!grid || !filters || !dialog || !searchInput || !destinationPage) return;
  const hero = document.getElementById("hero-image");
  if (hero) hero.src = heroImage;
  document.querySelectorAll("img").forEach((img) =>
    img.addEventListener("error", () => {
      img.alt = t("photoUnavailable");
    }),
  );
  fillIcons();
  applyStaticTranslations();
  if (languageStorageUnavailable) notify(t("languageStorageBlocked"));
  if (themeStorageUnavailable) notify(t("themeStorageBlocked"));
  function notify(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toast.hidden = true), 2500);
  }
  function updateFavCount() {
    const count = document.getElementById("fav-count");
    count.textContent = number(favourites.size);
    count.hidden = !favourites.size;
    document.getElementById("favourites-nav").setAttribute("aria-pressed", String(favouritesOnly));
  }
  function toggleFavourite(id) {
    if (favourites.has(id)) {
      favourites.delete(id);
      notify(t("removedToast"));
    } else {
      favourites.add(id);
      notify(t("savedToast"));
    }
    try {
      localStorage.setItem(storageKey, JSON.stringify([...favourites]));
    } catch {
      notify(t("storageBlocked"));
    }
    render();
    renderDestinationPage(destinations.find((d) => d.id === pageDestinationId));
    if (openedDestination) renderDetails(openedDestination);
  }
  function photo(d, modal = false) {
    const place = localizedDestination(d);
    return d.image
      ? `<img class="${modal ? "modal-photo" : "card-image"}" src="${escapeHTML(d.image)}" alt="${escapeHTML(place.photoAlt || place.name)} — ${escapeHTML(t("destinationLabel"))}" ${modal ? "" : 'loading="lazy"'}>`
      : `<div class="${modal ? "modal-photo " : ""}missing-photo">${icon("image")}<span>${t("missingPhoto")}</span></div>`;
  }
  function destinationHref(id) {
    return window.parent !== window
      ? `/destinations/${encodeURIComponent(id)}`
      : `?destination=${encodeURIComponent(id)}`;
  }
  function destinationTarget() {
    return window.parent !== window ? "_top" : "_self";
  }
  function renderDestinationPage(d) {
    if (!pageDestinationId) {
      destinationPage.hidden = true;
      return;
    }
    document.body.classList.add("destination-view");
    destinationPage.hidden = false;
    const hosted = window.parent !== window,
      homeHref = hosted ? "/" : "index.html#home",
      backHref = hosted ? "/" : "index.html#destinations";
    document.querySelectorAll(".site-header .brand").forEach((link) => {
      link.href = homeHref;
      link.target = hosted ? "_top" : "_self";
    });
    if (!d) {
      destinationPage.innerHTML = `<div class="container destination-page-status"><h1>${escapeHTML(t("destinationNotFound"))}</h1><p>${escapeHTML(t("destinationNotInCatalogue"))}</p><a class="btn btn-outline" href="${backHref}" target="${hosted ? "_top" : "_self"}">${escapeHTML(t("browseDestinations"))}</a></div>`;
      return;
    }
    const place = localizedDestination(d),
      saved = favourites.has(d.id);
    destinationPage.innerHTML = `<div class="container destination-page-inner"><div class="destination-page-top"><a class="text-link" href="${backHref}" target="${hosted ? "_top" : "_self"}">${icon("arrow")} ${escapeHTML(t("allDestinations"))}</a></div><div class="destination-cover">${photo(d, true)}</div><article class="destination-page-content"><div class="eyebrow">${escapeHTML(translations.ui[language].categories[d.category] || d.category)} · ${escapeHTML(place.tagline)}</div><h1>${escapeHTML(place.name)}</h1><div class="card-location">${icon("pin")}${escapeHTML(place.location)}</div><p class="destination-lede">${escapeHTML(place.description)}</p><div class="destination-facts"><div class="destination-fact"><span>${escapeHTML(t("openingHours"))}</span><strong>${escapeHTML(t("notListed"))}</strong></div><div class="destination-fact"><span>${escapeHTML(t("entryFee"))}</span><strong>${escapeHTML(t("notListed"))}</strong></div></div><div class="visitor-note"><strong>${escapeHTML(t("beforeYouGo"))}</strong><br>${escapeHTML(place.note)}</div><div class="modal-actions"><a class="btn" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(d.mapQuery)}" target="_blank" rel="noopener noreferrer">${icon("pin")}${escapeHTML(t("getDirections"))} ${icon("external")}</a><button class="btn btn-outline" data-save="${escapeHTML(d.id)}" aria-pressed="${saved}">${icon("heart")}${escapeHTML(saved ? t("savedFavourites") : t("saveFavourites"))}</button></div><a class="photo-credit" href="${escapeHTML(d.source)}" target="_blank" rel="noopener noreferrer">${escapeHTML(t("destinationReference"))} ${icon("external")}</a>${d.image ? `<a class="photo-credit" href="${escapeHTML(d.photoSource || d.source)}" target="_blank" rel="noopener noreferrer">${escapeHTML(t("photograph"))}: ${escapeHTML(d.photoCredit || "Erode District tourism")} ${icon("external")}</a>` : ""}</article></div>`;
  }
  function categoryLabel(name) {
    return translations.ui[language].categories[name] || name;
  }
  function renderCategoryButtons() {
    filters.innerHTML = CATEGORY_CONFIG.map(
      ({ name, icon: iconName }) =>
        `<button class="filter ${category === name ? "active" : ""}" type="button" data-filter="${escapeHTML(name)}" aria-pressed="${category === name}">${icon(iconName)}<span>${escapeHTML(categoryLabel(name))}</span></button>`,
    ).join("");
  }
  function matching() {
    return destinations.filter((d) => {
      const place = localizedDestination(d),
        destinationCategory = normalizeDestinationCategory(d.category);
      const searchable =
        `${d.name} ${d.location} ${destinationCategory} ${d.description} ${place.name} ${place.location} ${place.description} ${place.tagline} ${categoryLabel(destinationCategory)}`.toLocaleLowerCase(
          language,
        );
      return (
        (category === "All Places" || destinationCategory === category) &&
        (!favouritesOnly || favourites.has(d.id)) &&
        (!itineraryIds || itineraryIds.includes(d.id)) &&
        searchable.includes(query)
      );
    });
  }
  function matchingHotels() {
    return hotels.filter((hotel) =>
      `${hotel.name} ${hotel.address} ${hotel.rooms.join(" ")} ${hotel.facilities.join(" ")}`
        .toLocaleLowerCase(language)
        .includes(query),
    );
  }
  function hotelHref(id) {
    return `index.html?hotel=${encodeURIComponent(id)}`;
  }
  function externalLink(url, label, className = "btn") {
    return `<a class="${className}" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)} ${icon("external")}</a>`;
  }
  function hotelCard(hotel) {
    return `<article class="hotel-card"><div class="hotel-card-media">${hotel.image ? `<img src="${escapeHTML(hotel.image)}" alt="${escapeHTML(hotel.imageAlt)}" loading="lazy">` : `<div class="missing-photo"><span>Official property photo not verified</span></div>`}<span class="official-listing">Official hotel information</span></div><div class="hotel-card-content"><h3>${escapeHTML(hotel.name)}</h3><div class="card-location">${icon("pin")}${escapeHTML(hotel.address)}</div><div class="hotel-facilities"><strong>Facilities listed by the hotel</strong><ul>${hotel.facilities
      .slice(0, 4)
      .map((item) => `<li>${escapeHTML(item)}</li>`)
      .join(
        "",
      )}</ul></div><div class="hotel-price"><span>Rates &amp; availability</span><strong>Contact hotel for details</strong></div><div class="hotel-card-actions"><a class="btn btn-outline" href="${hotelHref(hotel.id)}">View details</a>${externalLink(hotel.bookingUrl, hotel.bookingLabel)}</div></div></article>`;
  }
  function renderHotelPage(hotel) {
    if (!pageHotelId) return;
    if (!hotel) {
      destinationPage.hidden = false;
      document.body.classList.add("hotel-view");
      destinationPage.innerHTML =
        '<div class="container destination-page-status"><h1>Accommodation not found</h1><p>This property is not in the verified local hotel list.</p><a class="btn btn-outline" href="index.html?category=Stay%20%26%20Hotels#destinations">Back to Stay &amp; Hotels</a></div>';
      return;
    }
    document.body.classList.add("hotel-view");
    destinationPage.hidden = false;
    const backHref = "index.html?category=Stay%20%26%20Hotels#destinations";
    destinationPage.innerHTML = `<div class="container hotel-detail-page"><div class="destination-page-top"><a class="text-link" href="${backHref}">${icon("arrow")} Back to Stay &amp; Hotels</a></div><div class="hotel-detail-heading"><div><div class="eyebrow">Hotel information from the property</div><h1>${escapeHTML(hotel.name)}</h1><div class="card-location">${icon("pin")}${escapeHTML(hotel.address)}</div></div><span class="official-listing">Official hotel information</span></div>${hotel.image ? `<figure class="hotel-cover"><img src="${escapeHTML(hotel.image)}" alt="${escapeHTML(hotel.imageAlt)}"><figcaption>Photo source: ${externalLink(hotel.photoSource, "Hotel website photo source", "text-link")}</figcaption></figure>` : `<p class="hotel-photo-note">Official property photo not verified. Visit the hotel website for current photographs.</p>`}<div class="hotel-detail-grid"><section class="hotel-detail-section"><div class="eyebrow">Room categories</div><h2>Rooms</h2>${hotel.rooms.length ? `<ul class="hotel-amenities">${hotel.rooms.map((room) => `<li>${escapeHTML(room)}</li>`).join("")}</ul>` : "<p>Contact hotel for details.</p>"}<p>${escapeHTML(hotel.roomNote || "Room descriptions and rates: Contact hotel for details.")}</p><p><strong>Rates &amp; availability:</strong> Contact hotel for details.</p></section><aside class="hotel-detail-aside"><section class="hotel-detail-section"><div class="eyebrow">Published property information</div><h2>Facilities</h2><ul class="hotel-amenities">${hotel.facilities.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul><p>Facility details and current availability: Contact hotel for details.</p></section><section class="hotel-detail-section"><div class="eyebrow">Contact &amp; reservations</div><h2>Contact hotel</h2><ul class="hotel-contact-list">${hotel.contacts.map((contact) => `<li><a href="${escapeHTML(contact.href)}" ${contact.href.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}>${escapeHTML(contact.label)}</a></li>`).join("")}</ul><div class="hotel-card-actions">${externalLink(hotel.bookingUrl, hotel.bookingLabel)}${externalLink(hotel.contactUrl, "Official contact details", "btn btn-outline")}</div><p>Availability and reservation confirmation are provided by the hotel.</p></section></aside></div><p class="photo-credit">Sources: ${externalLink(hotel.source, "Official hotel website", "text-link")} · ${externalLink(hotel.contactUrl, "Contact / reservation source", "text-link")}</p></div>`;
  }
  function render() {
    const results = matching(),
      hotelResults = category === "Stay & Hotels" && !favouritesOnly ? matchingHotels() : [];
    renderCategoryButtons();
    document.getElementById("destinations-heading").textContent = favouritesOnly
      ? t("favouriteHeading")
      : t("exploreErode");
    document.getElementById("destinations-subtitle").textContent =
      category === "Stay & Hotels"
        ? "Property details are based on information published by each hotel. Confirm rates and availability directly."
        : favouritesOnly
          ? t("favouriteSubtitle")
          : t("destinationSubtitle");
    if (category === "Stay & Hotels") {
      grid.innerHTML = hotelResults.length
        ? hotelResults.map(hotelCard).join("")
        : `<div class="empty-state"><h3>No hotels match your search</h3><p>Try another hotel, room type, or facility.</p><button class="btn" id="clear-filters">Show all hotels ${icon("arrow")}</button></div>`;
    } else {
      grid.innerHTML = results
        .slice(0, limit)
        .map((d) => {
          const place = localizedDestination(d),
            saved = favourites.has(d.id),
            destinationCategory = normalizeDestinationCategory(d.category);
          return `<article class="destination-card"><div class="card-image-wrap">${photo(d)}<span class="category-badge">${icon(categories[destinationCategory])}${escapeHTML(categoryLabel(destinationCategory))}</span><button class="heart-btn ${saved ? "saved" : ""}" data-save="${escapeHTML(d.id)}" aria-label="${escapeHTML(t(saved ? "removePlaceAria" : "savePlaceAria", { name: place.name }))}" aria-pressed="${saved}" title="${escapeHTML(saved ? t("removeLabel") : t("saveLabel"))}">${icon("heart")}</button></div><div class="card-content"><h3>${escapeHTML(place.name)}</h3><div class="card-location">${icon("pin")}${escapeHTML(place.location)}</div><p class="card-description">${escapeHTML(place.description)}</p><div class="card-bottom"><span class="card-note">${icon("compass")}${escapeHTML(place.tagline)}</span><button class="detail-btn" data-details="${escapeHTML(d.id)}" aria-label="${escapeHTML(t("explorePlaceAria", { name: place.name }))}">${escapeHTML(t("explore"))} ${icon("arrow")}</button></div></div></article>`;
        })
        .join("");
      if (!results.length)
        grid.innerHTML = `<div class="empty-state"><h3>${escapeHTML(t(favouritesOnly ? "noSavedPlaces" : "noPlaces"))}</h3><p>${escapeHTML(t(favouritesOnly ? "emptySavedText" : "emptySearchText"))}</p><button class="btn" id="clear-filters">${escapeHTML(t("exploreAll"))} ${icon("arrow")}</button></div>`;
    }
    const count = category === "Stay & Hotels" ? hotelResults.length : results.length;
    filters.insertAdjacentHTML(
      "beforeend",
      `<span class="result-count">${escapeHTML(t(count === 1 ? "placeCount" : "placesCount", { count: number(count) }))}</span>`,
    );
    document.getElementById("load-more").hidden =
      category === "Stay & Hotels" || results.length <= limit;
    updateFavCount();
    revealCards();
  }
  // Destination cards fade and rise in, one after another, each time the list is drawn.
  function revealCards() {
    const cards = grid.querySelectorAll(".destination-card");
    if (!cards.length) return;
    const show = () =>
      cards.forEach((card, i) => {
        card.style.transitionDelay = `${Math.min(i, 9) * 60}ms`;
        card.classList.add("revealed");
        card.addEventListener(
          "transitionend",
          () => {
            card.style.transitionDelay = "";
          },
          { once: true },
        );
      });
    if (typeof requestAnimationFrame === "function") requestAnimationFrame(show);
    else show();
  }
  function selectCategory(name) {
    itineraryIds = null;
    category = name;
    if (name === "Stay & Hotels") favouritesOnly = false;
    limit = 6;
    render();
  }
  function reset() {
    itineraryIds = null;
    category = "All Places";
    query = "";
    searchInput.value = "";
    favouritesOnly = false;
    limit = 6;
    render();
  }
  function renderDetails(d) {
    const place = localizedDestination(d),
      saved = favourites.has(d.id);
    document.getElementById("dialog-content").innerHTML =
      photo(d, true) +
      `<div class="modal-body"><div class="eyebrow">${escapeHTML(translations.ui[language].categories[d.category] || d.category)}</div><h2 id="dialog-title">${escapeHTML(place.name)}</h2><div class="card-location">${icon("pin")}${escapeHTML(place.location)}</div><p>${escapeHTML(place.description)}</p><div class="visitor-note"><strong>${escapeHTML(t("beforeYouGo"))}</strong><br>${escapeHTML(place.note)}</div><div class="modal-actions"><a class="btn" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(d.mapQuery)}" target="_blank" rel="noopener noreferrer">${icon("pin")}${escapeHTML(t("googleDirections"))} ${icon("external")}</a><button class="btn btn-outline" data-save="${escapeHTML(d.id)}" aria-pressed="${saved}">${icon("heart")}${escapeHTML(saved ? t("savedFavourites") : t("saveFavourites"))}</button><a class="btn btn-outline" href="${destinationHref(d.id)}" target="${destinationTarget()}">${escapeHTML(t("fullDestinationPage"))} ${icon("arrow")}</a></div><a class="photo-credit" href="${escapeHTML(d.source)}" target="_blank" rel="noopener noreferrer">${escapeHTML(t("destinationReference"))} ${icon("external")}</a>${d.image ? `<a class="photo-credit" href="${escapeHTML(d.photoSource || d.source)}" target="_blank" rel="noopener noreferrer">${escapeHTML(t("photograph"))}: ${escapeHTML(d.photoCredit || "Erode District tourism")} ${icon("external")}</a>` : ""}</div>`;
  }
  function openDetails(id) {
    const d = destinations.find((place) => place.id === id);
    if (!d) return;
    openedDestination = d;
    renderDetails(d);
    dialog.showModal();
    document.body.style.overflow = "hidden";
  }
  function closeDetails() {
    dialog.close();
  }
  dialog.addEventListener("close", () => {
    openedDestination = null;
    document.body.style.overflow = "";
  });
  dialog.querySelector(".modal-close").addEventListener("click", closeDetails);
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      const box = dialog.getBoundingClientRect();
      if (
        e.clientX < box.left ||
        e.clientX > box.right ||
        e.clientY < box.top ||
        e.clientY > box.bottom
      )
        closeDetails();
    }
  });
  document.addEventListener("click", (e) => {
    const target = e.target instanceof Element ? e.target : null;
    if (!target) return;
    const save = target.closest("[data-save]");
    if (save) {
      toggleFavourite(save.dataset.save);
      return;
    }
    const details = target.closest("[data-details]");
    if (details) {
      openDetails(details.dataset.details);
      return;
    }
    const filter = target.closest("[data-filter], [data-filter-category]");
    if (filter) {
      selectCategory(filter.dataset.filter || filter.dataset.filterCategory);
      if (filter.hasAttribute("data-filter-category"))
        document.getElementById("destinations").scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (target.closest("#clear-filters")) {
      if (category === "Stay & Hotels") {
        query = "";
        searchInput.value = "";
      } else reset();
      render();
    }
  });
  searchInput.addEventListener("input", () => {
    query = searchInput.value.trim().toLocaleLowerCase(language);
    limit = 20;
    render();
  });
  document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    query = searchInput.value.trim().toLocaleLowerCase(language);
    limit = 20;
    render();
    document.getElementById("destinations").scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("load-more").addEventListener("click", () => {
    limit += 6;
    render();
  });
  document.getElementById("view-all").addEventListener("click", () => {
    reset();
    limit = 20;
    render();
  });
  document.getElementById("theme-toggle").addEventListener("click", () => {
    theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    updateThemeToggle();
    try {
      localStorage.setItem(themeStorageKey, theme);
    } catch {
      notify(t("themeStorageBlocked"));
    }
  });
  document.getElementById("language-select").addEventListener("change", (event) => {
    const selected = event.currentTarget.value;
    if (!supportedLanguages.has(selected)) return;
    language = selected;
    applyStaticTranslations();
    try {
      localStorage.setItem(languageStorageKey, language);
    } catch {
      notify(t("languageStorageBlocked"));
    }
    query = searchInput.value.trim().toLocaleLowerCase(language);
    render();
    renderDestinationPage(destinations.find((d) => d.id === pageDestinationId));
    if (pageHotelId) renderHotelPage(hotels.find((hotel) => hotel.id === pageHotelId));
    if (openedDestination)
      renderDetails(destinations.find((d) => d.id === openedDestination.id) || openedDestination);
  });
  document.getElementById("favourites-nav").addEventListener("click", () => {
    favouritesOnly = !favouritesOnly;
    itineraryIds = null;
    category = "All Places";
    query = "";
    searchInput.value = "";
    limit = 20;
    render();
    document.getElementById("destinations").scrollIntoView({ behavior: "smooth" });
  });
  const menu = document.getElementById("menu-toggle"),
    nav = document.querySelector(".nav-links");
  menu.addEventListener("click", () => {
    const expanded = menu.getAttribute("aria-expanded") === "true";
    menu.setAttribute("aria-expanded", String(!expanded));
    menu.setAttribute("aria-label", t(expanded ? "openNavigation" : "closeNavigation"));
    nav.classList.toggle("open", !expanded);
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-label", t("openNavigation"));
      nav.querySelectorAll("a").forEach((link) => link.classList.toggle("active", link === a));
    }),
  );
  document.querySelectorAll(".itinerary-link").forEach((btn) =>
    btn.addEventListener("click", () => {
      favouritesOnly = false;
      query = "";
      searchInput.value = "";
      category = "All Places";
      itineraryIds = btn.dataset.stops.split(",");
      limit = 20;
      render();
      document.getElementById("destinations").scrollIntoView({ behavior: "smooth" });
    }),
  );
  render();
  renderDestinationPage(destinations.find((d) => d.id === pageDestinationId));
  if (pageHotelId) {
    renderHotelPage(hotels.find((hotel) => hotel.id === pageHotelId));
    document.querySelectorAll(".site-header .brand").forEach((link) => {
      link.href = "index.html#home";
    });
  }
  // The hosted page receives the public catalogue from its same-origin parent.
  // Opening these three files independently still uses the original offline list.
  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin || event.source !== window.parent) return;
    if (event.data?.type === "erode:destinations-error") {
      document.body.dataset.catalogueSource = "fallback";
      notify(t("connectionUnavailable"));
      return;
    }
    if (event.data?.type !== "erode:destinations") return;
    if (!validCatalogue(event.data.destinations)) {
      document.body.dataset.catalogueSource = "fallback";
      notify(t("informationUnavailable"));
      return;
    }
    // Catalogue photos point at the CDN; use the local copies in images/ instead.
    destinations = event.data.destinations.map((d) => ({
      ...d,
      category: normalizeDestinationCategory(d.category),
      image:
        d.image && d.image.startsWith("/__l5e/") ? `images/${d.image.split("/").pop()}` : d.image,
    }));
    destinations.forEach((d) => validIds.add(d.id));
    document.body.dataset.catalogueSource = "supabase";
    render();
    renderDestinationPage(destinations.find((d) => d.id === pageDestinationId));
    if (openedDestination) {
      const updated = destinations.find((d) => d.id === openedDestination.id);
      if (updated) {
        openedDestination = updated;
        renderDetails(updated);
      } else closeDetails();
    }
  });
  // Gentle motion: sections reveal as they scroll into view, stats count up,
  // and the header gains a soft shadow once the page is scrolled.
  const header = document.getElementById("site-header");
  window.addEventListener(
    "scroll",
    () => {
      if (header) header.classList.toggle("scrolled", window.scrollY > 8);
    },
    { passive: true },
  );
  (function initMotion() {
    const countUp = (el) => {
      const target = Number(el.dataset.count);
      if (!Number.isFinite(target) || el.dataset.counted) return;
      el.dataset.counted = "true";
      const tick = () => {
        let current = 0;
        const step = Math.max(1, Math.round(target / 24));
        const advance = () => {
          current = Math.min(target, current + step);
          el.textContent = String(current);
          if (current < target) requestAnimationFrame(advance);
        };
        advance();
      };
      if (typeof requestAnimationFrame === "function") tick();
      else el.textContent = String(target);
    };
    const runCounters = (root) =>
      root.querySelectorAll(".stat strong[data-count]").forEach(countUp);
    const targets = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("revealed"));
      runCounters(document);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("revealed");
          runCounters(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.2 },
    );
    targets.forEach((target) => io.observe(target));
  })();
})();
