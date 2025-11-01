import { IGenre } from "@entities";

type TGenresRequestDto = {
  language?: string;
};

interface TGenresResponseDto {
  genres: IGenre[];
}

export { TGenresRequestDto, TGenresResponseDto };
