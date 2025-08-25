import { FC } from "react";

import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Rating } from "primereact/rating";
import { Slider } from "primereact/slider";

const Filters: FC = () => {
  return (
    <>
      <div className="flex flex-column w-full gap-5">
        <div className="flex justify-content-around">
          <label className="flex flex-column">
            Genres
            <MultiSelect name="genres" placeholder="Select genres" showClear />
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
