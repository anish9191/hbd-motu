// ---------- Media Paths ----------
const photos = [
  "images/photo1.jpg",
  "images/photo2.jpg",
  "images/photo3.jpg",
  "images/photo4.jpg",
  "images/photo5.jpg"
];
const musicFile = "music/song.mp3";
const videoFile = "video/short_clip.mp4";
const longVideoFile = "video/long_video.mp4";

// ---------- Decorations ----------
const flowerEmojis = ["🌸", "🌷", "🌹", "🌼", "💮"];
const animalEmojis = ["🐰", "🐻", "🐱", "🐥", "🦊", "🐶"];
const decorations = document.getElementById("decorations");
// ----- MUSIC SETUP -----
const music = document.getElementById("bgMusic");
music.src = "music/song.mp3";
music.volume = 0.0;
music.muted = false;

// Wait until user interacts once (click/tap/press key)
function enableMusic() {
  // Start playing
  music.play().then(() => {
    // Fade in
    let vol = 0.0;
    const fade = setInterval(() => {
      if (vol < 0.8) {
        vol += 0.05;
        music.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 300);
  }).catch(err => console.log("Music play failed:", err));

  // Remove this event listener after first interaction
  window.removeEventListener("click", enableMusic);
  window.removeEventListener("keydown", enableMusic);
  window.removeEventListener("touchstart", enableMusic);
}

// Add event listeners for first gesture
window.addEventListener("click", enableMusic);
window.addEventListener("keydown", enableMusic);
window.addEventListener("touchstart", enableMusic);


// ---------- Floating Decor ----------
function createDecorations() {
  setInterval(() => {
    const elem = document.createElement("div");
    elem.innerText = Math.random() > 0.5
      ? flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)]
      : animalEmojis[Math.floor(Math.random() * animalEmojis.length)];
    elem.style.left = Math.random() * 100 + "vw";
    elem.style.animationDuration = (Math.random() * 5 + 5) + "s";
    decorations.appendChild(elem);
    setTimeout(() => elem.remove(), 10000);
  }, 800);
}
createDecorations();

// ---------- Screen Control ----------
let current = 1;
function nextScreen(num) {
  document.getElementById(`screen${current}`).classList.remove("active");
  current = num;
  document.getElementById(`screen${current}`).classList.add("active");
  createHearts();

  if (current === 5) {
    fadeOutMusic();
    setTimeout(() => autoPlayVideoScreen(), 4000);
  }
}

// ---------- Hearts ----------
function createHearts() {
  for (let i = 0; i < 15; i++) {
    const h = document.createElement("div");
    h.classList.add("heart");
    h.innerText = "💖";
    h.style.left = Math.random() * 100 + "vw";
    h.style.animationDuration = Math.random() * 3 + 2 + "s";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 4000);
  }
}

// ---------- Slideshow ----------
const slideshow = document.getElementById("slideshow");
function startSlideshow() {
  photos.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    if (i === 0) img.style.display = "block";
    slideshow.appendChild(img);
  });
  const imgs = slideshow.getElementsByTagName("img");
  let photoIndex = 0;
  setInterval(() => {
    imgs[photoIndex].style.display = "none";
    photoIndex = (photoIndex + 1) % imgs.length;
    imgs[photoIndex].style.display = "block";
  }, 2000);
}
startSlideshow();

// ---------- Music Fade Out ----------
function fadeOutMusic() {
  let fade = setInterval(() => {
    if (music.volume > 0.05) {
      music.volume -= 0.05;
    } else {
      music.pause();
      clearInterval(fade);
    }
  }, 200);
}

// ---------- Videos ----------
function autoPlayVideoScreen() {
  if (current !== 5) return;
  nextScreen(6);
  const vp = document.getElementById("videoPlayer");
  vp.src = videoFile;
  vp.play();
  vp.onended = () => autoPlayLongVideo();
}

function autoPlayLongVideo() {
  nextScreen(7);
  const lv = document.getElementById("longVideo");
  lv.src = longVideoFile;
  lv.play();
}
