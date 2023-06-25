import {format} from "date-fns"
import "../css/task-container.css"
import { storageSet, storageGet, storageDelete } from "./local-storage";


// factory for the task
const taskFactory = (task) => {
    const dueDate = format(new Date(), "dd/MM/yyyy"),
        priority = "None",
        description = "Enter task description";
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
        openTask(storageGet("taskList"));

    })
}

function openTask(array) {
    const modal = document.querySelector("dialog")
    const individualTaskContainer = document.querySelectorAll(".individual-task-container")
    const dialogContainer = document.querySelector(".dialog-content");

    individualTaskContainer.forEach(task => {
        task.addEventListener("click", function () {
			const taskIndex = parseInt(task.getAttribute("task-index"), 10);
			const currentTask = array[taskIndex];

			const taskName = document.getElementById("task-name");
			const taskDescription = document.getElementById("task-description");
			const taskDueDate = document.getElementById("task-due-date");
			const taskPriority = document.getElementById("task-priority");

			taskName.textContent = currentTask.task;
            taskDescription.value = currentTask.description;
            //can change to taskDueDate.value
			taskDueDate.textContent = currentTask.dueDate;
			taskPriority.value = currentTask.priority;

			dialogContainer.setAttribute("class", `${taskIndex} dialog-content`);
			taskName.setAttribute("contentEditable", "true");
			modal.showModal();
			taskName.blur();
		})
    })
}





function editName() {
	const existingStorage = storageGet("taskList");
    const taskName = document.getElementById("task-name");

	taskName.addEventListener("keydown", function (e) {
		if (e.key === "Enter") {
            e.preventDefault();
            const index = e.target.parentNode.parentNode.classList[0];
			existingStorage[index].task = taskName.textContent;
			storageSet("taskList", existingStorage);
			populateTaskContainer(storageGet("taskList"));
            taskName.blur();
            openTask(storageGet("taskList"))
		}
	});
}


// function for edit description, due date, and prio
function editDescription() {
    const existingStorage = storageGet("taskList")
    const taskDescription = document.getElementById("task-description")

    taskDescription.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const index = e.target.parentNode.parentNode.classList[0];
            existingStorage[index].description = taskDescription.value;
            storageSet("taskList", existingStorage);
            populateTaskContainer(storageGet("taskList"))
            taskDescription.blur()
            openTask(storageGet("taskList"));

		}
    })
}

function editDate() {
// change to today, tomorrow, next week
    const taskDate = document.getElementById("task-due-date")
    const existingStorage = storageGet("taskList")

    taskDate.addEventListener("change", function (e) {
        let result = new Date(taskDate.value);
        result = format(result, "dd/MM/yyyy")
        const index = e.target.parentNode.parentNode.classList[0];
        existingStorage[index].dueDate = result;
        storageSet("taskList", existingStorage)
        populateTaskContainer(storageGet("taskList"));
        openTask(storageGet("taskList"));


    })

}

function editPriority() {
    const existingStorage = storageGet("taskList");
    const taskPriority = document.getElementById("task-priority");

    taskPriority.addEventListener("click", function (e) {
        const index = e.target.parentNode.parentNode.parentNode.classList[0];
        existingStorage[index].priority = taskPriority.value;
        storageSet("taskList", existingStorage);
        populateTaskContainer(storageGet("taskList"));
        openTask(storageGet("taskList"));
    
    });
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









export { createNewTask, populateTaskContainer, openTask, closeTask, editName, editDescription, editDate, editPriority }






