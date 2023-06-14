import "normalize.css/normalize.css";
import "./css/main-style.css";
// import {createTask, getTask} from "./modules/tasks";
import { taskFactory, appendArray, populatePage, getTaskFromInputBox, createNewTask } from "./modules/tasks";

let taskList = []




createNewTask(taskList)

// in order to add a book to the box
//1. appendArray(taskFActory("item", taskList))
//2. populatePage(taskList)