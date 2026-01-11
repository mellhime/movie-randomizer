import { FC, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import { Divider } from "primereact/divider";

import { AppDescription, Header, LowerPanel, MiddlePanel } from "@layouts";
import {
  Logo,
  MovieInfo,
  SearchBlock,
  useGetGenres,
  WatchListButton,
} from "@modules";
import { texts } from "@lib";
import { IGenre, IMovie } from "@entities";

const App: FC = () => {
  const [movieInfo, setMovieInfo] = useState<IMovie | null>(null);
  const [genresList, setGenresList] = useState<IGenre[]>([]);
  const { handleGetGenresList } = useGetGenres();

  useEffect(() => {
    handleGetGenresList().then((data) => {
      setGenresList(data.genres);
    });
  }, []);

  return (
    <main>
      <Header leftPart={<Logo />} rightPart={<WatchListButton />} />
      <AppDescription
        title={texts.app.title}
        description={texts.app.description}
      />
      <Divider></Divider>
      <MiddlePanel
        content={
          <SearchBlock onMovieChange={setMovieInfo} genresList={genresList} />
        }
      />
      <Divider></Divider>
      <LowerPanel
        content={<MovieInfo movieInfo={movieInfo} genresList={genresList} />}
      />
      <ToastContainer />
    </main>
  );
};

export { App };
