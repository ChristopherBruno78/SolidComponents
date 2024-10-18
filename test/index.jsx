/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";

import "./index.css";
import ToolBarTest from "./ToolBarTest";
import ButtonTest from "./ButtonTest";

const routes = [
  {
    path: "toolbar",
    component: <ToolBarTest />,
  },
  {
    path: "buttons",
    component: <ButtonTest />,
  },
];

const root = document.getElementById("app");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(() => <Router>{routes}</Router>, root);
