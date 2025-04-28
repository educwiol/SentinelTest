
const gamesContainer = document.getElementById("game-container");

// FROM >> W chatgpt script - Mr. Gold

const motionMatchMedia = window.matchMedia("(prefers-reduced-motion)");
const THRESHOLD = 15;

function addCardAnimation(card) {
    let mouseX = 0;
    let mouseY = 0;
    let cardRect = null;
    let animationFrameId = null;
    let isHovering = false;
    let isClicked = false;

    function updateCardTransform() {
        if (!isHovering || !cardRect) return;

        const horizontal = (mouseX - cardRect.left) / cardRect.width;
        const vertical = (mouseY - cardRect.top) / cardRect.height;
        const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
        const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);
        const scale = isClicked ? 0.95 : 1.05;

        card.style.transform = `
            perspective(${cardRect.width}px) 
            rotateX(${rotateY}deg) 
            rotateY(${rotateX}deg) 

            scale(${scale})
        `;
        animationFrameId = null;
    }

    function handleHover(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(updateCardTransform);
        }
    }

    function resetStyles() {
        isHovering = false;
        isClicked = false;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        card.style.transform = `
            perspective(${cardRect.width}px) 
            rotateX(0deg) 
            rotateY(0deg) 
 
            scale(1)
        `;
        card.style.boxShadow = "none";
    }

    if (!motionMatchMedia.matches) {
        card.addEventListener("mouseenter", () => {
            cardRect = card.getBoundingClientRect();
            isHovering = true;
            card.style.boxShadow = "rgba(0, 0, 0, 0.233) 0px 0px 15px";
        });

        card.addEventListener("mousemove", handleHover);
        card.addEventListener("mouseleave", resetStyles);

        card.addEventListener("mousedown", () => {
            isClicked = true;
            updateCardTransform();
        });

        card.addEventListener("mouseup", () => {
            isClicked = false;
            updateCardTransform();
        });

        card.addEventListener("mouseleave", () => {
            isClicked = false;
        });
    }
}

function createGameElement({ imgSrc, textContent, blob }) {
    const gameDiv = document.createElement('div');
    gameDiv.className = 'game fade-in';
    gameDiv.id = "game";

    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'game-wrapper';

    const img = document.createElement('img');
    img.src = imgSrc;
    img.width = 200;
    img.height = 200;

    const paragraph = document.createElement('p');
    paragraph.textContent = textContent;

    wrapperDiv.appendChild(img);
    gameDiv.appendChild(wrapperDiv);
    gameDiv.appendChild(paragraph);

    addCardAnimation(img);

    gamesContainer.appendChild(gameDiv);

    wrapperDiv.addEventListener("mousedown", function() {
        window.location.href = `games/${blob}`
    })

    return gameDiv;
}

for(var i = 1; i < 700; i++) {
    var div = createGameElement({
        imgSrc: `https://yavuzceliker.github.io/sample-images/image-${i}.jpg`,
        textContent: Math.random().toString(),
        blob: "fishy"
    });
}