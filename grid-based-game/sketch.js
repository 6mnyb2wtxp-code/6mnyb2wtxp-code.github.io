// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const CELL_SIZE = 50;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
const PLAYER = 9;
const GOAL = 5;
let grid;
let rows;
let cols;
let thePlayer = {
  x: 0,
  y: 0,
};
let grassImg;
let pathImg;
let breakAmount = 5;

function preload() {
  grassImg = loadImage('crate.png');
  pathImg = loadImage("wood.jpg");
  playerImg = loadImage('player.webp');
  goalImg = loadImage("goal.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(height/CELL_SIZE);
  cols = Math.floor(width/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);

  //add player to grid
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function draw() {
  background(0);
  displayGrid();

  textSize(25);
  fill("white");
  text(`Breaking Energy: ${breakAmount}`, 10, height - 10);
}

function mousePressed() {
  if (breakAmount > 0) {
    let x = Math.floor(mouseX/CELL_SIZE);
    let y = Math.floor(mouseY/CELL_SIZE);

    //self
    toggleCell(x, y);
  }
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(cols, rows);
    thePlayer.x = 0;
    thePlayer.y = 0;
    breakAmount = 5;
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
  if (key === "s") {
    movePlayer(thePlayer.x, thePlayer.y + 1);
  }
  if (key === "w") {
    movePlayer(thePlayer.x, thePlayer.y - 1);
  }
  if (key === "d") {
    movePlayer(thePlayer.x + 1, thePlayer.y);
  }
  if (key === "a") {
    movePlayer(thePlayer.x - 1, thePlayer.y);
  }
}

function movePlayer(x, y) {
  if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === OPEN_TILE) {
    //previous position
    let oldX = thePlayer.x;
    let oldY = thePlayer.y;

    //moving the player to new location
    thePlayer.x = x;
    thePlayer.y = y;
  
    //adding player to grid
    grid[thePlayer.y][thePlayer.x] = PLAYER;

    //reset the old location to be an open tile
    grid[oldY][oldX] = OPEN_TILE;
  }
}


function toggleCell(x, y) {
  //make sure the cell actually exists!
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === IMPASSIBLE) {
      grid[y][x] = OPEN_TILE;
      breakAmount -= 1;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === OPEN_TILE) {
        image(pathImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
      if (grid[y][x] === IMPASSIBLE) {
        image(grassImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
      if (grid[y][x] === PLAYER) {
        image(playerImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
      if (grid[y][x] === GOAL){
        image(goalImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        newGrid[y].push(IMPASSIBLE);
      }
      else {
        newGrid[y].push(OPEN_TILE);
      }
    }
  }
  grid[cols.length - 1][rows.length - 1] = GOAL;
  return newGrid;
}
