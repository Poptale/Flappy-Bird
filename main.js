let dieAudio = new Audio("Audios/sfx_hit.wav");
let music = new Audio("Audios/bgm_mario.mp3");
let hoverSound = new Audio("Audios/hover.mp3");
let character = document.querySelector(".character");
let block = document.querySelector(".block");
let hole = document.querySelector(".hole");
let play = document.querySelector(".play");
let score = document.querySelector(".score");
let jumps = document.querySelector(".jumps");
let time = document.querySelector(".time");
let btns = document.querySelectorAll("button");
let titlee = document.querySelector(".mainScore");
let points = 0;
let player = true;
let jumpCount = 0;
let seconds = 0;
let isJumping = false;

btns.forEach(btn => {
    btn.addEventListener("mouseover", () => {
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
    if ((blockLeft <= 80 && blockLeft >= 50) && !(characterTop >= holeTop && characterTop <= (holeTop + 200))) {
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