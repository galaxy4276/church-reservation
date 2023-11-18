const dotenv = require('dotenv');
const twilio = require('twilio');
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const sendMessage = (to, message) =>
  client.messages.create({
    body: message,
    to: createTwilioPhone(to),
    from: '+12295454689',
  });

const createTwilioPhone = p =>
  '+82' + p.slice(1);

module.exports = { sendMessage };
