import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db, toast } from "@lib";
import { IMovie, IWatchListMovie } from "@entities";

const loadWatchlist = async (userId: string) => {
  const watchlistRef = collection(db, "users", userId, "watchlist");
  try {
    const snapshot = await getDocs(watchlistRef);
    return snapshot.docs.map((doc) => doc.data() as IWatchListMovie);
  } catch (e) {
    toast.error(`Error while fetching movies: ${e}`);

    return [];
  }
};

const fetchMovieFromWatchlist = async (movieId: number, userId: string) => {
  const ref = doc(db, "users", userId, "watchlist", String(movieId));

  try {
    const snapshot = await getDoc(ref);
    return snapshot.exists();
  } catch (e) {
    toast.error(`Error while fetching movie: ${e}`);
  }
};

const addMovieToWatchlist = async (movieInfo: IMovie, userId: string) => {
  try {
    await setDoc(doc(db, "users", userId, "watchlist", String(movieInfo.id)), {
      movieId: movieInfo.id,
      title: movieInfo.title,
      posterPath: movieInfo.posterPath,
      addedAt: serverTimestamp(),
    });
  } catch (e) {
    toast.error(`Error adding movie to watchlist: ${e}`);
  }
};

const removeFromWatchlist = async (movieId: number, userId: string) => {
  try {
    await deleteDoc(doc(db, "users", userId, "watchlist", String(movieId)));
  } catch (e) {
    toast.error(`Error deleting movie from watchlist: ${e}`);
  }
};

export {
  addMovieToWatchlist,
  fetchMovieFromWatchlist,
  loadWatchlist,
  removeFromWatchlist,
};
