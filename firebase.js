import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAY2HIldplBhiJbAVH2qP86__m-7cBu30o",
    authDomain: "expense-tracker-3ef02.firebaseapp.com",
    projectId: "expense-tracker-3ef02",
    storageBucket: "expense-tracker-3ef02.appspot.com",
    messagingSenderId: "402288003358",
    appId: "1:402288003358:web:3ee077c34343de7fec210f"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);