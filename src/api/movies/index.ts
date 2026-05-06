import { objectToSnake } from "ts-case-convert";

import { httpClient } from "@lib";

import { TMoviesRequestDto, TMoviesResponseDto } from "./movies.dto";

const getMoviesList = (query: TMoviesRequestDto) => {
  return httpClient
    .get("discover/movie", { query: objectToSnake(query) })
    .then(({ data }) => data) as Promise<TMoviesResponseDto>;
};

export { getMoviesList };
