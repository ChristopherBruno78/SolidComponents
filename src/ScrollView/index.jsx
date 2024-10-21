import styles from "../Components.module.css";
import { children, createEffect, createSignal, onMount } from "solid-js";
import SimpleBar from "simplebar";

const ScrollView = (props) => {
  const resolvedChildren = children(() => props.children)();
  if (!resolvedChildren || Array.isArray(resolvedChildren)) {
    throw new Error("A ScrollView must have exactly one child view");
  }

  return (
    <div
      ref={(e) => {
        setTimeout(() => {
          new SimpleBar(e, { autoHide: false });
        }, 0);
      }}
      class={styles.Scroller}
    >
      {resolvedChildren}
    </div>
  );
};

export default ScrollView;
