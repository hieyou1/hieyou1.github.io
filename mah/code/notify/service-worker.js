"use strict";

var url = [];
var count = 0;

self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting()); //will install the service worker
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim()); //will activate the serviceworker
});

// Register event listener for the 'notificationclick' event.
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      type: "window"
    })
    .then(function(clientList) {

      if (clients.openWindow) {
        var c = count;
        count++;
        return clients.openWindow(url[c]);
      }
    })
  );

});


self.addEventListener('push', function(event) {
  event.waitUntil(
    self.registration.pushManager.getSubscription()
    .then(function(subscription) {

      console.log("subscription", subscription);

      var payload = event.data ? JSON.parse(event.data.text()) : {
        title: 'Cronj IT Technoliges Pvt Ltd',
        body: 'CronJ combines the power of creativity and experience to employ a highly skilled team of Information Technology professionals who provide high-quality, high-value custom IT solutions to a variety of business enterprises.',
        icon: 'https://static.cronj.com/img/logos/cronj-logo.png',
        url: 'https://www.cronj.com'
      };


      url.push(payload.url);
      return self.registration.showNotification(payload.title, {
        body: payload.body,
        icon: payload.icon,
        tag: payload.url + payload.body + payload.icon + payload.title
      });


    })
  );
});
