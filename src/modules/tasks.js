import {format, toDate, isDate} from "date-fns"
import "../css/task-container.css"
import { storageSet, storageGet, storageDelete } from "./local-storage";


// factory for the task
const taskFactory = (task) => {
    const dueDate = new Date()
    const priority = "None"
    const description = "Enter task description";
    return {task, dueDate, priority, description}
}


//get whatever is in the text box
function getTaskFromInputBox() {
    let newTask = document.getElementById("new-task")
    const returnValue = newTask.value
    newTask.value = ""
    return returnValue
}

// adds the task into the tasklist array
const appendArray = (item, array) => {
    const existingTask = array.find(task => task.task === item.task)
    const existingStorage = storageGet("inbox") || []
    if (!existingTask) {
        array.push(item)
        existingStorage.push(item)
        storageSet("inbox", existingStorage)

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
            <h3>${format(Date.parse(task.dueDate), "dd/MM/yyyy")}</h3>`
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
        openTask(storageGet("inbox"));
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

            let date = currentTask.dueDate
            date = toDate(Date.parse(date))
            date = format(date, "yyyy-MM-dd")
            taskDueDate.value = date

			taskPriority.value = currentTask.priority;

			dialogContainer.setAttribute(
				"class",
				`${taskIndex} dialog-content`
			);
			taskName.setAttribute("contentEditable", "true");
			modal.showModal();
			taskName.blur();
		})
    })
}



function editName() {
	const existingStorage = storageGet("inbox");
    const taskName = document.getElementById("task-name");

	taskName.addEventListener("keydown", function (e) {
		if (e.key === "Enter") {
            e.preventDefault();
            const index = e.target.parentNode.parentNode.classList[0];
			existingStorage[index].task = taskName.textContent;
			storageSet("inbox", existingStorage);
			populateTaskContainer(storageGet("inbox"));
            taskName.blur();
            openTask(storageGet("inbox"))
		}
	});
}

function editDescription() {
    const existingStorage = storageGet("inbox")
    const taskDescription = document.getElementById("task-description")

    taskDescription.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const index = e.target.parentNode.parentNode.classList[0];
            existingStorage[index].description = taskDescription.value;
            storageSet("inbox", existingStorage);
            populateTaskContainer(storageGet("inbox"))
            taskDescription.blur()
            openTask(storageGet("inbox"));

		}
    })
}

function editDate() {
// change to today, tomorrow, next week
    const taskDate = document.getElementById("task-due-date")
    const existingStorage = storageGet("inbox")

    taskDate.addEventListener("change", function (e) {
        let result = new Date(taskDate.value);
        const index = e.target.parentNode.parentNode.classList[0];
        existingStorage[index].dueDate = result;
        storageSet("inbox", existingStorage)
        populateTaskContainer(storageGet("inbox"));
        openTask(storageGet("inbox"));

    })
}

function editPriority() {
    const existingStorage = storageGet("inbox");
    const taskPriority = document.getElementById("task-priority");

    taskPriority.addEventListener("click", function (e) {
        e.preventDefault()
        const index = e.target.parentNode.parentNode.parentNode.classList[0]
        existingStorage[index].priority = taskPriority.value;
        storageSet("inbox", existingStorage);
        populateTaskContainer(storageGet("inbox"));
        openTask(storageGet("inbox"));
    
    });
}

function closeTask() {
	const modal = document.querySelector("dialog");
	const dropdown = document.getElementById("task-priority");

	modal.addEventListener("click", (e) => {
		const dialogDimensions = modal.getBoundingClientRect();
		if (
			(e.clientX < dialogDimensions.left ||
				e.clientX > dialogDimensions.right ||
				e.clientY < dialogDimensions.top ||
				e.clientY > dialogDimensions.bottom) &&
			!dropdown.contains(e.target)
		) {
			modal.close();
		}
	});
}







export { createNewTask, populateTaskContainer, openTask, closeTask, editName, editDescription, editDate, editPriority }






