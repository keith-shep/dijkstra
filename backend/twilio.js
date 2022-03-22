// Uses the twilio npm package to send SMS texts

require("dotenv").config();
const accountSid = process.env.accountSid; // Your Account SID from www.twilio.com/console
const authToken = process.env.authToken; // Your Auth Token from www.twilio.com/console
const twilioNumber = process.env.twilioNumber; // Number given by twilio

const twilio = require("twilio");
const client = new twilio(accountSid, authToken);

const sendMessage = (targetNumber, message) => {
  client.messages
    .create({
      body: message,
      to: targetNumber, // Text this number
      from: twilioNumber, // From a valid Twilio number
    })
    .then(message => console.log(message.sid));
};

module.exports = sendMessage;
