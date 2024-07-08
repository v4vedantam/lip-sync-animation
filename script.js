const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');
const playButton = document.getElementById('playButton');
const textInput = document.getElementById('textInput');
const speakButton = document.getElementById('speakButton');
const updateCharacterButton = document.getElementById('updateCharacter');

let isAnimating = false;
let currentFrame = 0;
const frameCount = 4;
const frameInterval = 100; // milliseconds

let character = {
    skinColor: '#ffdb99',
    eyeColor: '#000000',
    hairColor: '#8B4513'
};

// Initialize meSpeak
meSpeak.loadConfig("mespeak_config.json");
meSpeak.loadVoice("voices/en/en-us.json");

function drawFace() {
    // Draw face
    ctx.beginPath();
    ctx.arc(200, 200, 150, 0, Math.PI * 2);
    ctx.fillStyle = character.skinColor;
    ctx.fill();
    ctx.stroke();

    // Draw eyes
    ctx.beginPath();
    ctx.arc(150, 150, 20, 0, Math.PI * 2);
    ctx.arc(250, 150, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(150, 150, 10, 0, Math.PI * 2);
    ctx.arc(250, 150, 10, 0, Math.PI * 2);
    ctx.fillStyle = character.eyeColor;
    ctx.fill();

    // Draw hair
    ctx.beginPath();
    ctx.moveTo(50, 200);
    ctx.quadraticCurveTo(200, -50, 350, 200);
    ctx.fillStyle = character.hairColor;
    ctx.fill();
}

function drawMouth(frame) {
    ctx.beginPath();
    switch (frame) {
        case 0:
            ctx.arc(200, 250, 50, 0.1 * Math.PI, 0.9 * Math.PI);
            break;
        case 1:
            ctx.arc(200, 250, 60, 0.1 * Math.PI, 0.9 * Math.PI);
            break;
        case 2:
            ctx.arc(200, 250, 70, 0.1 * Math.PI, 0.9 * Math.PI);
            break;
        case 3:
            ctx.arc(200, 250, 60, 0.1 * Math.PI, 0.9 * Math.PI);
            break;
    }
    ctx.stroke();
}

function animate() {
    if (!isAnimating) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFace();
    drawMouth(currentFrame);

    currentFrame = (currentFrame + 1) % frameCount;
    setTimeout(animate, frameInterval);
}

function speak(text) {
    isAnimating = true;
    playButton.textContent = 'Stop';
    animate();

    meSpeak.speak(text, {}, function() {
        isAnimating = false;
        playButton.textContent = 'Play';
    });
}

playButton.addEventListener('click', () => {
    isAnimating = !isAnimating;
    playButton.textContent = isAnimating ? 'Stop' : 'Play';
    if (isAnimating) {
        animate();
    }
});

speakButton.addEventListener('click', () => {
    const text = textInput.value;
    if (text) {
        speak(text);
    }
});

updateCharacterButton.addEventListener('click', () => {
    character.skinColor = document.getElementById('skinColor').value;
    character.eyeColor = document.getElementById('eyeColor').value;
    character.hairColor = document.getElementById('hairColor').value;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFace();
    drawMouth(0);
});

// Initial draw
drawFace();
drawMouth(0);