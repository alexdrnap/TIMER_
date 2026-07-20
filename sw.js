/* TIMER_ service worker — offline app shell (your task data lives in your chosen folder, not here) */
const CACHE = "timer_-v28";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;                 // ignore cross-origin
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return resp;
    }).catch(() => caches.match("./index.html")))
  );
});

/* status-notification actions: tell the app to stop, and focus it */
self.addEventListener("notificationclick", e => {
  const action = e.action;
  if (action === "stop") e.notification.close();
  e.waitUntil((async () => {
    const cs = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of cs) { c.postMessage({ type: "notif-action", action }); if ("focus" in c) { try { await c.focus(); } catch (x) {} } }
    if (!cs.length && action !== "stop") { try { await self.clients.openWindow("./"); } catch (x) {} }
  })());
});
