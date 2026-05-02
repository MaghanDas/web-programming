// ==========================
// Memory Game - Full Solution
// ==========================

// Select DOM elements
const inputCircleNumber = document.querySelector("#circle-number"); // Slider for number of circles
const buttonStart = document.querySelector("#start");               // Start button
const divContainer = document.querySelector("#container");          // Container holding circles
const divOutput = document.querySelector("#output");                // Status/output messages

// Application state
let canGuess = false; // State variable: true = player can click, false = ignore clicks
let series = [];      // Generated random series
let solution = [];    // Player's guesses

// ========= Utility functions =========

// Generate random integer between a and b inclusive
function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

// Toggle highlight animation for a circle
function toggleHighlight(node) {
  node.classList.toggle("highlight"); // Add animation class
  node.addEventListener(
    "animationend",                    // Remove class after animation ends
    function () {
      node.classList.remove("highlight");
    },
    { once: true }
  );
}

// ========= Task a: Draw circles based on slider =========
function drawCircles() {
  divContainer.innerHTML = ""; // Clear container

  const n = Number(inputCircleNumber.value); // Slider value → number of circles

  for (let i = 0; i < n; i++) {
    const circle = document.createElement("a"); // Create a new <a> element
    circle.classList.add("circle");            // Add styling class
    divContainer.appendChild(circle);          // Add circle to container
  }
}

// Initial drawing on page load
drawCircles();

// Redraw circles whenever slider changes
inputCircleNumber.addEventListener("input", drawCircles);

// ========= Task b + c: Start game, generate series, flash first circle =========
function startGame() {
  canGuess = false;  // Disable player input while flashing
  solution = [];     // Reset previous player solution
  series = [];       // Clear previous series

  const n = Number(inputCircleNumber.value); // Number of circles

  // Generate series of 7 random numbers (1..n)
  for (let i = 0; i < 7; i++) {
    series.push(random(1, n));
  }
  console.log("Generated series:", series);

  // Flash sequence of circles with delay
  flashSeries(); // Task d
}

// ========= Task d + f: Flash sequence with 1s delay =========
function flashSeries(i = 0) {
  if (i === 0) divOutput.textContent = "Flashing circles..."; // Status message

  if (i < series.length) {
    const circles = document.querySelectorAll("#container .circle");
    const circleIndex = series[i] - 1; // Convert 1-based series number → 0-based NodeList
    toggleHighlight(circles[circleIndex]);

    setTimeout(() => flashSeries(i + 1), 1000); // Recursive call after 1s
  } else {
    // After flashing sequence finishes
    divOutput.textContent = "Now, your turn...";
    canGuess = true; // Enable player input
    solution = [];   // Reset player's solution array
  }
}

// ========= Task e + g: Handle player clicks =========
divContainer.addEventListener("click", (event) => {
  if (!canGuess) return; // Ignore clicks if flashing not finished

  const clickedCircle = event.target;

  // Only handle clicks on circles
  if (!clickedCircle.classList.contains("circle")) return;

  const circles = Array.from(divContainer.querySelectorAll(".circle"));
  const circleNumber = circles.indexOf(clickedCircle) + 1; // 0-based → 1-based

  solution.push(circleNumber); // Track player's guess
  toggleHighlight(clickedCircle); // Visual feedback

  // Check if player completed the sequence
  if (solution.length === series.length) {
    const success = solution.every((num, idx) => num === series[idx]); // Compare arrays
    console.log("Player sequence:", solution);
    console.log("Series:", series);
    console.log(success ? "Nice job!" : "Failed!");

    divOutput.textContent = success ? "Nice job!" : "Failed!"; // Update output
    canGuess = false; // Disable further input until next game
  }
});

// ========= Event listener for Start button =========
buttonStart.addEventListener("click", startGame);
