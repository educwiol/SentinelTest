var backgroundDegrees = 0;
var startTimestamp = +Date.now();
var lastTimestamp = startTimestamp;

function gradient() {
    lastTimestamp = startTimestamp;
    startTimestamp = +Date.now();
    backgroundDegrees -= ((startTimestamp - lastTimestamp) / (80 + (Math.random() * 20)));
    backgroundDegrees %= 360;
    document.body.style.background = `linear-gradient(${backgroundDegrees}deg,rgb(255, 255, 255) 0%,rgb(175, 214, 255) 100%)`;
    requestAnimationFrame(gradient);
}

requestAnimationFrame(gradient);