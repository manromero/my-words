import { clientAuth } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
      fetch("/api/auth", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await userCred.user.getIdToken()}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            router.push("/");
          }
        })
        .catch((error) => {
          alert(`Sign up failed 2: ${error.message} - ${error.code}`);
        });
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
      fetch("/api/auth", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await userCred.user.getIdToken()}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          console.log("routing to the next page");
          router.push("/");
        }
      });
    })
    .catch((error) => {
      alert(`Login failed: ${error.message} - ${error.code}`);
    });
};

export { createUser, signIn };
