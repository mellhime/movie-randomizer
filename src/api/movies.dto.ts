import { IGenre, IMovie } from "@entities";

type TMoviesRequestDto = {
  withGenres: string;
  "with_runtime.gte": number;
  "with_runtime.lte": number;
  "vote_average.gte": number;
  "release_date.gte"?: string;
  "release_date.lte"?: string;
};

type TGenresRequestDto = {
  language?: string;
};

interface TGenresResponseDto {
  genres: IGenre[];
}

interface TMoviesResponseDto {
  results: IMovie[];
  page: number;
  totalPages: number;
  totalResults: number;
}

export {
  TGenresRequestDto,
  TGenresResponseDto,
  TMoviesRequestDto,
  TMoviesResponseDto,
};
