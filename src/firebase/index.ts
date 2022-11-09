import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

import firebaseConfig from "./config";

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
export const database = getDatabase(firebaseApp);
export const storage = getStorage(firebaseApp);
