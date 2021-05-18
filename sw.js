/**
 * SW: Install (APP SHELL)
 * 
 */

 const CACHE_STATIC = 'static-v1';
 const CACHE_INMUTABLE = 'inmutable-v1';
 const CACHE_DYNAMIC = 'dynamic-v1';
 const CACHE_DYNAMIC_LIMIT = 50;
 
 // const cleanCache = (cacheName, numItems) => {
 //   caches.open(cacheName)
 //     .then(cache => {
 //       return cache.keys()
 //         .then(keys => {
 //           if(keys.length > numItems) {
 //             cache.delete(keys[0])
 //               .then(cleanCache(cacheName, numItems))
 //           }
 //         });
 //     })
 // }
 
 self.addEventListener('install', e => {
 
   const staticCacheResponse = caches.open(CACHE_STATIC)
     .then(caches => {
       return caches.addAll([
         '/',
         'css/style.css',
         'index.html',
         'pages/page2.html',
         'pages/offline.html',
         'pages/404.html',
         'images/image1.jpg',
         'images/not-image.png',
         'js/app.js',
         'favicon.ico',
         'manifest.json'
       ])
   })
 
   const inmutableCacheResponse = caches.open(CACHE_INMUTABLE)
     .then(caches => {
       return caches.addAll([
         'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
         'https://fonts.googleapis.com/css?family=Quicksand:300,400',
         'https://fonts.googleapis.com/css?family=Lato:400,300',
         'https://use.fontawesome.com/releases/v5.3.1/css/all.css',

         'https://fonts.gstatic.com/s/quicksand/v22/6xKtdSZaM9iE8KbpRA_hK1QNYuDyPw.woff2',
         'https://fonts.gstatic.com/s/lato/v17/S6uyw4BMUTPHjx4wXiWtFCc.woff2'
       ])
   })
 
   e.waitUntil(Promise.all([staticCacheResponse, inmutableCacheResponse]));
 
 });
 
 /**
  * SW: Activate (BORRAR CACHÉ OBSOLETO)
  */
 
 self.addEventListener('activate', e => {
   caches.keys().then(keys => {
     keys.forEach(key => {
       if(key !== CACHE_STATIC && key !== CACHE_INMUTABLE && key !== CACHE_INMUTABLE) {
         caches.delete(key);
       }
     });
   });
 });
 
 /**
  * SW: Fetch
  */
 
 // 1. Estrategia caché only
 //e.respondWith(caches.match(e.request));
 
 // 2. Estrategia caché with network fallback
 // const response = caches.match(e.request).then(res => {
 //   if(res) return res;
 
 //   return fetch(e.request).then(newRes => {
 //     caches.open(CACHE_DYNAMIC).then(cache => {
 //       cache.put(e.request, newRes)
 //     })
 //     return newRes.clone();
 //   })
 // })
 // e.respondWith(response);
 
 // 3. Estrategia network with caché fallback
 
 // const response = fetch(e.request).then((res) => {
 
 //   if(!res.ok) return caches.match(e.request);
   
 //   caches.open(CACHE_DYNAMIC)
 //     .then(cache => {
 //       cache.put(e.request, res.clone());
 //       cleanCache(CACHE_DYNAMIC, CACHE_DYNAMIC_LIMIT);
 //     });
 
 //   if(res) return res.clone();
 
 // })
 // .catch(() => {
 //   return caches.match(e.request);
 // })
 
 // e.respondWith(response);
 
 
 // self.addEventListener('fetch', e => {
 
 //   // 4. Estrategia cache with network update
 //   const response = caches.open(CACHE_STATIC).then(cache => {
 
 //     fetch(e.request).then(newRes => 
 //       cache.put(e.request, newRes));
 
 //     return cache.match(e.request);
 //   });
 
 //   e.respondWith(response);
 
 // });

self.addEventListener('fetch', e => {
  const response = caches.match(e.request).then(res => {
    if(res) return res;
  
    return fetch(e.request).then(newRes => {
      caches.open(CACHE_DYNAMIC).then(cache => {
        cache.put(e.request, newRes)
      })
      return newRes.clone();
    })
  })
  e.respondWith(response);
})
 
