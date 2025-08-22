import { FC } from "react";

interface IProps {
  title: string;
  description: string;
}

const AppDescription: FC<IProps> = ({ title, description }) => {
  return (
    <div className="flex align-items-center flex-column">
      <h1>{title}</h1>
      <p className="col-6 text-center p-2 border-1 border-primary-500">
        {description}
      </p>
    </div>
  );
};

export { AppDescription };
