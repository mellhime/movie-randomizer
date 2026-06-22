import { useEffect, useState } from "react";

import { UserInfo } from "@firebase/auth";

import { IMovie } from "@entities";
import { watchlistService } from "@services";

const useWatchlist = (movie: IMovie, currentUser: UserInfo | null) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkWatchlist = async () => {
    if (!currentUser) {
      setIsInWatchlist(false);
      return;
    }

    setIsLoading(true);

    watchlistService
      .fetchMovieFromWatchlist(movie.id, currentUser.uid)
      .then((exists) => setIsInWatchlist(Boolean(exists)))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    checkWatchlist();
  }, [currentUser, movie]);

  const addToWatchlist = () => {
    if (!currentUser) return;

    return watchlistService
      .addMovieToWatchlist(movie, currentUser.uid)
      .then(() => setIsInWatchlist(true));
  };

  return { isInWatchlist, isLoading, addToWatchlist };
};

export { useWatchlist };
