import "normalize.css/normalize.css";
import "./css/main-style.css";
import { createNewTask, populateTaskContainer, openTask, closeTask, editTask } from "./modules/tasks";
import { storageSet,storageGet } from "./modules/local-storage";


const taskList = storageGet("taskList") || [];

populateTaskContainer(taskList)
createNewTask(taskList)
openTask(taskList)
editTask(taskList)
closeTask()
