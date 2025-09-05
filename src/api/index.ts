import { httpClient } from "@lib";

import {
  IGenresRequestDto,
  IGenresResponseDto,
  IMoviesRequestDto,
} from "./movies.dto";

const getMoviesList = (query?: IMoviesRequestDto) => {
  return httpClient.get("discover/movie", { query });
};

const addToWatchList = () => {
  // https://developer.themoviedb.org/reference/account-add-to-watchlist
};

const getGenresList = (query?: IGenresRequestDto) => {
  return httpClient.get("genre/movie/list", {
    query,
  }) as Promise<IGenresResponseDto>;
};

const getWatchList = () => {
  // https://developer.themoviedb.org/reference/account-watchlist-movies
  return [];
};

export { addToWatchList, getGenresList, getMoviesList, getWatchList };
