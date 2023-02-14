var firebase = require('firebase')

const firebaseConfig = {
  apiKey: "AIzaSyABFNqhlunqrNgFI7Pk5nIAnQCUsDLq1nA",
  authDomain: "hackathon-nirman-2023.firebaseapp.com",
  databaseURL: "https://hackathon-nirman-2023-default-rtdb.firebaseio.com",
  projectId: "hackathon-nirman-2023",
  storageBucket: "hackathon-nirman-2023.appspot.com",
  messagingSenderId: "376520622168",
  appId: "1:376520622168:web:682a9196a31c0bd7f10a2d",
  measurementId: "G-FDR5798TG6"
};

const app = firebase.initializeApp(firebaseConfig);


let database = firebase.database()

module.exports = app;