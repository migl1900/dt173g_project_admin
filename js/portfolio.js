// Variables
let portfolioEl         = document.getElementById("portfolio");
let formHeaderEl        = document.getElementById("formHeader");
let messageEl           = document.getElementById("message");
let referenceForm       = document.getElementById("referenceForm");
let headerInput         = document.getElementById("header");
let descriptionInput    = document.getElementById("description");
let linkInput           = document.getElementById("link");
let imageInput          = document.getElementById("image");
let altInput            = document.getElementById("alt");
let sourceEL            = document.getElementById("source");
let formButton          = document.getElementById("saveReference");
let abortButton         = document.getElementById("abort");

// Event listeners
window.addEventListener("load", getAllReferences);
referenceForm.addEventListener("submit", addReference, false);

// Functions
// REST request using GET printing all references
function getAllReferences() {
    portfolioEl.innerHTML = "";

    fetch("https://webicon.se/tweug/dt173g/projekt/rest/portfolio.php", {
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
                data.forEach(reference => {
                    portfolioEl.innerHTML += `
                        <div class="reference">
                            <img src="upload/${reference.image}" alt="${reference.alt}" />
                            <h6>${reference.header}</h6>
                            ${reference.description}
                            <p><a href="${reference.link}">Besök sidan</a></p>
                            <div class="reference-buttons">
                                <button type="button" onClick="getReference(${reference.id})">Ändra</button>
                                <button type="button" onClick="deleteReference(${reference.id}, '${reference.image}')">Radera</button>
                            </div>
                        </div>
                    `;
                })
            } else {
                portfolioEl.innerHTML = data.message;
            }
        })
    })
    .catch(error => {
        console.error(error);
    })
}

// REST request using GET for specific reference
function getReference(id) {
    messageEl.innerHTML = "";
    referenceForm.scrollIntoView();
    fetch("https://webicon.se/tweug/dt173g/projekt/rest/portfolio.php?id=" + id, {
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
        headerInput.value      = data.header;
        descriptionInput.value = data.description;
        linkInput.value        = data.link;
        altInput.value         = data.alt;

        // Remove required demand on image input
        imageInput.required = false;

        // Changing header and button text
        formHeader.innerHTML = "Uppdatera referens"
        formButton.value = "Spara ändring";
        
        // Changing event listener to use editReference function
        referenceForm.removeEventListener("submit", addReference, false);
        referenceForm.addEventListener("submit", function(event) {
            editReference(id, event);
        }, false);

        // Creating a button to offer abort feature
        abortButton.innerHTML = "";
        let button = document.createElement("button");
        button.innerHTML = "Avbryt";
        abortButton.appendChild(button);
        button.addEventListener ("click", function() {
            window.location.replace("portfolio.php");
        });
    })
}

// REST request using DELETE header to delete specific reference
function deleteReference(id, image) {
    messageEl.innerHTML = "";

    // First delete data from DB
    fetch("https://webicon.se/tweug/dt173g/projekt/rest/portfolio.php?id=" + id, {
        method: "DELETE",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Authorization": "Basic bWlja2U6bWlja2U=",
          }, 
    })
    .then(resp => resp.json())
    .then(data => {
        // Then delete image from folder
        window.location.replace("delete.php?file=" + image);
    })
    .catch(error => {
        console.log(error);
    })
}

// REST request using POST header to add new reference
function addReference(event) {
    event.preventDefault();
    
    messageEl.innerHTML = "";
    let newReference = {
        "header": headerInput.value,
        "description": descriptionInput.value,
        "link": linkInput.value,
        "image": imageInput.files[0].name, // Name of file
        "alt": altInput.value
    }

    // First store input in DB
    fetch("https://webicon.se/tweug/dt173g/projekt/rest/portfolio.php", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        body: JSON.stringify(newReference),
        headers: {
            "Authorization": "Basic bWlja2U6bWlja2U=",
          }, 
    })
    .then(resp => resp.json())
    .then(data => {
        // Keeping track if create or update
        sourceEL.value = "create";
        // Submitting form to upload image to folder
        referenceForm.submit();
    })
    .catch(error => {
        console.log(error);
    })

}

// REST request using PUT header to edit existing reference
function editReference(id, event) {
    event.preventDefault();

    messageEl.innerHTML = "";
    let editReference = ""

    // Check if new image is added
    if(imageInput.value != "") {
        editReference = {
            "header": headerInput.value,
            "description": descriptionInput.value,
            "link": linkInput.value,
            "image": imageInput.files[0].name,
            "alt": altInput.value,
        }
    } else {
        editReference = {
            "header": headerInput.value,
            "description": descriptionInput.value,
            "link": linkInput.value,
            "alt": altInput.value,
        }
    }
    fetch("https://webicon.se/tweug/dt173g/projekt/rest/portfolio.php?id=" + id, {
        method: "PUT",
        mode: "cors",
        credentials: "same-origin",
        body: JSON.stringify(editReference),
        headers: {
            "Authorization": "Basic bWlja2U6bWlja2U=",
          }, 
    })
    .then(resp => resp.json())
    .then(data => {
        if(imageInput.value != "") {

            // If new image is added send form to upload page
            referenceForm.submit();
        } else {
            let message = "Referensen har updaterats";
            window.location.replace("portfolio.php?message=" + message);
        }
    })
    .catch(error => {
        console.error(error);
    })
}