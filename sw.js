const CACHE_NAME = 'kaleo-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/icon-192.svg',
  '/icon-512.svg'
];

// Evento de instalação: armazena em cache o shell do aplicativo
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Failed to cache app shell:', error);
      })
  );
});

// Evento de ativação: limpa caches antigos
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento de busca: serve a partir do cache, recorrendo à rede e atualizando o cache (stale-while-revalidate)
self.addEventListener('fetch', event => {
  // Apenas solicitações GET são armazenadas em cache
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Para solicitações de navegação, use uma estratégia de "network-first" para obter o HTML mais recente.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('/index.html')) // Fallback para o shell do app se offline
    );
    return;
  }

  // Para todos os outros recursos (CSS, JS, imagens), use "stale-while-revalidate".
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // Verifica se recebemos uma resposta válida
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            cache.put(event.request, responseToCache);
          }
          return networkResponse;
        }).catch(error => {
          console.log('Fetch failed; user is likely offline.', error);
          // Opcional: retornar um recurso de fallback offline genérico aqui
        });

        // Retorna a resposta em cache imediatamente se existir,
        // enquanto busca uma versão atualizada em segundo plano.
        return response || fetchPromise;
      });
    })
  );
});
