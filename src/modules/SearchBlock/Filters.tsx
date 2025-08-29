import { FC, useEffect, useState } from "react";

import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { Rating } from "primereact/rating";
import { Slider } from "primereact/slider";

import { getGenresList } from "@api";
import { IGenre } from "@entities";

interface IFilters {
  genres: IGenre[];
  score: number;
  releaseYear: number;
  runtime: number;
}

const INITIAL_STATE = {
  genres: [],
  releaseYear: 0,
  runtime: 0,
  score: 0,
};

const Filters: FC = () => {
  const [genresList, setGenresList] = useState<IGenre[]>([]);
  const [filters, setFilters] = useState<IFilters>(INITIAL_STATE);

  const genresOptions = genresList.map((genre) => ({
    label: genre.name,
    value: genre.id,
  }));

  const handleChange = (e: MultiSelectChangeEvent) => {
    setFilters({ ...filters, genres: e.value });
  };

  useEffect(() => {
    getGenresList().then((data) => {
      setGenresList(data.genres);
    });
  }, []);

  return (
    <>
      <div className="flex flex-column w-full gap-5">
        <div className="flex justify-content-around">
          <label className="flex flex-column">
            Genres
            <MultiSelect
              name="genres"
              placeholder="Select genres"
              options={genresOptions}
              value={filters.genres}
              onChange={handleChange}
              showClear
            />
          </label>
          <label className="flex flex-column">
            Release year
            <Calendar name="releaseYear" dateFormat="yy" />
          </label>
        </div>
        <div className="flex justify-content-around">
          <label className="flex flex-column">
            Score
            <Rating name="score" />
          </label>
          <label className="flex flex-column">
            Runtime
            <InputText name="runtime" />
            <Slider name="runtime" />
          </label>
        </div>
      </div>
    </>
  );
};

export { Filters };
