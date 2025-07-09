import { FC } from "react";
import { Button } from "primereact/button";

const Header: FC = () => {
  return (
    <header>
      <div className="flex justify-content-space-between">
        <img
          src="../images/logo.png"
          alt="logo"
          className="absolute right-3 max-w-40 max-h-40"
        ></img>
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
