// Interactive Scene
// Zeyad Mohamed
// 11/3/26
//
// Extra for Experts:
// - Added a text that shows what tool is currently selected


let Color = 255;
let backgroundColor = 0;
let shapeNum = 0 ;
let objectSize = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(backgroundColor);
}

function draw() {
  // Drawing functions
  chooseShape();
  drawSelected();
  
  // info bar  
  fill(backgroundColor);
  rect(0, 0, width, 70);

  // Display what shape is selected
  textSize(32);
  fill("white");
  text(`The selected shape is  ${shapeNum}` , 50, 50);
}

function mouseWheel(event) {
  // Changes the size of objects using the scroll wheel
  if (event.delta > 0) {
    objectSize += 5;
  }
  else {
    objectSize -= 5;
  }
}

function chooseShape() {
  // P for Pencil
  if (keyIsDown(80)) {
    shapeNum = 0;
  }
  // R for Rectangle
  else if (keyIsDown(82)) {
    shapeNum = 1;
  }
  // C for cirlcle
  else if (keyIsDown(67)) {
    shapeNum = 2;
  }
  // E is for Eraser
  else if (keyIsDown(69)) {
    shapeNum = 3;
  }
  
}

function drawSelected() {
  // Pencil (0) 
  if (mouseIsPressed && mouseY > 70) {
    if (shapeNum === 0) {
      fill(Color);
      rectMode(CENTER);
      circle(mouseX, mouseY, objectSize - 90);
    }
    // Rectangle (1)
    else if (shapeNum === 1) {
      fill(Color);
      rectMode(CENTER);
      rect(mouseX, mouseY, objectSize, objectSize/2);
    }
    // Circle (2)
    if (shapeNum === 2) {
      fill(Color);
      rectMode(CENTER);
      circle(mouseX, mouseY, objectSize - 50);
    }
    // Eraser (3)
    if (shapeNum === 3) {
      fill(backgroundColor);
      rectMode(CENTER);
      circle(mouseX, mouseY, objectSize - 50);
    }
  }
}