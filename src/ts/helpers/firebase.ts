import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDiJYDLLV2jUbMHP_2rbGFkjKeTJ-pQLJ8",
  authDomain: "aragon-test-c8347.firebaseapp.com",
  projectId: "aragon-test-c8347",
  storageBucket: "aragon-test-c8347.appspot.com",
  messagingSenderId: "934455689992",
  appId: "1:934455689992:web:b50451707f841bf206a2bd"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;
