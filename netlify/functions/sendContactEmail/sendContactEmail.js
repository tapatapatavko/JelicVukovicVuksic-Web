const mailgun = require("mailgun-js");

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 400,
      body: JSON.stringify("Request method is of type: " + event.httpMethod + ". POST is required."),
    };
  }
  let contactParameters = JSON.parse(event.body);
  if (!contactParameters.name || !contactParameters.mail || !contactParameters.message) {
    return {
      statusCode: 400,
      body: JSON.stringify("Request body must contain parameters: name, email, message."),
    };
  }

  const data = {
    from: `${contactParameters.name} <${contactParameters.mail}>`,
    to: process.env.CONTACT_EMAIL,
    subject: "jvv.com: upit",
    text: contactParameters.message,
  };
  const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });
  try {
    let response = await mg.messages().send(data);
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: JSON.stringify(error.message),
    };
  }
};
