const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace with your Twilio credentials
const accountSid = 'TWILIO_ACCOUNT_SID';
const authToken = 'TWILIO_AUTH_TOKEN';
const client = twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
  const { phoneNumber, message } = req.body;

  client.messages
    .create({
      body: message,
      from: '+1234567890', // Your Twilio phone number
      to: phoneNumber
    })
    .then(() => res.send({ success: true }))
    .catch(err => {
      console.error(err);
      res.status(500).send({ success: false });
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
