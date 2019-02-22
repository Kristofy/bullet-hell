import generatePlayer from './player.js';
import './p5.min.js';

const instance = new p5((p)=>{
    
    let Player;
    let canvas;
    let player
    p.preload = ()=>{
        Player = new generatePlayer(p);
    }
    p.setup = ()=>{
        canvas=p.createCanvas(p.windowWidth,p.windowHeight);
        window.canvas=canvas;
        player=new Player(200,200,20,8,'w','s','a','d');
        window.player=player;
        p.frameRate(60);
    }
    
    p.windowResized = ()=> {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
    
    p.draw = ()=>{
        p.background(0);
        player.show();
        player.update();
    }
    p.mouseClicked = ()=>{
        player.handleMouseInput();
    }
    p.keyTyped = ()=>{
        console.log("input: ",p.key,p.keyCode);
        player.handleInput(p.keyCode);

    }    
    p.mouseDragged = ()=>{
        player.handleMouseInput();
    }
    p.keyReleased=()=>{
        player.endofInput(p.key.charCodeAt());
        console.log("key released",p.key.charCodeAt());
    }


})



