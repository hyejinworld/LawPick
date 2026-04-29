import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBC1cdtDYiwTRVE82B_Em3XI5DxKcgsDDA",
  authDomain: "my-lawpick.firebaseapp.com",
  projectId: "my-lawpick",
  storageBucket: "my-lawpick.firebasestorage.app",
  messagingSenderId: "735715199994",
  appId: "1:735715199994:web:d79d63a2ed9bf0e075b243"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
