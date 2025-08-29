import { get, type IQueryParams } from "@lib";

import {
  IGenresRequestDto,
  IGenresResponseDto,
  IMoviesRequestDto,
} from "./movies.dto";

const toQuery = <T extends object>(dto: T): IQueryParams => {
  const query: IQueryParams = {};
  for (const [key, value] of Object.entries(dto)) {
    if (value !== undefined) {
      query[key] = String(value);
    }
  }
  return query;
};

const getMoviesList = (query?: IMoviesRequestDto) => {
  return get("discover/movie", { query: toQuery(query) });
};

const addToWatchList = () => {
  // https://developer.themoviedb.org/reference/account-add-to-watchlist
};

const getGenresList = (query: IGenresRequestDto = {}) => {
  return get("genre/movie/list", {
    query: toQuery(query),
  }) as Promise<IGenresResponseDto>;
};

const getWatchList = () => {
  // https://developer.themoviedb.org/reference/account-watchlist-movies
  return [];
};

export { addToWatchList, getGenresList, getMoviesList, getWatchList };
