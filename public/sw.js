const CACHE_VERSION = "v2";
const STATIC_CACHE = `jo-tech-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `jo-tech-runtime-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  "/",
  "/offline",
  "/favicon.ico",
  "/favicon.png",
  "/apple-touch-icon.png",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/site.webmanifest",
];

// ======================================
// INSTALL
// ======================================

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );

  self.skipWaiting();
});

// ======================================
// ACTIVATE
// ======================================

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (
            key !== STATIC_CACHE &&
            key !== RUNTIME_CACHE
          ) {
            return caches.delete(key);
          }

          return Promise.resolve();
        })
      )
    )
  );

  self.clients.claim();
});

// ======================================
// FETCH
// ======================================

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Ignore browser extensions
  if (
    url.protocol !== "http:" &&
    url.protocol !== "https:"
  ) {
    return;
  }

  // Ignore non-GET API requests
  if (
    url.pathname.startsWith("/api") &&
    event.request.method !== "GET"
  ) {
    return;
  }

  event.respondWith(networkFirst(event.request));
});

// ======================================
// NETWORK FIRST
// ======================================

async function networkFirst(request) {
  try {
    const response = await fetch(request);

    if (
      response &&
      response.status === 200 &&
      response.type === "basic"
    ) {
      const cache = await caches.open(RUNTIME_CACHE);

      cache.put(
        request,
        response.clone()
      );
    }

    return response;
  } catch {
    const cached = await caches.match(request);

    if (cached) {
      return cached;
    }

    if (request.mode === "navigate") {
      const offline = await caches.match("/offline");

      if (offline) {
        return offline;
      }
    }

    return new Response(
      "Offline",
      {
        status: 503,
        statusText: "Offline",
      }
    );
  }
}