const inputCircleNumber = document.querySelector("#circle-number");
const buttonStart = document.querySelector("#start");
const divContainer = document.querySelector("#container");
const divOutput = document.querySelector("#output");

// Application state

let canGuess = false;
let solution = [];
let series = [];

// ========= Utility functions =========

function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function toggleHighlight(node) {
  node.classList.toggle("highlight")
  node.addEventListener("animationend", function (e) {
    node.classList.remove("highlight");
  }, {once: true});
}
// =====================================
// a. (2 pts) By moving the slider responsible for the number of circles, draw the amount of circles corresponding to 
// the value of the slider in the element with the ID container. You can find an example of what a circle looks like in
// //  index.html.

function drawCircles(){
  divContainer.innerHTML = "";
  let numOfCircle = Number(inputCircleNumber.value )
for (let index = 0; index < numOfCircle; index++) {
  let a = document.createElement("a");
  a.classList.add("circle");
  divContainer.appendChild(a);
}
}
inputCircleNumber.addEventListener("input", drawCircles);


// b. (1 pt) When the "Start" button is pressed, fill the series array with 7 random integers ranging from 1 to the number 
// of circles (inclusive). Output the series array to the console.
// c. (1 pt) Also when the "Start" button is pressed, flash the first circle. Use the utility function toggleHighlight with the
//  DOM element of the given circle as parameter. This function applies an animation to the selected element, then 
//  removes the animation as well.


buttonStart.addEventListener("click",()=>{
  series = []
  const max = Number(inputCircleNumber.value);
  for (let i = 0; i < 7; i++) {
    const randomNumber = Math.floor(Math.random() * max) + 1;
    series.push(randomNumber);
  } 
  console.log(series)
  // c. Flash the first circle
  const circles = document.querySelectorAll(".circle");
  // if (circles.length > 0) {
  //   toggleHighlight(circles[0]);
  // }

  // task:d 
  let i = 0;
  const timer = setInterval(() => {
    if (i >= series.length) {
      clearInterval(timer);
      return;
    }
    toggleHighlight(circles[series[i] - 1]);
    i++;
  }, 1000);

let solution = [];

circles.forEach(circle => {
  circle.addEventListener("click", () => {
    const value = Number(circle.dataset.number);
    solution.push(value);
    // check length
    if (solution.length === series.length) {

      // compare arrays
      let equal = true;
      for (let i = 0; i < series.length; i++) {
        if (solution[i] !== series[i]) {
          equal = false;
          break;
        }
      }
      console.log(equal ? "equal" : "not equal");
    }
  });
});
})

// e. (1 pt) When a circle is clicked, read the circle's number and insert it into the solution array. Check whether the length of the 
// solution array has reached the length of series. If the length is equal, then check whether the two arrays are the same. Output the 
// result to the console.

// f. (1 pt) Write "Flashing circles..." while the circles are flashing and "Now, your turn..." when the flashing is over into the element 
// with the ID output˙. Use the same element at the end of the game to display either "Nice job!" or "Failed!" depending on the result.
// g. (1 pt) Use a state variable (canGuess) to ignore the player's input if the flashing hasn't finished yet.

