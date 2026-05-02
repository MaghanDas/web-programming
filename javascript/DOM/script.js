
let title = document.getElementById("title")
// let desc = document.getElementsByClassName("desc")[0]
// let divs = document.getElementsByTagName("div")

// modernQuery selector 

// let title = document.querySelector("#title")
let desc=document.querySelectorAll(".desc")

// Best practice: querySelector and querySelectorAll.

// title.innerText = "New Title" // Only text 
// title.innerHTML = "<em>Fancy Title</em>"


// changing attributes 
// let img = document.querySelector("img")
// img.src = "new-image.jpg"
// img.setAttribute("alt", "Updated image")

// Changing Styles
// title.style.color = "blue";
// title.style.fontSize = "30px";


// Or use classList (preferred):
// title.classList.add("highlight");
// title.classList.remove("hidden");
// title.classList.toggle("active");


// Creating and adding elements
let newItem = document.createElement("li")
newItem.innerText = "New Task"
let list = document.querySelector("ul")
list.appendChild(newItem)

// removeing element
list.removeChild(newItem)
newItem.remove(); // modern way 

// raversing the DOM
// let list = document.querySelector("ul");
// console.log(list.children);      // child nodes
// console.log(list.firstChild);    // first node
// console.log(list.parentNode);    // parent


let input = document.getElementById("itemInput")
let btn = document.getElementById("addBtn")
let shoplist = document.getElementById("shoppingList")

btn.addEventListener("click", () => {
      let itemText = input.value;
      if(itemText.trim() !== "") {
        let li = document.createElement("li");
        li.innerText = itemText;
        list.appendChild(li);
        input.value = ""; // clear input
      }
    });