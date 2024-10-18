import styles from "../Components.module.css";
import { ToolBarFlexItem } from "./ToolBarFlexItem";

/**
 *
 * @param props
 * @returns {Node | JSX.ArrayElement | string | number | boolean}
 * @constructor
 */
const ToolBar = (props) => {
  return (
    <div className={styles.ToolBar + " " + (props.styleName || "")}>
      {props.children}
    </div>
  );
};

export { ToolBar, ToolBarFlexItem };
