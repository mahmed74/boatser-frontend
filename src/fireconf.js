import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBrPuFTiD2aOiSDEJd8KM6RIW2YxoHwS9E",
  authDomain: "byatch-services.firebaseapp.com",
  projectId: "byatch-services",
  storageBucket: "byatch-services.appspot.com",
  messagingSenderId: "144896434277",
  appId: "1:144896434277:web:2fe31e57eefff9af14a68c",
  measurementId: "G-RLKLF0KXJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default app
export {auth}