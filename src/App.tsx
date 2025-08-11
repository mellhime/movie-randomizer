import { Header } from "@layouts/Header";
import { MiddlePanel } from "@layouts/MiddlePanel";
import { FC } from "react";
import { WatchListButton } from "@modules/WatchListButton";
import { Logo } from "@modules/Logo";
import { SearchBlock } from "@modules/SearchBlock";
import { MovieInfo } from "@modules/MovieInfo";
import { LowerPanel } from "@layouts/LowerPanel";
import { Divider } from "primereact/divider";
import { AppDescription } from "@layouts/AppDescription";

const App: FC = () => {
  return (
    <main>
      <Header leftPart={<Logo />} rightPart={<WatchListButton />} />
      <AppDescription />
      <Divider></Divider>
      <MiddlePanel content={<SearchBlock />} />
      <LowerPanel content={<MovieInfo />} />
    </main>
  );
};

export { App };
