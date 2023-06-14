import {format} from "date-fns"

//create a todo
//create element etc. in the function parameter include elements that want to be included such as due date and task name etc


// factory for the task
const taskFactory = (task) => {
    const dueDate = format(new Date(), "dd.MM.yyyy"),
	priority = "none";
    return {task, dueDate, priority}
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

    //make it so that you can add 2 of the same tasks
}

// adds the task onto the dom which is shown on screen
function populatePage(array) {
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
        populatePage(array)
        
    })
}













// export {createTask, getTaskFromInputBox}
export { taskFactory, appendArray, populatePage, getTaskFromInputBox, createNewTask }






