import { cert } from "firebase-admin/app";
import * as admin from "firebase-admin";

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

if (!admin.apps.length) {
  admin.initializeApp(firebaseAdminConfig);
}
const serverAuth = admin.auth();

export { serverAuth };
