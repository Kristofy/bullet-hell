import generateProjectile from './projectile.js'
//import { GameOver } from './main.js';

export default function generatePlayer(p){
    const AVG_LIFESPAN=60*60;
     let Projectile=generateProjectile(p);
    return class Player {
        constructor(x,y,d=10,speed,up,down,left,rigth){
            this.x=x;
            this.y=y;
            this.d=d;
            this.r=d/2;
            this.xvel=0;
            this.yvel=0;
            this.SPEED = speed;
            this.projectiles=[];
            this.on=[false,false,false,false];
            this.controles=[up.charCodeAt(),down.charCodeAt(),left.charCodeAt(),rigth.charCodeAt()];
        }
        show(){
           p.ellipse(this.x,this.y,this.d);
               for(let p of this.projectiles){
                   p.show();
               }
        }
        update(pro){
            if(this.y-this.r+this.yvel>0){
                if(this.y+this.r+this.yvel<p.height){
                    this.y+=this.yvel;
                }else{
                    this.y=p.height-this.r;
                }
            }else{
                this.y=this.r;
            }
            if(this.x-this.r+this.xvel>0){
                if(this.x+this.r+this.xvel<p.width){
                    this.x+=this.xvel;
                }else{
                    this.x=p.width-this.r;
                }
            }else{
                this.x=this.r;
            }

            for(let i=this.projectiles.length-1;i>=0;--i){
                this.projectiles[i].update();
                if(this.projectiles[i].lifeSpan<1){
                    this.projectiles.splice(i,1);
                }else if(this.projectiles[i].lifeSpan<AVG_LIFESPAN-60&&p.dist(this.x,this.y,this.projectiles[i].pos.x,this.projectiles[i].pos.y)<this.r+this.projectiles[i].r){
                    p.background(0);
                    p.stroke(255);
                    p.fill(255);
                    p.textSize(50);
                    p.textAlign(p.CENTER, p.CENTER);
                    p.text('Game Over!',p.width/2,p.height/2);
                    p.textSize(30);
                    p.fill(100);
                    p.ellipse(p.width/2,p.height/2+70,60)
                    p.fill(255);
                    p.text('újra',p.width/2,p.height/2+70);
                    p.noLoop();
                    //console.log("fail");
                    p.noLoop()
                    return true;
                }
            }
            for(let i=pro.length-1;i>=0;--i){
                if(pro[i].lifeSpan<1){
                    pro.splice(i,1);
                }else if(p.dist(this.x,this.y,pro[i].pos.x,pro[i].pos.y)<this.r+pro[i].r){
                    p.background(0);
                    p.stroke(255);
                    p.fill(255);
                    p.textSize(50);
                    p.textAlign(p.CENTER, p.CENTER);
                    p.text('Game Over!',p.width/2,p.height/2);
                    p.textSize(30);
                    p.fill(100);
                    p.ellipse(p.width/2,p.height/2+70,60)
                    p.fill(255);
                    p.text('újra',p.width/2,p.height/2+70);
                    p.noLoop();
                    //console.log("fail");
                    p.noLoop()
                    return true;
                }
            }
            return false;
        }
        handleMouseInput(){
            //console.log("mouse clicked");
            this.fire();
        }
        fire(){
            this.projectiles.push(new Projectile(this.x,this.y,p.mouseX,p.mouseY,3,10,AVG_LIFESPAN));
        }
        handleInput(input){
            switch(input){
                case this.controles[0]:   // w -fel   
                    if(!this.on[0]){
                        // console.log("fel");
                        this.on[0]=true;
                        this.yvel-=this.SPEED;
                    }
                    break;
                case this.controles[1]:   // s -le
                    if(!this.on[1]){
                   // console.log("le");
                    this.yvel+=this.SPEED;
                    this.on[1]=true;
                    }
                    break;
                case this.controles[2]:    // a -balra
                    if(!this.on[2]){
                    // console.log("balra");
                    this.xvel-=this.SPEED;
                    this.on[2]=true;
                    }
                    break;
                case this.controles[3]:   // d -jobbra
                    if(!this.on[3]){
                    // console.log("jobbra");
                    this.xvel+=this.SPEED;
                    this.on[3]=true;
                    }
                    break;
            }

        }

        endofInput(input){
            switch(input){
                 //  Release
            case this.controles[0]:    // w -fel reseased
                 this.yvel+=this.SPEED;
                 this.on[0]=false;
                 break;
             case this.controles[1]:    // s -le released
                 this.yvel-=this.SPEED;
                 this.on[1]=false;
                 break;
             case this.controles[2]:    // a -balra released
                 this.xvel+=this.SPEED; 
                 this.on[2]=false;   
                 break;
             case this.controles[3]:    //d -jobbra released
                 this.xvel-=this.SPEED;    
                 this.on[3]=false;
                 break;
            }
        }
    }
}

