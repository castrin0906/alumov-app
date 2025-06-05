import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAxn7eqQMSYLLLiLIebzsA5bTdX5KT12uI",
  authDomain: "alumov-app.firebaseapp.com",
  projectId: "alumov-app",
  storageBucket: "alumov-app.firebasestorage.app",
  messagingSenderId: "1032523267763",
  appId: "1:1032523267763:web:1ddac2632ef4c9734c3ac6",
  measurementId: "G-L0V1F7QTH0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
