import { FC, useState } from "react";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { SliderChangeEvent } from "primereact/slider";

import { IMovie } from "@entities";

import { randChoice } from "./helpers";
import { useGetMovies } from "./hooks";
import { MovieOptions } from "./MovieOptions";
import { TFilterChangeEvent, TMoviesParams } from "./types";

const INITIAL_STATE: TMoviesParams = {
  genres: [],
  releaseYears: [],
  runtime: [60, 180],
  score: 0,
};

const SearchBlock: FC = () => {
  const [, setMovieInfo] = useState<IMovie | null>(null);
  const [movieOptions, setMovieOptions] =
    useState<TMoviesParams>(INITIAL_STATE);
  const { handleGetMoviesList } = useGetMovies();

  const handleChange = (e: TFilterChangeEvent) => {
    setMovieOptions({ ...movieOptions, [e.target.name]: e.value });
  };

  // todo move to common handler
  const handleChangeRuntime = (event: SliderChangeEvent) => {
    const { value } = event;
    const runtime: [number, number] = Array.isArray(value)
      ? (value as [number, number])
      : [value as number, value as number];

    setMovieOptions({ ...movieOptions, runtime });
  };

  const handleSubmit = () => {
    handleGetMoviesList(movieOptions).then((data) => {
      const randomMovie: IMovie = randChoice(data.results);
      setMovieInfo(randomMovie);
    });
  };

  return (
    <>
      <h2>Search options</h2>
      <Card className="w-6">
        <form className="flex align-items-center flex-column">
          <MovieOptions
            options={movieOptions}
            onChange={handleChange}
            onChangeRuntime={handleChangeRuntime}
          />
          <Button
            className="p-button-secondary m-5"
            type="button"
            onClick={handleSubmit}
          >
            Get a random movie
          </Button>
        </form>
      </Card>
    </>
  );
};

export { SearchBlock };
