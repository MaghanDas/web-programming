


// Task:1 
// document.querySelector("p").addEventListener("click", function(event){

//     console.log("a. handler object: ", this);
//     console.log("b. event type: ", event.type);
//     console.log("c. mouse button: ", event.button);
//     console.log("d. mouse position: ", event.clientX, event.clientY);
//     console.log("e. original source: ", event.target);

//     // if clicked on span, print its text
//     if(event.target.tagName ==="SPAN"){
//         console.log("f. span text: ", event.target.textContent);
//     }

// // //     // prevent navigation if link text is "libero"
//     if(event.target.tagName==="A" && event.target.textContent.trim()==="libero"){
//         event.preventDefault();
//         console.log("Blocked navigation to libero link")
//     }
// });


// Task: 5
// const board = document.getElementById("memory");
// const stepsDisplay = document.getElementById("steps");

// let steps = 0;
// let first = null;
// let lock = false;

// let values = [1,1,2,2,3,3,4,4];
// values.sort(() => Math.random() - 0.5); // shuffle

// values.forEach(value=>{
//     let card = document.createElement("div");
//     card.className= 'card';
//     card.dataset.value = value;
//     card.textContent = "?"    

//     card.addEventListener("click" ,()=>{
//         if(lock || card.classList.contains("open")) return 

//         card.classList.add("open");
//         card.textContent = card.dataset.value;

//         if(!first){
//             first = card;
//         }
//         else{
//             steps++;
//             stepsDisplay.textContent = steps;
//             lock = true;
//             setTimeout(() => {
//                 if(first.dataset.value !== card.dataset.value){
//                     first.classList.remove("open");
//                     card.classList.remove("open");
//                     first.textContent = "?";
//                     card.textContent = "?";
//                 }
//                 first = null;
//                 lock = false;
//             }, 600);
//         }
//     });
//     board.appendChild(card)
// });




// Task - Hangman game
// const words = ["javascript", "hangman", "developer"];
// const word = words[Math.floor(Math.random() * words.length)];

// let wrong = 0;
// const maxWrong = 6;

// const wrongSpan = document.getElementById("wrong");
// const wordDiv = document.getElementById("word");
// const lettersDiv = document.getElementById("letters");

// let revealed = Array(word.length).fill("_")

// // show blanks
// wordDiv.textContent = revealed.join(" ");

// // create letter buttons
// for (let c = 65; c <= 90; c++) {
//     let btn = document.createElement("button");
//     btn.textContent = String.fromCharCode(c);

//     btn.addEventListener("click", () => {
//         let letter = btn.textContent.toLowerCase();
//         btn.disabled = true;

//         if (word.includes(letter)) {
//             for (let i = 0; i < word.length; i++) {
//                 if (word[i] === letter) {
//                     revealed[i] = letter;
//                 }
//             }
//             wordDiv.textContent = revealed.join(" ");

//             if (!revealed.includes("_")) {
//                 alert("You win!");
//             }
//         } else {
//             wrong++;
//             wrongSpan.textContent = wrong;

//             if (wrong === maxWrong) {
//                 alert("You lose! The word was: " + word);
//             }
//         }
//     });

//     lettersDiv.appendChild(btn);
// }


// TASK_SLIDER: 6,,a,b,c

// document.querySelectorAll("input.display-value").forEach(slider => {
//     const valueBox = document.createElement("span");
//     valueBox.style.marginLeft = "10px";
//     slider.insertAdjacentElement("afterend", valueBox);

//     const updateValue = () => {
//         valueBox.textContent = slider.value;
//     };

//     slider.addEventListener("input", updateValue);
//     updateValue(); // initial
// });

// document.querySelectorAll("input.display-value").forEach(slider => {
//     const bubble = document.createElement("div");
//     bubble.style.position = "absolute";
//     bubble.style.background = "lightyellow";
//     bubble.style.padding = "2px 6px";
//     bubble.style.border = "1px solid black";
//     bubble.style.borderRadius = "4px";
//     bubble.style.transform = "translate(-50%, -150%)";
//     bubble.style.display = "none";

//     slider.parentElement.style.position = "relative";
//     slider.insertAdjacentElement("afterend", bubble);

//     slider.addEventListener("input", e => {
//         const rect = slider.getBoundingClientRect();
//         const percent = (slider.value - slider.min) / (slider.max - slider.min);
//         const x = percent * rect.width;

//         bubble.style.left = x + "px";
//         bubble.textContent = slider.value;
//         bubble.style.display = "block";
//     });

//     slider.addEventListener("mouseup", () => {
//         bubble.style.display = "none";
//     });
// });

// document.querySelectorAll(".faq h2").forEach(q => {
//     q.addEventListener("click", () => {
//         const answer = q.nextElementSibling;
//         answer.classList.toggle("hidden");
//     });
// });


// const menu = document.getElementById("menu");

// // Disable default menu
// document.addEventListener("contextmenu", (e) => {
//     e.preventDefault();

//     menu.style.display = "block";
//     menu.style.left = e.pageX + "px";
//     menu.style.top = e.pageY + "px";
// });

// // Hide menu on click
// document.addEventListener("click", () => {
//     menu.style.display = "none";
// });