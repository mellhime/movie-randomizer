import { FC } from "react";

import { Button } from "primereact/button";
import { Card } from "primereact/card";

import { Filters } from "./Filters";

const SearchBlock: FC = () => {
  return (
    <>
      <h2>Search filters</h2>
      <Card className="w-6">
        <form className="flex align-items-center flex-column">
          <Filters></Filters>
          <Button className="p-button-secondary m-5" type="submit">
            Get a random movie
          </Button>
        </form>
      </Card>
    </>
  );
};

export { SearchBlock };
