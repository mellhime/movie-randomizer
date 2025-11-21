import { FC, useState } from "react";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

import { useGetMovies } from "@modules";
import { IMovie } from "@entities";

import { TFilterChangeEvent, TMoviesParams } from "./../types";
import { randChoice, randomPage } from "./helpers";
import { MovieOptions } from "./MovieOptions";

const INITIAL_STATE: TMoviesParams = {
  genres: [],
  releaseYears: [],
  runtime: [60, 180],
  score: 0,
  page: 1,
};

const PAGES_LIMIT = 500;

interface IProps {
  onMovieChange: (movie: IMovie) => void;
}

const SearchBlock: FC<IProps> = ({ onMovieChange: handleMovieChange }) => {
  const [movieOptions, setMovieOptions] =
    useState<TMoviesParams>(INITIAL_STATE);
  const { handleGetMoviesList } = useGetMovies();

  const handleChange = (event: TFilterChangeEvent) => {
    const name = "target" in event ? event.target.name : "runtime";

    setMovieOptions({ ...movieOptions, [name]: event.value });
  };

  const handleSubmit = () => {
    handleGetMoviesList({
      ...movieOptions,
      page: randomPage(PAGES_LIMIT),
    }).then((data) => {
      const randomMovie: IMovie = randChoice(data.results);
      handleMovieChange(randomMovie);
    });
  };

  return (
    <>
      <h2>Search options</h2>
      <Card className="w-6">
        <form className="flex align-items-center flex-column">
          <MovieOptions options={movieOptions} onChange={handleChange} />
          <Button
            className="p-button-secondary m-5"
            type="button"
            onClick={handleSubmit}
          >
            Get a random movie
          </Button>
        </form>
      </Card>
      <Divider></Divider>
    </>
  );
};

export { SearchBlock };
