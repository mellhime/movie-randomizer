import { FC } from "react";

import { Divider } from "primereact/divider";

import { AppDescription, Header, LowerPanel, MiddlePanel } from "@layouts";
import { Logo, MovieInfo, SearchBlock, WatchListButton } from "@modules";

import { app } from "./texts";

const App: FC = () => {
  return (
    <main>
      <Header leftPart={<Logo />} rightPart={<WatchListButton />} />
      <AppDescription title={app.title} description={app.description} />
      <Divider></Divider>
      <MiddlePanel content={<SearchBlock />} />
      <LowerPanel content={<MovieInfo />} />
    </main>
  );
};

export { App };
