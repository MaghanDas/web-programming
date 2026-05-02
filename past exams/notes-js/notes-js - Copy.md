# LAB:1
# 1. VARIABLES
let name = "Anna";   // changeable
const PI = 3.14;     // constant
# 2. DATA TYPES
String → "Hello"
Number → 42
Boolean → true / false
Array → [1,2,3]
Object → {name: "Anna", age: 21}

null, undefined
`Hello ${name}` // Supports: variable insertion, multiline strings

# forloop on array: 
for(let element of array){
}
isLoggedIn ? "<p>Welcome</p>" : "<a>Login</a>" // ternary operator

# . Arrays & Array Methods
Important methods used:
arr.filter(x => x % 2 === 0)→ select matching items
arr.map(x => x + "C")→ transform values
arr.find(x => x < 0);
arr.findIndex(x => x === 23);
arr.some(x => x > 40);
arr.every(x => x > 0);
arr.reduce((sum, x) => sum + x, 0) → compute totals or longest streaks
Math.max(...arr)
Math.min(...arr)
Math.abs(x)
# Objects examples filtering 
 movies.forEach(m => console.log(m.title)); // movies list 
let longestMovie = movies.reduce((max, m) => m.length > max.length ? m : max);
let multiDirector = movies.filter(m => m.directors.length > 1);

// 11. Decide whether all matrix elements are even
function allEven(matrix) {
    return matrix.every(row => row.every(n => n % 2 === 0));
}
let air  = [-2, 5, 12, 18, 41, 7, 0];
console.log(air.map(t => `${t}C`));// b. Append 'C'
console.log("Max air:", Math.max(...air));


# lab: 2: CheatSheats. 
*************************************
# 1️⃣ Selecting Elements
document.getElementById("id")
document.querySelector("css selector")        
document.querySelectorAll("css selector")  // uses loop/ NodeList. 
# 1️⃣ EVENTS
element.addEventListener("click", function);    // buttons
element.addEventListener("input", function);  // live typing 
element.addEventListener("change", function);   // dropdowns,radios
window.addEventListener("load", function);      // rund code after page loads 
# 3️⃣ Reading & Writing Values
let value = document.getElementById("x").value;
element.innerText = "Hello";
element.innerHTML = "<b>Bold</b>";
element.value = "Something";  // for inputs
# 4️⃣ Creating & Appending HTML Elements
let li = document.createElement("li");
li.innerText = "Item";
parent.appendChild(li);
# 5️⃣ Disabling / Enabling Elements
button.disabled = true;
button.disabled = false;
# 6️⃣ Working With Classes & Attributes
element.classList.add("hide");
element.classList.remove("hide");
element.hidden = true;    // used in maiden-name task
img.src = url;            // used in show-image task
# 7️⃣ Loops (used in lists, tables, TOC)
for (let i = 0; i < n; i++) {}
for (let item of array) {}
array.forEach(item => {})
# 8️⃣ Array Methods You Used
array.filter(x => condition)
array.map(b => b.publisher)
[...new Set(array)] // set for uniqure values 
str.toLowerCase()
str.includes("abc") // string functions 
let x = Math.floor(Math.random() * 100) + 1; // random number generator 
# 1️⃣1️⃣ Math & Number Conversion
Number(input.value)
parseInt(string)
parseFloat(string)
.toFixed(2)
# 1️⃣3️⃣ Table Generation
let row = document.createElement("tr");
row.innerHTML = `<td>${year}</td><td>${amount}</td>`;
table.appendChild(row);

# LAB:3
Element that has the listener =>	event.currentTarget or this
Actual clicked element =>	event.target
Mouse button => event.button (0=left, 1=middle, 2=right)
Mouse position =>	clientX, clientY
Block navigation =>	event.preventDefault()
Getting attribute → getAttribute("href")
String.contains → .includes()
mouseenter -> Mouse hover event
Shuffle array =>	arr.sort(() => Math.random() - 0.5)
Store hidden value	 => element.dataset.value
Flip restriction =>	use a “lock” variable
Track game state	=> store first card clicked
Delay =>	setTimeout()

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    menu.style.left = e.pageX + "px";
    menu.style.top = e.pageY + "px";
});

document.addEventListener("keydown", (e) => {
    let keys = "";
    if (e.ctrlKey) keys += "Ctrl + ";
    if (e.shiftKey) keys += "Shift + ";
    if (e.altKey) keys += "Alt + ";
    keys += e.key;
});

li.addEventListener("mouseover", () => {
    details.textContent = ...;
});

Convert string → array
[...string]
string.split("")

# 🔹 Select one element
document.querySelector("form");
document.querySelector(".container");
document.querySelector("#id");

