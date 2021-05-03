import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCTpApw6f64Q-xaIiwzLuvea8WuZJfeR6o",
  authDomain: "e-commerce-22565.firebaseapp.com",
  projectId: "e-commerce-22565",
  storageBucket: "e-commerce-22565.appspot.com",
  messagingSenderId: "428875902631",
  appId: "1:428875902631:web:26e05c0661303b24b97582",
  measurementId: "G-TBV3YF2TGX",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
console.log("===Firebase===");

export default firebase;
