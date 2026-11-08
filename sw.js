/* =====================================================================
   ADVENT CALENDAR — SERVICE WORKER (offline support)
   ---------------------------------------------------------------------
   Strategy:
   - App files (HTML/JS/CSS/content/images): NETWORK-FIRST, so edits and
     new images show up immediately when online; falls back to cache when
     offline. Only successful (200) responses are cached — never errors.
   - Google Fonts: cache-first (so Sinhala/Tamil fonts work offline).
   Bump CACHE_VERSION on any release so old caches are purged on activate.
   ===================================================================== */

const CACHE_VERSION = "advent-v11";

const APP_SHELL = [
  "./",
  "./index.html",
  "./css/style.css",
  "./content.js",
  "./js/i18n.js",
  "./js/calendar.js",
  "./js/app.js",
  "./manifest.webmanifest",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting()) // don't block install if an asset is missing
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Only cache real, successful, same-origin responses (never 404s/errors).
function cachePut(req, res) {
  if (res && res.ok && res.type !== "opaque") {
    const copy = res.clone();
    caches.open(CACHE_VERSION).then(c => c.put(req, copy)).catch(() => {});
  }
  return res;
}

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Google Fonts: cache-first (rarely change; needed offline).
  if (url.hostname.includes("fonts.googleapis.com") || url.hostname.includes("fonts.gstatic.com")) {
    event.respondWith(
      caches.open("advent-fonts").then(cache =>
        cache.match(req).then(hit =>
          hit || fetch(req).then(res => { if (res.ok) cache.put(req, res.clone()); return res; })
        )
      )
    );
    return;
  }

  // App files: network-first, fall back to cache when offline.
  event.respondWith(
    fetch(req)
      .then(res => cachePut(req, res))
      .catch(() => caches.match(req).then(hit =>
        hit || (req.mode === "navigate" ? caches.match("./index.html") : Response.error())
      ))
  );
});
