// Grid demo
// 2d arrays

let theGrid = [[0, 0, 1, 0],
               [, 0, 1, 0],
               [0, 1, 0, 1],
               [0, 0, 0, 0]];

const SQUARE_DIMENTIONS = theGrid.length;

let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width < height) {
    cellSize = width / SQUARE_DIMENTIONS;
  }
  else {
    cellSize = height / SQUARE_DIMENTIONS;
  }
  
}

function draw() {
  background(220);
  showGrid();
}

function showGrid() {
  for (let y = 0; y < SQUARE_DIMENTIONS; y++){
    for (let x = 0; x < SQUARE_DIMENTIONS; x++){
      if (theGrid[y][x] === 1) {
        fill('black');
      }
      if (theGrid[y][x] === 0) {
        fill('white');
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

// function mouseClicked() {
//   if (mouseX === cellSize){
//     theGrid 
//   }
// }