import { FC } from "react";

import { UserInfo } from "@firebase/auth";

import { AuthButton, TActiveView, ViewToggleButton } from "@modules";

interface IProps {
  currentUser: UserInfo | null;
  activeView: TActiveView;
  onClick: () => void;
  onChangeActionView: () => void;
}

const RightHeaderPart: FC<IProps> = ({
  currentUser,
  activeView,
  onClick,
  onChangeActionView,
}) => {
  return (
    <div className="flex gap-2">
      {currentUser && (
        <ViewToggleButton
          activeView={activeView}
          onToggle={onChangeActionView}
        />
      )}
      <AuthButton currentUser={currentUser} onSignIn={onClick} />
    </div>
  );
};

export { RightHeaderPart };
