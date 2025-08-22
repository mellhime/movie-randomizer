import { FC, ReactNode } from "react";

interface IProps {
  leftPart?: ReactNode;
  rightPart?: ReactNode;
}

const Header: FC<IProps> = ({ leftPart, rightPart }) => {
  return (
    <header>
      <div className="flex justify-content-between p-3 border-round bg-bluegray-200">
        {leftPart}
        {rightPart}
      </div>
    </header>
  );
};

export { Header };
