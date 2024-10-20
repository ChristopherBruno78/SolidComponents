import styles from "../Components.module.css";
import { createUniqueId } from "solid-js";

/**
 * @param {{
 *     id
 *     styleName,
 *     hidden
 *     children,
 *     attrs
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
