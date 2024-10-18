import styles from "./Demo.module.css";
import { Button } from "../index";

const ButtonDemo = () => {
  return (
    <div className={styles.container}>
      <Button
        title={"Default"}
        icon={"las la-plus"}
        onClick={() => {
          alert("Default");
        }}
      />
      <Button title={"Primary"} type={"primary"} />
      <Button title={"Link"} type={"link"} />
      <Button
        iconOnly={true}
        toggle={true}
        onToggle={(state) => {
          console.log(state);
        }}
        tooltip={"Icon Only"}
        icon={"las la-search"}
        styleName={styles.iconOnly}
      />
    </div>
  );
};

export default ButtonDemo;
