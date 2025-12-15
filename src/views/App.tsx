import { FC, useState } from "react";

import { Divider } from "primereact/divider";

import { AppDescription, Header, LowerPanel, MiddlePanel } from "@layouts";
import { Logo, MovieInfo, SearchBlock, WatchListButton } from "@modules";
import { texts } from "@lib";
import { IMovie } from "@entities";

const App: FC = () => {
  const [movieInfo, setMovieInfo] = useState<IMovie | null>(null);

  return (
    <main>
      <Header leftPart={<Logo />} rightPart={<WatchListButton />} />
      <AppDescription
        title={texts.app.title}
        description={texts.app.description}
      />
      <Divider></Divider>
      <MiddlePanel content={<SearchBlock onMovieChange={setMovieInfo} />} />
      <Divider></Divider>
      <LowerPanel content={<MovieInfo movieInfo={movieInfo} />} />
    </main>
  );
};

export { App };
