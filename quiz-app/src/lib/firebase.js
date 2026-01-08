import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Optional: import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB6Uk30OcgWtyVP27WLbwO19bhxoVsVCrg",
  authDomain: "quiz-app-f941d.firebaseapp.com",
  projectId: "quiz-app-f941d",
  storageBucket: "quiz-app-f941d.firebasestorage.app",
  messagingSenderId: "367454029816",
  appId: "1:367454029816:web:f6df7f99e3a7b85111780d",
  measurementId: "G-S7HFZVX9J1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
// const analytics = getAnalytics(app); 
