/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";

import "./index.css";
import ToolBarTest from "./ToolBar.test";
import ControlsTest from "./Controls.test";
import SplitViewTest from "./SplitView.test";
import ListViewTest from "./ListView.test";

const routes = [
  {
    path: "toolbar",
    component: /*@once*/ <ToolBarTest />,
  },
  {
    path: "controls",
    component: /*@once*/ <ControlsTest />,
  },
  {
    path: "splitview",
    component: /*@once*/ <SplitViewTest />,
  },
  {
    path: "list",
    component: /*@once*/ <ListViewTest />,
  },
];

const root = document.getElementById("app");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(() => <Router>{routes}</Router>, root);
