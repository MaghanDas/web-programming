const placesInput = document.querySelector('#places')
const speciesInput = document.querySelector('#species')
const button = document.querySelector('#btn-generate')
const tableContainer = document.querySelector('#table-container')
const task1 = document.querySelector('#task-1')
const task2 = document.querySelector('#task-2')
const task3 = document.querySelector('#task-3')
const task4 = document.querySelector('#task-4')
const task5 = document.querySelector('#task-5')

let matrix = []

button.addEventListener('click', onGenerate)
function onGenerate(e) {
  const n = placesInput.valueAsNumber
  const m = speciesInput.valueAsNumber

  matrix = generateMatrix(n, m)
  console.log(matrix);
}

function generateMatrix(n, m) {
  const matrix = []
  for(let i = 0; i<n; i++) {
    const row = []
    for(let j = 0; j<m; j++) {
      row.push(0)
    }
    matrix.push(row)
  }
  return matrix
}
