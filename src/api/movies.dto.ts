import { IGenre } from "@entities";

type IMoviesRequestDto = {
  genre: string;
  id: number;
};

type IGenresRequestDto = {
  language?: string;
};

interface IGenresResponseDto {
  genres: IGenre[];
}

export { IGenresRequestDto, IGenresResponseDto, IMoviesRequestDto };
