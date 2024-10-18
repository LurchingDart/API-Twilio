const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config();

//------Twilio------//
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


//------App------//
const app = express();

//------Middleware------//
app.use(bodyParser.json());
app.use(cors());

//------Main endpoint------//
app.get("/", (req, res) => {
  res.send("Welcome to the API of the Aegis");
});

//------Post------//
app.post('/send-sms', (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: 'El campo "to" y "message" son requeridos' });
  }

  client.messages
      .create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: to
      })
      .then(message => {
        console.log('Mensaje enviado con SID:', message.sid);
        res.status(200).json({ success: true, sid: message.sid });
      })
      .catch(error => {
        console.error('Error al enviar el mensaje:', error);
        res.status(500).json({ success: false, error: error.message });
      });
});


//------Server------//

app.listen(9000, () => {
});
