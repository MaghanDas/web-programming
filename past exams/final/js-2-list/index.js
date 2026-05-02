const controlsDiv = document.querySelector('#controls')
const newScheduleSpan = controlsDiv.querySelector('#new-schedule')
const subMonthsButton = controlsDiv.querySelector('#sub-months')
const addMonthsButton = controlsDiv.querySelector('#add-months')
const modifyScheduleButton = controlsDiv.querySelector('#modify-schedule')
const projectsList = document.querySelector('#project-list')


const dateRangeMinYearInput = document.querySelector('#date-range-min-year')
const dateRangeMinMonthSelect = document.querySelector('#date-range-min-month')
const dateRangeMaxYearInput = document.querySelector('#date-range-max-year')
const dateRangeMaxMonthSelect = document.querySelector('#date-range-max-month')

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]


function addMonth(dateString, months) {
    const [yearStr, monthStr] = dateString.split("-")
    let year = parseInt(yearStr, 10)
    let month = parseInt(monthStr, 10)
    let index = (year * 12 + (month - 1)) + months

    const newYear = Math.floor(index / 12);
    const newMonth = (index % 12) + 1;

    return `${newYear}-${String(newMonth).padStart(2, "0")}`;
}

function monthDistance(a, b) {
    const [ay, am] = a.split("-").map(Number)
    const [by, bm] = b.split("-").map(Number)

    const aIndex = ay * 12 + (am - 1)
    const bIndex = by * 12 + (bm - 1)

    return bIndex - aIndex
}

// task a. (2 pts) List the projects in the element with the identifier 
// project-list in the way shown in the boilerplate code!

// task:a 
const projects = data.projects;
// console.log(projects)
projectsList.innerHTML = ""
projects.forEach(element => {
    const tr = document.createElement("tr");
    tr.classList.add("dangerous-schedule");
    const td = document.createElement("td");
    td.classList.add("schedule");
    td.textContent= element.schedule;
    const td2 = document.createElement("td");
    td2.textContent= element.name;

    tr.appendChild(td);
    tr.appendChild(td2);
    projectsList.appendChild(tr);
});

// // task:b
// b. (1 pts) When the plus button (add-months) is pressed, increase the number in the new-schedule
// field by one. The minus button (sub-months) works similarly, but decreases the number. The value 
// can benegative

let numtask2 = Number(newScheduleSpan.textContent)
addMonthsButton.addEventListener("click",()=>{
    numtask2 = numtask2 + 1
    newScheduleSpan.textContent = numtask2
})

subMonthsButton.addEventListener("click",()=>{
  numtask2 =  numtask2 - 1
  newScheduleSpan.textContent = numtask2
})


// d. (2 pts) Projects should be selectable by clicking,
// and clicking again should deselect them.
projectsList.addEventListener("click", function (event) {
    const row = event.target.closest("tr");
    if (!row) return;
    row.classList.toggle("selected");
});


// g. (2 pts) Projects should be continuously sorted by deadline: overdue at the top, safe at the bottom.
// Therefore, after every modification (pressing modify-schedule), the list must be sorted.
// You don’t need to worry about keeping selections.
function sortProjects() {
    const tbody = document.getElementById("project-list");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    // January 2026 reference
    const todayMonths = 2026 * 12 + 1;

    rows.sort((a, b) => {
        const [ay, am] = a.querySelector(".schedule").textContent.split("-").map(Number);
        const [by, bm] = b.querySelector(".schedule").textContent.split("-").map(Number);

        const aDiff = (ay * 12 + am) - todayMonths;
        const bDiff = (by * 12 + bm) - todayMonths;

        return aDiff - bDiff; // overdue (negative) first
    });

    // Reinsert rows in sorted order
    rows.forEach(row => tbody.appendChild(row));
}


// e. (1 pts) When the modify deadline (modify-schedule) button is pressed, 
// change the deadlines of the selected projects by the given number of months 
// (e.g., increase by two months). If you couldn’t implement selection, change all projects.

modifyScheduleButton.addEventListener("click", function () {
    const monthDelta = numtask2
    if (isNaN(monthDelta)) return;

    // Get selected rows
    let rows = document.querySelectorAll("#project-list tr.selected");

    // If no selection exists, modify all projects
    if (rows.length === 0) {
        rows = document.querySelectorAll("#project-list tr");
    }

    rows.forEach(row => {
        const cell = row.querySelector(".schedule");
        const [year, month] = cell.textContent.split("-").map(Number);

        // Convert to total months, modify, then convert back
        let totalMonths = year * 12 + (month - 1) + monthDelta;

        let newYear = Math.floor(totalMonths / 12);
        let newMonth = (totalMonths % 12) + 1;

        // Format back to YYYY-MM
        cell.textContent = `${newYear}-${String(newMonth).padStart(2, "0")}`;
    });

    sortProjects();
});

// f. (2 pts) Categorize the projects (apply the appropriate style class) based on how much time is left.
// Count the remaining time from January 2026 (i.e., act as if "today" is 2026-01)
// safe-schedule: at least 24 months remaining
// risky-schedule: not safe, but at least 12 months remaining
// dangerous-schedule: not safe and not risky, but still in the future
// overdue-schedule: the new deadline is January 2026 or earlier

function categorise() {
    let rows = document.querySelectorAll("#project-list tr");
    let initial = 2026 * 12 + 1;    

    rows.forEach(row => {
        const cell = row.querySelector(".schedule");
        const [year, month] = cell.textContent.split("-").map(Number);
        let totalMonths = year * 12 + month;
        let diff = totalMonths-initial;
                // Remove old category classes
        row.classList.remove(
            "safe-schedule",
            "risky-schedule",
            "dangerous-schedule",
            "overdue-schedule"
        );

        if(diff >=24){
            row.classList.add("safe-schedule")
        } else if(diff >= 12){
            row.classList.add("risky-schedule")
        } else if(diff > 0){
            row.classList.add("dangerous-schedule")
        } else{
            row.classList.add("overdue-schedule")
        }
    });
}

categorise()

// g. (2 pts) Projects should be continuously sorted by deadline: overdue at the top, safe at the bottom.
// Therefore, after every modification (pressing modify-schedule), the list must be sorted.
// You don’t need to worry about keeping selections.



