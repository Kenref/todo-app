import "normalize.css/normalize.css";
import "./css/main-style.css";
import { createNewTask, populateTaskContainer, openTask, closeTask, editName, editDescription, editDate, editPriority } from "./modules/tasks";
import { createNewProject, populateProjectArea } from "./modules/projects";
import { storageSet,storageGet } from "./modules/local-storage";


const inbox = storageGet("inbox") || [];
//creating tasks
populateTaskContainer(inbox)
createNewTask(inbox)


//editing task
openTask(inbox)
editName()
editDescription()
editDate()
editPriority()
closeTask();

//creating projects
createNewProject()
populateProjectArea()

