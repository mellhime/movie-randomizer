import React from "react";

import { MultiSelectChangeEvent } from "primereact/multiselect";
import { RatingChangeEvent } from "primereact/rating";

interface CalendarFormEvent {
  originalEvent: React.SyntheticEvent;
  value: (Date | null)[];
  target: { name: string };
}

type TFilterChangeEvent =
  | CalendarFormEvent
  | MultiSelectChangeEvent
  | RatingChangeEvent;

type TMoviesParams = {
  genres: number[];
  score: number;
  releaseYears: Date[];
  runtime: [number, number];
};

export { TFilterChangeEvent, TMoviesParams };
