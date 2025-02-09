self.addEventListener("install", function (event) {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: "/images/signin-logo.png",
    tag: resultData.tag,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
