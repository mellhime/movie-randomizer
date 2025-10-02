// eslint-disable-next-line no-restricted-imports
import { TMoviesParams } from "@modules/SearchBlock/types";
import { httpClient } from "@lib";
import { convertCamelToSnake, formatDate } from "@lib";

import {
  TGenresRequestDto,
  TGenresResponseDto,
  TMoviesRequestDto,
  TMoviesResponseDto,
} from "./movies.dto";

const convertFiltersToPayload = (params: TMoviesParams) => {
  const payload: TMoviesRequestDto = {
    withGenres: params.genres.join(","),
    "with_runtime.gte": params.runtime[0],
    "with_runtime.lte": params.runtime[1],
    "vote_average.gte": params.score,
  };
  if (params.releaseYears[0]) {
    payload["release_date.gte"] = formatDate(params.releaseYears[0]);
  }

  if (params.releaseYears[1]) {
    payload["release_date.lte"] = formatDate(params.releaseYears[1]);
  }

  return convertCamelToSnake(payload);
};

const getMoviesList = (params: TMoviesParams) => {
  const query = convertFiltersToPayload(params);

  return httpClient
    .get("discover/movie", { query })
    .then(({ data }) => data) as Promise<TMoviesResponseDto>;
};

const addToWatchList = () => {
  // https://developer.themoviedb.org/reference/account-add-to-watchlist
};

const getGenresList = (query?: TGenresRequestDto) => {
  return httpClient
    .get("genre/movie/list", { query })
    .then(({ data }) => data) as Promise<TGenresResponseDto>;
};

const getWatchList = () => {
  // https://developer.themoviedb.org/reference/account-watchlist-movies
  return [];
};

export { addToWatchList, getGenresList, getMoviesList, getWatchList };
