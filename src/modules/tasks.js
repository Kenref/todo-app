import {format} from "date-fns"
import "../css/task-container.css"


// factory for the task
const taskFactory = (task) => {
    const dueDate = format(new Date(), "dd.MM.yyyy"),
        priority = "none",
        description = "";
    return {task, dueDate, priority, description}
    //prio, date, description
    //put the edit stuff here
}


//get whatever is in the text box
function getTaskFromInputBox() {
    const newTask = document.getElementById("new-task").value
    return newTask
}

// adds the task into the tasklist array
const appendArray = (item, array) => {
    const existingTask = array.find(task => task.task === item.task)
    if (!existingTask) {
        array.push(item)
        console.log(array)
    }
}

// adds the task onto the dom which is shown on screen
function populateTaskContainer(array) {
    const taskContainer = document.getElementById("task-container")
    const existingTasks = taskContainer.querySelectorAll(".individual-task-container")
    existingTasks.forEach(task => {
        taskContainer.removeChild(task)
    })
    array.forEach(task => {
        const individualTaskContainer = document.createElement("div")
        individualTaskContainer.classList.add("individual-task-container")
        individualTaskContainer.innerHTML =
            `<h3>${task.task}</h3>
            <h3>${task.dueDate}</h3>`
        taskContainer.appendChild(individualTaskContainer)
    });
}

// consolidates all the other modules
function createNewTask(array) {
    const createTaskButton = document.getElementById("create-task-button")
    createTaskButton.addEventListener("click", function () {
        const newTask = taskFactory(getTaskFromInputBox())
        appendArray(newTask, array)
        populateTaskContainer(array)
        populateInfoContainer(array)
    })
}

function populateInfoContainer(array) {
    // const infoContainer = document.getElementById("info-container")

    const priority = document.getElementById("priority")
    const description = document.getElementById("description")

    // priority.textContent = array[0].priority
    description.textContent = array[0].description


}

function handlePriority() {
    const dropdownBox = document.getElementById("priority")
        
    dropdownBox.addEventListener("click", function () {
        console.log(dropdownBox.value)
    })

}
















export { createNewTask, populateInfoContainer, handlePriority }






