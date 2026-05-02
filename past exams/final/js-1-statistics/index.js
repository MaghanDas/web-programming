
// includeOnce "data-json.json";

const taskA = document.querySelector('#taskA')
const taskB = document.querySelector('#taskB')
const taskC = document.querySelector('#taskC')
const taskD = document.querySelector('#taskD')
const taskE = document.querySelector('#taskE')


let projects = data.projects;
const task1sol = projects.filter(p => p.financing === "industry").length
taskA.innerHTML = task1sol
// console.log(task1sol)

// taskB 
let projectsBudgets = projects.some(p =>p.budget<=100)
taskB.innerHTML = projectsBudgets



// c. (2 pts) In the element with the identifier taskC, write out one project that will be 
// completed not in this decade (year 2030 or later)!
// You may assume that such a project exists

taskC.textContent = projects.find(p => parseInt(p.schedule.split("-")[0]) >= 2030).name

// d. (3 pts) In the element with the identifier taskD, list the financing types of 
// projects that are launched in (among others) the 11th district.
// Financing type identifiers (e.g. national) with repetitions: 1 point
// Financing type names written out in full (e.g. State investment): +1 point
// Without repetitions (either by identifier or full name): +1 point

taskD.innerHTML = projects.filter(pd=> pd.districts.some(d=>d ==11)).map(p=>p.financing + " ")


const budaDistricts = [1, 2, 3, 11, 12, 22];

const budaProjectsCount = projects.filter(project =>
  project.districts.some(d => budaDistricts.includes(d))
).length;

taskE.textContent = budaProjectsCount;







