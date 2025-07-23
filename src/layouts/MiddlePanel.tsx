import { FC, ReactNode } from "react";

interface IProps {
  content?: ReactNode;
}

const MiddlePanel: FC<IProps> = ({ content }) => {
  return <div className="flex align-items-center flex-column">{content}</div>;
};

export { MiddlePanel };
