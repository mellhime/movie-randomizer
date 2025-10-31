import { httpClient } from "@lib";

import { TGenresRequestDto, TGenresResponseDto } from "./genres.dto";

const getGenresList = (query?: TGenresRequestDto) => {
  return httpClient
    .get("genre/movie/list", { query })
    .then(({ data }) => data) as Promise<TGenresResponseDto>;
};

export { getGenresList };
