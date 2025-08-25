import { FC } from "react";

import { Button } from "primereact/button";

const WatchListButton: FC = () => {
  const handleClick = () => {
    // todo
  };

  return (
    <Button
      className="p-button-secondary mb-2 md:mb-0"
      label="Watch Later"
      onClick={handleClick}
    ></Button>
  );
};

export { WatchListButton };
