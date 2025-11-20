import { IMovie } from "@entities";

type TMoviesRequestDto = {
  withGenres: string;
  "withRuntime.gte": number;
  "withRuntime.lte": number;
  "voteAverage.gte"?: number;
  "releaseDate.gte"?: TReleaseDate;
  "releaseDate.lte"?: TReleaseDate;
};

interface TMoviesResponseDto {
  results: IMovie[];
  page: number;
  totalPages: number;
  totalResults: number;
}

export { type TMoviesRequestDto, TMoviesResponseDto };
