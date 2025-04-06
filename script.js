const wrapper = document.querySelector(".wrapper");
const musicimg = document.querySelector(".img-area img");
const musicname = document.querySelector(".song-details .name");
const musicartist = document.querySelector(".song-details .artist");
const musicaudio = document.querySelector("#main-audio");
const playpausebutton = document.querySelector(".play-pause");
const prevbutton = document.querySelector(".controls #prev");
const nextbutton = document.querySelector(".controls #next");
const progressbar = document.querySelector(".progress-bar");
const progressarea = document.querySelector(".progress-area");
const current = document.querySelector(".current");
const duration = document.querySelector(".duration");
const repeat = document.querySelector(".controls #repeat");

let musicIndex = 2;

//We call the function loadMusic once the window is loaded
window.addEventListener("load",()=>{
  loadMusic(musicIndex);
});

function loadMusic(index){
  musicname.textContent=AllMusic[index-1].name;
  musicartist.textContent=AllMusic[index-1].artist;
  musicimg.src=AllMusic[index-1].img;
  musicaudio.src=AllMusic[index-1].src;
}
//play music function
function PlayMusic(){
  wrapper.classList.add("paused");
  playpausebutton.querySelector("i").className="fa-solid fa-pause";
  musicaudio.play();
}
//pause music function
function PauseMusic(){
  wrapper.classList.remove("paused");
  playpausebutton.querySelector("i").className="fa-solid fa-play";
  musicaudio.pause();
}
//next music function
function nextMusic(){
  musicIndex++;
  musicIndex > AllMusic.length ? musicIndex=1 : musicIndex=musicIndex;
  loadMusic(musicIndex);
  PlayMusic();

}
//prev music function
function prevMusic(){
  musicIndex--;
  musicIndex < 1 ? musicIndex=AllMusic.length : musicIndex=musicIndex;
  loadMusic(musicIndex);
  PlayMusic();
}

// play or pause btn event
playpausebutton.addEventListener("click",event=>{
  const isMusicPaused = wrapper.classList.contains("paused");
  isMusicPaused ? PauseMusic() : PlayMusic();
  //if the wrapper does contain paused as class then we pause music
  // if its false we play music
})

//prev btn event
prevbutton.addEventListener("click",event=>{
  prevMusic();
});
//next btn event
nextbutton.addEventListener("click",event=>{
  nextMusic();
});


//the progress (time -duration) of the music thats playing
//timeupdate fires repeatdly to show the current time of the song
musicaudio.addEventListener("timeupdate",(event)=>{
  const currentTime = event.target.currentTime;
  const durationsong = (event.target.duration);
  let progressbarwidth = (currentTime/durationsong)*100;
  progressbar.style.width =`${progressbarwidth}%`
  //set the duration and current time of the current song
  musicaudio.addEventListener("loadeddata",()=>{
    //loadeddata fires once to show the duration ..
    //set the duration in the form 0:00
    let audioduration=musicaudio.duration;
    const durationmin = Math.floor(audioduration/60);
    const durationsec = Math.floor(audioduration%60);
    console.log(durationmin);
    console.log(durationsec);
    audioduration=`${durationmin}:${durationsec.toString().padStart(2,"0")}`;
    duration.textContent = audioduration;
  });
  //set the current time in the same form
  const currentmin = Math.floor(currentTime/60);
  const currentsec = Math.floor(currentTime%60);
  console.log(currentmin);
  console.log(currentsec);
  currentaudio=`${currentmin}:${currentsec.toString().padStart(2,"0")}`;
  current.textContent=currentaudio;
});
//the timer current and duration of song
progressarea.addEventListener("click",(e)=>{
  let totalwidth = progressarea.clientWidth;// all the with of my progress bar
  let currentclickwidth = e.offsetX;
  let duration = musicaudio.duration;
  musicaudio.currentTime=(currentclickwidth/totalwidth)*duration;
});
//repeat , shuffle songs
repeat.addEventListener("click",()=>{
  const repeattext= repeat.textContent;
  switch(repeattext){
    case"repeat":
    repeat.textContent="repeat_one";
    repeat.title="Song on repeat";
    break;
    case"repeat_one":
    repeat.textContent="shuffle";
    repeat.title="On Shuffle";
    break;
    case"shuffle":
    repeat.textContent="repeat";
    repeat.title="Playlist on repeat";
    break;
  }
});



