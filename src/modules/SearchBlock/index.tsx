import React, { FC, useState } from "react";

import { Button } from "primereact/button";
import { Card } from "primereact/card";

import { getMoviesList } from "@api";
import { IMovie } from "@entities";

import { Filters } from "./Filters";
import { randChoice } from "./helpers";
import { TFilterChangeEvent, TMoviesParams } from "./types";

const INITIAL_STATE: TMoviesParams = {
  genres: [],
  releaseYears: [],
  runtime: [60, 180],
  score: 0,
};

const SearchBlock: FC = () => {
  const [movieInfo, setMovieInfo] = useState<IMovie | null>(null);
  const [filters, setFilters] = useState<TMoviesParams>(INITIAL_STATE);

  const handleChange = (e: TFilterChangeEvent) => {
    setFilters({ ...filters, [e.target.name]: e.value });
  };

  const handleChangeRuntime = (value: number | [number, number]) => {
    const runtime: [number, number] = Array.isArray(value)
      ? (value as [number, number])
      : [value as number, value as number];

    setFilters({ ...filters, runtime });
  };

  const handleSubmit = () => {
    getMoviesList(filters).then((data) => {
      const randomMovie: IMovie = randChoice(data.results);
      setMovieInfo(randomMovie);
    });
  };

  console.log(movieInfo);

  return (
    <>
      <h2>Search filters</h2>
      <Card className="w-6">
        <form className="flex align-items-center flex-column">
          <Filters
            filters={filters}
            onChange={handleChange}
            onChangeRuntime={handleChangeRuntime}
          ></Filters>
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
