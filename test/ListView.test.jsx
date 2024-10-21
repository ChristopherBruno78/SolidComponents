import styles from "./Test.module.css";
import { ListView } from "../src";

const content = [];
for (let i = 0; i < 600; i++) {
  content.push("Item " + i);
}

const ListViewTest = () => {
  const renderItem = (data) => {
    return (
      <div className={styles.listItem}>
        <label>{data}</label>
      </div>
    );
  };
  return (
    <div className={styles.listContainer}>
      <ListView content={content} renderItem={renderItem} />
    </div>
  );
};

export default ListViewTest;
