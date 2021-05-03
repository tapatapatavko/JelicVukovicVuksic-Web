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
