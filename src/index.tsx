import { createRoot } from "react-dom/client";

import { MovieRandomizer } from "./App";
import { StrictMode } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./styles/index.scss";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <MovieRandomizer />
  </StrictMode>,
);
