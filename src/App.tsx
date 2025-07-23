import { Header } from "@layouts/Header";
import { MiddlePanel } from "@layouts/MiddlePanel";
import { FC } from "react";
import { WatchListButton } from "@modules/WatchListButton";
import { Logo } from "@modules/Logo";
import background from "@images/background.png";
import { SearchBlock } from "@modules/SearchBlock";
import { MovieInfo } from "@modules/SearchBlock/MovieInfo";
import { LowerPanel } from "@layouts/LowerPanel";

const App: FC = () => {
  return (
    // todo put it to styles ?
    <main style={{ backgroundImage: `url(${background})` }}>
      <Header leftPart={<Logo />} rightPart={<WatchListButton />} />
      <MiddlePanel content={<SearchBlock />} />
      <LowerPanel content={<MovieInfo />} />
    </main>
  );
};

export { App };
