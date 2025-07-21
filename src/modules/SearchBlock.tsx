import { FC } from "react";
import { Filters } from "./SearchBlock/Filters";
import { Button } from "primereact/button";

const SearchBlock: FC = () => {
  return (
    <div className="flex align-items-center flex-column">
      <Filters></Filters>
      <Button>Get a random movie</Button>
    </div>
  );
};

export { SearchBlock };
