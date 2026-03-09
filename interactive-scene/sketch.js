// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let Color = (25, 25, 100);

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(220);
}

function draw() {
  
}



function mouseClicked() {
  drawRect();
  drawCircle();
  blackScreen();
  whiteScreen ();
} 

function drawRect() {
  if (keyIsDown(82)) {
    fill(Color);
    rect(mouseX, mouseY, 100, 50);
  }
}

function drawCircle() {
  if (keyIsDown(67)) {
    fill(Color);
    circle(mouseX, mouseY, 100);
  }
}

function blackScreen() {
  if (keyIsDown(66)) {
    background(0);
  }
}

function whiteScreen () {
  if (keyIsDown(87)) {
    background(255);
  }
}