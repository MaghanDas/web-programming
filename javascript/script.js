// let students = [
//   { id: "ABC123", name: "Alice", dob: "2000-01-01" },
//   { id: "XYZ456", name: "Bob", dob: "1999-05-12" }
// ];

// let table = "<table><tr><th>ID</th><th>Name</th><th>DOB</th></tr>";
// for (let s of students) {
//   table += `<tr><td>${s.id}</td><td>${s.name}</td><td>${s.dob}</td></tr>`;
// }

// table += "</table>";
// console.log(table);
// b. Login / logout HTML generation
// let myName = "ChatGPT";
// let isLoggedIn = true;
// let htmlLoggedIn = `
// <div>
//     ${isLoggedIn 
//         ? `<p>Welcome, ${myName}!</p><a href="#">Logout</a>` 
//         : `<a href="#">Login</a>`}
// </div>
// `;

// console.log(htmlLoggedIn);

// c. An array of names is given. Generate an unordered list from it!
// names = ["ahmed", "ali", "naim"];

// let ulHTML = "<ul>\n";
// for (let n  of names) {
//   ulHTML += ` <li>${n}</li>\n`;
// }
// ulHTML += "</ul>";
// console.log(ulHTML)


// function findNegative(arr) {
//   return arr.find(x=>x<0);
// }

// console.log(findNegative([3,2,-2,-3]))

let movies = [
    {
        title: "Epic Movie",
        length: 142,
        year: 2020,
        directors: ["John Smith", "Kate Brown"],
        actors: ["Actor A", "Actor B"]
    },
    {
        title: "Solo Film",
        length: 98,
        year: 2018,
        directors: ["Peter Adams"],
        actors: ["Actor C", "Actor D"]
    },
    {
        title: "Long Adventure",
        length: 189,
        year: 2021,
        directors: ["Clark Jones"],
        actors: ["Actor X"]
    }
];

// console.log(movies.forEach(element => {
//     console.log(element.title);
// }));

// movies.forEach(element => {
//     if(element.directors.length>2){ 
//         console.log(element.title) 
//     }
// });

// console.log(movies.filter(x=>x.directors.length>1))
// // lab:1
// let name = 'maghan'
// c. An array of names is given. Generate an unordered list from it!
// let names = ["Anna", "Bob", "Charles"]

// let ulHtml = "<ul>"
// for (const name of names) {
//     ulHtml += `<li>${name}</li>\n`;
// }
// ulHtml += "</ul>"
// console.log(ulHtml)


// function factorial(num) {
//     if(num==0 || num==1) return 1;
//     return num*factorial(num-1);
// }
// console.log(factorial(4))
// let numbers = [1,2,3,4,5,-1,-3,-5];
// console.log(numbers.filter(n => n%2==0).length)
// // console.log(numbers.find(n=>n<0))

// let matrix = [[2,3,4],
//                     [4,5,8] ];
// console.log(matrix.every())



// LAB: 2
// document.querySelector("#task1").addEventListener("click",()=>{
//     let display = document.querySelector("#display");
//     display.innerText= "Hello World"

// })

// 2: task
// document.getElementById("helloNTimesBtn").addEventListener("click", () => {
//     const n = Number(document.getElementById("helloN").value);
//     const target = document.getElementById("helloNTarget");

//     target.innerHTML = ""; // clear old result

//     for (let i = 1; i <= n; i++) {
//         const p = document.createElement("p");
//         p.innerText = "Hello World!";
//         p.style.fontSize = (10 + i * 2) + "px"; // increasing
//         target.appendChild(p);
//     }
// });


// // task:3
// document.getElementById("multBtn").addEventListener("click", () => {
//     const n = Number(document.getElementById("multN").value);
//     const target = document.getElementById("tableTarget");

//     target.innerHTML = "";

//     const table = document.createElement("table");

//     for (let i = 1; i <= n; i++) {
//         const row = document.createElement("tr");

//         for (let j = 1; j <= n; j++) {
//             const cell = document.createElement("td");
//             cell.innerText = i * j;
//             row.appendChild(cell);
//         }
//         table.appendChild(row);
//     }

//     target.appendChild(table);
// });





















