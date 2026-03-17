import { FC } from "react";

import { UserInfo } from "@firebase/auth";
import { Button } from "primereact/button";

import { signout, texts } from "@lib";

interface IProps {
  currentUser: UserInfo | null;
  activeView: "randomizer" | "watchlist";
  onClick: () => void;
  onChangeActionView: () => void;
}

const RightHeaderPart: FC<IProps> = ({
  currentUser,
  activeView,
  onClick: handleClick,
  onChangeActionView: handleChangeActionView,
}) => {
  const buttonLabel =
    activeView === "randomizer" ? texts.buttons.watchLater : texts.buttons.back;
  const signButtonLabel = currentUser ? texts.app.signOut : texts.app.signIn;

  return (
    <div className="flex gap-2">
      {currentUser && (
        <Button
          className="p-button-secondary mb-2 md:mb-0"
          label={buttonLabel}
          type="button"
          onClick={handleChangeActionView}
        />
      )}
      <Button
        className="p-button-secondary mb-2 md:mb-0"
        label={signButtonLabel}
        onClick={currentUser ? signout : () => handleClick()}
      />
    </div>
  );
};

export { RightHeaderPart };
