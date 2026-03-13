import { FC } from "react";

import { UserInfo } from "@firebase/auth";
import { Button } from "primereact/button";

import { WatchListButton } from "@modules";
import { signout, texts } from "@lib";

interface IProps {
  currentUser: UserInfo | null;
  onClick: (status: boolean) => void;
}

const RightHeaderPart: FC<IProps> = ({ currentUser, onClick: handleClick }) => {
  return (
    <div className="flex gap-2">
      {currentUser && <WatchListButton />}
      <Button
        className="p-button-secondary mb-2 md:mb-0"
        label={currentUser ? texts.app.signOut : texts.app.signIn}
        onClick={currentUser ? signout : () => handleClick(true)}
      />
    </div>
  );
};

export { RightHeaderPart };
