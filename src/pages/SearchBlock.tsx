import { FC } from "react";
import { Filters } from "./SearchBlock/Filters";
import { Button } from "primereact/button";

const SearchBlock: FC = () => {
  return (
    <div className="flex align-items-center flex-column">
      <h1>Random Movie Generator</h1>
      <p>
        Welcome to Random Movie Generator! Dive into a world of movies with our
        tool that simplifies your search. Choose from genres, ratings, release
        dates, and runtimes to find your perfect match from a constantly updated
        movie collection. Discover your next favorite film with just a click!
      </p>
      <Filters></Filters>
      <Button>Get a random movie</Button>
    </div>
  );
};

export { SearchBlock };
