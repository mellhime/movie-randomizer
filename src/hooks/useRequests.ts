import { TGenresParams, TMoviesParams } from "@modules/SearchBlock/types";
import { genresApi, moviesApi } from "@api";
import { TMoviesRequestDto } from "@api/movies/movies.dto";
import { formatDate } from "@lib";

const useRequests = () => {
  const convertFiltersToPayload = (
    params: TMoviesParams,
  ): TMoviesRequestDto => {
    const { genres, runtime, score, releaseYears } = params;
    const payload: TMoviesRequestDto = {
      withGenres: genres.join(","),
      "withRuntime.gte": runtime[0],
      "withRuntime.lte": runtime[1],
    };
    if (score && score !== 0) {
      payload["voteAverage.gte"] = score;
    }

    if (releaseYears[0]) {
      payload["releaseDate.gte"] = formatDate(releaseYears[0]);
    }

    if (releaseYears[1]) {
      payload["releaseDate.lte"] = formatDate(releaseYears[1]);
    }

    return payload;
  };

  const handleGetMoviesList = (params: TMoviesParams) => {
    const queryParams = convertFiltersToPayload(params);

    return moviesApi.getMoviesList(queryParams).then((data) => {
      return data;
    });
  };

  const handleGetGenresList = (params?: TGenresParams) => {
    return genresApi.getGenresList(params).then((data) => {
      return data;
    });
  };

  return { handleGetMoviesList, handleGetGenresList };
};

export { useRequests };
