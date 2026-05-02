const canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// drawing a rectangel
// ctx.fillStyle = "blue";
// ctx.fillRect(50,50, 200, 100);

// Stroke (outline) a rectangle
// ctx.strokeStyle = "red";
// ctx.lineWidth = 4;
// ctx.strokeRect(300, 50, 200, 100);

// Clear part of canvas
// ctx.clearRect(0, 0, canvas.width, canvas.height);
// 📌 Canvas coordinates:
// (0, 0) is top-left
// X → right
// Y → down

// draw a line.
// ctx. beginPath();
// ctx.moveTo(50,50); // starting point of line 
// ctx.lineTo(200,50); // endinf point of line
// ctx.stroke()
// ctx.fillText("Hello World", 10, 50); // writting on the lne with x and y coordinates .
// // writing text
// ctx.font = "30px Arial";
// ctx.strokeText("Hello World", 10, 50);

//===== drawing triangle =======

// ctx.beginPath(); //beginPath() → start new drawing
// ctx.moveTo(300, 200); // lift pen
// ctx.lineTo(400, 350); // draw line 
// ctx.lineTo(200, 350); // 
// ctx.closePath();
// ctx.fillStyle = "green";
// ctx.fill(); // render

// /===== drawing circle =======
// ctx.beginPath();
// ctx.arc(300, 200, 50, 0, Math.PI * 2);
// ctx.fillStyle = "purple";
// ctx.fill();
// // ARC; half circle
// ctx.beginPath();
// ctx.arc(150, 200, 50, 0, Math.PI);
// ctx.stroke();
// ctx.fillStyle="black"
// ctx.fill()
// 📐 Arc parameters: 

// ===== 6️⃣ Text on Canvas =======
// ctx.font = "30px Arial";
// ctx.fillStyle = "black";
// ctx.fillText("Hello Canvas", 50, 50)
// ctx.strokeText("Outlined Text", 50, 100);


//  ===== Linear Gradient
// const gradient = ctx.createLinearGradient(0, 0, 200, 0);
// gradient.addColorStop(0, "red");
// gradient.addColorStop(1, "yellow");
// ctx.fillStyle = gradient;
// ctx.fillRect(50, 50, 200, 100);
// // shadow.
// ctx.shadowColor = "rgba(0,0,0,0.5)";
// ctx.shadowBlur = 10;
// ctx.shadowOffsetX = 5;
// ctx.shadowOffsetY = 5;

// ====  DRAWING IMAGE ===========
// load and draw image
const img = new Image();
img.src = "image.png";
img.onload = () =>{
    ctx.drawImage(img, 50, 50, 200, 150);
}
// ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh); // crop image

// var img = document.getElementById("scream");
// The drawImage() method draws an image onto the canvas.
// The drawImage() method can be used with three different :
// drawImage(image, dx, dy) // draw image on position dx,dy
// drawImage(image, dx, dy, dwidth, dheight) // + specifies height,width
// drawImage(image, sx, sy, swidth, sheight, dx, dy, dwidth, dheight) // clip the source image
// ctx.fillRect(0, 0, 150, 75);
// ctx.fillStyle = "green";
// ctx.fillRect(10,10, 100,100);


// HTML Canvas Transformations
// With transformations we can translate the origin to a different position, rotate and scale it.

// The six methods for transformations are:
// translate() - moves elements on the canvas to a new point in the grid
// rotate() - rotates elements on the canvas clockwise or counter-clockwise
// scale() - scales elements on the canvas up or down
// transform() - multiplies the current transformation with the arguments described
// resetTransform() - resets the the current transformation to the identity matrix
// setTransform() - resets the the current transformation to the identity matrix, and then runs a transformation described by the arguments

// translate
// ctx.fillStyle = "red"
// ctx.fillRect(10,10,100,50)

// ctx.translate(70,70)

// ctx.fillStyle = "blue"
// ctx.fillRect(10,10,100,50)

// ctx.translate(80, -65);
// ctx.fillStyle = "yellow";
// ctx.fillRect(10, 10, 100, 50);

// Tip: Angles are in radians, not degrees. Use (Math.PI/180)*degree to convert.
// ctx.rotate((Math.PI/180)*20);
// ctx.fillStyle = "red";
// ctx.fillRect(50, 10, 100, 50);
// ctx.strokeRect(70, 30, 100, 50);