# 🔹 Select multiple elements
document.querySelectorAll("input");
document.querySelectorAll("input[type='range']");
document.querySelectorAll("input[data-consumption]");


DATA ATTRIBUTES (data-*)
HTML
<input data-consumption="50">
JavaScript to use this:
input.dataset.consumption       // preferred
input.getAttribute("data-consumption")
Always a string → convert to number!

# 7️⃣ MATCHING INPUT ↔ LABEL
HTML
<label for="fe">FE</label>
<input id="fe">
JavaScript
document.querySelector(`label[for="${input.id}"]`);
📌 This is semantic, clean, and exam-perfect
label.style.width = percentage + "%";
Listen once on parent
form.addEventListener("input", refreshChart);
element.classList.add -> Add CSS class for styling


# /// important concepts here 
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
# 🔹 6. CLASS & VISIBILITY CONTROL
// element.classList.add("class")
// element.classList.remove("class")
// element.classList.toggle("class")
// form.addEventListener("submit", e => {
//   e.preventDefault();
// });


# // ========= Random functions =========
function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
 // a,b both inclusive.
}

# Slider Quesions Handling..
  <form>
    Number of circles: 
    <input type="range" id="circle-number" min="3" max="10" value="3">
    <button type="button" id="start">Start</button>
  </form>
  <div id="container">
    <a class="circle"></a>
    <a class="circle"></a>
    <a class="circle"></a>
    <a class="circle"></a>
  </div>

  # javascript for that above html code to work with.
const inputCircleNumber = document.querySelector("#circle-number");
const divContainer = document.querySelector("#container");

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

# // c. Flash the first circle and then random with timer 
  const circles = document.querySelectorAll(".circle");
  if (circles.length > 0) {
    toggleHighlight(circles[0]);
  }
  const timer = setInterval(() => {
    if (i >= series.length) {
      clearInterval(timer);
      return;
    }
    toggleHighlight(circles[series[i] - 1]);
    i++;
  }, 1000);
// circle is a tag in html so to get it's value.
const value = Number(circle.dataset.number);
element.setAttribute("data-number", 1) // optinoal: setting value 

# another task of working with data like json array etc:
// Data
let contestants = {
  "1": {
    id: "1",
    name: "Contestant 1",
    penalties: [
      { timestamp: Date.now(), duration: 60000 },
      { timestamp: Date.now() - 2000, duration: 10000 },
      { timestamp: Date.now() - 10000, duration: 30000 },
    ],
  },
  "2": {
    id: "2",
    name: "Contestant 2",
    penalties: [
      { timestamp: Date.now(), duration: 10000 },
      { timestamp: Date.now() - 5000, duration: 10000 },
      { timestamp: Date.now() - 30000, duration: 30000 },
    ],
  },
};
# Loop over contestants
We can use Object.values(contestants) to get an array of contestant objects:
Object.values(contestants).forEach(contestant => {
  // for each contestant
});
# example question
a. (1 pt) Display the list of contestants in the list contestants in the format specified in index.html. (<li data-id="1">Note1 <span>45s</span></li>) 
// Clear the list first
ulContestants.innerHTML = "";
Object.values(contestants).forEach(contestant => {
  const li = document.createElement("li");
  li.dataset.id = contestant.id; // sets data-id="1"

  // Calculate total penalty in seconds
  const totalMs = contestant.penalties.reduce((sum, p) => sum + p.duration, 0);
  const totalSeconds = Math.round(totalMs / 1000);

  li.innerHTML = `${contestant.name} <span>${totalSeconds}s</span>`;
  ulContestants.appendChild(li);
});

Date.now() → current time in milliseconds
const li = e.target.closest("li") // get the clicked <li>

9️⃣ Persistence with LocalStorage (task h)
Save:
localStorage.setItem("contestants", JSON.stringify(contestants));

