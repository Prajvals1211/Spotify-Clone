// var dialog = document.getElementById('dialog1');
// document.getElementById('btn').addEventListener('click',()=>{
//         dialog.show()
//  })

// document.getElementById('btn1').addEventListener('click',()=>{
//     document.getElementById('nav').hidden=false;
//     document.getElementById('btn1').hidden = true;

// })

// to add dyanamically*************************************************
//     var div = document.createElement('div');
//     div.id = 'div11';
// div.className = 'songItem';
// document.getElementById('outerdiv').appendChild(div)
// var img = document.createElement('img')
// img.src = 'back1.webp';
// let div1 = document.getElementById('div11');
// div1.appendChild(img);
//      var span = document.createElement('span');
//      span.innerText = 'Yede Chale';
//      div1.appendChild(span);
//      var span1 = document.createElement('span');
//      span1.className = 'songListplay';
//      var span2 = document.createElement('span');
//      span2.className = 'timestamp'
//      span2.innerText = '3:00';
//      div1.appendChild(span1)
//      span1.appendChild(span2)
//      let i = document.createElement('i');
//      i.className='fa-solid fa-play';
//      span2.appendChild(i);
// ******************************************************************

console.log("prajvals");
async function songFetch (){
  try{
let songList = await fetch('songs.json');
const data = await songList.json();
return data;
  }catch(err){
    console.log(err);
  }
}

async function songslistFunc (){
this.songlistArray =   await songFetch();

songlistArray.forEach((element,i) => {
  // /console.log(element,i);
  document.getElementsByClassName('songImg')[i].src = songlistArray[i].coverpath;
  document.getElementsByClassName('songName')[i].innerText = songlistArray[i].songName;
  
});
// let songTime = [];
// for(let i=0;i<songlistArray.length;i++){
// let audioTime = new Audio(`songs/${songlistArray[i].Index}.mp3`);
// //let duration = parseFloat(audioTime.duration/60);
// }

}
songslistFunc();


let index = 1;
let myAudio = new Audio("songs/1.mp3");
let progressbar = document.getElementById("progressbar");
let play = document.getElementById("play1");
let backward = document.getElementById("backward");
let forward = document.getElementById("forward");
let gif = document.getElementById("gif");
let cover = document.getElementById('cover');
// let play = audio.play();
// play.then((data)=>{
//     console.log(data);
// }).catch((err)=>{
//     console.log(err);
// })
forward.addEventListener('click',()=>{

})
play.addEventListener("click", () => {
  if (myAudio.paused || myAudio.currentTime == 0) {
    myAudio.play();
    play.classList.remove("fa-play");
    play.classList.add("fa-pause");
    // if(myAudio.src.includes('4.mp3')){
    //   cover.style.backgroundImage = "url('covers/Asmita.enc')";
    // }
   // cover.style.backgroundImage = "url('covers/tere_pyar_main_cover.jpg')";
    gif.style.opacity = 1;
  } else {
    myAudio.pause();
    play.classList.remove("fa-pause");
    play.classList.add("fa-play");
    cover.style.backgroundImage = "url('back3.jpg')";
    gif.style.opacity = 0;
  }
  playPausebtn(index);
});

const playPausebtn = index =>{
  // if(myAudio.paused){
  //   document.getElementById('play1').classList.add("fa-play");
  //   document.getElementById('play1').classList.remove("fa-pause");
  // }
  if(document.getElementById(index).classList.value.includes("fa-pause")){
  document.getElementById(index).classList.remove("fa-pause");
  document.getElementById(index).classList.add("fa-play");
  document.getElementById('play1').classList.add("fa-play");
  document.getElementById('play1').classList.remove("fa-pause");
  //cover.style.backgroundImage = "url('back3.jpg')";
  }else{
    document.getElementById(index).classList.remove("fa-play");
    document.getElementById(index).classList.add("fa-pause");
    document.getElementById('play1').classList.remove("fa-play");
    document.getElementById('play1').classList.add("fa-pause");
   
  }
 // 
 let name = songlistArray.filter((e)=>{return e.Index == index})
 document.getElementById('songName1').innerHTML = name[0].songName
}
myAudio.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    let time = Math.floor((myAudio.currentTime/myAudio.duration)*100);
    // console.log(time)
  progressbar.value = time;
    //console.log(time);
if(myAudio.currentTime === myAudio.duration && index!=songlistArray.length){
  index = parseInt(index);
  playPausebtn(index);
index = index + 1;
playPausebtn(index);
myAudio.src = `songs/${index}.mp3`;
myAudio.play();
}
if(myAudio.currentTime === myAudio.duration && index === songlistArray.length){
  index = parseInt(index);
  playPausebtn(index);
  index = 1;
  playPausebtn(index);
  myAudio.src = `songs/${index}.mp3`;
  myAudio.play();
}
})

progressbar.addEventListener('change',()=>{
    myAudio.currentTime =progressbar.value * myAudio.duration/100;
})
const makeAllplay =()=>{
  Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
   
    element.classList.remove('fa-pause');
    element.classList.add('fa-play');  
  })
}

Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
  element.addEventListener('click',(e)=>{
    let a;
     index = e.target.id;
    if(e.target.classList.value.includes('fa-pause')){
      myAudio.pause();
      play.classList.remove("fa-pause");
    play.classList.add("fa-play");
       a = 'X';
    }else{
      myAudio.src = `songs/${index}.mp3`;
      myAudio.play();
      play.classList.remove("fa-play");
    play.classList.add("fa-pause");
      a='Y';
    }
    makeAllplay() 
    if(a == 'Y'){
      e.target.classList.remove('fa-play');
      e.target.classList.add('fa-pause');
    } 
  })
})
backward.addEventListener('click',()=>{
  if(index == 1){
    index = songlistArray.length;
  }else{
    index = parseInt(index);
    index = index - 1;
  }
  myAudio.src = `songs/${index}.mp3`;
  myAudio.play();
  makeAllplay();
  playPausebtn(index);

})

forward.addEventListener('click',()=>{
  if(index == songlistArray.length){
    index = 1;
  }else{
    index = parseInt(index);
    index = index + 1;
  }
  myAudio.src = `songs/${index}.mp3`;
  myAudio.play();
  makeAllplay();
  playPausebtn(index);
})