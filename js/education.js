// Variables
let educationEl         = document.getElementById("education");
let formHeaderEl        = document.getElementById("formHeader");
let messageEl           = document.getElementById("message");
let educationForm       = document.getElementById("educationForm");
let courseInput         = document.getElementById("course");
let yearInput           = document.getElementById("year");
let schoolInput         = document.getElementById("school");
let descriptionInput    = document.getElementById("description");
let formButton          = document.getElementById("saveEducation");
let abortButton         = document.getElementById("abort");

// Event listeners
window.addEventListener("load", getAllEducations);
educationForm.addEventListener("submit", addEducation, false);

// Functions
// REST request using GET printing all educations
function getAllEducations() {
    educationEl.innerHTML = "";

    fetch("https://webicon.se/tweug/dt173g/projekt/rest/education.php", {
        method: "GET",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Authorization": "Basic bWlja2U6bWlja2U=",
          }, 
    })
    .then(resp => {
        resp.json().then(data => {
            if (resp.status == 200) {
                data.forEach(education => {
                    educationEl.innerHTML += `
                        <div>
                            <p>
                                <b>${education.course}</b>
                                <br />
                                <i><span class="small-text">${education.year} - ${education.school}</span></i>
                            </p>
                            <p>
                                ${education.description}
                            </p>
                            <div class="flex">
                                <button type="button" onClick="getEducation(${education.id})">Ändra</button>
                                <button type="button" onClick="deleteEducation(${education.id})">Radera</button>
                            </div>
                        </div>
                        <br />
                    `;
                })
            } else {
                educationEl.innerHTML = data.message;
            }
        })
    })
    .catch(error => {
        console.error(error);
    })
}

// REST request using GET for specific education
function getEducation(id) {
    messageEl.innerHTML = "";
    educationForm.scrollIntoView();
    fetch("https://webicon.se/tweug/dt173g/projekt/rest/education.php?id=" + id, {
        method: "GET",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Authorization": "Basic bWlja2U6bWlja2U=",
          }, 
    })
    .then(resp => resp.json())
    .then(data => {

        // Setting form filed values
        courseInput.value      = data.course;
        yearInput.value        = data.year;
        schoolInput.value      = data.school;
        descriptionInput.value = data.description;

        // Changing header and button text
        formHeader.innerHTML = "Uppdatera utbildning"
        formButton.value = "Spara ändring";
        
        // Changing event listener to use editEducation function
        educationForm.removeEventListener("submit", addEducation, false);
        educationForm.addEventListener("submit", function(event) {
            editEducation(id, event);
        });

        // Creating a button to offer abort feature
        abortButton.innerHTML = "";
        let button = document.createElement("button");
        button.innerHTML = "Avbryt";
        abortButton.appendChild(button);
        button.addEventListener ("click", function() {
            window.location.replace("education.php");
        });
    })
}

// REST request using DELETE header to delete specific education
function deleteEducation(id) {
    messageEl.innerHTML = "";
    fetch("https://webicon.se/tweug/dt173g/projekt/rest/education.php?id=" + id, {
        method: "DELETE",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Authorization": "Basic bWlja2U6bWlja2U=",
          }, 
    })
    .then(resp => resp.json())
    .then(data => {
        let message = "Utbildning raderad";
        window.location.replace("education.php?message=" + message);
    })
    .catch(error => {
        console.log(error);
    })
}

// REST request using POST header to add new education
function addEducation(event) {
    event.preventDefault();
    
    messageEl.innerHTML = "";
    let newEducation = {
        "course": courseInput.value,
        "year": yearInput.value,
        "school": schoolInput.value,
        "description": descriptionInput.value
    }
    
    fetch("https://webicon.se/tweug/dt173g/projekt/rest/education.php", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        body: JSON.stringify(newEducation),
        headers: {
            "Authorization": "Basic bWlja2U6bWlja2U=",
          }, 
    })
    .then(resp => resp.json())
    .then(data => {
        let message = "Utbildning skapad";
        window.location.replace("education.php?message=" + message);
    })
    .catch(error => {
        console.log(error);
    })

}

// REST request using PUT header to edit existing education
function editEducation(id, event) {
    event.preventDefault();

    messageEl.innerHTML = "";
    let editEducation = {
        "course": courseInput.value,
        "year": yearInput.value,
        "school": schoolInput.value,
        "description": descriptionInput.value,
    }
    fetch("https://webicon.se/tweug/dt173g/projekt/rest/education.php?id=" + id, {
        method: "PUT",
        mode: "cors",
        credentials: "same-origin",
        body: JSON.stringify(editEducation),
        headers: {
            "Authorization": "Basic bWlja2U6bWlja2U=",
          }, 
    })
    .then(resp => resp.json())
    .then(data => {
        let message = "Utbildningen har updaterats";
        window.location.replace("education.php?message=" + message);
    })
    .catch(error => {
        console.error(error);
    })
}