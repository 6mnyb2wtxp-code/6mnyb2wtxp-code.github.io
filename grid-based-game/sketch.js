// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - Added stars randomly around the map can be picked up by the player

const CELL_SIZE = 100;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
const PLAYER = 2;
const GOAL = 3;
const STAR = 4;

const STARS = 3;
let grid;
let rows;
let cols;

let thePlayer = {
  x: 0,
  y: 0,
};
let breakAmount = 5;
let pickedUpStars = 0;

function preload() {
  grassImg = loadImage("crate.png");
  pathImg = loadImage("wood.jpg");
  playerImg = loadImage("player.webp");
  goalImg = loadImage("goal.png");
  starImg = loadImage("star.png");
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

  showText();
}

function showText() {
  textSize(25);
  fill("white");
  text(`Breaking Energy: ${breakAmount}`, 10, height - 10);

  textSize(25);
  fill("white");
  text(`Stars Picked Up: ${pickedUpStars}`, width - 300, height - 10);
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
    resetGame();
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
  if (x >= 0 && x < cols && y >= 0 && y < rows && (grid[y][x] === OPEN_TILE || grid[y][x] === GOAL || grid[y][x] === STAR)) {
    //tile previously stepped on
    let tileType = grid[y][x];
    
    //previous position
    let oldX = thePlayer.x;
    let oldY = thePlayer.y;

    //moving the player to new location
    thePlayer.x = x;
    thePlayer.y = y;
  
    //adding player to grid
    grid[thePlayer.y][thePlayer.x] = PLAYER;

    //reset the old location to be an open tile
    if (tileType === OPEN_TILE) {
      grid[oldY][oldX] = OPEN_TILE;
    }
    else if (tileType === GOAL) {
      grid[oldY][oldX] = GOAL;
      win();
    }
    else if (tileType === STAR) {
      grid[oldY][oldX] = OPEN_TILE;
      // count picked up stars
      pickedUpStars++;
    }
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
      if (grid[y][x] === STAR){
        image(starImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
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

  newGrid[rows - 1][cols - 1] = GOAL;
  addStars(newGrid);
  return newGrid;
}

function addStars(grid) {
  let starsPlaced = 0;
  while (starsPlaced < STARS) {

    let x = Math.floor(random(cols));
    let y = Math.floor(random(rows));

    if (grid[y][x] === OPEN_TILE){
      grid[y][x] = STAR;
      starsPlaced++;
    }
  }
}

function win() {
  alert(`You Reached the end with ${pickedUpStars} stars!`);
  resetGame();
}

function resetGame() {
  grid = generateRandomGrid(cols, rows);
  thePlayer.x = 0;
  thePlayer.y = 0;
  breakAmount = 5;
  pickedUpStars = 0;
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}
