const getAuth = jest.fn(() => ({}));
const signInWithEmailAndPassword = jest.fn();
const createUserWithEmailAndPassword = jest.fn();
const signOut = jest.fn();
const onAuthStateChanged = jest.fn();

export {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
};
