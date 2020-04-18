var ship;
var shipimg;
var asteroids = [];
var kwikib = [];
var ass;
let bg;
var lasers= [];

function preload(){
  shipimg = loadImage('img/ship.png')
  kwikib[0] = loadImage('img/asteroid0.png');
  kwikib[1] = loadImage('img/asteroid1.png');
  kwikib[2] = loadImage('img/asteroid2.png');
  kwikib[3] = loadImage('img/asteroid3.png');
  kwikib[4] = loadImage('img/asteroid4.png');
  bg = loadImage('img/bg.jpg');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (var i=0; i<20; i++){
  asteroids.push(new Asteroid());
}

}

function draw() {
  background(bg);
  for (var i=0 ; i<lasers.length; i++){
    lasers[i].render();
    lasers[i].update();

  }
  ship.render()
  ship.turn();
  ship.update();
  ship.edges();
  for (var i=0 ; i<asteroids.length; i++){
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();

  }

 

}

function keyReleased(){
  ship.setRotation(0);
  ship.boosting(false)

}

function keyPressed(){
  if (key == ' '){
    lasers.push(new Laser(ship.pos, ship.heading));
  }else if (keyCode == RIGHT_ARROW){
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW){
    ship.setRotation(-0.1)
  }else if (keyCode == UP_ARROW){
    ship.boosting(true);
  }
}




function Asteroid(){
  this.pos = createVector(random(width),random(height));
  this.r = random(40,200);
  this.vel = p5.Vector.random2D();
  var r =floor(random(0, kwikib.length));

  this.update = function(){
    this.pos.add(this.vel);
  }


  this.render= function (){
    push();
    imageMode(CENTER)

    translate(this.pos.x, this.pos.y)
    image(kwikib[r], 0, 0,this.r,this.r)
    pop();
  }

  this.edges = function(){
    if (this.pos.x > width + this.r){
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r){
      this.pos.x = width +this.r;
    }

    if (this.pos.y > height + this.r){
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r){
      this.pos.y = height +this.r;
    }
  }
}


function Ship() {
  this.pos = createVector(width/2, height/2);
  this.r = 80;
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(1,0);
  this.isBoosting = false;


  this.boosting = function(b){
    this.isBoosting = b;
  }

  this.update = function(){
    if (this.isBoosting){
      this.boost();
    }
    this.pos.add(this.vel);

      this.vel.mult(0.97)
  }
  this.boost = function(){
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.5)
    this.vel.add(force);
  }
  

  this.render = function(){
    push();
    translate(this.pos.x, this.pos.y)
    imageMode(CENTER)
    rotate(this.heading + PI/2)
    image(shipimg, 0, 0,this.r,this.r+this.r*1/3)
    pop();
  }


  this.edges = function(){
    if (this.pos.x > width + this.r){
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r){
      this.pos.x = width +this.r;
    }

    if (this.pos.y > height + this.r){
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r){
      this.pos.y = height +this.r;
    }
  }


  this.setRotation = function(a){
    this.rotation = a;
  }

  
  this.turn = function(){
    this.heading+= this.rotation;
  }

}
function Laser(spos, angle){
  this.pos = createVector(spos.x, spos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.vel.mult(10);

  this.update = function(){
    this.pos.add(this.vel);
  }
  this.render = function(){
    push()
    stroke(255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y)
    pop()
  }

}