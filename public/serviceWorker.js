const TEST_WEB_CACHE = "test-web-cache"

self.addEventListener("activate", function () {
  console.log("ServiceWorker activated.")
})

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(TEST_WEB_CACHE).then(function (cache) {
      return cache.addAll([])
    })
  )
})
