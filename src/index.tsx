import { createRoot } from "react-dom/client";

import { App } from "./App";
import { StrictMode } from "react";
import "primereact/resources/themes/mira/theme.css";
import "primeflex/primeflex.scss";
import "./styles/index.scss";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