// scale element: horizontal or vertical
// ctx.strokeRect(5, 5, 25, 25);
// ctx.scale(2, 2); // 3 means upto 200%
// ctx.strokeStyle = "blue";
// ctx.strokeRect(5, 5, 25, 25);

// transform 
''
// ctx.fillStyle = "yellow";
// ctx.fillRect(10, 10, 200, 100)

// ctx.transform(1, 0.5, -0.5, 1, 30, 10);

// ctx.fillStyle = "red";
// ctx.fillRect(10, 10, 200, 100);

// ctx.transform(1, 0.5, -0.5, 1, 30, 10);

// ctx.fillStyle = "blue";
// ctx.fillRect(10, 10, 200, 100);


// ==== Handling mouse and keyboard events. 
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  console.log(x, y);
});
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    x += 10;
  }
});

// 1️⃣2️⃣ Pixel Manipulation (Advanced)
// Get pixel data
// const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
// const data = imageData.data;


// Each pixel:
// [data, data+1, data+2, data+3]
//  R     G         B         A

// Modify pixels
// for (let i = 0; i < data.length; i += 4) {
//   data[i] = 255;     // Red
//   data[i + 1] = 0;   // Green
//   data[i + 2] = 0;   // Blue
// }
// ctx.putImageData(imageData, 0, 0);


// problems solving.

// Game Canvas.
// const canvas = document.getElementById("gameCanvas");
// const ctx = canvas.getContext("2d");

// // Moving object (e.g., drone/truck)
// const mover = {
// x: 0,
// y: 60,
// width: 60,
// height: 30,
// speed: 2,
// hasDropped: false
// };

// const parcel = {
// x: 0,
// y: 0,
// size: 15,
// falling: false,
// delivered: false
// };

// // House
// const house = {
// x: 350,
// y: 280,
// width: 100,
// height: 80
// };

// let message = "";
// let gameOver = false;


// canvas.addEventListener("click", () => {
// if (!mover.hasDropped && !gameOver) {
// parcel.x = mover.x + mover.width / 2;
// parcel.y = mover.y + mover.height;
// parcel.falling = true;
// mover.hasDropped = true;
// }
// });

// function drawMover() {
// ctx.fillStyle = "#444";
// ctx.fillRect(mover.x, mover.y, mover.width, mover.height);
// }


// function drawParcel() {
// if (parcel.falling || parcel.delivered) {
// ctx.fillStyle = "brown";
// ctx.fillRect(parcel.x - parcel.size / 2, parcel.y, parcel.size, parcel.size);
// }
// }



// function drawHouse() {
// ctx.fillStyle = "#ffcc99";
// ctx.fillRect(house.x, house.y, house.width, house.height);
// ctx.fillStyle = "#aa0000";
// ctx.beginPath();
// ctx.moveTo(house.x - 10, house.y);
// ctx.lineTo(house.x + house.width / 2, house.y - 50);
// ctx.lineTo(house.x + house.width + 10, house.y);
// ctx.closePath();
// ctx.fill();
// }


// function drawMessage() {
// if (message) {
// ctx.fillStyle = "#000";
// ctx.font = "24px Arial";
// ctx.textAlign = "center";
// ctx.fillText(message, canvas.width / 2, 40);
// }
// }

// function checkCollision() {
// if (
// parcel.y + parcel.size >= house.y &&
// parcel.x >= house.x &&
// parcel.x <= house.x + house.width
// ) {
// parcel.delivered = true;
// parcel.falling = false;
// message = "✅ Parcel Delivered!";
// gameOver = true;
// }
// }


// function update() {
// ctx.clearRect(0, 0, canvas.width, canvas.height);


// if (!gameOver) {
// mover.x += mover.speed;
// if (mover.x > canvas.width) mover.x = -mover.width;
// }

// if (parcel.falling) {
// parcel.y += 3;
// checkCollision();
// if (parcel.y > canvas.height && !parcel.delivered) {
// message = "❌ Parcel Missed!";
// gameOver = true;
// }
// }

// drawMover();
// drawParcel();
// drawHouse();
// drawMessage();

// requestAnimationFrame(update);
// }

// update();