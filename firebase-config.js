
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD59mHfXhdsxtKWljHqnu_fOfHnjTkFxoY",
    authDomain: "family-1b05c.firebaseapp.com",
    projectId: "family-1b05c",
    storageBucket: "family-1b05c.appspot.com",
    messagingSenderId: "629236406264",
    appId: "1:629236406264:web:8e12dd3d28ff1c8e09280d",
    measurementId: "G-YLL35542LE",
    databaseURL: "https://family-1b05c-default-rtdb.firebaseio.com/",

  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the database service
  const database = firebase.database();