var backgroundDegrees = 0;
var startTimestamp = +Date.now();
var lastTimestamp = startTimestamp;

function gradient() {
    lastTimestamp = startTimestamp;
    startTimestamp = +Date.now();
    backgroundDegrees -= ((startTimestamp - lastTimestamp) / (80 + (Math.random() * 20)));
    backgroundDegrees %= 360;
    document.body.style.background = `linear-gradient(${backgroundDegrees}deg, rgb(3, 0, 14) 0%, rgb(9, 3, 24) 100%)`;
    requestAnimationFrame(gradient);
}

requestAnimationFrame(gradient);