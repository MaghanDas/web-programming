

// let name = prompt("enter your name")
// alert("welcome, " + name + " !")

let age = 22;           // number
let name = "John";      // string
let isLoggedIn = true;  // boolean
let notDefined;         // undefined
let emptyValue = null;  // null

let x = 5
let y = 10

// console.log("sum is " + (x+y))
// console.log(x>y)


// functions in js
// function greet(name) {
//     return "Hello " + name
// }

// console.log(greet("ALice"))

// Arrow Functions 
// const greet = (name, das) => `Hello ${name} ${das}`;
const sum = (x,y)=> `Addition is ${x+y+6}`
// console.log(greet("ALice", "das"))
// console.log(sum(1,2))
const hello = ()=>`hello world`
// console.log(hello())


// if (age > 18){
//     console.log("you can vote! ");
// } else {
//     console.log("too yoooung");
// }


// let psswd = prompt("enter password")

// if(psswd === "das") {
//     alert("correct")
// } else {
//     alert("not correct")
// }


// loops
// for (let index = 0; index < 5; index++) {
//     console.log("Iteration: ", index)
// }

// Arrays
let items = ["Apple", "Banana", "Orange"]
// for (let fruits of items) {
//     console.log(fruits)
// }
// console.log(items[1])

// 👉 Methods: .push(), .pop(), .map(), .filter(), .reduce()

let user = {
    name: "Alice",
    age: 25,
    isAdmin: true 
};
// console.log(user.isAdmin)

// 11. DOM Basics
// DOM = Document Object Model = tree structure of webpage.
// JS can manipulate it to change content dynamically.
// document.getElementById("demo").innerText = "Hello JS!";

function changeText() {
    document.getElementById("demo").innerText = "Text Changed!";
}

/// more on arrays
let nums = [1,2,3]
// console.log(nums)
// console.log(nums[1])
// console.log(nums[-1]) # undefined
// console.log(nums.push(4))
// console.log(nums)
// console.log(nums.pop())
// console.log(nums)

// nums.unshift(0) // add at start
// console.log(nums)
// nums.shift() // remove from start
// console.log(nums) 

// looping thorugh arraay

// for(let i = 0; i < nums.length; i++) {
//     console.log(nums[i])
// }

// for ..Of loop
// for (let num of nums) {
    // console.log(num)
// }

// // forEach loop modern 
// nums.forEach((num)=> {
//     console.log(num);
// });


// Transforming arrays 
// Map : returns a new array 
let ages = [1,2,3]
let doubledAges = ages.map(i => i * 2)
// console.log(doubledAges)
// console.log(ages)

// filter(return some elements)
let newages = [13,15,23,22]
let adults = newages.filter(age => age >=18)
// console.log(adults)


// Reduce: (combine into one value)
let values = [1,2,3,4]
let addition = values.reduce((acc,curr) => acc+curr, 0)
// console.log(addition)

// Web Context:
// map → convert API response into UI elements
// filter → show only available products
// reduce → calculate total cart price


// Searching and Checking 
let names = ["Nely", "Densy", "Adam"]

// console.log(names.includes("Nely")) // True
// console.log(names.indexOf("Adam"))
// console.log(names.find(n=>n.startsWith("A")))


// SORTing
let numbres = [5,1,20,4]
numbres.sort((a,b) => a - b)
// console.log(numbres)

// let fruits = ["Apple", "Banana", "Mango", "Orange", "PineApple"];

// let fruitList= document.getElementById("fruitList")

// fruits.forEach(fruit => {
//     let li = document.createElement("li")
//     li.innerText = fruit;
//     fruitList.appendChild(li)
// });

