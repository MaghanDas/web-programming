const table = document.querySelector('table');

function xyCoord(td) {
  return {
    x: td.cellIndex,
    y: td.parentNode.sectionRowIndex,
  }
}

function delegate(parent, type, selector, handler) {
  parent.addEventListener(type, function (event) {
    const targetElement = event.target.closest(selector);

    if (this.contains(targetElement)) {
      handler.call(targetElement, event);
    }
  });
}

// 4. task: Attendance list (8 points)
// An attendance list is given on the page: checkboxes in the cells of a table, some of which are already checked at the beginning.

// a. (2 points) When the page loads, run a function that gives each table cell (<td>), that has a checkbox, a present style class. 
// Technical help: select all the checkboxes and iterate through them!
function renderTC() {
  const checkboxes = document.querySelectorAll("td input[type=checkbox]");
  checkboxes.forEach(cb => {
    const td = cb.closest("td");
    // if (cb.checked) {
    //   td.classList.add("present");
    // }
        td.classList.toggle("present", cb.checked);

  });
}
// run when page loads
document.addEventListener("DOMContentLoaded", renderTC);

// b. (2 point) By clicking on a table cell, focus on its checkbox (call the focus() method of the checkbox)!
delegate(table, "click", "td", function () {
  const checkbox = this.querySelector("input[type=checkbox]");
  if (checkbox) checkbox.focus();
// c. (1 point) Clicking on a checkbox will turn it on and off, and every time recolor the table by calling the coloring function 
// from subtask a.!
  renderTC()
});

// d. (2 points) Press the four arrow keys to read the x-y coordinates of the cell containing the focused checkbox, and write
//  that x-y coordinate to the console. If there is no focused checkbox, nothing should happen!

document.addEventListener("keydown", function (event) {
  const arrows = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

  if (!arrows.includes(event.key)) return;

  // find the currently focused checkbox
  const active = document.activeElement;

  if (!active || active.type !== "checkbox") return;

  const td = active.closest("td");
  if (!td) return;

  const coord = xyCoord(td);
  console.log(coord.x, coord.y);
});




document.addEventListener("keydown", function (event) {
  const directions = {
    ArrowUp:    { dx: 0, dy: -1 },
    ArrowDown:  { dx: 0, dy: 1 },
    ArrowLeft:  { dx: -1, dy: 0 },
    ArrowRight: { dx: 1, dy: 0 },
  };

  if (!(event.key in directions)) return;

  const active = document.activeElement;
  if (!active || active.type !== "checkbox") return;

  const td = active.closest("td");
  if (!td) return;

  const { x, y } = xyCoord(td);
  const { dx, dy } = directions[event.key];

  const newX = x + dx;
  const newY = y + dy;

  // find the target cell
  const row = table.rows[newY];
  if (!row) return;

  const targetCell = row.cells[newX];
  if (!targetCell) return;

  const targetCheckbox = targetCell.querySelector("input[type=checkbox]");
  if (!targetCheckbox) return;

  event.preventDefault(); // stop page scrolling
  targetCheckbox.focus();
});

// e. (1 point) Press the arrow keys to move in the appropriate direction, and focus on that checkbox. That is, when you press 
// the down key, the checkbox one cell below must be focused!
