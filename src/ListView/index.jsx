import styles from "../Components.module.css";
import { createSignal, createUniqueId } from "solid-js";
import { ScrollView } from "../index";

/**
 *
 * @param {{
 *     id,
 *     content : Array
 * }} props
 * @constructor
 */
const ListView = (props) => {
  const id = props.id || createUniqueId();
  const [renderRange, setRenderRange] = createSignal({
    pos: 0,
    len: Number.MAX_VALUE,
  });
  const [contentPane, setContentPane] = createSignal(null);

  return (
    <div
      id={id}
      role={"listbox"}
      classList={{
        [styles.List]: true,
      }}
    >
      <ScrollView>
        <div ref={setContentPane} />
      </ScrollView>
    </div>
  );
};

export default ListView;
