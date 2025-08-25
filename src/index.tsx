import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "primereact/resources/themes/mira/theme.css";
import "primeflex/primeflex.scss";
import "@styles/index.scss";

import { App } from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
