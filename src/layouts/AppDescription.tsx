import { FC } from "react";

const AppDescription: FC = () => {
  return (
    <div className="flex align-items-center flex-column">
      <h1>Random Movie Generator</h1>
      <p className="col-6 text-center p-2 border-1 border-primary-500">
        Welcome to Random Movie Generator! Dive into a world of movies with our
        tool that simplifies your search. Choose from genres, ratings, release
        dates, and runtimes to find your perfect match from a constantly updated
        movie collection. Discover your next favorite film with just a click!
      </p>
    </div>
  );
};

export { AppDescription };
