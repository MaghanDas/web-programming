
// task:1
// document.getElementById("helloBtn").addEventListener("click",()=>{
//     document.getElementById("helloTarget").innerText = "Hello World";
// })

// task:2

// document.getElementById("helloNTimesBtn").addEventListener("click",()=>{
//     let n = Number(document.getElementById("helloN").value);
//     const target = document.getElementById("helloNTarget");

//     target.innerHTML = "";

//     for(let i = 1; i<=n; i++){
//         const p = document.createElement("p");
//         p.innerText = "Hello World";
//         p.style.fontSize = (10 + i * 2) + "px"; // increasing 
//         target.appendChild(p);
//     }
// });

// task:3
// document.getElementById("multBtn").addEventListener("click", ()=>{
//     const n = Number(document.getElementById("multN").value);
//     const target = document.getElementById("tableTarget");
//     target.innerHTML = "";
//     const table = document.createElement("table");
//     for (let i =1; i <= n; i++){
//         const row = document.createElement("tr");
//         for(let j = 1; i<=n; j++){
//             const cell = document.createElement("td");
//             cell.innerText = i * j;
//             row.appendChild(cell);
//         }
//         table.appendChild(row);
//     }
//     target.appendChild(table);
// });


// Task: 4
// document.getElementById("circleBtn").addEventListener("click", ()=>{
//     let radius = Number(document.getElementById("radius").value);
//     let circumference =2 * Math.PI * radius;
//     let result = document.getElementById("circleTarget");
//     result.innerText= circumference
// })

// TASK 5: Show maiden name when female is selected
// const radios = document.querySelectorAll('input[name="sex"]');
// const maidenInput = document.getElementById('maiden_name');

// // function to update visibility
// function updateMaidenVisibility() {
//     const selected = document.querySelector('input[name="sex"]:checked').value;
//     maidenInput.hidden = (selected === "male");
// }

// // page load
// updateMaidenVisibility();

// // add event listeners
// radios.forEach(radio => {
//     radio.addEventListener('change', updateMaidenVisibility);
// });

// Task : 6 : list all hyperlinks on page load.
// window.addEventListener('load', () => {
//     const links = document.querySelectorAll('a');
//     const list = document.getElementById('urls');

//     links.forEach(link => {
//         const li = document.createElement('li');
//         li.innerText = link.href;
//         list.appendChild(li);
//     })
// })

// Task: 7. create table of contents.
// window.addEventListener("load", ()=>{
//     const tocList = document.getElementById('toc');
//     const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

//     headings.forEach(h => {
//         const li = document.createElement("li");
//         li.innerText = h.tagName + ": " + h.innerText;
//         tocList.appendChild(li);
//     })
// })

// Task 8: image handling
// TASK 8: Show image from URL
// document.getElementById("showImgBtn").addEventListener("click", () => {
//     const url = document.getElementById("imgUrl").value;
//     const container = document.getElementById("imgContainer");

//     container.innerHTML = ""; // clear previous

//     const img = document.createElement("img");
//     img.src = url;
//     img.style.maxWidth = "300px";

//     container.appendChild(img);
// });

// task: 9
// document.getElementById("copyBtn").addEventListener("click",()=>{
//     let copyfrom = document.getElementById("copyFrom");
//     let copyTo = document.getElementById("copyTo");
//     copyTo.value = copyfrom.value;
// })

// // TASK 10: Counter component
// const counterInput = document.getElementById("counter");
// const incBtn = document.getElementById("incBtn");
// 2const decBtn = document.getElementById("decBtn");

// // define limits
// const MIN = 0;
// const MAX = 10;

// function updateButtons(value) {
//     incBtn.disabled = value >= MAX;
//     decBtn.disabled = value <= MIN;
// }

// incBtn.addEventListener("click", () => {
//     let value = Number(counterInput.value) + 1;
//     counterInput.value = value;
//     updateButtons(value);
// });

// decBtn.addEventListener("click", () => {
//     let value = Number(counterInput.value) - 1;
//     counterInput.value = value;
//     updateButtons(value);
// });

// // initialize button states
// updateButtons(Number(counterInput.value));


// let secretNum = Math.floor(Math.random()*11)
// document.getElementById("guessBtn").addEventListener("click",()=>{
//     let userGuess = Number(document.getElementById("guessInput").value)
//     let guessResult = document.getElementById("guessResult");

//     if(secretNum>userGuess){
//         guessResult.innerText = "Number is Higher";
//     }
//     else if(secretNum <userGuess){
//         guessResult.innerText = "number is less";
//     }
//     else {
//         guessResult.innerText = "you guessed correct."
//     }
// })







