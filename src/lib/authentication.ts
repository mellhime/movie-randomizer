import { toast } from "react-toastify";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "@lib";

interface IFirebaseError {
  code: number;
  message: string;
}

const handleAuthError = (error: IFirebaseError) => {
  toast(error.message);
};

const signup = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential)
    .catch((error: IFirebaseError) => {
      handleAuthError(error);
    });
};

const signin = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential)
    .catch((error: IFirebaseError) => {
      handleAuthError(error);
    });
};

const signout = () => {
  return signOut(auth).catch((error: IFirebaseError) => {
    handleAuthError(error);
  });
};

export { signin, signout, signup };
