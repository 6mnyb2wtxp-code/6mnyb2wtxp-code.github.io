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
let xSpeed = 5;

let enemies = [];
let bullets = [];

let enemyAmount = 10;

let ySpeed = 0;
let maxFallSpeed = 2;
let driftDown = 0.1;   // gentle downward drift
let boostpower = -7;
let boostCooldown = 5000; // boost duration in milliseconds
let lastBoostTime = 0;


function preload() {
  spaceship = loadImage('spaceship.png');
  spaceshipTrail = loadImage('spaceshipTrail.gif');
  invader = loadImage('invader.gif');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
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

function keyPressed() {
  if (key === 'w' && millis() - lastBoostTime > boostCooldown) {
    // "W" key for boost
    ySpeed = boostpower;
    lastBoostTime = millis();
  }

  if (key === ' ') {
    // spacebar to shoot
    let bullet = {
      x: x,
      y: y - playerSize/2
    };
    bullets.push(bullet);
  }
}

function draw() {
  background(0);
  moveObjects();
  displayObjects();
  displayUI();
}

function displayUI() {
  // Display boost cooldown indicator
  let cooldownRatio = (millis() - lastBoostTime) / boostCooldown;
  cooldownRatio = constrain(cooldownRatio, 0, 1);
  fill(255);
  rect(20, height - 40, 100 * cooldownRatio, 20);
  noFill();
  stroke(255);
  rect(20, height - 40, 100, 20);
}

function moveObjects() {
  // move the spaceship around
  if (keyIsDown (65)) {
    // "A" key
    x -= xSpeed;
  }

  if (keyIsDown (68)) {
    // "D" key
    x += xSpeed;
  }

  // apply gentle downward drift and limit fall speed
  ySpeed += driftDown;
  ySpeed = constrain(ySpeed, -10, maxFallSpeed);
  y += ySpeed;
  ySpeed *= 0.98; // apply some friction to slow down the fall over time
  
  if (y > height - 200) {
    y = height - 200;
    ySpeed = 0;
  }

  //keeps the spaceship on the screen instead of flying off the edge
  x = constrain(x, playerSize/2 , width - playerSize/2); 

  // moves the enemies around using Perlin noise with a random speed for each enemy
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    enemy.x = noise(enemy.t) * width;
    enemy.y = noise(enemy.t + 1000) * height;
    enemy.t += random(0.001, 0.005);
  }

  // move the bullets up the screen
  for (let i = bullets.length - 1; i >= 0; i--) {
    let bullet = bullets[i];
    bullet.y -= 10;
  }
}

function displayObjects() {
  image(spaceship, x - playerSize / 2, y - playerSize / 2, playerSize, playerSize);
  image(spaceshipTrail, x - playerSize/1.4 , y + playerSize/4 , playerSize * 1.5, playerSize * 1.5);
  
  for (let enemy of enemies) {
    image(invader, enemy.x - enemySize/2, enemy.y - enemySize/2, enemySize, enemySize);
  }
  for (let bullet of bullets) {
    fill(255, 0, 0);
    noStroke();
    rect(bullet.x - 5, bullet.y - 5, 5, 20);
  }
}

