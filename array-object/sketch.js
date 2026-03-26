// Array/Object Notation Assignment
// Zeyad Mohamed
// March 5/26
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let playerSize = 60;
let x;
let y;
let speed;



function preload() {
  spaceship = loadImage('spaceship.png');
  spaceshipTrail = loadImage('spaceshipTrail.gif');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y= 200;
  speed= 3;
};


function draw() {
  background(0);
  

  

  image(spaceship, x - playerSize / 2, mouseY - playerSize / 2, playerSize, playerSize);
  image(spaceshipTrail, x - playerSize/1.4 , mouseY + playerSize/4 , playerSize * 1.5, playerSize * 1.5);

}

function keyIsDown() {
  if (key === 'a') {
    x -= speed;
  }
}