// Array/Object Notation Assignment
// Zeyad Mohamed
// March 5/26
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let X = width/2;
let Y = length/2;
let playerSize = 50;
let redHeart;

redHeart = loadImage('red-heart.png');

function setup() {
  createCanvas(windowWidth, windowHeight);
};

function draw() {
  background(0);
  
  image(redHeart, mouseX, mouseY);
  
}
