import { FC, ReactNode } from "react";

interface IProps {
  leftPart?: ReactNode;
  rightPart?: ReactNode;
}

const Header: FC<IProps> = ({ leftPart, rightPart }) => {
  return (
    <header>
      <div
        className="flex justify-content-between header"
        // todo put it to styles ?
        style={{
          backgroundColor: "var(--highlight-bg)",
          color: "var(--highlight-text-color)",
          borderRadius: "var(--border-radius)",
          padding: "2rem",
        }}
      >
        {leftPart}
        {rightPart}
      </div>
    </header>
  );
};

export { Header };
