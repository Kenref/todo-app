import {format} from "date-fns"

//create a todo
//create element etc. in the function parameter include elements that want to be included such as due date and task name etc

function getTask() {
    const createTaskButton = document.getElementById("create-task-button")
    createTaskButton.addEventListener("click", function() {
        const newTask = document.getElementById("new-task").value
        console.log(newTask)
        return newTask
    })
}

function createTask(task) {
    const taskContainer = document.createElement("task-container")

    const individualTask = document.createElement("div")
    individualTask.classList.add("individual-task")

    const taskName = document.createElement("span")
    const taskDueDate = document.createElement("span")
    taskName.textContent = task
    taskDueDate.textContent = format(new Date(), "dd.MM.yyyy");
    individualTask.appendChild(taskName)
    individualTask.appendChild(taskDueDate)

    taskContainer.appendChild(individualTask)

}




//change funcitno
//change date





export {createTask, getTask}








//edit a todo
//delete a todo