async function sendContactEmail(e) {
  e.preventDefault();

  let contactFormElement = e.target;

  let submitButtonElement = contactFormElement.elements["submit"];
  submitButtonElement.style.backgroundColor = "#5C71A7";
  submitButtonElement.disabled = true;
  submitButtonElement.value = "SLANJE...";

  let nameInputElement = contactFormElement.elements["name"];
  let emailInputElement = contactFormElement.elements["mail"];
  let messageInputElement = contactFormElement.elements["message"];
  nameInputElement.disabled = true;
  emailInputElement.disabled = true;
  messageInputElement.disabled = true;

  let fetchUrl = contactFormElement.action;
  let fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInputElement.value,
      mail: emailInputElement.value,
      message: messageInputElement.value,
    }),
  };

  let response = await fetch(fetchUrl, fetchOptions);
  let responseStatus = response.status;
  let responseBody = await response.json();

  if (responseStatus == 200 && responseBody.message == "Queued. Thank you.") {
    submitButtonElement.style.cursor = "default";
    submitButtonElement.value = "PORUKA POSLANA";
  } else {
    submitButtonElement.style.backgroundColor = "#102E7B";
    submitButtonElement.disabled = false;
    submitButtonElement.value = "POŠALJI PORUKU";

    nameInputElement.disabled = false;
    emailInputElement.disabled = false;
    messageInputElement.disabled = false;

    alert("Došlo je do pogreške prilikom slanja podataka: '" + responseBody + "'");
  }
}

// Close modal when modal overlay is clicked
window.addEventListener("click", (event) => {
  let modals = document.getElementsByClassName("modal");
  for (const modal of modals) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});

// Close model on escape key
document.addEventListener("keydown", (event) => {
  if (event.code == "Escape") {
    closeModal();
  }
});

function showModal(event) {
  let modal = document.getElementById(event.target.id.replace("img", "modal"));
  modal.style.display = "block";
}

function closeModal(event) {
  let modals = document.getElementsByClassName("modal");
  for (const modal of modals) {
    modal.style.display = "none";
  }
}
