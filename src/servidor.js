const http = require('http');
const port = 3000;
const admin = require("firebase-admin");

const serviceAccount = require("./inici-sessio-firebase-adminsdk-tt5hp-cff7bfed39.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://inicisessio.firebaseio.com"
});


const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json());
app.use(router);


// Registro de usuarios
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    res.json(userRecord);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Inicio de sesión de usuarios
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().getUserByEmail(email);

    const token = await admin.auth().createCustomToken(userRecord.uid);

    res.json(token);
  } catch (error) {
    res.status(400).send(error.message);
  }
});



app.listen(port, () => {
  console.log('Servidor iniciado en el puerto ' + port);
});

module.exports = router;
