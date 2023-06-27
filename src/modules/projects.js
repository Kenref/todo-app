import { storageSet, storageGet } from "./local-storage";



function createNewProject() {
    const createProjectBtn = document.getElementById("new-project")

    createProjectBtn.addEventListener("click", function () {
        const container = document.querySelector(".ul-bottom")

        const projectTextBox = document.createElement("input")
        const cancelButton = document.createElement("button")
        const submitButton = document.createElement("button")

        projectTextBox.setAttribute("type", "text")
        cancelButton.textContent = "Cancel"
        submitButton.textContent = "Submit"

        container.appendChild(projectTextBox)
        container.appendChild(cancelButton)
        container.appendChild(submitButton)
        container.removeChild(createProjectBtn)

        cancelButton.addEventListener("click", function () {
            container.appendChild(createProjectBtn)
            container.removeChild(projectTextBox)
            container.removeChild(cancelButton)
            container.removeChild(submitButton)
        })

        submitButton.addEventListener("click", function () {
            container.appendChild(createProjectBtn);
            container.removeChild(projectTextBox);
            container.removeChild(cancelButton);
            container.removeChild(submitButton);
            const projectName = projectTextBox.value;
            storageSet(projectName)
        });
    })
}

function populateProjectArea() {
    const container = document.querySelector(".ul-bottom");
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "inbox") {
            console.log(localStorage.key(i))
            const list = document.createElement("li")
            const projectFolder = document.createElement("button")
            projectFolder.textContent = localStorage.key(i)
            container.appendChild(list)
            list.appendChild(projectFolder)
        }

    
    }
}


export {createNewProject, populateProjectArea}