Load:
if (localStorage.getItem("contestants")) {
  contestants = JSON.parse(localStorage.getItem("contestants"));
}
# convert json string to js objects.
json looks like this: 
 "daily": [
//       {
//         "dt": 1603101600,
//         "sunrise": 1603084105,
//         "sunset": 1603122530,
//         "temp": {
//           "day": 10.39,
//           "min": 7.35,
//           "max": 12.3,
//           "night": 11.46,
//           "eve": 11.93,
//           "morn": 7.35
//         },
    //     "feels_like": {
    //       "day": 7.93,
    //       "night": 8.97,
    //       "eve": 9.69,
    //       "morn": 4.52
    //     },
    //     "pressure": 1026,
    //     "humidity": 72,
    //     "dew_point": 5.57,
    //     "wind_speed": 2.07,
    //     "wind_deg": 278,
    //     "weather": [
    //       {
    //         "id": 800,
    //         "main": "Clear",
    //         "description": "clear sky",
    //         "icon": "01d"
    //       }
    //     ],
    //     "clouds": 0,
    //     "pop": 0,
    //     "uvi": 2.21
    //   },

  #  these are json , to covert into js object.
  try {
    const data = JSON.parse(jsonString); // convert JSON string to JS object
    console.log(data);                   // log object to console
    // need to work here in exam so data remains here 
  } catch (error) {
    console.error("Invalid JSON!", error);
    // fallback: if JSON invalid, you could assign string as is
    // const data = jsonString;
  }

const dailyMaxes = weatherData.daily.map(day => day.temp.max);
Loops through each day in weatherData.daily
Extracts day.temp.max
Stores all the maximums in a new array called dailyMax
Example result:
dailyMaxes = [12, 15, 14];
Then you can do things like:
const smallestMax = Math.min(...dailyMaxes); // 12
const sumFeelsLike = feelslikes.reduce((sum, temp) => sum + temp, 0)
let allpressure = data.daily.map(day => day.pressure)

# image filter task that uses both checkBox and Slider: 
theFiltersDiv.addEventListener("input", () => {
  // 1️⃣ Get all checked checkboxes inside the filters div
  const checkedBoxes = theFiltersDiv.querySelectorAll("input[type=checkbox]:checked");

  // 2️⃣ Build an array of filter strings
  const filterStrings = Array.from(checkedBoxes).map(checkbox => {
    const filterTemplate = checkbox.value; // e.g., "blur(#px)"
    
    // Get the corresponding slider (assume it's next sibling inside the same label)
    const slider = checkbox.closest("label").querySelector("input[type=range]");
    const sliderValue = slider.value;

    // Replace '#' in the template with slider value
    return filterTemplate.replace("#", sliderValue);
  });

  # 3️⃣ Apply combined filters to image
  theImage.style.filter = filterStrings.join(" "); // multiple filters separated by space
});

# runs renderTC function when page loads 
document.addEventListener("DOMContentLoaded", renderTC);

element.classList.toggle("present", condition);
This version means:
if condition === true → add the class
if condition === false → remove the class

# csv file as text area
// Read content and split into lines
const lines = textarea.value.trim().split("\n");
// transform each line into an object 
const results = lines.map(line=> {
    const [neptun, jsscr, phpscr] = line.split(",")
    return {
        neptun: neptun,
        javascript:parseFloat( jsscr),
        php: parseFloat(phpscr)
    };
})
console.log(results);

const total = results.reduce((sum, r) => sum + r.javascript, 0);
const phpScores = results.map(r => r.php);



// c. (2 points) When adding a list item, select the next radio item in the color radio group. That is, if it was red, green should be checked,
//  blue after the green, yellow after the blue, red again after the yellow, and so on
    const radios = document.querySelectorAll('input[name="color"]');
    // get currently checked radio
    let currentIndex = Array.from(radios).findIndex(r => r.checked);
    // set background color to currently checked
    li.style.backgroundColor = radios[currentIndex].value;
    // append the light
    containerDiv.appendChild(li);
    // move to next radio (circular)
    const nextIndex = (currentIndex + 1) % radios.length;
    radios[nextIndex].checked = true;


# OBJECTS-ARRAYS.
<!-- let notes = {
  '1': {
    id: '1',
    title: 'JS retake test ideas',
    note: 'Note editor\nChristmas lights',
    color: '#238643',
  }, -->
  Object.values(notes).forEach(element => {
    const li = document.createElement("li");
    li.textContent = element.title
    li.dataset.id = element.id
    li.style.backgroundColor = element.color
    notesDiv.appendChild(li)
  });

# Local storage
const savedNotes = localStorage.getItem("notes");
if (savedNotes) {
  notes = JSON.parse(savedNotes);
}
  localStorage.setItem("notes", JSON.stringify(notes));

      // task:d number of rows 
    const rows = haikueditor.value.split("\n").length;
    numberofrows.textContent = rows

#  function countVowels(str) {
  return Array.from(str.toLowerCase())
    .filter(char => vowels.includes(char))
    .length;
}

# (1 pt) When the button inside the div end-of-game is clicked, reload the page, therefore starting a new game.
btnRestart.addEventListener("click",()=>{
  location.reload();
});



# d. (2 pts) Projects should be selectable by clicking,
#  and clicking again should deselect them.
document.getElementById("project-list").addEventListener("click", function (event) {
    const row = event.target.closest("tr");
    if (!row) return;

    row.classList.toggle("selected");
});


 When the modify deadline (modify-schedule) button is pressed, 
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
