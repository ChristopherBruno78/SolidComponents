import styles from "./Demo.module.css";
import { Button, ToolBar, ToolBarFlexItem } from "../index";

function ToolBarDemo() {
  return (
    <>
      <ToolBar>
        <div className={styles.title}>Title Here</div>
        <Button title={"ToolBar Button"} />
        <ToolBarFlexItem />
        <Button iconOnly={true} icon={"las la-bars"} toggle={true} />
      </ToolBar>
      <div className={styles.main} />
    </>
  );
}

export default ToolBarDemo;
