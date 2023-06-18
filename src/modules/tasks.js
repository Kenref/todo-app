import {format} from "date-fns"
import "../css/task-container.css"
import { storageSet, storageGet, storageDelete } from "./local-storage";


// factory for the task
const taskFactory = (task) => {
    const dueDate = format(new Date(), "dd/MM/yyyy"),
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
    const existingStorage = storageGet("taskList") || []
    if (!existingTask) {
        array.push(item)
        existingStorage.push(item)
        storageSet("taskList", existingStorage)

    }
}

// adds the task onto the dom which is shown on screen
function populateTaskContainer(array) {
    const taskContainer = document.getElementById("task-container")
    const existingTasks = taskContainer.querySelectorAll(".individual-task-container")
    existingTasks.forEach(task => {
        taskContainer.removeChild(task)
    })
    array.forEach((task, index) => {
        const individualTaskContainer = document.createElement("div")
        individualTaskContainer.classList.add("individual-task-container")
        individualTaskContainer.setAttribute("task-index", index)
        individualTaskContainer.innerHTML =
            `<h3 id=${task.task}>${task.task}</h3>
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
    })
}

function openTask(array) {
    const modal = document.querySelector("dialog")
    const individualTaskContainer = document.querySelectorAll(".individual-task-container")

    individualTaskContainer.forEach(task => {
        task.removeEventListener("click", openModal)
        task.addEventListener("click", openModal)

        function openModal() {
            task.addEventListener("click", function () {
                const taskIndex = parseInt(task.getAttribute("task-index"), 10);
                const currentTask = array[taskIndex]
                
                const taskName = document.getElementById("task-name")
                const taskDescription = document.getElementById("task-description")
                const taskDueDate = document.getElementById("task-due-date")
                const taskPriority = document.getElementById("task-priority")
                
                taskName.textContent = currentTask.task
                taskDescription.textContent = currentTask.description
                taskDueDate.textContent = currentTask.dueDate
                taskPriority.textContent = currentTask.priority
                
                modal.showModal()
            })
        }
    })
}








function editTask(array) {
    const individualTaskContainer = document.querySelectorAll(".individual-task-container")

    individualTaskContainer.forEach(task => {
        task.removeEventListener("click", editModal)
        task.addEventListener("click", editModal)


        function editModal() {
            const taskIndex = parseInt(task.getAttribute("task-index"), 10);
            const currentTask = array[taskIndex];

        }


    })

}















function closeTask() {
    const modal = document.querySelector("dialog")
    modal.addEventListener("click", e => {
        const dialogDimensions = modal.getBoundingClientRect()
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            modal.close()
        }
    })
}















