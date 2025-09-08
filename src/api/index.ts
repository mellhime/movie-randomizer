import { httpClient } from "@lib";

import {
  TGenresRequestDto,
  TGenresResponseDto,
  TMoviesRequestDto,
} from "./movies.dto";

const getMoviesList = (query?: TMoviesRequestDto) => {
  return httpClient.get("discover/movie", { query });
};

const addToWatchList = () => {
  // https://developer.themoviedb.org/reference/account-add-to-watchlist
};

const getGenresList = (query?: TGenresRequestDto) => {
  return httpClient.get("genre/movie/list", {
    query,
  }) as Promise<TGenresResponseDto>;
};

const getWatchList = () => {
  // https://developer.themoviedb.org/reference/account-watchlist-movies
  return [];
};

export { addToWatchList, getGenresList, getMoviesList, getWatchList };
