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


# . Arrays & Array Methods & String
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
[...new Set(array)] // set for uniqure values 
str.toLowerCase()
str.includes("abc") // string functions 
let x = Math.floor(Math.random() * 100) + 1; // random number
Convert string → array
[...string]
string.split("")
# examples: String-> Array
const str = "apple,banana,orange";
const arr = str.split(",");  // split by comma
console.log(arr); // ["apple", "banana", "orange"]
const str = "hello";
const chars = str.split("");
console.log(chars); // ["h", "e", "l", "l", "o"]
const str = "hello";
const chars = Array.from(str);
console.log(chars); // ["h", "e", "l", "l", "o"]
# 2️⃣ Convert Array → String
(a) Join elements with a separator (.join())
const arr = ["apple", "banana", "orange"];
const str = arr.join(", "); // specify separator
console.log(str); // "apple, banana, orange" // default .
const str = "hello";
const arr1 = str.split("");      // ["h", "e", "l", "l", "o"]
const arr2 = Array.from(str);    // ["h", "e", "l", "l", "o"]
const arr3 = [...str];           // ["h", "e", "l", "l", "o"]


# 1️⃣1️⃣ Math & Number Conversion
Number(input.value)
parseInt(string)
parseFloat(string)
.toFixed(2)



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


# Objects-Array Conversions: 

1️⃣ Object → Array
a) Object.keys(obj) → array of keys
const obj = { a: 1, b: 2, c: 3 };
const keys = Object.keys(obj);
console.log(keys); // ["a", "b", "c"]

b) Object.values(obj) → array of values
const values = Object.values(obj);
console.log(values); // [1, 2, 3]

c) Object.entries(obj) → array of [key, value] pairs
const entries = Object.entries(obj);
console.log(entries); // [["a", 1], ["b", 2], ["c", 3]]

d) Spread operator with object (shallow copy)
const newObj = { ...obj }; // copy object

2️⃣ Array → Object
a) Using Object.fromEntries (array of [key,value])
const arr = [["a", 1], ["b", 2], ["c", 3]];
const obj = Object.fromEntries(arr);
console.log(obj); // { a: 1, b: 2, c: 3 }

b) Using a loop
const arr = ["a", "b", "c"];
const obj = {};
arr.forEach((key, i) => obj[key] = i + 1);
console.log(obj); // { a: 1, b: 2, c: 3 }

3️⃣ Object ↔ JSON (string)
a) Object → JSON string
const obj = { name: "Alice", age: 25 };
const str = JSON.stringify(obj);
console.log(str); // '{"name":"Alice","age":25}'

b) JSON string → Object
const str = '{"name":"Alice","age":25}';
const obj = JSON.parse(str);
console.log(obj); // { name: "Alice", age: 25 }

c) Works with arrays too
const arr = [1, 2, 3];
const str = JSON.stringify(arr); // "[1,2,3]"
const newArr = JSON.parse(str);   // [1,2,3]

// get array of values
Object.values(notes).forEach(note => {
  console.log(note.title, note.note, note.color);
});

# examples
const notes = {
  "1": { id: "1", title: "Note1", note: "Text1", color: "#fff" },
  "2": { id: "2", title: "Note2", note: "Text2", color: "#000" }
};

// get array of entries [key, value]
Object.entries(notes).forEach(([id, note]) => {
  console.log(id, note.title);
});

# Folder structure
/data
  ├─ data.js
  └─ data.json
/project
  └─ app.js
// /data/data.js

export const data = {
  projects: [...],
  financingLocalization: {...},
  districtLocalization: [...]
};

a) Using ES Modules (modern JS)
// /project/app.js
import { data } from "../data/data.js"; // go up one folder, then into /data
console.log(data.projects);

b) Using CommonJS (Node.js)
// /data/data.js
module.exports = {
  projects: [...],
  financingLocalization: {...},
  districtLocalization: [...]
};

// /project/app.js
const data = require("../data/data.js");
console.log(data.projects);

a) Node.js (modern, ES Modules)
// /project/app.js
import data from "../data/data.json" assert { type: "json" };
console.log(data.projects);

b) Node.js (CommonJS)
const data = require("../data/data.json");
console.log(data.projects);

5️⃣ Example usage
// Using ES Modules
import { data } from "../data/data.js";

data.projects.forEach(project => {
  console.log(project.name);
});

// Using JSON in Node.js
const data = require("../data/data.json");

data.projects.forEach(project => {
  console.log(project.name);
});

2️⃣ Accessing data.json in same folder
a) Node.js / CommonJS
const data = require("./data.json");
console.log(data.projects);

So, if your structure is like this:

/project
  ├─ app.js
  ├─ data.js
  └─ data.json


JS module: import { data } from "./data.js";

JSON: const data = require("./data.json");

Everything is local, no folder navigation needed.

