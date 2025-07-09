import { Header } from "@layouts/Header";
import { Content } from "@layouts/Content";
import { FC } from "react";

const App: FC = () => {
  return (
    <main>
      <Header />
      <Content />
    </main>
  );
};

export { App };
