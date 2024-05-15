import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";

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

const initialiceServerApp = () => {
  if (getApps().length > 0) {
    return;
  }
  initializeApp(firebaseAdminConfig);
};

export { initialiceServerApp };
