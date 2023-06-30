import "normalize.css/normalize.css";
import "./css/main-style.css";
import { createNewTask, populateTaskContainer, openTask, closeTask, editName, editDescription, editDate, editPriority } from "./modules/tasks";
import { populateProjectArea, addProject } from "./modules/projects";
import { storageSet,storageGet } from "./modules/local-storage";


const inbox = storageGet("inbox") || [];
//projects
const projectsContainer = document.querySelector("[data-projects]");
let projects = storageGet("project.storage") || []

//creating projects
// createNewProject()
populateProjectArea(projectsContainer, projects)
addProject(projectsContainer, projects)









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



