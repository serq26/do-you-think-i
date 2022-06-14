import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXKGMddQ0-nFE4YCOlZVoIHE6IwDJGuOA",
  authDomain: "do-you-think-i.firebaseapp.com",
  projectId: "do-you-think-i",
  storageBucket: "do-you-think-i.appspot.com",
  messagingSenderId: "1053844820587",
  appId: "1:1053844820587:web:8790a4e3fb732dbf9a572e",
  measurementId: "G-X94BWSCH8W",
  clientId:
    "292858190702-nb0o9c3kfh0vosr1kmbf3jueo5emjc5t.apps.googleusercontent.com",
  scopes: ["email", "profile"],
};

const actionCodeSettings = {
  url: "http://localhost:3000/verification",
  handleCodeInApp: true,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, firestore, storage, auth, actionCodeSettings };
