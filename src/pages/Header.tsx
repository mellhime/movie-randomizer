import { FC } from "react";
import { Button } from "primereact/button";

const Header: FC = () => {
  return (
    <header className="header">
      <div className="header__content">
        <img src="../images/logo.png" alt="logo" className="header__logo"></img>
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
