
const player = document.querySelector('.video-player-wrapper'),
      //video = document.querySelector('.my-video'),
      allVideo = player.querySelectorAll('.my-video'),
      toggle = document.querySelector('.toggle'),
      bigPlayButton = document.querySelector('.video-player-button-big'),
      progress = player.querySelector('.progress'),
      soundButton = player.querySelector('.sound'),
      soundProgress = player.querySelector('.sound-progress'),
      fullscreenButton = player.querySelector('.video-player-fullscreen'),
      playerControls = player.querySelector('.video-player-controls'),
      speed = player.querySelector('.speed'),
      videoSlides = player.querySelectorAll('.carousel-item');

let videoIndex = 0;
let video = allVideo[videoIndex];

window.onkeydown = function(e) {
  return !(e.keyCode == 32 && (e.target.type != 'text' && e.target.type != 'textarea'));
};

function togglePlay() {
  if (video.paused) {
    video.play();
    bigPlayButton.innerHTML = " "; 
  } else {
    video.pause();
    bigPlayButton.innerHTML = `<img src="./assets/video/play_btn_big.svg" alt="play">`;
  }
}

bigPlayButton.addEventListener('click', togglePlay);

function changeButton() { 
  if (this.paused) {
    toggle.innerHTML = `<img src="./assets/video/play.svg" alt="btn">`;
  }  else {
    toggle.innerHTML = `<img src="./assets/video/pause.svg" alt="btn">`;
  }
}

function videoProgress() {
  video.currentTime = (progress.value / 100) * video.duration;
}

function progressTimeUpdate() {
  const newTime = video.currentTime / video.duration * 100;
  progress.value = newTime;
  progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${newTime}%, #C4C4C4 ${newTime}%, #C4C4C4 100%)`;
}

function scrub(e) {
  console.log(e);
  let scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function videoMute() {  
  if (video.muted) {
    video.muted = false;
    soundButton.innerHTML = `<img src="./assets/video/volume.svg" alt="sound">`;
    soundProgress.value = video.volume * 100; 
    soundProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${soundProgress.value}%, #C4C4C4 ${soundProgress.value}%, #C4C4C4 100%)`;
  } else {
    video.muted = true;
    soundButton.innerHTML = `<img src="./assets/video/mute.svg" alt="mute">`;
    soundProgress.value = 0; 
    soundProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${soundProgress.value}%, #C4C4C4 ${soundProgress.value}%, #C4C4C4 100%)`;
  }
}

function setVolume() {
  video.volume = soundProgress.value / 100;

  if (video.volume === 0) {
    video.muted = true;
    soundButton.innerHTML = `<img src="./assets/video/mute.svg" alt="mute">`;
    soundProgress.style.background = `#C4C4C4`;
  } 

  if (video.volume > 0) {
    video.muted = false;
    soundButton.innerHTML = `<img src="./assets/video/volume.svg" alt="sound">`;
    soundProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${soundProgress.value}%, #C4C4C4 ${soundProgress.value}%, #C4C4C4 100%)`;
  } 
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    fullscreenButton.innerHTML = `<img src="./assets/video/fullscreen.svg" alt="fullscreen"></img>`;
  } else {
    player.requestFullscreen();
    fullscreenButton.innerHTML = `<img src="./assets/video/fullscreen_exit.svg" alt="fullscreen">`;
  }
}

function hidePlayerControls() {
  playerControls.classList.add('hide');

  if (video.paused) {
    playerControls.classList.remove('hide');
  } 
}

function showPlayerControls() {
  playerControls.classList.remove('hide');
}

function videoSpeed() {
  video.playbackRate = speed.value;
}

const activeVideoSlide = (n) => { 

  for (let slide of videoSlides) {
    slide.classList.remove('active');
  } 

  videoSlides[n].classList.add('active');
}

const nextVideoSlide = () => {
  video.pause();

  if(videoIndex == videoSlides.length - 1) {  
    videoIndex = 0;
    activeVideoSlide(videoIndex);
    
  } else {
    videoIndex++;
    activeVideoSlide(videoIndex);
  }

  video = allVideo[videoIndex];
  videoMute();
  video.addEventListener('play', changeButton);
  video.addEventListener('pause', changeButton);
  bigPlayButton.innerHTML = `<img src="./assets/video/play_btn_big.svg" alt="play">`;
  video.addEventListener('timeupdate', progressTimeUpdate);
}

const prevVideoSlide = () => {
  video.pause();

  if (videoIndex == 0) { 
    videoIndex = videoSlides.length - 1;
    activeVideoSlide(videoIndex);
  } else {
    videoIndex--;
    activeVideoSlide(videoIndex);
  }

  video = allVideo[videoIndex];
  videoMute();
  video.addEventListener('play', changeButton);
  video.addEventListener('pause', changeButton);
  bigPlayButton.innerHTML = `<img src="./assets/video/play_btn_big.svg" alt="play">`;
  video.addEventListener('timeupdate', progressTimeUpdate);
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', changeButton);
video.addEventListener('pause', changeButton);
toggle.addEventListener('click', togglePlay);
 

progress.addEventListener('change', videoProgress);
progress.addEventListener('mousedown', progressTimeUpdate);
progress.addEventListener('click', scrub);
video.addEventListener('timeupdate', progressTimeUpdate);

soundButton.addEventListener('click', videoMute);
soundProgress.addEventListener('change', setVolume);

fullscreenButton.addEventListener('click', toggleFullscreen);

video.addEventListener('mouseenter', showPlayerControls);
video.addEventListener('mouseleave', hidePlayerControls);
playerControls.addEventListener('mouseenter', showPlayerControls);
playerControls.addEventListener('mouseleave', hidePlayerControls);



document.addEventListener('keyup', (e) => {    
  switch(e.code) {
    case 'Space':
      togglePlay();
      break;

    case 'KeyF':
      toggleFullscreen();
      break;

    case 'KeyM':
      videoMute();
      break;

    case 'Comma':
      video.playbackRate += 0.25;
      console.log(video.playbackRate);
      speed.value = video.playbackRate;
      break;

    case 'Period':
      video.playbackRate -= 0.25;
      console.log(video.playbackRate);
      speed.value = video.playbackRate;
      break;
      
    case 'KeyP':
      prevVideoSlide();
      break;
      
    case 'KeyN':
      nextVideoSlide();
      break;

    default:
      break;   
  }
});