import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import firebase from "firebase/compat/app";

import { toast } from "@lib";
import { auth } from "@lib";
import AuthError = firebase.auth.AuthError;

const handleAuthError = (error: AuthError) => {
  toast.error(error.message);
  throw error;
};

const signup = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential)
    .catch((error: AuthError) => {
      handleAuthError(error);
    });
};

const signin = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential)
    .catch((error: AuthError) => {
      handleAuthError(error);
    });
};

const signout = () => {
  return signOut(auth).catch((error: AuthError) => {
    handleAuthError(error);
  });
};

export { signin, signout, signup };
