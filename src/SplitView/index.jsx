import styles from "../Components.module.css";
import { children, createEffect, createSignal, mergeProps } from "solid-js";

/**
 * @typedef {"column" | "row"} SplitViewOrientation
 * @typedef {"topLeft" | "bottomRight"} SplitViewFlex
 */

/**
 *
 * @param {{
 *     orientation: SplitViewOrientation
 *     flex: SplitViewFlex
 *     dividerThickness: number,
 *     staticLength: number
 *     minStaticLength: number
 *     maxStaticLength:number
 *     styleName: string
 *     dividerStyleName:string
 * }}props
 * @constructor
 */
const SplitView = (props) => {
  props = mergeProps(
    {
      orientation: "row",
      flex: "topLeft",
      dividerThickness: 13,
      staticLength: 200,
      minStaticLength: 0,
      maxStaticLength: Number.MAX_VALUE,
    },
    props,
  );
  const resolvedChildren = children(() => props.children)();

  if (!resolvedChildren || resolvedChildren.length !== 2) {
    throw new Error("A SplitView must have exactly two child views");
  }

  const [staticLen, setStaticLen] = createSignal(props.staticLength);

  createEffect(() => {
    const len = Math.max(
      props.minStaticLength,
      Math.min(staticLen(), props.maxStaticLength),
    );
    const leftNode = resolvedChildren[0];
    const bottomNode = resolvedChildren[1];

    if (props.flex === "topLeft") {
      leftNode.style.flex = "1";
      bottomNode.style.flex = "unset";
      switch (props.orientation) {
        case "row":
          {
            bottomNode.style.width = len + "px";
            bottomNode.style.height = "100%";
            leftNode.style.height = "100%";
          }
          break;
        case "column": {
          bottomNode.style.height = len + "px";
          bottomNode.style.width = "100%";
          leftNode.style.width = "100%";
        }
      }
    } else {
      leftNode.style.flex = "unset";
      bottomNode.style.flex = "1";
      switch (props.orientation) {
        case "row":
          {
            leftNode.style.width = len + "px";
            leftNode.style.height = "100%";
            bottomNode.style.height = "100%";
          }
          break;
        case "column": {
          leftNode.style.height = len + "px";
          leftNode.style.width = "100%";
          bottomNode.style.width = "100%";
        }
      }
    }
  });

  return (
    <div
      classList={{
        [styles.SplitView]: true,
        [styles.row]: props.orientation === "row",
        [styles.column]: props.orientation === "column",
        [props.styleName]: props.styleName,
      }}
    >
      {resolvedChildren[0]}
      <SplitDivider
        orientation={props.orientation}
        flex={props.flex}
        thickness={props.dividerThickness}
        setStaticLen={setStaticLen}
        staticLen={staticLen}
        styleName={props.dividerStyleName}
      />
      {resolvedChildren[1]}
    </div>
  );
};

/**
 *
 * @param {{
 *     orientation: SplitViewOrientation
 *     flex: SplitViewFlex,
 *     thickness,
 *     staticLen,
 *     setStaticLen,
 *     styleName
 * }} props
 * @returns {Node | JSX.ArrayElement | string | number | boolean}
 * @constructor
 */
const SplitDivider = (props) => {
  const width = props.orientation === "row" ? props.thickness + "px" : "100%";
  const height =
    props.orientation === "column" ? props.thickness + "px" : "100%";
  const sashSize = props.thickness * 0.55;
  const offset = (props.thickness - sashSize - 2) / 2;

  const [ptMove, setPtMove] = createSignal(false);
  const [startLen, setStartLen] = createSignal(0);
  const [start, setStart] = createSignal({});

  const pointerDown = (evt) => {
    if (evt.button === 0) {
      evt.preventDefault();
      setStartLen(props.staticLen());
      setStart({ x: evt.clientX, y: evt.clientY });
      setPtMove(true);
      evt.target.setPointerCapture(evt.pointerId);
    }
  };

  const pointerMove = (evt) => {
    if (ptMove()) {
      const sign = props.flex === "topLeft" ? -1 : 1;
      const st = start();
      const delta =
        props.orientation === "row" ? evt.clientX - st.x : evt.clientY - st.y;
      props.setStaticLen(startLen() + sign * delta);
    }
  };

  const pointerUp = (evt) => {
    evt.target.releasePointerCapture(evt.pointerId);
    setPtMove(false);
  };

  return (
    <div
      on:pointerdown={pointerDown}
      on:pointermove={pointerMove}
      on:pointerup={pointerUp}
      classList={{
        [styles.Divider]: true,
        [styles.thin]: props.thickness < 2,
        [props.styleName]: props.styleName,
      }}
      style={{
        width: width,
        height: height,
        cursor: props.orientation === "row" ? "ew-resize" : "ns-resize",
      }}
    >
      <div
        class={styles.Sash}
        style={{
          top: props.orientation === "column" ? offset + "px" : "50%",
          left: props.orientation === "row" ? offset + "px" : "50%",
          width: sashSize + "px",
          height: sashSize + "px",
        }}
      />
    </div>
  );
};

export default SplitView;
