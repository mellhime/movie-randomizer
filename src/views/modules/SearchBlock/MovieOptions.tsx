import { FC, useEffect, useState } from "react";

import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { Rating } from "primereact/rating";
import { Slider } from "primereact/slider";

import { useGetGenres } from "@modules";
import { mappedOptions } from "@lib";
import { IGenre } from "@entities";

import { TFilterChangeEvent, TMoviesParams } from "./../types";

interface IProps {
  options: TMoviesParams;
  onChange: (e: TFilterChangeEvent) => void;
}

const MovieOptions: FC<IProps> = ({ options, onChange: handleChange }) => {
  const [genresList, setGenresList] = useState<IGenre[]>([]);
  const { handleGetGenresList } = useGetGenres();

  const runtimeBorders = `${options.runtime[0]} - ${options.runtime[1]}`;

  useEffect(() => {
    handleGetGenresList().then((data) => {
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
              options={mappedOptions(genresList)}
              value={options.genres}
              onChange={handleChange}
              data-testid="genres"
              showClear
            />
          </label>
          <label className="flex flex-column gap-2 w-4">
            Release year
            <Calendar
              name="releaseYears"
              value={options.releaseYears}
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
              value={options.score}
              onChange={handleChange}
              stars={10}
            />
          </label>
          <label className="flex flex-column gap-2 w-4">
            Runtime (min)
            <Slider
              value={options.runtime}
              name="runtime"
              range
              min={0}
              max={500}
              onChange={handleChange}
            />
            {runtimeBorders}
          </label>
        </div>
      </div>
    </>
  );
};

export { MovieOptions };
