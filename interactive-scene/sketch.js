// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  background(220);
}

function draw() {
  mouseClicked();
}



function mouseClicked(){
  drawRect();
  drawCircle();
  blackScreen();
  whiteScreen ();
} 

function drawRect() {
  if (keyIsDown(82)) {
    fill("red");
    rect(mouseX, mouseY, 100, 50);
  }
}

function drawCircle() {
  if (keyIsDown(67)) {
    fill("blue");
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
    background(255)
  }
}