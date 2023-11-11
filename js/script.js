document.addEventListener('DOMContentLoaded', function () {
    const requestPermissionButton = document.getElementById('requestPermission');
    const notificationForm = document.getElementById('notificationForm');
    const showNotificationButton = document.getElementById('showNotification');
    const outputDiv = document.getElementById('output');

    let isNotificationPermissionGranted = false;

    // Check if notification permission is already granted
    if (Notification.permission === 'granted') {
        isNotificationPermissionGranted = true;
        showNotificationButton.style.display = 'block';
        requestPermissionButton.style.display = 'none';
    }

    // Request permission on button click
    requestPermissionButton.addEventListener('click', function () {
        Notification.requestPermission().then(function (permission) {
            if (permission === 'granted') {
                isNotificationPermissionGranted = true;
                showNotificationButton.style.display = 'block';
                requestPermissionButton.style.display = 'none';
            }
        });
    });

    // Show notification on button click
    showNotificationButton.addEventListener('click', function () {
        const title = document.getElementById('title').value;
        const body = document.getElementById('body').value;

        if (!title) {
            outputDiv.textContent = 'Please enter a title.';
            return;
        }

        const options = {
            body: body || '',
            actions: [
                { action: 'agree', title: 'Agree' },
                { action: 'disagree', title: 'Disagree' }
            ]
        };

        if (isNotificationPermissionGranted) {
            navigator.serviceWorker.ready.then(function (registration) {
                registration.showNotification(title, options);
            });
        }
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
