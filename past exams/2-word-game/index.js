// ========= Utility functions =========
function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

// ========= Selected elements =========
const inputGuess = document.querySelector("#inputGuess");
const form = document.querySelector("form");
const tableGuesses = document.querySelector("#guesses");
const divTheWord = document.querySelector("details > div");
const spanError = document.querySelector("#error");
const btnGuess = document.querySelector("form > button");
const divEndOfGame = document.querySelector("#end-of-game");
const btnRestart = document.querySelector("#restart");

// ========= Solution =========
// a. (1 pt) Choose a random word from the array wordList and display it in the div divTheWord 
// that is inside the details element. (You can use this to view the solution while testing
const randomWord = wordList[random(0, wordList.length - 1)];
divTheWord.textContent = randomWord;

// b. (1 pt) Currently the form on the page is submitted when the user presses ENTER or clicks the 
// button. Prevent this behaviour using JavaScript. Instead of submitting the form, select the text in 
// the text field and delete the content of the span element of the form.

// c. (1 pt) When the form is submitted, check that the entered word consists of exactly 5 characters.
//  If not, then display an error message (e.g. "The length of the word is not 5!") in the span element of the form.

// d. (1 pt) When the form is submitted, check that the entered work is in the array wordList. If not, then display an error message 
// (e.g. "The word is not considered acceptable!") in the span element of the form

// e. (1 pt) Calculate how many letters of the guessed word are in the correct position and output the
// number to the console.

// f. (1 pt) Insert the guessed word and the calculated number as the first row of the table

form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent form submission

  const guess = inputGuess.value.trim(); // read input, remove spaces
  spanError.textContent = "";             // clear previous error

    if (guess.length !== 5) {
    spanError.textContent = "The length of the word is not 5!";
    inputGuess.select(); // select text so user can retype easily
    return;              // stop here if invalid
  }

  if(!wordList.includes(guess)){
    spanError.textContent = "The word is not considered acceptable!"
    inputGuess.select();
    return;
  }
  // if we get here, the length is correct (5)
  // next tasks will continue from here
  // task:e
  let countOfCorrect = 0
  for(let i =0; i<5; i++){
    if (guess[i] ===randomWord[i]) {
      countOfCorrect++;
    }
}
console.log(countOfCorrect)
// task: h
// Create a new table row
const row = document.createElement("tr");
// Create cells
const tdWord = document.createElement("td");
const tdMatches = document.createElement("td");
// Fill cells with data
tdWord.textContent = guess;
tdMatches.textContent = countOfCorrect;
// Append cells to row
row.appendChild(tdWord);
row.appendChild(tdMatches);
// Insert as FIRST row in tbody
tableGuesses.prepend(row);

// g. (1 pt) If the guess is correct, apply the style class of correct to the row and display the div end-of-game.
if(countOfCorrect===5){
  row.classList.add("correct");   // apply correct styling
  divEndOfGame.hidden = false;    // show end-of-game message
}
});

//  (1 pt) When the button inside the div end-of-game is clicked, reload the page, therefore starting a new game.
btnRestart.addEventListener("click",()=>{
  location.reload();
});


/// important concepts here 
// tbody.prepend(row); // inserts first row.
// location.reload(); // page reloads
// event.target // event Objects
// event.type
// event.button
// event.clientX
// event.clientY
// element.hidden = true;
// element.hidden = false;
// Tables (VERY COMMON)
// const tr = document.createElement("tr");
// const td = document.createElement("td");
// td.textContent = value;
// tr.appendChild(td);
// tbody.prepend(tr); // or appendChild
// 🔹 6. CLASS & VISIBILITY CONTROL
// element.classList.add("class")
// element.classList.remove("class")
// element.classList.toggle("class")
// form.addEventListener("submit", e => {
//   e.preventDefault();
// });
