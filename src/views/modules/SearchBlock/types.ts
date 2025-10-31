import { MultiSelectChangeEvent } from "primereact/multiselect";
import { RatingChangeEvent } from "primereact/rating";
import { FormTarget, Nullable } from "primereact/ts-helpers";

interface FormEvent<T> {
  value: Nullable<T>;
  target: FormTarget<T>;
}

type CalendarFormEvent = FormEvent<(Date | null)[]>;

type TFilterChangeEvent =
  | CalendarFormEvent
  | MultiSelectChangeEvent
  | RatingChangeEvent;

type TMoviesParams = {
  genres: TGenreId[];
  score: number;
  releaseYears: Date[];
  runtime: [number, number];
};

type TGenresParams = {
  language?: string;
};

export { TFilterChangeEvent, TGenresParams, TMoviesParams };
