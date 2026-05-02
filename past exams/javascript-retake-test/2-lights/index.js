const containerDiv = document.querySelector('#bethlehem');
const form = document.querySelector('form');
const colorButton = document.querySelector('#animate-colors');

// a. (2 points) Given a list element (ul) with the ID bethlehem with the pine tree as the background image. By clicking on this element, 
// add a new list item (li) to the list, setting the top and left properties according to the position of the mouse. Technical help: use the offsetX
//  and offsetY properties of the event object to get the position relative to the containing element!

containerDiv.addEventListener("click",(event)=>{
    const li = document.createElement("li");
    li.style.position = "absolute";
    li.style.top = event.offsetY + "px"
    li.style.left = event.offsetX + "px" 
    // Get selected color from the radio group
// b. (2 points) Click on the colored circles (radio group) below the image to select the color of the light to be added. 
// Set the background color of the added list item to the value of the radio group named color.

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

})

let intervalId = null;

colorButton.addEventListener('click', () => {
  if (intervalId !== null) return; // prevent multiple timers

  intervalId = setInterval(() => {
    const lights = document.querySelectorAll('#bethlehem li');
    if (lights.length === 0) return;

    // shift colors
    const colors = Array.from(lights).map(li => li.style.backgroundColor);
    const lastColor = colors.pop();
    colors.unshift(lastColor);
    lights.forEach((li, i) => li.style.backgroundColor = colors[i]);
  }, 1000); // every 1 second
});


