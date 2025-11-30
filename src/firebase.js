import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQ6bkkwzwvtosQeLXhA3yLDoQjViYqJ64",
  authDomain: "basha-khuji-f983f.firebaseapp.com",
  projectId: "basha-khuji-f983f",
  storageBucket: "basha-khuji-f983f.appspot.com",
  messagingSenderId: "530721890908",
  appId: "1:530721890908:web:5ba94387a55f0f3916bc99",
  measurementId: "G-8C0090TSFL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
