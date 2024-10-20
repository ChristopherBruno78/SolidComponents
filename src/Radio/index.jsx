import styles from "../Components.module.css";
import { createSignal, createUniqueId } from "solid-js";

const Radio = (props) => {
  const labelId = createUniqueId();
  const id = props.id || createUniqueId();

  const [value, setValue] = createSignal(false);

  return (
    <div
      id={id}
      classList={{
        [styles.Radio]: true,
      }}
    >
      <label class={styles.label}>{props.label}</label>
    </div>
  );
};

export default Radio;
