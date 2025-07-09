import { FC } from "react";
import { Button } from "primereact/button";
import logo from "@images/logo.png";

const Header: FC = () => {
  return (
    <header>
      <div className="flex justify-content-between">
        <img src={logo} alt="logo" className="w-6rem h-6rem"></img>
        <Button
          className="p-button-secondary mb-3 md:mb-0"
          type="button"
          label="Watch Later"
        ></Button>
      </div>
    </header>
  );
};

export { Header };
