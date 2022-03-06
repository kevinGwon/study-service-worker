const SERVICE_WORKER_CACHE = 'SERVICE_WORKER_CACHE';

//service worker가 install 될 때 event 발생
self.addEventListener('install', (event) => {
  console.log('Service worker Installing!');

  event.waitUntil(
    //cache 저장소 open
    caches.open(SERVICE_WORKER_CACHE).then((cache) => {
      //static 파일 cache!
      cache.addAll([
        '/',
        '/static/js/bundle.js',
        '/static/media/logo.6ce24c58023cc2f8fd88fe9d219db6c6.svg',
        '/manifest.json',
        '/favicon.ico',
      ]);
    })
  );
});

//service worker가 activate 되었을 때 이벤트 발생
self.addEventListener('activate', (event) => {
  console.log('Service worker Activating!');
  return self.clients.claim();
});

//fetch event listener
self.addEventListener('fetch', (event) => {
  console.log('Fetching somthing!!', event.request.url);
  // event.respondWith(fetch(event.request));

  event.respondWith(
    caches.match(event.request).then((res) => {
      if (res) {
        //cache에 있다면 cache된 데이터 제공
        return res;
      } else {
        //cache에 없다면 서버로 요청
        return fetch(event.request);
      }
    })
  );
});
