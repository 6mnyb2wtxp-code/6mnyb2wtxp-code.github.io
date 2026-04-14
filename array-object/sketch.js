// Array/Object Notation Assignment
// Zeyad Mohamed
// March 5/26
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let playerSize = 60;
let health = 3;
let startingHealth = health;

let x;
let y;
let xSpeed = 5;

let enemies = [];
let bullets = [];

let enemyAmount = 10;
let score = 0;
let gameOverFlag = false;

let ySpeed = 0;
let maxFallSpeed = 2;
let driftDown = 0.1;   // gentle downward drift
let boostpower = -10;
let boostCooldown = 5000; // boost duration in milliseconds
let lastBoostTime = 0;

let music;
let sadMusic;
let spaceship;
let spaceshipTrail;
let invader;
let shootBullet;
let playerExploding;
let enemyDamage;
let invaderDeath;



function preload() {
  spaceship = loadImage('spaceship.png');
  spaceshipTrail = loadImage('spaceshipTrail.gif');
  invader = loadImage('invader.gif');
  music = loadSound('music.mp3');
  sadMusic = loadSound('sadMusic.mp3');
  shootBullet = loadSound('shootBullet.wav');
  playerExploding = loadSound('playerExploding.wav');
  enemyDamage = loadSound('enemyDamage.wav');
  invaderDeath = loadSound('invaderDeath.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  x = width/2;
  y = height - 200;
  softReset();
  playMusicRepeatedly();
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
    shootBullet.play();
  }
  if (key === 'r') {
    resetGame();
  }
}

function draw() {
  if (gameOverFlag) { 
    gameOver();
    return; // stop the draw loop if game is over
  }

  background(0);
  checkCollisions();
  moveObjects();
  displayObjects();
  displayUI();
}

function displayUI() {
  // display boost cooldown indicator
  let cooldownRatio = (millis() - lastBoostTime) / boostCooldown;
  cooldownRatio = constrain(cooldownRatio, 0, 1);
  fill(255);
  rect(20, height - 40, 100 * cooldownRatio, 20);
  noFill();
  stroke(255);
  rect(20, height - 40, 100, 20);

  // display health bar
  let healthRatio = health / startingHealth;
  healthRatio = constrain(healthRatio, 0, 1);
  fill(255, 0, 0);
  rect(20, height - 120, 100 * healthRatio, 20);
  noFill();
  stroke(255);
  rect(20, height - 120, 100, 20);

  // display score
  textAlign(LEFT, TOP);
  fill(255);
  textSize(24);
  text("Score: " + score, 20, 30);
  // display high score
  let highScore = localStorage.getItem("highScore") || 0;
  text("High Score: " + highScore, 20, 60);

  // display boss bar of how many enemies are left in the wave
  fill(255, 0, 0);
  rect(width/2 - 150, 20, enemies.length / enemyAmount * 300, 20);
  noFill();
  stroke(255);
  rect(width/2 - 150, 20, 300, 20);

  // display health bar of the already damaged enemies 
  for (let enemy of enemies) {
    if (enemy.health < floor(enemy.size / 25)) {
      fill(0, 255, 0);
      rect(enemy.x - enemy.size/2, enemy.y - enemy.size/2 - 10, enemy.size * (enemy.health / floor(enemy.size / 25)), 5);
      noFill();
      stroke(255);
      rect(enemy.x - enemy.size/2, enemy.y - enemy.size/2 - 10, enemy.size, 5);
    }
  }
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

  // keeps the spaceship on the screen instead of flying off the edge
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
    image(invader, enemy.x - enemy.size/2, enemy.y - enemy.size/2, enemy.size, enemy.size);
  }
  for (let bullet of bullets) {
    fill(255, 0, 0);
    noStroke();
    rect(bullet.x - 5, bullet.y - 5, 5, 20);
  }
}

function checkCollisions() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    let enemy = enemies[i];
    for (let j = bullets.length - 1; j >= 0; j--) {
      let bullet = bullets[j];
      let d = dist(enemy.x, enemy.y, bullet.x, bullet.y); //distance between enemy and bullet
      if (d < enemy.size/2) {
        // Collision detected remove enemy and bullet aand increase score
        enemy.health -= 1; // decrease enemy health by 1 for each hit
        bullets.splice(j, 1);
        enemyDamage.play();
        if (enemy.health <= 0) {
          enemies.splice(i, 1);
          score += 10; // increase score by 10 for each enemy destroyed
          invaderDeath.play();
        }
        break;
      }
    }
  }
  // Check for collision between player and enemies
  for (let enemy of enemies) {
    let d = dist(enemy.x, enemy.y, x, y); // distance between enemy and player 
    if (d < enemy.size/2 + playerSize/2) {
      playerExploding.play();
      gameOver();
      break;
    }
  } 
  if (enemies.length === 0) {
    // If all enemies are destroyed respawn new enemies plus a new wave with more enemies
    enemyAmount += 3;
    softReset();
  } 
} 

function resetGame() {
  music.stop();
  sadMusic.stop();
  enemies = [];
  bullets = [];
  enemyAmount = 10;
  x = width/2;
  y = height - 200;
  score = 0;
  gameOverFlag = false;
  if (!music.isPlaying()) {
    music.loop();
  }
  softReset();
}

function gameOver() {
  gameOverFlag = true;
  if (music.isPlaying()) {
    music.stop();
  }
  if (!sadMusic.isPlaying()) {
    sadMusic.loop();
  }

  background(0);
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("Game Over", width/2, height/2 - 50);
  textSize(24);
  text("Final Score: " + score, width/2, height/2 + 20);
  text("Press 'R' to Restart", width/2, height/2 + 60);

  // save the high score to local storage
  let highScore = localStorage.getItem("highScore") || 0;  // get the current high score from local storage or if doesn't exist set it to 0
  if (score > highScore) {
    localStorage.setItem("highScore", score); 
  }
  else {
    text("High Score: " + highScore, width/2, height/2 + 100);
  } 
}

function softReset() { // resets the game without resetting score 
  for (let i = 0; i < enemyAmount; i++) {
    let size = random(25, 100);

    let enemy = {
      x: random(width),
      y: random(height/2),
      t: random(1000),
      size: size,
      health: floor(size / 25)
    };
    enemies.push(enemy);
  }
}

function playMusicRepeatedly() {
  music.setLoop(true);
  music.play();
}