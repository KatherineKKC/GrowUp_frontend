import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVYPQL6lLM7WFmocxBvegJN9ZDf1RNB5k",
  authDomain: "growup-48eeb.firebaseapp.com",
  projectId: "growup-48eeb",
  storageBucket: "growup-48eeb.appspot.com",
  messagingSenderId: "865726079063",
  appId: "1:865726079063:web:5e89d455994ba1dc7a0312"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
