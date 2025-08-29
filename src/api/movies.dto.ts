import { IGenre } from "@entities";

interface IMoviesRequestDto {
  genre: string;
  id: number;
}

interface IGenresRequestDto {
  language?: string;
}

interface IGenresResponseDto {
  genres: IGenre[];
}

export { IGenresRequestDto, IGenresResponseDto, IMoviesRequestDto };
