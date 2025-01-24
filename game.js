let musicPlaying = false;
let musicBtn = document.querySelector(".musicc");
let p = document.querySelector(".musicc p");

musicBtn.addEventListener("click", () => {
    if (!musicPlaying) {
        music.play();
        p.innerHTML = "Music ON";   
        musicPlaying = true;
    } else {
        music.pause();
        p.innerHTML = "Music OFF";   
        musicPlaying = false;
    }
});

