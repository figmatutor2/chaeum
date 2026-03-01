import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrGo6di-92tvYpH4Dm9bbkaZ9WS2W8x-E",
  authDomain: "chaeum-25915.firebaseapp.com",
  projectId: "chaeum-25915",
  storageBucket: "chaeum-25915.firebasestorage.app",
  messagingSenderId: "625694711582",
  appId: "1:625694711582:web:43fed45cf151505f9db30f",
  measurementId: "G-Z0LQGPYWKW",
};

// 중복 초기화 방지
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
