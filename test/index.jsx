/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";

import "./index.css";
import ToolBarTest from "./ToolBarTest";
import ControlsTest from "./ControlsTest";

const routes = [
  {
    path: "toolbar",
    component: <ToolBarTest />,
  },
  {
    path: "controls",
    component: <ControlsTest />,
  },
];

const root = document.getElementById("app");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(() => <Router>{routes}</Router>, root);
