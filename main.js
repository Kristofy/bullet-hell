let GameOver=false;

import generatePlayer from './player.js';
import generateProjectile from './projectile.js';

import './p5.min.js';


const instance = new p5((p)=>{

    window.p=p;
    let Player;
    let canvas;
    let player;
    let score;
    let time;
    let Projectile;
    let projectiles;
    let prec;
    p.preload = ()=>{
        Player = new generatePlayer(p);
        Projectile = new generateProjectile(p);
    }
    p.setup = ()=>{
        canvas=p.createCanvas(p.windowWidth,p.windowHeight);
        score=0;
        //window.canvas=canvas;
        //window.p=p;
        player=new Player(p.windowWidth/2,p.windowHeight/2,20,8,'w','s','a','d');
        //window.player=player;
        time=0;
        //window.reset=reset;
        projectiles=[];
        prec=0.3;
        //window.projectiles=projectiles;
        p.frameRate(60);
    }
    
    let reset = ()=>{
        //console.log("reset");
        score=0;
        time=0;
        GameOver=false;
        projectiles=[];
        player=new Player(p.windowWidth/2,p.windowHeight/2,20,8,'w','s','a','d');
        console.clear();
        p.loop();
    }
    p.windowResized = ()=> {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
    
    p.draw = ()=>{
        p.background(0);

        if(p.frameCount%30==0){
            let c=p.random(1);
            prec+=time/400;
            if(c<prec){
                let r=p.floor(p.random(4));
                switch(r){
                    case 0:
                        projectiles.push(new Projectile(p.random(p.width),-4,player.x,player.y,3,8,3600));
                    break;
                    case 1:
                        projectiles.push(new Projectile(p.width+4,p.random(p.height),player.x,player.y,3,8,3600));
                    break;
                    case 2:
                        projectiles.push(new Projectile(p.random(p.width),p.height+4,player.x,player.y,3,8,3600));
                    break;
                    case 3:
                        projectiles.push(new Projectile(-4,p.random(p.height),player.x,player.y,3,8,3600));
                    break;
                }
            }
        }
        for(let b of projectiles){
            b.update();
            b.show();
        }
        player.show();
        GameOver=player.update(projectiles);
        p.stroke(255);
        p.fill(255);
        p.textSize(15);
        p.textAlign(p.LEFT, p.TOP);
        if(p.frameCount%60==0){
            ++time;
        }
        score+=(player.projectiles.length+projectiles.length)/60;
        p.text(`Score:\t${p.round(score)}\t\t Bullets: \t${player.projectiles.length+projectiles.length}\t\t Play time: ${time} sec`,5,5);
    }
    p.mouseClicked = ()=>{

        if(GameOver){
            if(p.dist(p.mouseX,p.mouseY,p.width/2,p.height/2+70)<30){
                reset();
            }
        }else{
            score+=3;
            player.handleMouseInput();
        }
    }
    p.keyTyped = ()=>{
        //console.log("input: ",p.key,p.keyCode);
        player.handleInput(p.keyCode);
        if(p.keyCode==34){
            console.log(val);
            if(Number.isInteger(parseInt(val))){
                score=parseInt(val);
                console.log("csaltam...");
            } 
        }
    }   
   /* p.mouseDragged = ()=>{
        player.handleMouseInput();
    }*/
    p.keyReleased=()=>{
        player.endofInput(p.key.charCodeAt());
        //console.log("key released",p.key.charCodeAt());
    }


})




