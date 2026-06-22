const getFirestore = jest.fn(() => ({}));
const doc = jest.fn(() => ({}));
const setDoc = jest.fn();
const getDoc = jest.fn();
const deleteDoc = jest.fn();
const collection = jest.fn(() => ({}));
const getDocs = jest.fn();
const serverTimestamp = jest.fn(() => "server-timestamp");

export {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
};
