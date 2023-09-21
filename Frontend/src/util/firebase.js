import firebase from "firebase/app";
import "firebase/auth";

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

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;
