

let input = document.getElementById("taskInput")
let addBtn = document.getElementById("addBtn")
let taskList = document.getElementById("taskList")

// event listern for button click
addBtn.addEventListener("click",addTask);

// function to add a task
function addTask() {
    let taskText = input.value.trim(); // get input value and remove space

    if(taskText === "") {
        alert("PLease add task");
        return
    }   

    // create new list items
    let li = document.createElement("li")
    li.innerText = taskText

    // addRemove BUtton
    let removeBtn = document.createElement("button")
    removeBtn.innerText = "❌"
    removeBtn.style.marginLeft = "10px"

    // event listener to remove task 
    removeBtn.addEventListener("click", () => {
        taskList.removeChild(li)
    })

    // add remove button to li 
    li.appendChild(removeBtn)

    // add li to ul 
    taskList.appendChild(li)

    // clear input 
    input.value=""


}