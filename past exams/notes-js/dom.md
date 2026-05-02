# 1️⃣ Selecting Elements

# 🔹 Select one element
document.querySelector("form");
document.querySelector(".container");
document.querySelector("#id");

# 🔹 Select multiple elements
document.querySelectorAll("input");
document.querySelectorAll("input[type='range']");
document.querySelectorAll("input[data-consumption]");


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

# 1️⃣3️⃣ Table Generation
let row = document.createElement("tr");
row.innerHTML = `<td>${year}</td><td>${amount}</td>`;
table.appendChild(row);

# listeners 
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


# DATA ATTRIBUTES (data-*)
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