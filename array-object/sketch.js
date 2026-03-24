// Array/Object Notation Assignment
// Zeyad Mohamed
// March 5/26
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let playerSize = 50;
let spaceship;

function preload() {
  spaceship = loadImage('spaceship.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
};

function draw() {
  background(0);
  
  image(spaceship, mouseX - 50 / 2, mouseY - 50 / 2, 50, 50);
  
}
