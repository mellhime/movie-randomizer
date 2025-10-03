import { FC, useEffect, useState } from "react";

import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { Rating } from "primereact/rating";
import { Slider } from "primereact/slider";

import { getGenresList } from "@api";
import { mappedOptions } from "@lib";
import { IGenre } from "@entities";

import { TFilterChangeEvent, TMoviesParams } from "./types";

import { forms } from "@/texts";

interface IProps {
  filters: TMoviesParams;
  onChange: (e: TFilterChangeEvent) => void;
  onChangeRuntime: (value: number | [number, number]) => void;
}

const Filters: FC<IProps> = ({
  filters,
  onChange: handleChange,
  onChangeRuntime: handleChangeRuntime,
}) => {
  const [genresList, setGenresList] = useState<IGenre[]>([]);

  useEffect(() => {
    getGenresList().then((data) => {
      setGenresList(data.genres);
    });
  }, []);

  return (
    <>
      <div className="flex flex-column w-full gap-5">
        <div className="flex justify-content-around">
          <label className="flex flex-column gap-2 w-4">
            Genres
            <MultiSelect
              name="genres"
              placeholder={forms.genres.placeholder}
              options={mappedOptions(genresList)}
              value={filters.genres}
              onChange={handleChange}
              showClear
            />
          </label>
          <label className="flex flex-column gap-2 w-4">
            Release year
            <Calendar
              name="releaseYears"
              value={filters.releaseYears}
              onChange={handleChange}
              view="year"
              dateFormat="yy"
              selectionMode="range"
              readOnlyInput
              hideOnRangeSelection
            />
          </label>
        </div>
        <div className="flex justify-content-around">
          <label className="flex flex-column gap-2 w-4">
            Score
            <Rating
              name="score"
              value={filters.score}
              onChange={handleChange}
              stars={10}
            />
          </label>
          <label className="flex flex-column gap-2 w-4">
            Runtime (min)
            <Slider
              value={filters.runtime}
              name="runtime"
              range
              min={0}
              max={500}
              onChange={(e) => handleChangeRuntime(e.value)}
            />
            {`${filters.runtime[0]} - ${filters.runtime[1]}`}
          </label>
        </div>
      </div>
    </>
  );
};

export { Filters };
