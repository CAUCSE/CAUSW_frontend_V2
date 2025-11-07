importScripts(
  'https://www.gstatic.com/firebasejs/11.3.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/11.3.0/firebase-messaging-compat.js',
);

self.addEventListener('install', function (event) {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {});

self.addEventListener('push', function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: '/images/signin-logo.png',
    tag: resultData.tag,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
