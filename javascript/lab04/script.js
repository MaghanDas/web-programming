

const board = document.getElementById("board");
const sizeInput = document.getElementById("sizeInput");
const generateBtn = document.getElementById("generateBtn");
const counterDisplay = document.getElementById("counter");

let treasureRow = 0
let treasureCol = 0
let clickCounter = 0

createBoard(2)

generateBtn.addEventListener("click",()=>{
    const size = Number(sizeInput.value);
    if(size<2) return alert("size must be atleast 2")
        createBoard(size);
})

function createBoard(size){
    board.innerHTML = "";
    board.style.gridTemplateColumns =   `repeat(${size},50px)`;  
    // Reset counter
    clickCounter = 0;
    counterDisplay.textContent = clickCounter;

    treasureRow = Math.floor(Math.random() * size);
    treasureCol = Math.floor(Math.random() * size);

    for (let r = 0; r<size; r++){
        for(let c = 0; c < size; c++){
            const cell = document.createElement("div");
                cell.className = "cell";
                cell.addEventListener("click", ()=>{
                    clickCounter++;
                    counterDisplay.textContent = clickCounter;
                    if(r===treasureRow && c === treasureCol){
                        cell.textContent = "💰"
                        alert(`treasure found in ${clickCounter} clicks`);
                        createBoard(size);
                    }
                });
            board.appendChild(cell);
        }
    }
}