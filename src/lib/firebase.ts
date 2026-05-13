import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Cấu hình chuẩn từ dự án VoltHome của bạn
const firebaseConfig = {
  apiKey: "AIzaSyAEheVYcPSpewELk6qsUk8rDjA2j-bHL20",
  authDomain: "volthome-afcc8.firebaseapp.com",
  projectId: "volthome-afcc8",
  storageBucket: "volthome-afcc8.firebasestorage.app",
  messagingSenderId: "1008448796228",
  appId: "1:1008448796228:web:1a0b8e5cb83329be7f2e11",
  measurementId: "G-YKZSKCL2R4",
};

// Khởi tạo Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ĐÂY LÀ 2 DÒNG QUAN TRỌNG BỊ MẤT TÍCH NÈ:
export const db = getFirestore(app);
export const auth = getAuth(app);
