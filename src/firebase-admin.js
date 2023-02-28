const admin = require("firebase-admin");
const serviceAccount = require("C:\\Users\\ASUS\\IdeaProjects\\NodeJS\\src\\m06-add-uf3-firebase-adminsdk-dgdcx-94bb869c1f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://M06-ADD-UF3-Eloy.firebaseio.com"
});

const db = admin.firestore();

const getDocument = async (id) => {
  const document = await db.collection("Botiga").doc(id).get();
  return document.data();
};
