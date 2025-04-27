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

//---------------------------------------------------------//

const buttons = document.querySelectorAll('.toggle');
const storageKey = 'selectedButton';

function setActive(buttonId) {
    sessionStorage.setItem(storageKey, buttonId);
    updateButtons();
}

function updateButtons() {
    const activeButton = sessionStorage.getItem(storageKey);

    buttons.forEach(button => {
        if (button.id === activeButton) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        setActive(button.id);
    });
});

// On page load
updateButtons();