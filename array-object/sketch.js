// Array/Object Notation Assignment
// Zeyad Mohamed
// March 5/26
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let playerSize = 60;
let enemySize = 50;
let x;
let y;
let speed = 5;
let enemies = [];
let enemyAmount = 5;

function preload() {
  spaceship = loadImage('spaceship.png');
  spaceshipTrail = loadImage('spaceshipTrail.gif');
  invader = loadImage('invader.gif');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height - 200;

  for(let i = 0; i < enemyAmount; i++) {
    let enemy = {
      x: random(width),
      y: random(height/2),
      t: random(1000)
    };

    enemies.push(enemy);
  }
}


function draw() {
  background(0);
  moveShip();
  moveEnemies();
  displayObjects();
}

function moveShip() {
  // move the spaceship around
  if (keyIsDown (65)) {
    // "A" key
    x -= speed;
  }

  if (keyIsDown (68)) {
    // "D" key
    x += speed;
  }


  //keeps the spaceship on the screen instead of flying off the edge
  x = constrain(x, playerSize/2 , width - playerSize/2); 
}

function displayObjects() {
  image(spaceship, x - playerSize / 2, y - playerSize / 2, playerSize, playerSize);
  image(spaceshipTrail, x - playerSize/1.4 , y + playerSize/4 , playerSize * 1.5, playerSize * 1.5);
  image(invader, enemyX - enemySize / 2, enemyY - enemySize / 2, enemySize, enemySize);
}

function moveEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    let enemyX = noise(enemy[i].t) * width;
    let enemyY = noise(enemy[i].t + 1000) * height/2;
    
    enemy[i].t += 0.002;
  }

}