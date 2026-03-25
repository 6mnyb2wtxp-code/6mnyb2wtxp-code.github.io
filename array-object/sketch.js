// Array/Object Notation Assignment
// Zeyad Mohamed
// March 5/26
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let playerSize = 50;
let spaceship = {
  x: mouseX - playerSize / 2,
  y: mouseY - playerSize / 2,
};

function preload() {
  spaceship = loadImage('spaceship.png');
  spaceshipTrail = loadImage('spaceshipTrail.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
};

function draw() {
  background(0);
  
  image(spaceship, spaceship.x, spaceship.y, playerSize, playerSize);
  image(spaceshipTrail);
}
