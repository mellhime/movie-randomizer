import { TMoviesParams } from "@modules";
import { moviesApi } from "@api";
import { convertFiltersToPayload } from "@adapters";

const useGetMovies = () => {
  const handleGetMoviesList = (params: TMoviesParams) => {
    const queryParams = convertFiltersToPayload(params);

    return moviesApi.getMoviesList(queryParams).then((data) => {
      return data;
    });
  };

  return { handleGetMoviesList };
};

export { useGetMovies };
