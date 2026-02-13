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

const signup = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential)
    .catch((error: IFirebaseError) => {
      toast(error.message);
    });
};

const signin = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential)
    .catch((error: IFirebaseError) => {
      toast(error.message);
    });
};

const signout = () => {
  return signOut(auth).catch((error: IFirebaseError) => {
    toast(error.message);
  });
};

export { signin, signout, signup };
