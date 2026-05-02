1️⃣ What is the input event?
The input event is a DOM event that fires every time the value of an <input>, <textarea>, or <select> element changes, while the user is typing, selecting, or modifying the element.

Fires immediately as the value changes (real-time)
Works on text, number, color, range, password, search, tel, url, and textarea inputs
Not triggered by programmatic value changes (input.value = "new"), only user interaction

2️⃣ Key difference from change event
input	=> Value changes (typing, slider, color picker…)	Fires in real-time for every modification
change=>	Value loses focus or user confirms change	Fires once, only when input is committed

# example 
<input type="text" id="myInput">

# js
const input = document.querySelector("#myInput");
input.addEventListener("input", () => {
  console.log("input event:", input.value);
});
input.addEventListener("change", () => {
  console.log("change event:", input.value);
});
Typing Hello triggers 5 input events

<!-- <input type="text" id="username" placeholder="Type your name">
<p id="greeting"></p>

<script>
const input = document.getElementById("username");
const greeting = document.getElementById("greeting");

input.addEventListener("input", () => {
  greeting.textContent = `Hello, ${input.value}!`;
});
</script> -->

<input type="range" id="slider" min="0" max="100">
<span id="value">50</span>

<script>
const slider = document.getElementById("slider");
const value = document.getElementById("value");

slider.addEventListener("input", () => {
  value.textContent = slider.value;
});
</script>


6️⃣ Event object

The event handler receives an event object:

input.addEventListener("input", (event) => {
  console.log(event.target.value); // the new value
});

event.target → the element that triggered the event
event.data → the character added/removed (for text inp

7️⃣ Delegated input events
If you have many inputs, you can attach a single listener to a parent:

document.getElementById("form").addEventListener("input", (e) => {
  if (e.target.tagName === "INPUT") {
    console.log(`Changed input ${e.target.id}: ${e.target.value}`);
  }
});

Useful when creating dynamic forms


6️⃣ Radio (type="radio")

Group of options; only one can be selected in a group with the same name.

<input type="radio" name="color" value="red"> Red
<input type="radio" name="color" value="blue"> Blue

Events:
input → when selection changes
change → after selection

document.querySelectorAll('input[name="color"]').forEach(r => {
  r.addEventListener("input", () => console.log(r.value));
});


# 1️⃣ change event
Fires when a value of an input, select, or textarea is committed (i.e., user leaves field or confirms value).

Not real-time like input.
Example:

<input type="text" id="name">

const input = document.getElementById("name");
input.addEventListener("change", () => {
  console.log("Changed value:", input.value);
});
✅ Works for: text, number, checkbox, radio, select, textarea.

# 2️⃣ Keyboard events: keydown, keypress, keyup
Event	When it fires
keydown	When key is pressed down
keypress	While key is pressed (deprecated for some keys)
keyup	When key is released

Example:

document.addEventListener("keydown", e => {
  console.log("Key down:", e.key);
});

document.addEventListener("keyup", e => {
  console.log("Key up:", e.key);
});
✅ Notes:
e.key → string value of the key ("a", "Enter")
e.code → physical key on keyboard ("KeyA", "Enter"

3️⃣ Mouse events
Event	Fires when…
click	Element is clicked
dblclick	Element double-clicked
mousedown	Mouse button pressed down
mouseup	Mouse button released
mousemove	Mouse moves over element
mouseenter	Mouse enters element
mouseleave	Mouse leaves element
mouseover	Mouse enters element or children
mouseout	Mouse leaves element or children

Example:

<button id="btn">Click me</button>

const btn = document.getElementById("btn");
btn.addEventListener("click", () => console.log("Button clicked"));
btn.addEventListener("mouseenter", () => console.log("Mouse entered"));

# 4️⃣ Focus events
Event	Fires when…
focus	Element gains focus
blur	Element loses focus

Example:
const input = document.getElementById("name");
input.addEventListener("focus", () => console.log("Focused"));
input.addEventListener("blur", () => console.log("Lost 

# 5️⃣ Form events
Event	Notes
submit	Form submitted (usually <form>)
reset	Form reset
input	Fires on inputs inside form
change	Fires on committed changes inside form

Example:

<form id="myForm">
  <input type="text" name="name">
  <button type="submit">Submit</button>
</form>

const form = document.getElementById("myForm");
form.addEventListener("submit", e => {
  e.preventDefault(); // prevent default submission
  console.log("Form submitted");
});

# 8️⃣ Window events
Event	Notes
load	Fires when page finishes loading
resize	Window resized
scroll	Window or element scrolled
unload	Page is about to be closed

Example:

window.addEventListener("resize", () => console.log("Window resized"));

9️⃣ Touch & Pointer events (mobile / tablet)
Event	Notes
touchstart	Finger touches screen
touchmove	Finger moves on screen
touchend	Finger leaves screen
pointerdown	Generic pointer pressed
pointerup	Pointer released
🔟 Animation & Transition events
Event	Notes
animationstart	CSS animation begins
animationend	CSS animation ends
animationiteration	CSS animation repeats
transitionstart	CSS transition begins
transitionend	CSS transition ends
Summary Table: Major Event Categories
Category	Events	Example Use Case
Input/Form	input, change, submit, reset	Live form updates
Keyboard	keydown, keyup, keypress	Detect typing
Mouse	click, dblclick, mouseenter, mouseleave	Buttons, tooltips
Focus	focus, blur	Form validation
Clipboard	copy, cut, paste	Custom clipboard actions
Drag & Drop	dragstart, dragover, drop	File upload, drag items
Window	load, resize, scroll, unload	Responsive layout, lazy load
Touch/Pointer	touchstart, touchmove, touchend, pointerdown	Mobile interactions
Animation	animationstart, animationend	Animated UI feedback

