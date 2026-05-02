const task1 = document.querySelector('#task1');
const task2 = document.querySelector('#task2');
const task3 = document.querySelector('#task3');
const task4 = document.querySelector('#task4');

const game = [
  "XXOO",
  "O OX",
  "OOO ",
];

// task: 1
let task1sol = game.every(elem=>elem.length==game[1].length)
task1.innerHTML=task1sol;
// console.log(task1sol)

// task: 2
let myArray = game[0]
let task2Sol = true
for (let index = 0; index < myArray.length; index++) {
  if(myArray[index]!== 'X' &&  myArray[index] !== 'O'){
          task2Sol=false
          break
  }
}
task2.innerHTML= task2Sol

// task: 3
noOfX = 0
noOfO = 0
game.forEach(element => {
  noOfX += [...element].filter(x=>x=='X').length
  noOfO += [...element].filter(x=>x=='O').length
});

task3.innerHTML = `X / 0 = ${noOfX} / ${noOfO}`



// task: 4
// let str = game.join('');
let resultIndex = -1;

for (let i = 0; i < game.length; i++) {
  if (game[i].includes("XXX") || game[i].includes("OOO")) {
    resultIndex = i;
    break;
  }
}

task4.innerHTML= resultIndex
