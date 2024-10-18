const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


//------App------//
const app = express();

//------Middleware------//
app.use(bodyParser.json());
app.use(cors());

//------Main endpoint------//
app.get("/", (req, res) => {
  res.send("Welcome to the API of the Aegis");
});

//------Server------//

app.listen(9000, () => {
});
