import { FC } from "react";
import { Filters } from "./SearchBlock/Filters";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Description } from "@modules/Description";
import { Divider } from "primereact/divider";

const SearchBlock: FC = () => {
  return (
    <>
      <Description></Description>
      <Divider></Divider>
      <Card className="w-6">
        <div className="flex align-items-center flex-column">
          <Filters></Filters>
          <Button className="p-button-secondary m-5">Get a random movie</Button>
        </div>
      </Card>
    </>
  );
};

export { SearchBlock };
