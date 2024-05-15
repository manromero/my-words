import { clientAuth } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const NEXT_PUBLIC_COOKIE_SESSION_NAME =
  process.env.NEXT_PUBLIC_COOKIE_SESSION_NAME ?? "";

type CreateUserParamsType = {
  email: string;
  password: string;
  router: any;
};

const createUser = async ({
  email,
  password,
  router,
}: CreateUserParamsType) => {
  createUserWithEmailAndPassword(clientAuth, email, password)
    .then(async (userCred) => {
      const idToken = await userCred.user.getIdToken();
      document.cookie = `${NEXT_PUBLIC_COOKIE_SESSION_NAME}=${idToken}`;
      router.push("/");
    })
    .catch((error) => {
      alert(`Sign up failed: ${error.message} - ${error.code}`);
    });
};

type SignInParamsType = {
  email: string;
  password: string;
  router: any;
};

const signIn = async ({ email, password, router }: SignInParamsType) => {
  signInWithEmailAndPassword(clientAuth, email.trim(), password)
    .then(async (userCred) => {
      const idToken = await userCred.user.getIdToken();
      document.cookie = `${NEXT_PUBLIC_COOKIE_SESSION_NAME}=${idToken}`;
      router.push("/");
    })
    .catch((error) => {
      alert(`Login failed: ${error.message} - ${error.code}`);
    });
};

export { createUser, signIn };
