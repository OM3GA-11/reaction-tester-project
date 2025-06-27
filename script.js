const frontpage = document.querySelector(".front-page");
const pArea = document.querySelector(".playableArea");
const msg = document.querySelector(".playableArea .text");
const end = document.querySelector(".end-screen");
const rex = document.querySelector(".end-screen .reactionTime");
const play = document.querySelector(".end-screen .PLAYAGAIN");

let timer;
let greenshow;
let time1;
let waitingforstart;
let waitingforgreen;
let scores;


const init=() =>{
    greenshow = false;
    waitingforstart = false;
    waitingforgreen = false;
    scores=[];
};

init();

const setGreen=() => {
    pArea.style.backgroundColor="#32B41E";
    msg.innerHTML = "Click Now!!";
    greenshow = true;
    time1 = Date.now();


};

const startgame =() => {
    pArea.style.backgroundColor="#c1121f";
    msg.innerHTML = "Wait for the Green Colour";
    msg.style.color = "#fff";
    let randomNum = Math.floor(Math.random() *4000 + 3000);
    timer = setTimeout(setGreen,randomNum);
    waitingforstart = false;
    waitingforgreen = true;
    

   
};

frontpage.addEventListener("click", () =>{
    frontpage.classList.remove("active");
    startgame();
});

const endGame=() =>{
    end.classList.add("active");
    clearTimeout(timer);

    let total=0;
    scores.forEach((s)=> {
        total += s;   
    });

    let averagescore = Math.round(total/scores.length);

    rex.innerHTML = `${averagescore} ms`;
};





const display=(rt) =>{
    pArea.style.backgroundColor="#84AE92";
    msg.innerHTML = `<div class="reactionTime">${rt} ms</div> Click to continue!`;
    greenshow = false;
    waitingforstart = true;
    scores.push(rt);

    if(scores.length >=3){
        endGame(); 
    }

}
const displayTooSoon=() =>{
    pArea.style.backgroundColor="#84AE92";
    msg.innerHTML = "Too Soon!! Click to continue";
    waitingforstart = true;
    clearTimeout(timer);

};

pArea.addEventListener("click",() =>{
    if(greenshow){
        let time2=Date.now();
        let reaction_time = time2 - time1;
        display(reaction_time);
        return;
    }
    if(waitingforstart){
        startgame();
        return;
    }
    if(waitingforgreen){
        displayTooSoon();
    
    }
});

play.addEventListener("click",() =>{
    end.classList.remove("active");
    init();
    startgame();
});