import { FC, useEffect, useState } from "react";

import { Card } from "primereact/card";
import { Knob } from "primereact/knob";

import { useGetGenres } from "@modules";
import { IGenre, IMovie } from "@entities";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

interface IProps {
  movieInfo: IMovie | null;
}

const MovieInfo: FC<IProps> = ({ movieInfo }) => {
  const [genresList, setGenresList] = useState<IGenre[]>([]);
  const { handleGetGenresList } = useGetGenres();

  useEffect(() => {
    handleGetGenresList().then((data) => {
      setGenresList(data.genres);
    });
  }, []);

  if (!movieInfo) {
    return null;
  }

  const movieTitle = `${movieInfo.title} (${new Date(movieInfo?.releaseDate).getFullYear()})`;
  const imageUrl = IMAGE_URL + movieInfo.posterPath;
  const backgroundUrl = IMAGE_URL + movieInfo.backdropPath;
  const userScore = Math.round(movieInfo.voteAverage * 10);

  const genresTitles = (ids: TGenreId[]) => {
    return genresList
      .filter((genre) => ids.includes(genre.id))
      .map((genre) => genre.name)
      .join(", ");
  };

  return (
    <>
      <Card
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255, 0.7) 0 50%), url(${backgroundUrl})`,
        }}
        className="movie-info w-full bg-cover bg-no-repeat"
      >
        <div className="flex justify-content-between gap-4 p-5 text-black">
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
            <b>Overview</b>
            <p>{movieInfo.overview}</p>
            <p>{`Original language: ${movieInfo.originalLanguage.toUpperCase()}`}</p>
          </div>
        </div>
      </Card>
    </>
  );
};

export { MovieInfo };
