import styles from "../Components.module.css";
import { createSignal, createUniqueId, onMount } from "solid-js";
import { ScrollView } from "../index";

const ListItem = (props) => {
  return <div>{props.children}</div>;
};

/**
 *
 * @param {{
 *     id,
 *     content : Array
 *     renderItem : function
 *     styleName: string,
 *     attrs: object
 * }} props
 * @constructor
 */
const ListView = (props) => {
  const id = props.id || createUniqueId();
  const [renderRange, setRenderRange] = createSignal({
    start: 0,
    end: Number.MAX_VALUE,
  });
  const [itemsToInsert, setItemsToInsert] = createSignal([]);

  onMount(() => {
    const range = renderRange();
    let start = Math.max(0, range.start),
      end = Math.min(props.content.length, range.end);

    const toInsert = [];

    if (end > start) {
      for (let i = start; i < end; i++) {
        const item = props.content[i];
        toInsert.push(
          <ListItem list={this} key={i}>
            {props.renderItem(item)}
          </ListItem>,
        );
      }
    }
    setItemsToInsert(toInsert);
  });

  return (
    <div
      id={id}
      role={"listbox"}
      classList={{
        [styles.List]: true,
        [props.styleName]: props.styleName,
      }}
      {...props.attrs}
    >
      <ScrollView>
        <div>{itemsToInsert()}</div>
      </ScrollView>
    </div>
  );
};

export default ListView;
