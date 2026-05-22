// recursive zelda triangle

let initialTriangle = [{x:800, y:50 }, {x:50, y:1000}, {x:1550, y:1000}];
let thedepth = 0;
let theColors = ["red", "purple", "cyan", "green", "blue", "yellow", "pink", "brown", "orange"];
function setup() {
  createCanvas(windowWidth, windowHeight);
  zelda(initialTriangle, thedepth);
}

function mousePressed() {
  if (thedepth < 8){
    thedepth++;
    background("white");
    zelda(initialTriangle, thedepth);
  }
  
}

function draw() {
  
}

function zelda(points,depth) {
  fill(theColors[depth]);
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);
  if (depth > 0) {
    zelda([points[0], midpoint(points[0], points[1]), midpoint(points[0], points[2])], depth - 1);
    zelda([points[1], midpoint(points[0], points[1]), midpoint(points[1], points[2])], depth - 1);
    zelda([points[2], midpoint(points[0], points[2]), midpoint(points[1], points[2])], depth - 1);
  }
}

function midpoint (point1, point2) {
  let midx = (point1.x +point2.x) /2;
  let midy = (point1.y +point2.y) /2;
  return {x: midx, y: midy};
}