/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";

import "./index.css";
import ToolBarDemo from "./ToolBarDemo";
import ButtonDemo from "./ButtonDemo";

const routes = [
  {
    path: "toolbar",
    component: <ToolBarDemo />,
  },
  {
    path: "buttons",
    component: <ButtonDemo />,
  },
];

const root = document.getElementById("app");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(() => <Router>{routes}</Router>, root);
