// Variables
let experienceEl        = document.getElementById("experience");
let formHeaderEl        = document.getElementById("formHeader");
let messageEl           = document.getElementById("message");
let experienceForm      = document.getElementById("experienceForm");
let headerInput         = document.getElementById("header");
let positionInput       = document.getElementById("position");
let yearInput           = document.getElementById("year");
let descriptionInput    = document.getElementById("description");
let formButton          = document.getElementById("saveExperience");
let abortButton         = document.getElementById("abort");

// Event listeners
window.addEventListener("load", getAllExperiences);
experienceForm.addEventListener("submit", addExperience, false);

// Functions
// REST request using GET printing all experiences
function getAllExperiences() {
    experienceEl.innerHTML = "";

    fetch("https://webicon.se/tweug/dt173g/projekt/rest/experience.php", {
        method: "GET",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Authorization": "Basic " + btoa("micke:micke"),
          }, 
    })
    .then(resp => {
        resp.json().then(data => {
            if (resp.status == 200) {
                data.forEach(experience => {
                    experienceEl.innerHTML += `
                        <div>
                            <p>
                                <b>${experience.header} - ${experience.position}</b>
                                <br />
                                <i><span class="small-text">${experience.year}</span></i>
                            </p>
                            <p>
                                ${experience.description}
                            </p>
                            <div class="flex">
                                <button type="button" onClick="getExperience(${experience.id})">Ändra</button>
                                <button type="button" onClick="deleteExperience(${experience.id})">Radera</button>
                            </div>
                        </div>
                        <br />
                    `;
                })
            } else {
                experienceEl.innerHTML = data.message;
            }
        })
    })
    .catch(error => {
        console.error(error);
    })
}

// REST request using GET for specific experience
function getExperience(id) {
    messageEl.innerHTML = "";
    fetch("https://webicon.se/tweug/dt173g/projekt/rest/experience.php?id=" + id, {
        method: "GET",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Authorization": "Basic " + btoa("micke:micke"),
          }, 
    })
    .then(resp => resp.json())
    .then(data => {

        // Setting form filed values
        headerInput.value      = data.header;
        positionInput.value    = data.position;
        yearInput.value        = data.year;
        descriptionInput.value = data.description;

        // Changing header and button text
        formHeader.innerHTML = "Uppdatera erfarenhet"
        formButton.value = "Spara ändring";
        
        // Changing event listener to use editExperience function
        experienceForm.removeEventListener("submit", addExperience, false);
        experienceForm.addEventListener("submit", function(event) {
            editExperience(id, event);
        });

        // Creating a button to offer abort feature
        abortButton.innerHTML = "";
        let button = document.createElement("button");
        button.innerHTML = "Avbryt";
        abortButton.appendChild(button);
        button.addEventListener ("click", function() {
            window.location.replace("experience.php");
        });
    })
}

// REST request using DELETE header to delete specific experience
function deleteExperience(id) {
    messageEl.innerHTML = "";
    fetch("https://webicon.se/tweug/dt173g/projekt/rest/experience.php?id=" + id, {
        method: "DELETE",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Authorization": "Basic " + btoa("micke:micke"),
          }, 
    })
    .then(resp => resp.json())
    .then(data => {
        let message = "Erfarenhet raderad";
        window.location.replace("experience.php?message=" + message);
    })
    .catch(error => {
        console.log(error);
    })
}

// REST request using POST header to add new experience
function addExperience(event) {
    messageEl.innerHTML = "";
    let newExperience = {
        "header": headerInput.value,
        "position": positionInput.value,
        "year": yearInput.value,
        "description": descriptionInput.value
    }
    event.preventDefault();
    fetch("https://webicon.se/tweug/dt173g/projekt/rest/experience.php", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        body: JSON.stringify(newExperience),
        headers: {
            "Authorization": "Basic " + btoa("micke:micke"),
          }, 
    })
    .then(resp => resp.json())
    .then(data => {
        let message = "Erfarenhet skapad";
        window.location.replace("experience.php?message=" + message);
    })
    .catch(error => {
        console.log(error);
    })

}

// REST request using PUT header to edit existing experience
function editExperience(id, event) {
    messageEl.innerHTML = "";
    let editExperience = {
        "header": headerInput.value,
        "position": positionInput.value,
        "year": yearInput.value,
        "description": descriptionInput.value,
    }
    event.preventDefault();
    fetch("https://webicon.se/tweug/dt173g/projekt/rest/experience.php?id=" + id, {
        method: "PUT",
        mode: "cors",
        credentials: "same-origin",
        body: JSON.stringify(editExperience),
        headers: {
            "Authorization": "Basic " + btoa("micke:micke"),
          }, 
    })
    .then(resp => resp.json())
    .then(data => {
        let message = "Erfarenheten har updaterats";
        window.location.replace("experience.php?message=" + message);
    })
    .catch(error => {
        console.error(error);
    })
}