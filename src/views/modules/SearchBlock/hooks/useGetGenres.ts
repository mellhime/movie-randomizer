import { genresApi } from "@api";

import { TGenresParams } from ".././types";

const useGetGenres = () => {
  const handleGetGenresList = (params?: TGenresParams) => {
    return genresApi.getGenresList(params).then((data) => {
      return data;
    });
  };

  const getGenresTitles = (ids: TGenreId[]) => {
    return genresApi.getGenresList().then((data) => {
      const titles = data.genres
        .filter((genre) => ids.includes(genre.id))
        .map((genre) => genre.name);

      console.log(titles);
      return titles;
    });
  };

  return { handleGetGenresList, getGenresTitles };
};

export { useGetGenres };
