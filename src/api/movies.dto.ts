import { IGenre } from "@entities";

type TMoviesRequestDto = {
  genre: string;
  id: number;
};

type TGenresRequestDto = {
  language?: string;
};

interface TGenresResponseDto {
  genres: IGenre[];
}

export { TGenresRequestDto, TGenresResponseDto, TMoviesRequestDto };
