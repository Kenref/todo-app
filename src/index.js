import "normalize.css/normalize.css";
import "./css/main-style.css";
import { createNewTask } from "./modules/tasks";
import { storageSet } from "./modules/local-storage";

let taskList = []



createNewTask(taskList)

