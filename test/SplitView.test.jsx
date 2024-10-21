import styles from "./Test.module.css";
import { ScrollView, SplitView } from "../src";

const SplitViewTest = (props) => {
  return (
    <SplitView orientation={"row"} minStaticLength={100} maxStaticLength={400}>
      <div className={styles.leftView}></div>
      <SplitView dividerThickness={14} orientation={"column"}>
        <div className={styles.rightView} />
        <ScrollView>
          <div className={styles.bottomView}>
            <ul>
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
            </ul>
          </div>
        </ScrollView>
      </SplitView>
    </SplitView>
  );
};

export default SplitViewTest;
