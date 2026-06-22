import { FC } from "react";

import { Button } from "primereact/button";

import { texts } from "@lib";

import { TActiveView } from "./types";

interface IProps {
  activeView: TActiveView;
  onToggle: () => void;
}

const ViewToggleButton: FC<IProps> = ({ activeView, onToggle }) => {
  const label =
    activeView === "randomizer" ? texts.buttons.watchLater : texts.buttons.back;

  return (
    <Button
      className="p-button-secondary mb-2 md:mb-0"
      label={label}
      type="button"
      onClick={onToggle}
    />
  );
};

export { ViewToggleButton };
