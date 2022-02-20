/*width=screen.width;
height=screen.height;
canvas_width=Math.floor(width/2.7);
canvas_height=Math.floor(height/1.9);
console.log(canvas_height);
console.log(canvas_width+","+canvas_height);
console.log(width);
console.log(height);*/
music_play=1;
songVolume=0.5;
var speed;

lwx="";
lwy="";
rwx="";
rwy="";
trueleftwristx="";
trueleftwristy="";
leftwristy_converted=0;
leftwrist_score="";
rightwrist_score="";
vol=0;
truerightwristx="";
truerightwristy="";

function setup() {
    canvas=createCanvas(500,400);
    canvas.position(450,100);
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw() {
    canvas_width=Math.floor(screen.width/2.7);
canvas_height=Math.floor(screen.height/1.9);
console.log(canvas_width+","+canvas_height);
    image(video,0,0,500,400);
    fill("red");
    trueleftwristx=lwx-100;
    trueleftwristy=lwy-80;
    truerightwristx=rwx-100;
    truerightwristy=rwy-80;
    circle(trueleftwristx,trueleftwristy,30);
    circle(truerightwristx,truerightwristy,30);
    if(leftwrist_score>0.5){
        leftwristy_converted=Math.floor(Number(lwy));
    vol=leftwristy_converted/500;
    document.getElementById("volume").innerHTML=vol;

    }
  //  console.log("volume is "+vol);
    music.setVolume(vol);
    believer.setVolume(vol);
    BornForThis.setVolume(vol);
    BringThatFire.setVolume(vol);
    
   if(rightwrist_score>0.5){
       
       if(truerightwristy>=0 && truerightwristy<=100){
           speed=0.5;
           document.getElementById("speed").innerHTML="speed = "+speed;
       }
       else if(truerightwristx >=100 &&truerightwristy<=200){
           speed=1;
           document.getElementById("speed").innerHTML="speed = "+speed;
       }
       else if(truerightwristy>=200 && truerightwristy<=300){
           speed=1.5;
           document.getElementById("speed").innerHTML="speed = "+speed;
        
       }
       else if(truerightwristy>=300 && truerightwristy<=400){
           speed=2;
           document.getElementById("speed").innerHTML="speed = "+speed;
       }
   }

   music.rate(speed);
   believer.rate(speed);
   BornForThis.rate(speed);
   BringThatFire.rate(speed);
}
function preload(){
    music=loadSound("music.mp3");
    believer=loadSound("Believer.mp3");
    BornForThis=loadSound("BornForThis.mp3");
    BringThatFire=loadSound("BringThatFire.mp3");
}
function play_sound() {
    if(music_play==1){
    if(believer.isPlaying()){
        believer.stop();
    }
    if(BringThatFire.isPlaying){
        BringThatFire.stop();
    }
       
        music.play();    
        music.setVolume(vol);
        music.rate(speed);  
    }
    else if(music_play==2){
        if(music.isPlaying()){
            music.stop();
        }
        
        if(BornForThis.isPlaying()){
            BornForThis.stop();
        }
        believer.play();
        believer.setVolume(vol);
        believer.rate(speed);  
    }
    
    else if(music_play==3){
        if(believer.isPlaying()){
            believer.stop();
        }
        
        if(BringThatFire.isPlaying()){
            BringThatFire.stop();
        }
        BornForThis.play();
        BornForThis.setVolume(vol);
        BornForThis.rate(speed); 
    }
    else if(music_play==4){
        if(BornForThis.isPlaying()){
            BornForThis.stop();
        }
        if(music.isPlaying()){
            music.stop();
        }
        BringThatFire.play();
        BringThatFire.setVolume(vol);
        BringThatFire.rate(speed); 
    }
    
}

function stop_sound() {
    music.stop();
    believer.stop();
    BornForThis.stop();
    BringThatFire.stop();
}

function previous_sound() {
        
    if(music_play>0){
        music_play--;
        play_sound();
    }
    else if(music_play==0){
        music_play=4;
        play_sound();
            }
    
}


function next_sound() {
    if(music_play<5){
        music_play++;

    }
    else if(music_play==5){
        music_play=1;
    }
    play_sound();
}

function modelLoaded() {
    console.log("model is loaded");
}

function gotPoses(results) {
    if(results.length>0){
        console.log(results);
      lwx=results[0].pose.leftWrist.x;
      lwy=results[0].pose.leftWrist.y;
      rwx=results[0].pose.rightWrist.x;
      rwy=results[0].pose.rightWrist.y;
      //console.log("left wrist"+lwx+","+lwy);
      leftwrist_score=results[0].pose.keypoints[9].score;
      rightwrist_score=results[0].pose.keypoints[10].score;
    }
    
}