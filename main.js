let dieAudio = new Audio("Audios/sfx_hit.wav");
let music = new Audio("Audios/bgm_mario.mp3");
let hoverSound = new Audio("Audios/hover.mp3");
let coinAudio = new Audio("Audios/coinScore.mp3");
let character = document.querySelector(".character");
let block = document.querySelector(".block");
let block2 = document.querySelector(".block2");
let hole = document.querySelector(".hole");
let hole2 = document.querySelector(".hole2");
let hole3 = document.querySelector(".hole3");
let play = document.querySelector(".play");
let score = document.querySelector(".score");
let jumps = document.querySelector(".jumps");
let time = document.querySelector(".time");
let btns = document.querySelectorAll("button");
let titlee = document.querySelector(".mainScore");
let coin = document.querySelector(".coin");
let coinn = document.querySelector(".span");
let points = 0;
let player = true;
let jumpCount = 0;
let seconds = 0;
let isJumping = false;

const bird = document.querySelector('.bird');
const coins = document.querySelectorAll('.coin');

function checkCollision(bird, coin) {
    let birdRect = bird.getBoundingClientRect();
    let coinRect = coin.getBoundingClientRect();
    
    // Adding a small buffer to ensure consistent detection
    const buffer = 5;

    return (
        birdRect.left < coinRect.right - buffer &&
        birdRect.right > coinRect.left + buffer &&
        birdRect.top < coinRect.bottom - buffer &&
        birdRect.bottom > coinRect.top + buffer
    );
}

function handleCollision(coin) {
    coinAudio.currentTime = 0;
    coinAudio.play();
    coin.style.animation = 'none';
    coin.style.display = 'none';
    let coinCollected = 0;
    coinCollected++;
    coinn.innerHTML = coinCollected;

    setTimeout(() => {
        coin.style.display = 'block';
        coin.style.animation = 'coin-animation 3s linear infinite';
    }, 1000);
}

function updateGame() {
    coins.forEach(coin => {
        if (checkCollision(bird, coin) && coin.style.display !== 'none') {
            handleCollision(coin);
        }
    });

    requestAnimationFrame(updateGame);
}

// Start the game loop
updateGame();




btns.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
});

window.addEventListener("load", () => {
    music.loop = true;
    music.play();
});

hole.addEventListener("animationiteration", () => {
    let randomNumber = (Math.random() * 630);
    if (randomNumber > 430) {
        hole.style.top = `${randomNumber - 200}px`;
    } else {
        hole.style.top = `${randomNumber}px`;
    };
    points++;
    titlee.innerHTML = points;
});

hole2.addEventListener("animationiteration", () => {
    let randomNumber = (Math.random() * 630);
    if (randomNumber > 430) {
        hole2.style.top = `${randomNumber - 200}px`;
    } else {
        hole2.style.top = `${randomNumber}px`;
    };
    points++;
    titlee.innerHTML = points;
});

hole3.addEventListener("animationiteration", () => {
    let randomNumber = (Math.random() * 630);
    if (randomNumber > 430) {
        hole3.style.top = `${randomNumber - 200}px`;
    } else {
        hole3.style.top = `${randomNumber}px`;
    };
    points++;
    titlee.innerHTML = points;
});

setInterval(() => {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    if (characterTop >= 630) {
        player = false;
        dieAudio.currentTime = 0;
        dieAudio.play();
        document.querySelector(".game-wrapper").style.display = "none";
        document.querySelector(".game-over").style.display = "block";
        time.innerHTML = seconds;
        titlee.innerHTML = points;
        score.innerHTML = points;
    };
    if ((blockLeft <= 110 && blockLeft >= 10) && !(characterTop >= holeTop && characterTop <= (holeTop + 150))) {
        player = false;
        document.querySelector(".game-wrapper").style.display = "none";
        document.querySelector(".game-over").style.display = "block";
        time.innerHTML = seconds;
        titlee.innerHTML = points;
        score.innerHTML = points;
        dieAudio.currentTime = 0;
        dieAudio.play();
    };
    if (!isJumping) {
        character.style.top = `${characterTop + 4}px`;
    };
}, 10);


setInterval(() => {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block2).getPropertyValue("left"));
    let holeTop = parseInt(window.getComputedStyle(hole3).getPropertyValue("top"));
    if (characterTop >= 630) {
        player = false;
        dieAudio.currentTime = 0;
        dieAudio.play();
        document.querySelector(".game-wrapper").style.display = "none";
        document.querySelector(".game-over").style.display = "block";
        time.innerHTML = seconds;
        titlee.innerHTML = points;
        score.innerHTML = points;
    };
    if ((blockLeft <= 110 && blockLeft >= 10) && !(characterTop >= holeTop && characterTop <= (holeTop + 150))) {
        player = false;
        document.querySelector(".game-wrapper").style.display = "none";
        document.querySelector(".game-over").style.display = "block";
        time.innerHTML = seconds;
        titlee.innerHTML = points;
        score.innerHTML = points;
        dieAudio.currentTime = 0;
        dieAudio.play();
    };
}, 10);

setInterval(() => {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block3).getPropertyValue("left"));
    let holeTop = parseInt(window.getComputedStyle(hole2).getPropertyValue("top"));
    if (characterTop >= 630) {
        player = false;
        dieAudio.currentTime = 0;
        dieAudio.play();
        document.querySelector(".game-wrapper").style.display = "none";
        document.querySelector(".game-over").style.display = "block";
        time.innerHTML = seconds;
        titlee.innerHTML = points;
        score.innerHTML = points;
    };
    if ((blockLeft <= 110 && blockLeft >= 10) && !(characterTop >= holeTop && characterTop <= (holeTop + 150))) {
        player = false;
        document.querySelector(".game-wrapper").style.display = "none";
        document.querySelector(".game-over").style.display = "block";
        time.innerHTML = seconds;
        titlee.innerHTML = points;
        score.innerHTML = points;
        dieAudio.currentTime = 0;
        dieAudio.play();
    };
}, 10);


function jump(){
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop>6)&&(jumpCount<15)){
            character.style.top = (characterTop-10)+"px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping=0;
            jumpCount=0;
        }
        jumpCount++;
    },10);
};

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 32 || e.keyCode == 38) {
        jumpCount++;
        jumps.innerHTML = jumpCount;
        jump();
    };
});