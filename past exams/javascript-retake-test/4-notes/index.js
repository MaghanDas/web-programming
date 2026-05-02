const notesDiv = document.querySelector('#notes');
const noteEditorDiv = document.querySelector('#note-editor');
const titleInput = document.querySelector('#title');
const noteTextarea = document.querySelector('#note');
const colorInput = document.querySelector('#color');

let notes = {
  '1': {
    id: '1',
    title: 'JS retake test ideas',
    note: 'Note editor\nChristmas lights',
    color: '#238643',
  },
  '2': {
    id: '2',
    title: 'Books to read',
    note: 'Book1\nBook2\nBook3',
    color: '#647372',
  },
  '3': {
    id: '3',
    title: 'Movies to watch',
    note: 'The new spiderman movie',
    color: '#9373aa',
  },
};

const savedNotes = localStorage.getItem("notes");
if (savedNotes) {
  notes = JSON.parse(savedNotes);
}


// 4. task: Notes (4-notes, 8 points)
// Create a note-taking application! Few notes are given in the task, and it will be your task to display, edit and store them!

// a. (1 point) In the index.js file a data structure called notes is prepared that stores the notes. For each note an ID (id), 
// a title (title), a note (note) and a color (color) is given. On page load, display the title of the notes within the list with 
// notes ID as specified in the sample (<li data-id="1" style="background-color: #467364;">Note1</li>). The data-id 
// attribute contains the ID of the note, background-color the color, and list item the title itself. Technical help: you can read
//  only the values from an object with the Object.values(notes) (Links to an external site.) method.

function listNOtes() {
  Object.values(notes).forEach(element => {
    const li = document.createElement("li");
    li.textContent = element.title
    li.dataset.id = element.id
    li.style.backgroundColor = element.color
    notesDiv.appendChild(li)
  });
}

document.addEventListener("DOMContentLoaded", listNOtes);

// b. (1 point) Clicking on a note, add a selected style class to the given list item!
notesDiv.addEventListener("click", (event) =>{
  const li = event.target.closest("li")
  if(!li) return;
// task: 3 remove selection from all notes
  document.querySelectorAll("#notes li").forEach(note =>
    note.classList.remove("selected")
  );
  li.classList.add("selected")
// task:4 
noteEditorDiv.hidden = false;
// get note data using data-id
const noteId = li.dataset.id; 
const note = notes[noteId]
// fill editor fileds
titleInput.value = note.title
noteTextarea.value = note.note 
colorInput.value = note.color
});

noteEditorDiv.addEventListener("input", () => {
  const selectedLi = document.querySelector("#notes li.selected");
  if (!selectedLi) return;

  const noteId = selectedLi.dataset.id;
  const note = notes[noteId];

  // save changes back to data structure
  note.title = titleInput.value;
  note.note = noteTextarea.value;
  note.color = colorInput.value;

  // update list UI immediately
  selectedLi.textContent = note.title;
  selectedLi.style.backgroundColor = note.color;
  localStorage.setItem("notes", JSON.stringify(notes));

});


// c. (1 point) Make the note selection exclusive, i.e. only the last selected note has to have a selected style class!

// d. (2 points) When selecting a note, display the details of the note. To do this, display the div with the note-editor ID,
//  which is hidden with the hidden attribute, and then set the values of the input fields within the div according to the data
//   of the selected note: title, text, and color.
// e. (1 point) Save any changes to the note (title, text, color) immediately back to the original data structure. Technical 
// Support: each form element triggers an input event when modified, so listen at the parent element that contains them and
//  save all data back to the original note.
// f. (1 point) Changes should also appear in the note list, i.e. if there is a change in the title or background color, they should 
// appear in the list immediately.
// g. (1 point) Keep the changes even after reloading the page! Technical help: use your browser's local storage (Links to an 
//   external site.). Always save it when editing, and read it when the page loads.
