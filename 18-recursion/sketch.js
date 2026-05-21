// Recursive circles demo


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawCircle(width/2, width/2);
}

function drawCircle(x, radius) {
  let fillColor = map(radius, width/2, 3, 255, 30);
  fill(fillColor);
  circle(x, height/2, radius * 2);
  if (radius > 3) {
    drawCircle(x - radius/2, radius/2);
    drawCircle(x + radius/2, radius/2);
  }
}
