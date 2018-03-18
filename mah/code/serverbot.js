var requirejs = document.createElement("script");
document.body.appendChild(requirejs);
requirejs.src = "https://www.gstatic.com/firebasejs/4.11.0/firebase.js";
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCEO_-VUeCxTRIfOrfmSpAupQr2EIn7MIk",
  authDomain: "notification-1234567.firebaseapp.com",
  databaseURL: "https://notification-1234567.firebaseio.com",
  projectId: "notification-1234567",
  storageBucket: "",
  messagingSenderId: "105207469163"
};
firebase.initializeApp(config);
function eventFire(el, etype) {
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}
var i = 1;
setInterval(function () {
    if (document.getElementById("startServerQueueBtn")) {
        var i = 2;
        eventFire(document.getElementById('startServerQueueBtn'), 'click');
        console.log("DEBUG: fired");
    }
    console.log("DEBUG: checked");
}, 500);
