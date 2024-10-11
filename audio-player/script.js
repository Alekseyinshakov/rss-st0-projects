window.addEventListener("DOMContentLoaded", () => {
   let arrayOfSongs = [
      {  id: 2,
         group: 'Nikos Band',
         name: 'Georgian Disco',
         src: 'audio/Nikos Band - Georgia_Disco.mp3',
         background: 'img/vecherinka-na-zakate-2.webp',
         playerImg: 'img/nikos_band_-_georgian_disco.jpg'
      },
      {  id: 1,
         group: 'Lartiste',
         name: 'Clandestina(Emma Péters Cover & Edmofo Remix)',
         src: 'audio/Lartiste  - Clandestina (Emma Péters Cover & Edmofo Remix).mp3',
         background: 'img/tury-v-miami-17073221530345_w687h357.jpg',
         playerImg: 'img/clandestina2.jpg'
      },      
      {  id: 3,
         group: 'Twin & Elise Lieberth',
         name: 'In The End(Magic Cover Release)',
         src: 'audio/Twin & Elise Lieberth - In The End (Magic Cover Release).mp3',
         background: 'img/11_alpinesbor.jpg',
         playerImg: 'img/in_the_end.jpg'
      },
   ];

   let songCounter = 0;
   let isPlayed = false;
   let audio = new Audio();
   let isProgressChanging = false;

   const playBtn = document.querySelector('.play_pause');
   const prevBtn = document.querySelector('.prew');
   const nextBtn = document.querySelector('.next');
   const group = document.querySelector('.group');
   const songName = document.querySelector('.song-name');
   const songDuration = document.querySelector('.song-duration');
   const currentTime = document.querySelector('.current-time');
   const progress = document.querySelector('.progress');
   const imgComtainer = document.querySelector('.player__img-container');
   const vinil = document.querySelector('.vinil-container img');
   
  
   initSong(arrayOfSongs[0]);


   nextBtn.addEventListener('click', () => {
      nextSong();
   })

   prevBtn.addEventListener('click', () => {
      prewSong();
   })

   audio.addEventListener('ended', () => {
      nextSong();
   })

   playBtn.addEventListener('click', () => {
      if (audio.paused) {
         audio.play();
         isPlayed = true;
         vinil.style.animationPlayState = 'running'
         playBtn.innerHTML = '<img src="img/control-icons/free-icon-pause-8669602.png" alt="pause">'
      } else {
         audio.pause();
         isPlayed = false;
         vinil.style.animationPlayState = 'paused'
         playBtn.innerHTML = '<img src="img/control-icons/free-icon-play-8669619.png" alt="play">'
      }
   })

   progress.addEventListener('input', () => {
      isProgressChanging = true;
   });

   progress.addEventListener('change', () => {
      isProgressChanging = false;
      audio.currentTime = progress.valueAsNumber;
   })


   function initSong(song) {
      audio.src = song.src;
      songName.textContent = song.name;
      group.textContent = song.group;
      document.body.style.backgroundImage = `url(${song.background})`;
      imgComtainer.innerHTML = `<img src="${song.playerImg}" alt="song-img">`
      audio.addEventListener('loadedmetadata', () => {
         console.log('loadedmetadata');
         songDuration.textContent = secondsToTime(audio.duration);
         progress.setAttribute('max', Math.floor(audio.duration));
         progress.valueAsNumber = 0;
      });
      
      if (isPlayed) {
         audio.play();
      } 
   }

   function nextSong() {
      if (songCounter < arrayOfSongs.length - 1) {
         songCounter++;
      } else {
         songCounter = 0;
      }
      initSong(arrayOfSongs[songCounter]);
   }

   function prewSong() {
      if (songCounter > 0) {
         songCounter--;
      } else {
         songCounter = arrayOfSongs.length - 1;
      }
      initSong(arrayOfSongs[songCounter]);  
   }

   setInterval(() => {
      currentTime.textContent = secondsToTime(audio.currentTime);
      progress.setAttribute('value', Math.floor(audio.currentTime));
      if (!isProgressChanging) {
         progress.valueAsNumber = Math.floor(audio.currentTime);
      }
      console.dir(progress);
   }, 1000);
   
   function secondsToTime(sec) {
      let min = Math.floor(sec/60);
      let seconds = Math.floor(sec%60);
      return `${min}:${addZero(seconds)}`
   }

   function addZero(num) {
      if (num >= 10) {
         return num
      } else {
         return `0${num}`
      }
   }
});