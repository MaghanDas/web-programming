

const haikueditor = document.querySelector("#haiku-editor")
const numberofcharacters = document.querySelector("#number-of-characters")
const numberofrows = document.querySelector("#number-of-rows")
const vowelsPerRowList = document.querySelector("#vowels-per-row");
const vowels = ["a", "e", "i", "o", "u"]

function countVowels(str) {
  return Array.from(str.toLowerCase())
    .filter(char => vowels.includes(char))
    .length;
}

haikueditor.addEventListener("input",()=>{
   // task b : log contents 
    console.log(haikueditor.value)
    // task c: number of characters : 
    numberofcharacters.textContent = haikueditor.value.length 

    // task:d number of rows 
    const rows = haikueditor.value.split("\n");
    numberofrows.textContent = rows.length
// e. (1 pt) Output the number of vowels in the first row to the console while typing.
  const firstRowVowels = countVowels(rows[0] || "");
  console.log("Vowels in first row:", firstRowVowels);

// f. (1.5 pts) List the number of vowels per row in the HTML list with ID vowels-per-row.
  vowelsPerRowList.innerHTML = ""; // clear existing list
rows.forEach(row => {
    const li = document.createElement("li")
    li.textContent = countVowels(row)
    vowelsPerRowList.appendChild(li);
});
})