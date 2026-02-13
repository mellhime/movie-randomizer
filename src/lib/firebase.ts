import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "movie-randomizer-5c910.firebaseapp.com",
  projectId: "movie-randomizer-5c910",
  storageBucket: "movie-randomizer-5c910.firebasestorage.app",
  messagingSenderId: "416946308307",
  appId: "1:416946308307:web:890386f41747f76ca6c026",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
