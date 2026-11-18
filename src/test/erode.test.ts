import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { beforeEach, describe, expect, it, vi } from "vitest";

const html = readFileSync("public/erode/index.html", "utf8");
const translationScript = readFileSync("public/erode/translations.js", "utf8");
const hotelScript = readFileSync("public/erode/hotels.js", "utf8");
const script = readFileSync("public/erode/script.js", "utf8");
type SeedDestination = {
  id: string;
  name: string;
  location: string;
  mapQuery: string;
  category: string;
};
const seed = runInNewContext(script.match(/let destinations = (\[[\s\S]*?\]);/)?.[1] ?? "[]") as
  SeedDestination[];
function firstSeed(): SeedDestination {
  const first = seed.at(0);
  if (!first) throw new Error("Expected the Erode fallback catalogue to include destinations.");
  return first;
}

function deliver(
  rows: unknown,
  origin = window.location.origin,
  source: Window | null = window.parent,
) {
  window.dispatchEvent(
    new MessageEvent("message", {
      origin,
      source,
      data: { type: "erode:destinations", destinations: rows },
    }),
  );
}

function start() {
  document.documentElement.innerHTML = html;
  window.eval(translationScript);
  window.eval(hotelScript);
  window.eval(script);
}

describe("Erode destination rules", () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState({}, "", "/");
    HTMLElement.prototype.scrollIntoView = vi.fn();
    Object.defineProperty(window.HTMLDialogElement.prototype, "showModal", {
      configurable: true,
      value() {
        this.setAttribute("open", "");
      },
    });
  });

  it("includes the requested 20 destinations", () => {
    start();
    document.getElementById("view-all")?.click();
    expect(document.querySelectorAll(".destination-card")).toHaveLength(20);
  });

  it("keeps all category filters in the destinations section without hero shortcuts", () => {
    start();
    const expected = [
      "All Places",
      "Dams & Rivers",
      "Temples",
      "Nature & Wildlife",
      "Heritage & Culture",
      "Stay & Hotels",
    ];
    const filterButtons = Array.from(
      document.querySelectorAll<HTMLButtonElement>("#filters button"),
    );

    expect(document.getElementById("hero-categories")).toBeNull();
    expect(filterButtons.map((button) => button.dataset["filter"])).toEqual(expected);

    filterButtons.at(-1)?.click();
    expect(document.querySelectorAll(".hotel-card")).toHaveLength(5);
    expect(
      document.querySelector('[data-filter="Stay & Hotels"]')?.getAttribute("aria-pressed"),
    ).toBe("true");
  });

  it("normalizes legacy leisure rows without losing them in the shared category filters", () => {
    start();
    const legacyRows = seed.map((row) =>
      ["voc", "chillout"].includes(row.id) ? { ...row, category: "Leisure & Parks" } : row,
    );
    deliver(legacyRows);
    document.querySelector<HTMLButtonElement>('[data-filter="Nature & Wildlife"]')?.click();

    expect(
      Array.from(document.querySelectorAll(".destination-card h3")).map(
        (heading) => heading.textContent,
      ),
    ).toContain("VOC Park");
    expect(
      Array.from(document.querySelectorAll(".destination-card h3")).map(
        (heading) => heading.textContent,
      ),
    ).toContain("Chillout Theme Park");
    expect(
      Array.from(document.querySelectorAll(".destination-card .category-badge")).every((badge) =>
        badge.textContent?.includes("Nature & Wildlife"),
      ),
    ).toBe(true);
  });

  it("shows verified hotel listings without fictional sample data", () => {
    window.history.replaceState({}, "", "/?category=Stay%20%26%20Hotels");
    start();
    const names = Array.from(document.querySelectorAll(".hotel-card h3")).map(
      (heading) => heading.textContent,
    );
    expect(names).toEqual([
      "Hotel Atrium",
      "Hotel Turmeric",
      "D'Wayfarer Inn",
      "Hotel Kalyan",
      "Hotel Paviesh Park",
    ]);
    expect(document.querySelector("#destination-grid")?.textContent).not.toMatch(
      /Sample Riverside Retreat|Sample Kongu Hills Lodge|DEMO LISTING|Illustrative demo price/,
    );
    expect(document.querySelector("#destination-grid")?.textContent).toContain(
      "Contact hotel for details",
    );
    expect(
      document.querySelector<HTMLImageElement>('.hotel-card img[alt*="Hotel Atrium"]')?.src,
    ).toContain("hotelatriumerode.com/img/hotel_gallery/");
    expect(
      document.querySelector<HTMLAnchorElement>(
        '.hotel-card a[href*="resBooking"][href*="VEZX0913"]',
      )?.target,
    ).toBe("_blank");
  });

  it("shows official Hotel Kalyan details and working contact links without a claimed photo", () => {
    window.history.replaceState({}, "", "/?hotel=hotel-kalyan");
    start();
    const page = document.getElementById("destination-page");
    expect(document.body.classList.contains("hotel-view")).toBe(true);
    expect(page?.textContent).toContain("Hotel Kalyan");
    expect(page?.textContent).toContain("201 Mettur Road, Erode 638011");
    expect(page?.textContent).toContain("Double Super Deluxe A/C");
    expect(page?.textContent).toContain("Contact hotel for details");
    expect(page?.textContent).toContain("Official property photo not verified");
    expect(
      page?.querySelector<HTMLAnchorElement>('a[href="https://wa.me/919842864776"]'),
    ).not.toBeNull();
    expect(
      page?.querySelector<HTMLAnchorElement>('a[href="https://hotelkalyanlodge.com/#book"]'),
    ).not.toBeNull();
  });

  it("stores favourites in localStorage and restores them", () => {
    start();
    document.querySelector<HTMLButtonElement>('[data-save="kodiveri"]')?.click();
    expect(JSON.parse(localStorage.getItem("erode-explore-favourites-v1") ?? "[]")).toEqual([
      "kodiveri",
    ]);
    start();
    expect(document.querySelector('[data-save="kodiveri"]')?.getAttribute("aria-pressed")).toBe(
      "true",
    );
  });

  it("switches languages instantly and persists the selection", () => {
    start();
    const language = document.getElementById("language-select") as HTMLSelectElement;
    language.value = "ta";
    language.dispatchEvent(new Event("change"));

    expect(document.documentElement.lang).toBe("ta");
    expect((document.getElementById("language-select") as HTMLSelectElement | null)?.value).toBe(
      "ta",
    );
    expect(document.querySelector(".nav-links a")?.textContent).toBe("முகப்பு");
    expect(localStorage.getItem("erode-explore-language-v1")).toBe("ta");

    start();
    expect((document.getElementById("language-select") as HTMLSelectElement).value).toBe("ta");
    expect(document.querySelector(".nav-links a")?.textContent).toBe("முகப்பு");
  });

  it("defaults to light mode and persists theme changes", () => {
    start();
    const toggle = document.getElementById("theme-toggle") as HTMLButtonElement;

    expect(document.documentElement.dataset["theme"]).toBe("light");
    expect(toggle.getAttribute("aria-label")).toBe("Switch to dark mode");
    expect(toggle.getAttribute("aria-pressed")).toBe("false");
    toggle.click();
    expect(document.documentElement.dataset["theme"]).toBe("dark");
    expect(toggle.getAttribute("aria-label")).toBe("Switch to light mode");
    expect(toggle.getAttribute("aria-pressed")).toBe("true");
    expect(localStorage.getItem("erode-explore-theme-v1")).toBe("dark");

    start();
    expect(document.documentElement.dataset["theme"]).toBe("dark");
    (document.getElementById("theme-toggle") as HTMLButtonElement).click();
    expect(document.documentElement.dataset["theme"]).toBe("light");
    expect(localStorage.getItem("erode-explore-theme-v1")).toBe("light");
  });

  it("localizes the theme toggle label when the site language changes", () => {
    start();
    const language = document.getElementById("language-select") as HTMLSelectElement;
    const toggle = document.getElementById("theme-toggle") as HTMLButtonElement;

    for (const [code, label] of [
      ["ta", "இருள் பயன்முறைக்கு மாற்று"],
      ["ml", "ഡാർക്ക് മോഡിലേക്ക് മാറ്റുക"],
      ["hi", "डार्क मोड चालू करें"],
      ["en", "Switch to dark mode"],
    ] as const) {
      language.value = code;
      language.dispatchEvent(new Event("change"));
      expect(toggle.getAttribute("aria-label")).toBe(label);
      expect(toggle.title).toBe(label);
    }

    language.value = "hi";
    language.dispatchEvent(new Event("change"));
    toggle.click();
    expect(toggle.getAttribute("aria-label")).toBe("लाइट मोड चालू करें");
  });

  it("localizes all 20 destination cards and category controls in all supported languages", () => {
    start();
    document.getElementById("view-all")?.click();
    const language = document.getElementById("language-select") as HTMLSelectElement;

    for (const [code, sampleName, sampleCategory] of [
      ["ta", "கொடிவேரி அணை", "கோவில்கள்"],
      ["ml", "കൊടിവേരി അണക്കെട്ട്", "ക്ഷേത്രങ്ങൾ"],
      ["hi", "कोडिवेरी बाँध", "मंदिर"],
    ] as const) {
      language.value = code;
      language.dispatchEvent(new Event("change"));
      expect(document.querySelectorAll(".destination-card")).toHaveLength(20);
      expect(document.querySelector(".destination-card h3")?.textContent).toBe(sampleName);
      expect(document.querySelector('[data-filter="Temples"]')?.textContent).toContain(
        sampleCategory,
      );
      expect(document.querySelector(".guide h2")?.textContent).not.toBe("Your Erode travel guide");
      document.querySelector<HTMLButtonElement>('[data-filter="Temples"]')?.click();
      expect(document.querySelectorAll(".destination-card").length).toBeGreaterThan(0);
      expect(
        Array.from(document.querySelectorAll(".destination-card .category-badge")).every((badge) =>
          badge.textContent?.includes(sampleCategory),
        ),
      ).toBe(true);
      document.getElementById("view-all")?.click();
    }
  });

  it("searches localized destination names and keeps favourites and map directions available", () => {
    start();
    document.querySelector<HTMLButtonElement>('[data-save="kodiveri"]')?.click();
    const language = document.getElementById("language-select") as HTMLSelectElement;
    language.value = "hi";
    language.dispatchEvent(new Event("change"));
    const search = document.getElementById("search-input") as HTMLInputElement;
    search.value = "कोडिवेरी बाँध";
    search.dispatchEvent(new Event("input"));

    expect(document.querySelectorAll(".destination-card")).toHaveLength(1);
    expect(document.querySelector(".destination-card h3")?.textContent).toBe("कोडिवेरी बाँध");
    expect(document.querySelector('[data-save="kodiveri"]')?.getAttribute("aria-pressed")).toBe(
      "true",
    );

    window.history.replaceState({}, "", "/?destination=kodiveri");
    start();
    expect(document.querySelector("#destination-page h1")?.textContent).toBe("कोडिवेरी बाँध");
    expect(
      document.querySelector('#destination-page a[href^="https://www.google.com/maps/dir/"]')
        ?.textContent,
    ).toContain("रास्ता देखें");
  });

  it("replaces the hosted catalogue without duplicating its 20 places", () => {
    start();
    deliver(seed);
    deliver(seed);
    document.getElementById("view-all")?.click();
    expect(document.querySelectorAll(".destination-card")).toHaveLength(20);
    expect(document.body.dataset["catalogueSource"]).toBe("supabase");
  });

  it("translates Supabase catalogue rows by stable ID without changing map queries", () => {
    start();
    const language = document.getElementById("language-select") as HTMLSelectElement;
    language.value = "ml";
    language.dispatchEvent(new Event("change"));
    deliver(seed);
    document.getElementById("view-all")?.click();

    expect(document.querySelector(".destination-card h3")?.textContent).toBe("കൊടിവേരി അണക്കെട്ട്");
    expect(document.querySelector(".destination-card .card-description")?.textContent).toContain(
      "പച്ചപ്പിനാൽ",
    );
    document.querySelector<HTMLButtonElement>('[data-details="kodiveri"]')?.click();
    expect(document.querySelector("#dialog-title")?.textContent).toBe("കൊടിവേരി അണക്കെട്ട്");
    expect(
      document
        .querySelector('#dialog-content a[href^="https://www.google.com/maps/dir/"]')
        ?.getAttribute("href"),
    ).toContain(encodeURIComponent(firstSeed().mapQuery));
  });

  it("preserves a saved favourite and active search when hosted data arrives", () => {
    start();
    document.querySelector<HTMLButtonElement>('[data-save="kodiveri"]')?.click();
    const search = document.getElementById("search-input") as HTMLInputElement;
    search.value = "Kodiveri";
    search.dispatchEvent(new Event("input"));
    deliver(seed);
    expect(document.querySelectorAll(".destination-card")).toHaveLength(1);
    expect(document.querySelector('[data-save="kodiveri"]')?.getAttribute("aria-pressed")).toBe(
      "true",
    );
  });

  it("rejects catalogue messages from other websites", () => {
    start();
    deliver([], "https://untrusted.example");
    document.getElementById("view-all")?.click();
    expect(document.querySelectorAll(".destination-card")).toHaveLength(20);
  });

  it("rejects catalogue messages not sent by the parent", () => {
    start();
    deliver([], window.location.origin, null);
    document.getElementById("view-all")?.click();
    expect(document.querySelectorAll(".destination-card")).toHaveLength(20);
  });

  it("keeps the fallback catalogue when remote rows contain duplicate IDs", () => {
    start();
    deliver([firstSeed(), firstSeed()]);
    document.getElementById("view-all")?.click();
    expect(document.querySelectorAll(".destination-card")).toHaveLength(20);
    expect(document.body.dataset["catalogueSource"]).toBe("fallback");
  });

  it("rejects executable links in destination data", () => {
    start();
    deliver([{ ...firstSeed(), source: "javascript:alert(1)" }]);
    document.getElementById("view-all")?.click();
    expect(document.querySelectorAll(".destination-card")).toHaveLength(20);
    expect(document.body.dataset["catalogueSource"]).toBe("fallback");
  });

  it("renders a reusable details page using the selected destination record", () => {
    for (const destination of seed) {
      window.history.replaceState({}, "", `/?destination=${destination.id}`);
      start();
      const page = document.getElementById("destination-page");
      expect(page?.hidden).toBe(false);
      expect(page?.querySelector("h1")?.textContent).toBe(destination.name);
      expect(page?.textContent).toContain(destination.location);
      expect(page?.textContent).toContain("Opening hoursNot listed");
      expect(page?.textContent).toContain("Entry feeNot listed");
      expect(
        page?.querySelector('a[href^="https://www.google.com/maps/dir/"]')?.textContent,
      ).toContain("Get Directions");
      page?.querySelector<HTMLButtonElement>('[data-save="kodiveri"]')?.click();
      if (destination.id === "kodiveri") {
        expect(page?.querySelector('[data-save="kodiveri"]')?.getAttribute("aria-pressed")).toBe(
          "true",
        );
      }
    }
  });

  it("keeps a requested destination visible when the hosted catalogue is unavailable", () => {
    window.history.replaceState({}, "", "/?destination=kodiveri");
    start();
    window.dispatchEvent(
      new MessageEvent("message", {
        origin: window.location.origin,
        source: window.parent,
        data: { type: "erode:destinations-error" },
      }),
    );

    expect(document.getElementById("destination-page")?.querySelector("h1")?.textContent).toBe(
      "Kodiveri Dam",
    );
    expect(document.body.dataset["catalogueSource"]).toBe("fallback");
  });

  it("keeps the existing detail dialog and offers its full destination page", () => {
    start();
    document.querySelector<HTMLButtonElement>('[data-details="kodiveri"]')?.click();
    expect(
      document.querySelector('#dialog-content a[href="?destination=kodiveri"]')?.textContent,
    ).toContain("Full destination page");
  });
});
