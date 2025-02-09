self.addEventListener("push", function (event) {
  const { title, message } = event.data.json();
  const options = {
    body: message,
    icon: "/app-icon/ios/192.png",
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
