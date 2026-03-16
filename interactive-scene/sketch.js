// Interactive Scene
// Zeyad Mohamed
// 11/3/26
//
// Extra for Experts:
// - Added a text that shows what tool is currently selected and used the scroll wheel to change the size of the selected tool


let Color = 255;
let backgroundColor = 0;
let tool = "Pencil";
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
  chooseColor();
}

function mouseWheel(event) {
  // Changes the size of objects using the scroll wheel
  if (event.delta > 0) {
    objectSize -= 5;
  }
  else {
    objectSize += 5;
  }
  infoBar();
}

function chooseShape() {
  // P for Pencil
  if (keyIsDown(80)) {
    tool = "Pencil";
    infoBar();
  }
  // R for Rectangle
  else if (keyIsDown(82)) {
    tool = "Rectangle";
    infoBar();
  }
  // C for cirlcle
  else if (keyIsDown(67)) {
    tool = "Circle";
    infoBar();
  }
  // E is for Eraser
  else if (keyIsDown(69)) {
    tool = "Eraser";
    infoBar();
  }
}

function chooseColor() {
  // Changes color brightness from 1 - 0 (0 is brightest)
  if (keyIsDown(49)) {
    Color = 255 * 0.1;
  }
  else if (keyIsDown(50)) {
    Color = 255 * 0.2;
  }
  else if (keyIsDown(51)) {
    Color = 255 * 0.3;
  }
  else if (keyIsDown(52)) {
    Color = 255 * 0.4;
  }
  else if (keyIsDown(53)) {
    Color = 255 * 0.5;
  }
  else if (keyIsDown(54)) {
    Color = 255 * 0.6;
  }
  else if (keyIsDown(55)) {
    Color = 255 * 0.7;
  }
  else if (keyIsDown(56)) {
    Color = 255 * 0.8;
  }
  else if (keyIsDown(57)) {
    Color = 255 * 0.9;
  }
  else if (keyIsDown(48)) {
    Color = 255 * 1;
  }
  infoBar();
}

function drawSelected() {
  // Pencil
  if (mouseIsPressed) {
    if (tool === "Pencil") {
      fill(Color);
      rectMode(CENTER);
      circle(mouseX, mouseY, objectSize - 90);
    }
    // Rectangle
    else if (tool === "Rectangle") {
      fill(Color);
      rectMode(CENTER);
      rect(mouseX, mouseY, objectSize, objectSize/2);
    }
    // Circle
    if (tool === "Circle") {
      fill(Color);
      rectMode(CENTER);
      circle(mouseX, mouseY, objectSize - 50);
    }
    // Eraser
    if (tool === "Eraser") {
      fill(backgroundColor);
      rectMode(CENTER);
      circle(mouseX, mouseY, objectSize - 50);
    }
  }
}

function infoBar() {
  // Background
  fill(backgroundColor);
  rect(0, 0, width, 70);
  
  // Display what shape is selected
  textSize(32);
  fill("white");
  text(`Tool: ${tool}`, 50, 50);

  // Display what color is selected
  textSize(32);
  fill("white");
  text(`Color: ${Color}`, width - 250, 50);

  textSize(32);
  fill("white");
  text(`Size: ${objectSize}`, width / 2, 50);
}