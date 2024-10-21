import styles from "../Components.module.css";
import { createUniqueId } from "solid-js";

/**
 * @param {{
 *     id: string
 *     styleName: string
 *     hidden: boolean
 *     attrs: object
 * }} props
 * @returns {Node | JSX.ArrayElement | string | number | boolean}
 * @constructor
 */
const ToolBar = (props) => {
  const id = props.id || createUniqueId();
  return (
    <div
      role="toolbar"
      id={id}
      classList={{
        [styles.ToolBar]: true,
        [styles.hidden]: props.hidden,
        [props.styleName]: props.styleName,
      }}
      {...props.attrs}
    >
      {props.children}
    </div>
  );
};

/**
 * @returns {Node | JSX.ArrayElement | string | number | boolean}
 * @constructor
 */
const ToolBarFlexItem = () => {
  return <div style={{ flex: 1 }} />;
};

export { ToolBar, ToolBarFlexItem };
