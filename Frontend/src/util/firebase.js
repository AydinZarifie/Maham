import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTCdnaGWMPv84Sp055qsfWdSDJySsCtBI",
  authDomain: "testing-c5532.firebaseapp.com",
  databaseURL:
    "https://testing-c5532-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "testing-c5532",
  storageBucket: "testing-c5532.appspot.com",
  messagingSenderId: "486333446280",
  appId: "1:486333446280:web:8ad795803ef0c3a569c73d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
