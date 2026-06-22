import { FC } from "react";

import { UserInfo } from "@firebase/auth";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Knob } from "primereact/knob";

import { IMAGE_URL, texts } from "@lib";
import { IGenre, IMovie } from "@entities";

import { useWatchlist } from "./hooks";

interface IProps {
  movieInfo: IMovie;
  genresList: IGenre[];
  currentUser: UserInfo | null;
}

const MovieInfo: FC<IProps> = ({ movieInfo, genresList, currentUser }) => {
  const movieTitle = `${movieInfo.title} (${new Date(movieInfo?.releaseDate).getFullYear()})`;
  const imageUrl = IMAGE_URL + movieInfo.posterPath;
  const backgroundUrl = IMAGE_URL + movieInfo.backdropPath;
  const userScore = Math.round(movieInfo.voteAverage * 10);

  const { isInWatchlist, isLoading, addToWatchlist } = useWatchlist(
    movieInfo,
    currentUser,
  );

  const genresTitles = (ids: TGenreId[]) => {
    return genresList
      .filter((genre) => ids.includes(genre.id))
      .map((genre) => genre.name)
      .join(", ");
  };

  const showWatchListButton = currentUser && !isInWatchlist && !isLoading;

  return (
    <>
      <Card
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255, 0.7) 0 50%), url(${backgroundUrl})`,
        }}
        className="movie-info w-full bg-cover bg-no-repeat"
      >
        <div className="flex gap-4 p-5 text-black">
          <img src={imageUrl} alt="poster" />
          <div>
            <h3 className="mb-2">{movieTitle}</h3>
            <p className="mb-3">{genresTitles(movieInfo.genreIds)}</p>
            <div className="flex align-items-center mb-3">
              <Knob
                value={userScore}
                min={0}
                max={100}
                valueColor="#2F3B3B"
                rangeColor="white"
                valueTemplate="{value}%"
                readOnly
              />
              <span>User score</span>
            </div>
            <b>{texts.app.overview}</b>
            <p>{movieInfo.overview}</p>
            <p>{`${texts.app.originalLanguage}: ${movieInfo.originalLanguage.toUpperCase()}`}</p>
            {showWatchListButton && (
              <Button
                className="p-button-secondary mb-2 md:mb-0"
                label={texts.buttons.addToWatchList}
                type="button"
                onClick={addToWatchlist}
              />
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export { MovieInfo };
