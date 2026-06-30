// overwrite space list widget in the homepage, add h2 to location names
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".s-lc-content-sp-eqlist");
  if (!container) return;

  const listContainer = container.querySelector(
    "div:not(.s-lc-content-eqlist-intro)",
  );
  if (!listContainer) return;

  listContainer.childNodes.forEach(function (node) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      const h2 = document.createElement("h2");
      h2.classList.add("t-title-small", "s-margin-heading-small");
      h2.textContent = node.textContent.trim();
      node.parentNode.replaceChild(h2, node);
    }
  });
});

// move h1 heading to the top of the page
document.addEventListener("DOMContentLoaded", function () {
  const sourceContainer = document.querySelector("#col1 .s-lc-c-r");
  const target = document.getElementById("s-lc-public-pd");
  if (!sourceContainer || !target) return;

  const erc = sourceContainer.querySelector(".s-lc-c-erc");

  const firstChild = target.firstChild;

  if (erc) target.insertBefore(erc, firstChild);
});

// remove event card view from the url, and redirect to the list view immediately.
(function () {
  if (
    window.location.origin + window.location.pathname ===
    "https://umd.libcal.com/calendar/events"
  ) {
    const url = new URL(window.location.href);
    if (url.searchParams.get("t") === "g") {
      url.searchParams.delete("t");
      window.location.replace(url.toString());
    }
  }
})();

// remove inline styles from event boxes in the event detail page, which are added by libcal and override our CSS
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(
      "div#umdlib-event-detail p[style], div#umdlib-event-detail span[style], div.s-lc-content-text p[style], div.s-lc-content-text span[style]",
    )
    .forEach(function (el) {
      el.removeAttribute("style");
    });
});
