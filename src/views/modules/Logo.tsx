import { FC } from "react";

import logo from "@images/logo.png";

const Logo: FC = () => {
  return <img src={logo} alt="logo" className="w-4rem h-4rem"></img>;
};

export { Logo };
