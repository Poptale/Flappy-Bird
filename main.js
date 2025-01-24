// variables for audios
let coinAudio = new Audio("Audios/coinScore.mp3");
let hoverSound = new Audio("Audios/hover.mp3");
let dieAudio = new Audio("Audios/sfx_hit.wav");
let music = new Audio("Audios/bgm_mario.mp3");

// variables for objects
let character = document.querySelector(".character");
let block3 = document.querySelector(".block3");
let block2 = document.querySelector(".block2");
let block = document.querySelector(".block");
let hole3 = document.querySelector(".hole3");
let hole2 = document.querySelector(".hole2");
const bird = document.querySelector('.bird');
let hole = document.querySelector(".hole");

// varibles for text
let titles = document.querySelectorAll(".mainScore");
let btns = document.querySelectorAll("button");
let score = document.querySelector(".score");
let jumps = document.querySelector(".jumps");
let coinn = document.querySelector(".span");
let play = document.querySelector(".play");
let coins = document.querySelectorAll(".coin");

// variables use in javascript
let isJumping = false;
let coinCollected = 0;
let player = true;
let jumpCount = 0;
let points = 0;


// function for checking collision b/w bird and coin
function checksCollision(bird, coin) {
    let birdRect = bird.getBoundingClientRect();
    let coinRect = coin.getBoundingClientRect();
    const buffer = 5;
    return (
        birdRect.left < coinRect.right - buffer &&
        birdRect.right > coinRect.left + buffer &&
        birdRect.top < coinRect.bottom - buffer &&
        birdRect.bottom > coinRect.top + buffer
    );
};


// function for handling coin display
function handleCollision(coin) {
    coinAudio.currentTime = 0;
    coinAudio.play();
    coin.style.animation = 'none';
    coin.style.display = 'none';
    coinCollected++;
    coinn.innerHTML = coinCollected;

    setTimeout(() => {
        coin.style.display = 'block';
        coin.style.animation = 'coin-animation 3s linear infinite';
    }, 1000);
};


// updating the game
function updateGame() {
    coins.forEach(coin => {
        if (checksCollision(bird, coin) && coin.style.display !== 'none') {
            handleCollision(coin);
            return;
        };
    });
    requestAnimationFrame(updateGame);
};
updateGame();


// play the audio when hover on buttons
btns.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
});


// plays background music on loading
window.addEventListener("load", () => {
    music.loop = true;
    music.play();
});


// adding event listners for each 3 holes
hole.addEventListener("animationiteration",()=> generateRandom(hole));
hole2.addEventListener("animationiteration",()=> generateRandom(hole2));
hole3.addEventListener("animationiteration",()=> generateRandom(hole3));


// function for generating random holes
function generateRandom(holes) {
    let randomNumber = (Math.random() * 630);
    if (randomNumber > 430) {
        holes.style.top = `${randomNumber - 200}px`;
        return;
    } else {
        holes.style.top = `${randomNumber}px`;
    };
    points++;
    titles.forEach(title => {
        title.innerHTML = points;
    });
};

// detects the collision b/w bird and block every 10 milisecond
setInterval(()=> checkCollision(block, hole) , 10);
setInterval(()=> checkCollision(block2, hole3) , 10);
setInterval(()=> checkCollision(block3, hole2) , 10);

function checkCollision(blocks, holes) {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(blocks).getPropertyValue("left"));
    let holeTop = parseInt(window.getComputedStyle(holes).getPropertyValue("top"));
    
    if (characterTop >= 630 || (blockLeft <= 110 && blockLeft >= 10) && !(characterTop >= holeTop && characterTop <= (holeTop + 150))) {
        player = false;
        document.querySelector(".game-wrapper").style.display = "none";
        document.querySelector(".game-over").style.display = "block";
        titles.forEach(title => {
            title.innerHTML = points;
        });
        score.innerHTML = points;
        dieAudio.currentTime = 0;
        dieAudio.play();
        return;
    };

    if (!isJumping) {
        character.style.top = `${characterTop + 2}px`;
        return;
    };
};

// adding event listner for the jump function
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 32 || e.keyCode == 38) {
            jump();
            return;
    };
});

// function that flys up the bird
function jump(){
    isjumping = true;
    let jumpCount = 0;
    let jumpInterval = setInterval(function(){
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

        if( (characterTop>6) && (jumpCount<15)){
            character.style.top = (characterTop - 13) + "px";
                jumpCount++;
                jumps.innerHTML = jumpCount;
                return;
        };

        if(jumpCount>20){
            clearInterval(jumpInterval);
            isjumping = false;
            jumpCount = 0;
            return;
        };
        jumpCount++;
    },10);
};