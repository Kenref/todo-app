import { sub } from "date-fns";
import { storageSet } from "./local-storage";

// // or query selector [data-lists]
// const projectsContainer = document.getElementById("ul-bottom")

// //lists
// let projects = []

// projectsContainer == listsContainer
// projects == lists
// class. project-name == list-name



function addProject(projectsContainer, projects) {   
    const createProjectBtn = document.querySelector("[data-new-project-button]")
    const container = document.querySelector("[data-button-container]");
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
                storageSet("project.storage", localStorageProjects);
                populateProjectArea(projectsContainer, localStorageProjects)

            }
        }
	})
}

// or render()
function populateProjectArea(projectsContainer, projects) {
    clearElement(projectsContainer)
    let selectedProjectKey = localStorage.getItem("project.storageKey");
    projects.forEach(project => {
        const projectElement = document.createElement("li")
        projectElement.dataset.projectId = project.id
        projectElement.classList.add("project-name")
        projectElement.innerText = project.name
        console.log(project.id, selectedProjectKey)
        if (project.id === selectedProjectKey) {
            projectElement.classList.add("active-project")
            console.log("working")
        }
        projectsContainer.appendChild(projectElement);
    })
}

function selectProject(projectsContainer, projects) {
    let selectedProjectKey = localStorage.getItem("project.storageKey")
    let localStorageProjects = projects || [];
    projectsContainer.addEventListener("click", e => {
        if (e.target.tagName.toLowerCase() === "li") {
            selectedProjectKey = e.target.dataset.projectId
            console.log(selectedProjectKey)
            storageSet("project.storage", localStorageProjects)
            populateProjectArea(projectsContainer, localStorageProjects)
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




export { populateProjectArea, addProject, selectProject}