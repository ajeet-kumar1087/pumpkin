// --- Private Access Gate ---
const secretWord = "pumpkin"; // CHANGE THIS to your secret word!

const lockScreen = document.getElementById('lock-screen');
const passwordInput = document.getElementById('passwordInput');
const unlockBtn = document.getElementById('unlockBtn');
const errorMsg = document.getElementById('errorMsg');

function checkPassword() {
    const userInput = passwordInput.value.trim(); // Case sensitive? Add .toLowerCase() if you want

    if (userInput === secretWord) {
        // Correct Password!
        lockScreen.classList.add('fade-out');
        // Optional: Start background video if it was paused
        const bgVideo = document.querySelector('.bg-video');
        if (bgVideo) bgVideo.play();
    } else {
        // Wrong Password
        errorMsg.classList.remove('hidden');
        passwordInput.value = "";
        passwordInput.focus();
    }
}

// Event Listeners for Lock Screen
unlockBtn.addEventListener('click', checkPassword);

passwordInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// Togetherness Counter
// Set the date we met (YYYY, MM (0-indexed), DD)
// Change this date to your actual anniversary!
const startDate = new Date(2025, 1, 10).getTime(); // Feb 10, 2025

function updateTimer() {
    const now = new Date().getTime();
    const distance = now - startDate;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

setInterval(updateTimer, 1000);

// "No" Button Logic
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const celebration = document.getElementById('celebration');

function moveButton() {
    // Generate a random position between 10% and 85%
    // This keeps it safely away from the absolute edges
    const randomX = Math.floor(Math.random() * 75) + 10;
    const randomY = Math.floor(Math.random() * 75) + 10;

    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX}%`;
    noBtn.style.top = `${randomY}%`;
}

// Move on hover (desktop)
noBtn.addEventListener('mouseenter', moveButton);
// Move on click/tap (mobile) in case they manage to tap it
noBtn.addEventListener('click', moveButton);

// "Yes" Button Logic
yesBtn.addEventListener('click', () => {
    celebration.classList.remove('hidden');
    launchConfetti();
});

function launchConfetti() {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    // Heart shapes and romantic colors
    var defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 200, // Fixed: Now sits above the celebration screen
        shapes: ['heart'],
        scalar: 1.2, // Make hearts bigger
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7']
    };

    function randomInOut(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInOut(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInOut(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}
