import { genresApi } from "@api";

import { TGenresParams } from ".././types";

const useGetGenres = () => {
  const handleGetGenresList = (params?: TGenresParams) => {
    return genresApi.getGenresList(params).then((data) => {
      return data;
    });
  };

  return { handleGetGenresList };
};

export { useGetGenres };
