import { FC } from "react";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";
import { Rating } from "primereact/rating";
import { Slider } from "primereact/slider";
import { InputText } from "primereact/inputtext";

const Filters: FC = () => {
  return (
    <>
      <h3>Search filters</h3>
      <div className="flex flex-column w-full gap-5">
        <div className="flex justify-content-around">
          <div className="flex flex-column">
            <label htmlFor="genres">Genres</label>
            <MultiSelect name="genres" placeholder="Select genres" showClear />
          </div>
          <div className="flex flex-column">
            <label htmlFor="releaseYear">Release year</label>
            <Calendar name="releaseYear" dateFormat="yy" />
          </div>
        </div>
        <div className="flex justify-content-around">
          <div className="flex flex-column">
            <label htmlFor="score">Score</label>
            <Rating name="score" />
          </div>
          <div className="flex flex-column">
            <label htmlFor="runtime">Runtime</label>
            <InputText name="runtime" />
            <Slider name="runtime" />
          </div>
        </div>
      </div>
    </>
  );
};

export { Filters };
