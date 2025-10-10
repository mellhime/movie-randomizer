import { objectToSnake } from "ts-case-convert";

import { httpClient } from "@lib";

import { TMoviesRequestDto, TMoviesResponseDto } from "./movies.dto";

const getMoviesList = (query: TMoviesRequestDto) => {
  return httpClient
    .get("discover/movie", { query: objectToSnake(query) })
    .then(({ data }) => data) as Promise<TMoviesResponseDto>;
};

const addToWatchList = () => {
  // https://developer.themoviedb.org/reference/account-add-to-watchlist
};

const getWatchList = () => {
  // https://developer.themoviedb.org/reference/account-watchlist-movies
  return [];
};

export { addToWatchList, getMoviesList, getWatchList };
