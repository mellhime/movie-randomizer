import { MultiSelectChangeEvent } from "primereact/multiselect";
import { RatingChangeEvent } from "primereact/rating";

interface CalendarChangeCustomEvent {
  originalEvent?: Event;
  value: Date | Date[] | null;
  target: {
    name: string;
  };
}

type TFilterChangeEvent =
  | MultiSelectChangeEvent
  | RatingChangeEvent
  | CalendarChangeCustomEvent;

type TMoviesParams = {
  genres: number[];
  score: number;
  releaseYears: Date[];
  runtime: [number, number];
};

export { TFilterChangeEvent, TMoviesParams };
