import { FC, useEffect, useState } from "react";

import { UserInfo } from "@firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { Button } from "primereact/button";

import { db, formatTimestamp, IMAGE_URL, texts, toast } from "@lib";
import { IWatchListMovie } from "@entities";

interface IProps {
  currentUser: UserInfo | null;
}

const WatchList: FC<IProps> = ({ currentUser }) => {
  const [watchList, setWatchList] = useState<IWatchListMovie[]>([]);

  const getWatchList = async () => {
    if (!currentUser) return;

    const watchlistRef = collection(db, "users", currentUser.uid, "watchlist");
    try {
      const snapshot = await getDocs(watchlistRef);
      const movies = snapshot.docs.map((doc) => doc.data() as IWatchListMovie);
      setWatchList(movies);
    } catch (e) {
      toast.error(`Error while fetching movies: ${e}`);
    }
  };

  useEffect(() => {
    getWatchList();
  }, [currentUser]);

  const handleClick = async (movieId: number) => {
    if (!currentUser) return;

    try {
      await deleteDoc(
        doc(db, "users", currentUser.uid, "watchlist", String(movieId)),
      );
      setWatchList((prev) => prev.filter((movie) => movie.movieId !== movieId));
    } catch (e) {
      toast.error(`Error deleting movie from watchlist: ${e}`);
    }
  };

  return (
    <>
      {!watchList.length && <p>{texts.app.emptyWatchlist}</p>}

      {watchList.map((movie) => (
        <div
          key={movie.movieId}
          className="flex w-30rem h-12rem gap-4 align-items-start p-3 border-round surface-100 mb-3 mx-auto"
        >
          <img
            src={IMAGE_URL + movie.posterPath}
            alt={movie.title}
            className="flex-shrink-0 object-fit-cover watchlist-poster"
          />

          <div className="flex flex-column justify-content-between gap-2 flex-1 h-full overflow-hidden">
            <div className="overflow-hidden">
              <h3 className="m-0 watchlist-title">{movie.title}</h3>
            </div>
            <span className="text-sm text-600">
              {texts.app.added}: {formatTimestamp(movie.addedAt)}
            </span>

            <div>
              <Button
                label={texts.buttons.removeFromWatchList}
                type="button"
                className="p-button-secondary"
                onClick={() => handleClick(movie.movieId)}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export { WatchList };
