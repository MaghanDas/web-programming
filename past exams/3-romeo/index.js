
// ========= Selected elements =========
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// =============== Utilities =================
function isCollision(box1, box2) {
  return !(
    box2.y + box2.height < box1.y ||
    box1.x + box1.width < box2.x ||
    box1.y + box1.height < box2.y ||
    box2.x + box2.width < box1.x
  );
}

function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

// ========= Application state =========
const arrow = {
  fx: 10,
  fy: 290,
  tx: 30,
  ty: 350,
};
const ball = {
  x: 10,
  y: 290,
  width: 20,
  height: 20,
  vx: 0, // px/s
  vy: 0, // px/s
  ay: 0, // px/s2
  img: new Image(),
};
const windows = [
  { x: 479, y: 122, width: 15, height: 30 },
  { x: 494, y: 240, width: 18, height: 42 },
  { x: 562, y: 240, width: 18, height: 42 },
];
const bush = {
  x: 250,
  y: 200,
  width: 100,
  height: 200,
  img: new Image(),
};
let lovedWindow = random(0, 2);
let gameState = 0; // 0-start, 1-moving, 2-hit, 3-missed
let hitBush = false;
let rightwindow = false;
let wrongWindow = false;
// ========= Time-based animation (from the lecture slide) =========
let lastFrameTime = performance.now();
function next(currentTime = performance.now()) {
  const dt = (currentTime - lastFrameTime) / 1000; // seconds
  lastFrameTime = currentTime;

  update(dt); // Update current state
  render(); // Rerender the frame

  requestAnimationFrame(next);
}

// mousemove: fires contnuously as the mouse moves:
// offsetX/ offsetY are realtive to the canvas , perfect for drawing.
canvas.addEventListener("mousemove", (event) => {
  arrow.tx = event.offsetX;
  arrow.ty = event.offsetY;
});

canvas.addEventListener("click", () => {
  if (gameState === 0) {
    const dx = arrow.tx - arrow.fx;
    const dy = arrow.ty - arrow.fy;

    ball.vx = dx * 3; // horizontal speed
    ball.vy = dy * 3; // vertical speed
    ball.ay = 300; // gravity

    gameState = 1;
  }
});

function update(dt) {
  if (gameState === 1) {
    // update velicty
    ball.vy += ball.ay * dt;
    // update position
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;
  }

  if (isCollision(ball, bush)) {
    ball.vx = 0;
    ball.vy = 0;
    ball.ay = 0;
    gameState = 3;
    hitBush = true;
  }
  windows.forEach((w, index) => {
    if (index === lovedWindow) {
      if (isCollision(ball, windows[index])) {
        rightwindow = true;
        ball.vx = 0;
        ball.vy = 0;
        ball.ay = 0;
        gameState = 3;
      }
    } else if (isCollision(ball, windows[index])) {
      ball.vx = 0;
      ball.vy = 0;
      ball.ay = 0;
      gameState = 3;
      wrongWindow=true
    }
  });
}
function render() {
  // Background
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // a. (1 pt) Draw the stone (ball), bush (bush), and windows (windows) as rectangles.
  // \b. (1 pt) Use the appropriate images (ball, bush) instead of rectangles.

  ctx.drawImage(ball.img, ball.x, ball.y, ball.width, ball.height);
  ctx.drawImage(bush.img, bush.x, bush.y, bush.width, bush.height);
  // Draw windows
  windows.forEach((w, index) => {
    ctx.fillStyle = index === lovedWindow ? "yellow" : "black";
    ctx.fillRect(w.x, w.y, w.width, w.height);
  });

  // drawing the line task:d
  ctx.strokeStyle = "red"; // line color
  ctx.lineWidth = 3; // 3px width
  ctx.beginPath(); // startnew path
  ctx.moveTo(arrow.fx, arrow.fy); // starting point
  ctx.lineTo(arrow.tx, arrow.ty);
  ctx.stroke();

  if (hitBush ) {
    ctx.font = "50px serif";
    ctx.fontStyle = "red";
    ctx.fillText("Oooops", canvas.width / 2 - 100, canvas.height / 2);
  }
  if(rightwindow){
    ctx.font = "50px serif";
    ctx.fontStyle = "red";
    ctx.fillText("Come, My lover", canvas.width / 2 - 100, canvas.height / 2);
  }
  if(wrongWindow){
    ctx.font = "50px serif";
    ctx.fontStyle = "red";
    ctx.fillText("Oooops", canvas.width / 2 - 100, canvas.height / 2);
  }
  if(ball.y + ball.height >= canvas.height){
        ctx.font = "50px serif";
    ctx.fontStyle = "red";
    ctx.fillText("Oooops", canvas.width / 2 - 100, canvas.height / 2);
  }
}

// ========= Start the loop =========
bush.img.src = "bush.png";
ball.img.src = "ball.png";
next();


















// // ========= Selected elements =========
// const canvas = document.querySelector("canvas");
// const ctx = canvas.getContext("2d");

// // =============== Utilities =================
// function isCollision(box1, box2) {
//   return !(
//     box2.y + box2.height < box1.y ||
//     box1.x + box1.width < box2.x ||
//     box1.y + box1.height < box2.y ||
//     box2.x + box2.width < box1.x
//   );
// }

