import styles from "./ToolBar.module.css";
import { ToolBarFlexItem } from "./ToolBarFlexItem";

/**
 *
 * @param props
 * @returns {Node | JSX.ArrayElement | string | number | boolean}
 * @constructor
 */
const ToolBar = (props) => {
  return (
    <div className={"ToolBar " + (props.styleName || "")}>{props.children}</div>
  );
};

export { ToolBar, ToolBarFlexItem };
