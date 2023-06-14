import "normalize.css/normalize.css";
import "./css/main-style.css";
import {createTask, getTask} from "./modules/tasks";


const aa = getTask()
createTask(aa)

createTask("hi")