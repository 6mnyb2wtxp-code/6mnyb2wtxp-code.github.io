// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let Color = (25, 25, 100);
let shapeNum = 0 ;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(0);
}

function draw() {
  //display what shape is selected
  chooseShape();
  textSize(32);
  fill("white");
  text(`The selected shape is  ${shapeNum}` , 75, 75);
}

function chooseShape() {
  if (keyIsDown(82)) {
    shapeNum = 1;
  }
  else if (keyIsDown(67)) {
    shapeNum = 2;
  }
}

// put in function 
if (mouseIsPressed) {
  if (shapeNum === 1) {
    fill(Color);
    rect(mouseX, mouseY, 100, 50);
  }
}