// Firebase configuration and initialization
import { getApp, getApps, initializeApp } from "firebase/app";

import { Auth, getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const hasFirebaseEnv = Object.values(firebaseConfig).every(
  (value) => typeof value === "string" && value.length > 0,
);

const app = hasFirebaseEnv
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export function getClientFirestore() {
  if (typeof window === "undefined") {
    throw new Error("Firestore can only be used in the browser.");
  }
  if (!app) {
    throw new Error(
      "Firebase env variables are missing. Add NEXT_PUBLIC_FIREBASE_* values to .env.local and restart the Next.js server."
    );
  }
  return getFirestore(app);
}

let authInstance: Auth | null = null;

export function getClientAuth(): Auth {
  if (typeof window === "undefined") {
    throw new Error("Firebase Auth can only be used in the browser.");
  }

  if (!app) {
    throw new Error(
      "Firebase env variables are missing. Add NEXT_PUBLIC_FIREBASE_* values to .env.local and restart the Next.js server.",
    );
  }

  if (!authInstance) {
    authInstance = getAuth(app);
  }

  return authInstance;
}

export function logout() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  return signOut(getClientAuth());
}
