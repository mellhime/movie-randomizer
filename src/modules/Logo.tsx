import { FC } from "react";

import sas from "@images/logo.png";

const Logo: FC = () => {
  return <img src={sas} alt="logo" className="w-4rem h-4rem"></img>;
};

export { Logo };
