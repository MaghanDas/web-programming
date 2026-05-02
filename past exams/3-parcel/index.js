const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

// Application state
const plane = {
  x: 0,
  y: 20,
  width: 60,
  height: 30,
  vx: 0,
  img: new Image(),
};
const parcel = {
  x: 0,
  y: plane.y + plane.height,
  width: 30,
  height: 30,
  vx: 0,
  vy: 0,
  ay: 0,
  img: new Image(),
};
const house = {
  x: 400,
  y: canvas.height - 120,
  width: 100,
  height: 100,
  img: new Image(),
};
let gameState = 0; // 0-start, 1-moving, 2-dropping, 3-hit, 4-missed

// ================= Game loop =====================

// Time-based animation (from the lecture slide)
let lastFrameTime = performance.now();

function next(currentTime = performance.now()) {
  const dt = (currentTime - lastFrameTime) / 1000; // seconds
  lastFrameTime = currentTime;

  update(dt); // Update current state
  render(); // Rerender the frame
  requestAnimationFrame(next);
}
canvas.addEventListener("click", ()=>{
  if (gameState === 0) {          // start state
    plane.vx = 200;               // 200 px per second
    parcel.vx = 200;
    gameState = 1;                // moving
  }
  else if(gameState === 1){
    parcel.vy = 300;
    gameState = 2 
  }
});

function update(dt) {
    if (gameState === 1) {
    plane.x += plane.vx * dt;     // time-based movement
    parcel.x += parcel.vx * dt
  }
  if(gameState ===2){
    parcel.y += parcel.vy * dt;
    plane.x += plane.vx * dt;
  
    if (isCollision(parcel, house)) {
      gameState = 3;               // hit
      parcel.vy = 0;
      parcel.ay = 0;
    }
        else if (parcel.y + parcel.height >= canvas.height) {
      gameState = 4;               // missed
      parcel.vy = 0;
      parcel.ay = 0;
    }

  }
  
}

function render() {
  // clearing the canvas
  ctx.clearRect(0,0,canvas.width,canvas.height)  

  // plane 
  // ctx.fillStyle = 'grey'
  // ctx.fillRect(plane.x, plane.y, plane.width, plane.height)

  // // parcel 
  // ctx.fillStyle = 'brown'
  // ctx.fillRect(parcel.x, parcel.y, parcel.width, parcel.height)

  // // house
  // ctx.fillStyle = 'red'
  // ctx.fillRect(house.x , house.y, house.width, house.height);

 ctx.drawImage(plane.img, plane.x, plane.y,plane.width,plane.height);
 ctx.drawImage(parcel.img,parcel.x, parcel.y,parcel.width,parcel.height);
 ctx.drawImage(house.img, house.x,house.y,house.width,house.height);

 ctx.fillStyle = "black";
ctx.font = "30px Arial";
ctx.textAlign = "center";

if (gameState === 3) {
  ctx.fillText("Delivered", canvas.width / 2, 50);
}

if (gameState === 4) {
  ctx.fillText("Missed", canvas.width / 2, 50);
}

}

// Start the loop
plane.img.src = "plane.png";
house.img.src = "house.png";
parcel.img.src = "parcel.png";
next(); 

// =============== Utility functions =================

function isCollision(box1, box2) {
  return !(
    box2.y + box2.height < box1.y ||
    box1.x + box1.width < box2.x ||
    box1.y + box1.height < box2.y ||
    box2.x + box2.width < box1.x
  );
}