import "normalize.css/normalize.css";
import "./css/main-style.css";
import { createNewTask, populateTaskContainer, openTask, closeTask, editName, editDescription } from "./modules/tasks";
import { storageSet,storageGet } from "./modules/local-storage";


const taskList = storageGet("taskList") || [];
//creating tasks
populateTaskContainer(taskList)
createNewTask(taskList)


//editing task
openTask(taskList)
editName()
editDescription()



closeTask();