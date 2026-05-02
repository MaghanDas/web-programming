const textarea = document.querySelector('#the-textarea');
const button = document.querySelector('#the-button');
const task1 = document.querySelector('#task1')
const task2 = document.querySelector('#task2')
const task3 = document.querySelector('#task3')
const task4 = document.querySelector('#task4')
const task5 = document.querySelector('#task5')


// a. (2 points) Read the CSV data from the textarea, and transform it to an array that contains the students' results as it
//  is shown below! Write the transformed array to the console! We can assume that the input in the textarea is correct, 
//  and it contains three columns separated by commas. Technical help: the contents of the textarea must be split into lines 
//  by \n characters and then the lines by comma.
// Example: if the textarea contains the line IDDQDX,17.5,23, then one of the elements of the array is:
// {neptun: 'IDDQDX', javascript: 17.5, php: 23}.

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

// b. (1 point) The generated should contain correct types, i.e. the scores must be of type number!
// c. (1 point) In the element with the identifier task1, display how many students have not scored at least 12 points in the
//  JavaScript exam!
task1.textContent = results.filter(r => r.javascript < 12).length

// d. (1 point) In the element with the identifier task2, display the average score of the JavaScript exams!
let sum = 0
for (let index = 0; index < results.length; index++) {
    sum += results[index].javascript
}
task2.textContent =sum/results.length

// const phpScores = results.map(r => r.php);
// e. (1 point) In the element with the identifier task3, display what is the highest total score that a student has achieved 
// from the two exams (js+php)!
const totalscore = results.map(r => r.php + r.javascript)
task3.textContent = Math.max(...totalscore)
// f. (1 point) In the element with the identifier task4, display the Neptun code of a student who did not score at least 12 
// points in any of the enclosures! Presumably such a student exists.
const failedBoth = results.filter(r => r.php <12 && r.javascript<12)
console.log(failedBoth[0])
// task4.textContent = failedBoth
// g. (1 point) In the item with the identifier task5, display if there is a student who has scored at least 24 points in both
//  places!

