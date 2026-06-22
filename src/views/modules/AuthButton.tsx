import { FC } from "react";

import { UserInfo } from "@firebase/auth";
import { Button } from "primereact/button";

import { signout, texts } from "@lib";

interface IProps {
  currentUser: UserInfo | null;
  onSignIn: () => void;
}

const AuthButton: FC<IProps> = ({ currentUser, onSignIn }) => {
  const label = currentUser ? texts.app.signOut : texts.app.signIn;

  return (
    <Button
      className="p-button-secondary mb-2 md:mb-0"
      label={label}
      type="button"
      onClick={currentUser ? signout : onSignIn}
    />
  );
};

export { AuthButton };
