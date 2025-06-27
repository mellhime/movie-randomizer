import { FC } from "react";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";

const Filters: FC = () => {
  return (
    <>
      <h2 className="filters__title">Search filters</h2>
      <MultiSelect>Genre</MultiSelect>
      <Calendar>Release year</Calendar>
      {/* score */}
      {/* runtime */}
    </>
  );
};

export { Filters };
