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
const musiclist = document.querySelector(".music-list");
const showmusiclist = document.querySelector("#more-music");
const hidemusiclist = musiclist.querySelector("#close");

let musicIndex = 2;

//We call the function loadMusic once the window is loaded
window.addEventListener("load",()=>{
  loadMusic(musicIndex);
});

function loadMusic(index){
  musicname.textContent=AllMusic[index-1].name;
  musicartist.textContent=AllMusic[index-1].artist;
  musicimg.src=AllMusic[index-1].img;
  musicaudio.src=`songs/${AllMusic[index-1].src}.mp3`;
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
//now after the song ended , we will work on it based on the icon
musicaudio.addEventListener("ended",()=>{
  //after the song has ended which icon i have 
  let gettext = repeat.textContent;
  switch(gettext){
    //if its on repeat icon then we will go the next song
    case"repeat":
    nextMusic();
    break;
    // if its on repeat one we need to repeat the song
    case"repeat_one":
    musicaudio.currentTime=0;
    loadMusic(musicIndex);
    PlayMusic();
    break;
    //if its shuffle we generate a random number between 1 and the length of our music list
    case"shuffle":
    //we loop until we find an index thats not our current music index
    let randomindex;
    do{
      randomindex = Math.floor((Math.random()*AllMusic.length)+1);
    }while(musicIndex==randomindex);
    musicIndex=randomindex;
    loadMusic(musicIndex);
    PlayMusic();
    break;
  }
});
//display musiclist if we click on the moremusicbtn
showmusiclist.addEventListener("click",()=>{
  musiclist.classList.toggle("show");
});
hidemusiclist.addEventListener("click",()=>{
  showmusiclist.click();
});

//add the music list to our moremusiclist 
const ullist = musiclist.querySelector("ul");

for (i=0;i<AllMusic.length;i++){
  let limusic=document.createElement("li");
  limusic.innerHTML=`<div class="row">
            <span>${AllMusic[i].name}</span>
            <p>${AllMusic[i].artist}</p>
          </div>
          <audio class="${AllMusic[i].src}" src="songs/${AllMusic[i].src}.mp3"></audio>
          <span id="${AllMusic[i].src}">3:40</span>`;
  ullist.appendChild(limusic);
  let audiodurationspan = document.getElementById(`${AllMusic[i].src}`);
  let audioli = document.querySelector(`.${AllMusic[i].src}`);
  console.log(audiodurationspan);
  console.log(audioli);
  //set up the duration of each song to display on moremusiclist
  audioli.addEventListener("loadeddata",()=>{
    //loadeddata fires once to show the duration ..
    //set the duration in the form 0:00
    let audioduration=audioli.duration;
    const durationmin = Math.floor(audioduration/60);
    const durationsec = Math.floor(audioduration%60);
    audiodurationspan.textContent =`${durationmin}:${durationsec.toString().padStart(2,"0")}`;
  });
};


