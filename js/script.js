document.addEventListener('DOMContentLoaded', function () {
    const sendNotifBtn = document.getElementById('sendNotifBtn');
    const notificationForm = document.getElementById('notificationForm');
    const showNotificationButton = document.getElementById('showNotification');
    const titleInput = document.getElementById('title');
    const bodyInput = document.getElementById('body');
    const displayDiv = document.getElementById('displayDiv');

    let isNotificationPermissionGranted = false;

    notificationForm.style.display = "none";

    function checkNotificationPermission() {
        if (Notification.permission === "granted") {
            isNotificationPermissionGranted = true;
            notificationForm.style.display = "block";
            sendNotifBtn.style.display = 'none';
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    isNotificationPermissionGranted = true;
                    notificationForm.style.display = "block";
                    sendNotifBtn.style.display = 'none';
                }
            });
        }
    }

    checkNotificationPermission();

    // Request permission on button click
    sendNotifBtn.addEventListener('click', function () {
        Notification.requestPermission().then(function (permission) {
            if (permission === 'granted') {
                isNotificationPermissionGranted = true;
                notificationForm.style.display = "block";
                sendNotifBtn.style.display = 'none';
            }
        });
    });

    // Show notification on button click
    // Show notification on button click
showNotificationButton.addEventListener('click', function () {
    const title = titleInput.value;
    const body = bodyInput.value;

    if (title === "") {
        alert("Please enter a title.");
    } else {
        const options = {
            body: body,
            icon: '/logo.png',
            actions: [
                { 
                action: 'agree', 
                title: 'Agree' 
                },

                { 
                action: 'disagree', 
                title: 'Disagree' 
                }
            ]
        };

        // if granted send notification
        if (isNotificationPermissionGranted) {
            navigator.serviceWorker.ready.then(function (registration) {
                registration.showNotification(title, options);
                console.log("Notification Sent")
            });
        }
    }
});

    // Listen for postMessage
    navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('Message received from service worker:', event.data.message);
        displayDiv.innerText = event.data.message;
    });
});

// Service worker registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
        .then((registration) => {
            console.log('Registration successful. Scope is:', registration.scope);
        })
        .catch((error) => {
            console.log('Registration failed. Error:', error);
        });
} else {
    console.log("Service workers not supported");
}


