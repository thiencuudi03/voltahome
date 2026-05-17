import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAEhEVycPSpewELk6qsUk8rDjA2j-bHL20",
  authDomain: "volthome-afcc8.firebaseapp.com",
  projectId: "volthome-afcc8",
  storageBucket: "volthome-afcc8.firebasestorage.app",
  messagingSenderId: "1008448796228",
  appId: "1:1008448796228:web:1a0b8e5cb83329be7f2e11",
  measurementId: "G-YKZSKCL2R4",
};

let app;
let db: ReturnType<typeof getFirestore>;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  db = initializeFirestore(app, { experimentalForceLongPolling: true });
} else {
  app = getApp();
  db = getFirestore(app);
}

export const auth = getAuth(app);
export { db };
