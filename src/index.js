import "normalize.css/normalize.css";
import "./css/main-style.css";
<<<<<<< HEAD
=======
import { createNewTask, populateTaskContainer, openTask, closeTask } from "./modules/tasks";
>>>>>>> parent of b901a29 (adding task edit functionality)
import { storageSet,storageGet } from "./modules/local-storage";


const taskList = storageGet("taskList") || [];

populateTaskContainer(taskList)
createNewTask(taskList)
openTask(taskList)
<<<<<<< HEAD
=======
closeTask()
>>>>>>> parent of b901a29 (adding task edit functionality)