// function random(a, b) {
//   return Math.floor(Math.random() * (b - a + 1)) + a;
// }

// // ========= Application state =========
// const arrow = {
//   fx: 10,
//   fy: 290,
//   tx: 30,
//   ty: 350,
// };
// const ball = {
//   x: 10,
//   y: 290,
//   width: 20,
//   height: 20,
//   vx: 0, // px/s
//   vy: 0, // px/s
//   ay: 0, // px/s2
//   img: new Image(),
// };
// const windows = [
//   { x: 479, y: 122, width: 15, height: 30 },
//   { x: 494, y: 240, width: 18, height: 42 },
//   { x: 562, y: 240, width: 18, height: 42 },
// ];
// const bush = {
//   x: 250,
//   y: 200,
//   width: 100,
//   height: 200,
//   img: new Image(),
// };
// let lovedWindow = random(0, 2);
// let gameState = 0; // 0-start, 1-moving, 2-hit, 3-missed
// let hitBush = false;
// let rightwindow = false;
// let wrongWindow = false;
// // ========= Time-based animation (from the lecture slide) =========
// let lastFrameTime = performance.now();
// function next(currentTime = performance.now()) {
//   const dt = (currentTime - lastFrameTime) / 1000; // seconds
//   lastFrameTime = currentTime;

//   update(dt); // Update current state
//   render(); // Rerender the frame

//   requestAnimationFrame(next);
// }

// // mousemove: fires contnuously as the mouse moves:
// // offsetX/ offsetY are realtive to the canvas , perfect for drawing.
// canvas.addEventListener("mousemove", (event) => {
//   arrow.tx = event.offsetX;
//   arrow.ty = event.offsetY;
// });

// canvas.addEventListener("click", () => {
//   if (gameState === 0) {
//     const dx = arrow.tx - arrow.fx;
//     const dy = arrow.ty - arrow.fy;

//     ball.vx = dx * 3; // horizontal speed
//     ball.vy = dy * 3; // vertical speed
//     ball.ay = 300; // gravity

//     gameState = 1;
//   }
// });

// function update(dt) {
//   if (gameState === 1) {
//     // update velicty
//     ball.vy += ball.ay * dt;
//     // update position
//     ball.x += ball.vx * dt;
//     ball.y += ball.vy * dt;
//   }

//   if (isCollision(ball, bush)) {
//     ball.vx = 0;
//     ball.vy = 0;
//     ball.ay = 0;
//     gameState = 3;
//     hitBush = true;
//   }
//   windows.forEach((w, index) => {
//     if (index === lovedWindow) {
//       if (isCollision(ball, windows[index])) {
//         rightwindow = true;
//         ball.vx = 0;
//         ball.vy = 0;
//         ball.ay = 0;
//         gameState = 3;
//       }
//     } else if (isCollision(ball, windows[index])) {
//       ball.vx = 0;
//       ball.vy = 0;
//       ball.ay = 0;
//       gameState = 3;
//       wrongWindow=true
//     }
//   });
// }
// function render() {
//   // Background
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   // a. (1 pt) Draw the stone (ball), bush (bush), and windows (windows) as rectangles.
//   // \b. (1 pt) Use the appropriate images (ball, bush) instead of rectangles.

//   ctx.drawImage(ball.img, ball.x, ball.y, ball.width, ball.height);
//   ctx.drawImage(bush.img, bush.x, bush.y, bush.width, bush.height);
//   // Draw windows
//   windows.forEach((w, index) => {
//     ctx.fillStyle = index === lovedWindow ? "yellow" : "black";
//     ctx.fillRect(w.x, w.y, w.width, w.height);
//   });

//   // drawing the line task:d
//   ctx.strokeStyle = "red"; // line color
//   ctx.lineWidth = 3; // 3px width
//   ctx.beginPath(); // startnew path
//   ctx.moveTo(arrow.fx, arrow.fy); // starting point
//   ctx.lineTo(arrow.tx, arrow.ty);
//   ctx.stroke();

//   if (hitBush ) {
//     ctx.font = "50px serif";
//     ctx.fontStyle = "red";
//     ctx.fillText("Oooops", canvas.width / 2 - 100, canvas.height / 2);
//   }
//   if(rightwindow){
//     ctx.font = "50px serif";
//     ctx.fontStyle = "red";
//     ctx.fillText("Come, My lover", canvas.width / 2 - 100, canvas.height / 2);
//   }
//   if(wrongWindow){
//     ctx.font = "50px serif";
//     ctx.fontStyle = "red";
//     ctx.fillText("Oooops", canvas.width / 2 - 100, canvas.height / 2);
//   }
//   if(ball.y + ball.height >= canvas.height){
//         ctx.font = "50px serif";
//     ctx.fontStyle = "red";
//     ctx.fillText("Oooops", canvas.width / 2 - 100, canvas.height / 2);
//   }
// }

// // ========= Start the loop =========
// bush.img.src = "bush.png";
// ball.img.src = "ball.png";
// next();
