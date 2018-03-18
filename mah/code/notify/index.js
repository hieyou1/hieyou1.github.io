var endpoint;
var key;
var authSecret;

// Register a Service Worker.
navigator.serviceWorker.register('service-worker.js')
  .then(function(registration) {
    // Use the PushManager to get the user's subscription to the push service.

    //service worker.ready will return the promise once the service worker is registered. This can help to get rid of
    //errors that occur while fetching subscription information before registration of the service worker

    return navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
      return serviceWorkerRegistration.pushManager.getSubscription()
        .then(function(subscription) {

          // If a subscription was found, return it.
          if (subscription) {
            return subscription;
          }

          // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
          // send browser push notifications that don't have a visible effect for the user).
          return serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true
          });
        });

    });

  }).then(function(subscription) { //chaining the subscription promise object

    // Retrieve the user's public key.
    var rawKey = subscription.getKey ? subscription.getKey('p256dh') : '';
    key = rawKey ?
      btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) :
      '';
    var rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : '';
    authSecret = rawAuthSecret ?
      btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) :
      '';

    endpoint = subscription.endpoint;

    // Send the subscription details to the server using the Fetch API.

    fetch('/register', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        endpoint: subscription.endpoint,
        key: key,
        authSecret: authSecret,
      }),
    });

  });

// Ask the server to send the client a notification (for testing purposes, in real
// applications the notification will be generated by some event on the server).
document.getElementById('doIt').addEventListener('click', function() {

  fetch('/sendNotification', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      endpoint: endpoint,
      key: key,
      authSecret: authSecret,
      title: document.getElementById("notificationTitle").value,
      body: document.getElementById("notificationBody").value,
      icon: document.getElementById("notificationIcon").value,
      link: document.getElementById("notificationLink").value
    }),
  });
});
 
