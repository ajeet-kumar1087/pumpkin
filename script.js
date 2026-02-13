// --- Private Access Gate ---
const secretWord = "hernickname"; // CHANGE THIS to your secret word!
const userInput = prompt("Enter our secret word to enter our world ❤️");

if (userInput !== secretWord) {
    document.body.innerHTML = `
        <div style="background:#1a0a10; height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; color:#ff4d6d; font-family:sans-serif; text-align:center; padding:20px;">
            <h1 style="font-size:3rem;">🔒 Oops!</h1>
            <p style="font-size:1.5rem;">This space is only for my favorite person. 😉</p>
            <button onclick="location.reload()" style="margin-top:20px; padding:10px 20px; background:#ff4d6d; color:white; border:none; border-radius:50px; cursor:pointer;">Try Again ❤️</button>
        </div>
    `;
    window.stop(); // Stop execution of the rest of the scripts
}

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

    var interval = setInterval(function() {
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
