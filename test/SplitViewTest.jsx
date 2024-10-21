import styles from "./Test.module.css";
import { SplitView } from "../src";

const SplitViewTest = (props) => {
  return (
    <SplitView orientation={"row"} minStaticLength={100} maxStaticLength={400}>
      <div className={styles.leftView}></div>
      <SplitView dividerThickness={14} orientation={"column"}>
        <div className={styles.rightView} />
        <div className={styles.bottomView} />
      </SplitView>
    </SplitView>
  );
};

export default SplitViewTest;
