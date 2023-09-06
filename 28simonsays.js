let gameseq=[];
let userseq=[];

let btns=["red","blue","yellow","green"];

let started=false;
let level=0;
let highscore=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started=true;
    }
    levelUp();
});

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },220);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    },220);
}

function levelUp(){
    userseq=[];
    level++;
    if(level>highscore){
        highscore=level;
    }
    h2.innerText=`level ${level}`;

    let randomidx=Math.floor(Math.random()*4);
    let randomcolor=btns[randomidx];
    let randombtn=document.querySelector(`.${randomcolor}`);
    btnflash(randombtn);

    gameseq.push(randomcolor);
}

function btnpress(){
    userflash(this)

    usercolor=this.getAttribute("id");
    userseq.push(usercolor);

    checkans(userseq.length-1);
}

let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}

function checkans(idx){
    if(gameseq[idx]===userseq[idx]){
        if(gameseq.length==userseq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        h2.innerHTML=`Game Over !<br> Highscore was ${highscore}<br> Your Score was <b>${level}</b> <br> Press any key to Restart`;
        
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="darkorange";
        },220);
        reset();
    }
}

function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}