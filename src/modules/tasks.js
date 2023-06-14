import {format} from "date-fns"

//create a todo
//create element etc. in the function parameter include elements that want to be included such as due date and task name etc





// factory for the task
const taskFactory = (task) => {
    
    return task
    //prio, date, description
    //put the edit stuff here
}

// adds the task into the tasklist array
const appendArray = (item, array) => {
    if (!array.includes(item)) {
        array.push(taskFactory(item));
    }
    console.log(array)
    //make it so that you can add 2 of the same tasks
}

// adds the task onto the dom which is shown on screen
function populatePage(array) {
    const taskContainer = document.getElementById("task-container")

    array.forEach(task => {
        const individualTaskContainer = document.createElement("div")
        individualTaskContainer.classList.add("individual-task-container")
        individualTaskContainer.innerHTML =
            `<h3>${task}</h3>`
        taskContainer.appendChild(individualTaskContainer)
    });
}

//get whatever is in the text box
function getTask() {
    const newTask = document.getElementById("new-task").value
    return newTask
}

// consolidates all the other modules
function addTask(array) {
    const createTaskButton = document.getElementById("create-task-button")
    createTaskButton.addEventListener("click", function() {
        appendArray(getTask(), array)
        populatePage(array)
        
    })
}








// function createTask(task) {
//     const taskContainer = document.createElement("task-container")

//     const individualTask = document.createElement("div")
//     individualTask.classList.add("individual-task")

//     const taskName = document.createElement("span")
//     const taskDueDate = document.createElement("span")
//     taskName.textContent = task
//     taskDueDate.textContent = format(new Date(), "dd.MM.yyyy");
//     individualTask.appendChild(taskName)
//     individualTask.appendChild(taskDueDate)

//     taskContainer.appendChild(individualTask)

// }









// export {createTask, getTask}
export { taskFactory, appendArray, populatePage, getTask, addTask }






