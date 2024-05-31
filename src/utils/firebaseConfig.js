import { initializeApp } from "firebase/app";
import "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAdditionalUserInfo,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqTJOiVrrgxCeoFteyh39o5oJLemf2fA4",
  authDomain: "proiect-daw-62898.firebaseapp.com",
  projectId: "proiect-daw-62898",
  storageBucket: "proiect-daw-62898.appspot.com",
  messagingSenderId: "440314493567",
  appId: "1:440314493567:web:7f54cd2c3aa525c97d9d4a",
  measurementId: "G-CJTX053YHL",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const signInWithGoogle = async () =>
  signInWithPopup(auth, googleProvider).then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    setCustomClaimsForUser(user.uid, { role: "client" });
    return user;
  });

export const signUpWithEmailAndPassword = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setCustomClaimsForUser(user.uid, { role: "client" });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

export const loginWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      throw error;
    });
};

export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const logout = () => {
  signOut(auth);
};

const setCustomClaimsForUser = async (uid, claims) => {
  try {
    const response = await fetch("http://localhost:5000/set-custom-claims", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, claims }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
  } catch (error) {
    console.error("Error setting custom claims:", error);
  }
};
