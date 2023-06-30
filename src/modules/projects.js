import { sub } from "date-fns";
import { storageSet, storageGet } from "./local-storage";

// // or query selector [data-lists]
// const projectsContainer = document.getElementById("ul-bottom")

// //lists
// let projects = []

// projectsContainer == listsContainer
// projects == lists
// class. project-name == list-name

// or render()
function populateProjectArea(projectsContainer, projects) {
    clearElement(projectsContainer)
    projects.forEach(project => {
        const projectElement = document.createElement("li")
        projectElement.dataset.projectId = project.id
        projectElement.classList.add("project-name")
        projectElement.innerText = project.name
        projectsContainer.appendChild(projectElement)
    })
}

function addProject(projectsContainer, projects) {   
    const createProjectBtn = document.querySelector("[data-new-project-button]")
    const container = document.querySelector("[data-button-container]");
    const localStorageKey = "project.storage"
    // let localStorageProjects = storageGet(localStorageKey) || []
    let localStorageProjects = projects || []

    createProjectBtn.addEventListener("click", function () {
        const projectTextBox = document.createElement("input");
        const cancelButton = document.createElement("button");
        let submitButton = document.createElement("button");
        submitButton.classList.add("submit-button")

        projectTextBox.setAttribute("type", "text");
        cancelButton.textContent = "Cancel";
        submitButton.textContent = "Submit";

        container.appendChild(projectTextBox);
        container.appendChild(cancelButton);
        container.appendChild(submitButton);
        container.removeChild(createProjectBtn);

        cancelButton.addEventListener("click", function () {
            container.appendChild(createProjectBtn);
            container.removeChild(projectTextBox);
            container.removeChild(cancelButton);
            container.removeChild(submitButton);
        });
        projectTextBox.focus()

        submitButton = document.querySelector(".submit-button")
        submitButton.addEventListener("click", submitProject)
        projectTextBox.addEventListener("keydown", submitProject)

        function submitProject(e) {
            if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
                e.preventDefault()
                container.appendChild(createProjectBtn);
                container.removeChild(projectTextBox);
                container.removeChild(cancelButton);
                container.removeChild(submitButton);
                const projectName = projectTextBox.value;
                const project = createProject(projectName)
                localStorageProjects.push(project)
                storageSet(localStorageKey, localStorageProjects);
                populateProjectArea(projectsContainer, localStorageProjects)

            }
        }
	})
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

function createProject(name) {
    return {id: Date.now().toString(), name: name, tasks: [] }
}

// function createNewProject() {
//     const createProjectBtn = document.getElementById("new-project")

//     createProjectBtn.addEventListener("click", function () {
//         const container = document.querySelector(".ul-bottom")

//         const projectTextBox = document.createElement("input")
//         const cancelButton = document.createElement("button")
//         const submitButton = document.createElement("button")

//         projectTextBox.setAttribute("type", "text")
//         cancelButton.textContent = "Cancel"
//         submitButton.textContent = "Submit"

//         container.appendChild(projectTextBox)
//         container.appendChild(cancelButton)
//         container.appendChild(submitButton)
//         container.removeChild(createProjectBtn)

//         cancelButton.addEventListener("click", function () {
//             container.appendChild(createProjectBtn)
//             container.removeChild(projectTextBox)
//             container.removeChild(cancelButton)
//             container.removeChild(submitButton)
//         })

//         submitButton.addEventListener("click", function () {
//             container.appendChild(createProjectBtn);
//             container.removeChild(projectTextBox);
//             container.removeChild(cancelButton);
//             container.removeChild(submitButton);
//             const projectName = projectTextBox.value;
//             storageSet(projectName)
//         });
//     })
// }

// function populateProjectArea() {
//     const container = document.querySelector(".ul-bottom");
//     for (let i = 0; i < localStorage.length; i++) {
//         if (localStorage.key(i) !== "inbox") {
//             const list = document.createElement("li")
//             const projectFolder = document.createElement("button")
//             projectFolder.textContent = localStorage.key(i)
//             container.appendChild(list)
//             list.appendChild(projectFolder)
//         }

    
//     }
// }


export { populateProjectArea, addProject}