// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



// class Dog {
//   constructor(name) {
//     //characteristics
//     this.name = name;
//     this.age = 0;
//   }
//   bark(){
//     console.log("woof, says "+this.name);
//   }
  
// }

// let myDog = new Dog("Mohamed Shalaby")
// let otherDog = new Dog("Abdelrahman el Nagar")

// function setup() {
//   myDog.bark();
//   otherDog.bark();
//   createCanvas(400, 400);
// }

// function draw() {
//   background(220);
// }



class Walker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = 2;
    this.color = "red";
    this.speed = 5;
  }

  display() {
    fill(this.color);
    stroke(this.color);
    circle(this.x, this.y, this.diameter);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      //up
      this.y -= this.speed;
    }
    else if (choice < 50){
      //down
      this.y += this.speed;
    }
    else if (choice < 75) {
      // left
      this.x -= this.speed;
    }
    else if (choice < 100) {
      // right
      this.x += this.speed;
    }
  }
}

let theWalkers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);


}

function draw() {
  for (let someWalker of theWalkers){
    someWalker.move();
    someWalker.display();
  }
}

function mousePressed() {
  let theGuy = new Walker (mouseX, mouseY);
  theGuy.color = color(random(255), random(255), random(255));
  theWalkers.push(theGuy);
}


// version with 2 walkers

// let tyler;
// let audrey;

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   tyler = new Walker(width/2, height/2);
//   audrey = new Walker(300, 500);
//   audrey.color = "blue";
// }

// function draw() {
//   tyler.move();
//   tyler.display();
//   audrey.move();
//   audrey.display();
// }
