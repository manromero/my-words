import { cert, getApps, getApp, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const { privateKey } = JSON.parse(
  process.env.NEXT_PRIVATE_FIREBASE_ADMIN_PRIVATE_KEY ?? ""
);

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.NEXT_PRIVATE_FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.NEXT_PRIVATE_FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: privateKey,
  }),
};

// Initialize firebase admin
const serverApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseAdminConfig);

// Initialize firebase auth
const serverAuth = getAuth(serverApp);

export { serverAuth };
