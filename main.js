const express = require('express');
const dotenv = require('dotenv');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const cors = require('cors');

// Cargar variables de entorno
dotenv.config();

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

// Configurar Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

// Middleware para parsear JSON
app.use(express.json());

// Ruta para enviar SMS
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

//------Main endpoint------//
app.get("/", (req, res) => {
  res.send("Welcome to the API of the Aegis");
});

//------Server------//

app.listen(9000, () => {
});
