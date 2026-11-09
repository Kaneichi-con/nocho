// 電波の無い現場でも開けるよう、画面一式をスマホに保存しておく
const CACHE = "nocho-v5";
const FILES = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png"];
self.addEventListener("install", (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES))));
self.addEventListener("activate", (e) => e.waitUntil(
  caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))));
// 通信できればいつも最新の画面、できなければ保存しておいた画面
self.addEventListener("fetch", (e) => e.respondWith(
  fetch(e.request).then((r) => { const c = r.clone(); caches.open(CACHE).then((x) => x.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }))));
