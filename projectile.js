export default function generateProjectile(p){
    return class Projectile{
        constructor(_x,_y,dx,dy,s,d,lifeSpan){
            this.pos=new vector(_x,_y);
            let x=dx-this.pos.x;
            let y=dy-this.pos.y;
            this.speed=new vector(x,y);
            this.speed.normalise();
            this.speed.mult(s);
            this.d=d;
            this.r=d/2;
            this.s=lifeSpan;
            this.lifeSpan=lifeSpan;
        }
        update(){
            --this.lifeSpan;
            this.pos.add(this.speed);
            if(this.lifeSpan+60<this.s){
                if(this.pos.x<this.r||this.pos.x+this.r>p.width){
                    this.speed.x*= -1;
                }
                if(this.pos.y<this.r||this.pos.y+this.r>p.height){
                    this.speed.y*= -1;
                }
            }
        }
        show(){
            p.ellipse(this.pos.x,this.pos.y,this.d)
        }
    }
}

class vector{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    add(num){
        this.x+=num.x;
        this.y+=num.y;
    }
    mag(){
        Math.sqrt(this.x*this.x+this.y*this.y);
    }
    mult(num){
        this.x*=num;
        this.y*=num;
    }
    normalise(){
        this.mult(1/Math.sqrt(this.x*this.x+this.y*this.y));
    }
}