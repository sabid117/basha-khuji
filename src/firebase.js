import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

console.log("VITE_API_KEY:", import.meta.env.VITE_API_KEY);
console.log("firebaseConfig:", firebaseConfig);
console.log("getApps().length before init:", getApps().length);

const app = initializeApp(firebaseConfig);
console.log("app.name:", app.name);
console.log("app.options.projectId:", app.options?.projectId);

export const auth = getAuth(app);
export { firebaseConfig };
