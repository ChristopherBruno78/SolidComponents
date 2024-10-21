import styles from "../Components.module.css";
import { createSignal, createUniqueId } from "solid-js";

/**
 *
 * @param {{
 *     id: string
 *     label: string,
 *     disabled: boolean,
 *     hidden: boolean,
 *     styleName: string,
 *     attrs: object
 * }} props
 * @returns {Node | JSX.ArrayElement | string | number | boolean}
 * @constructor
 */
const CheckBox = (props) => {
  const labelId = createUniqueId();
  const id = props.id || createUniqueId();
  const [value, setValue] = createSignal(false);

  const pointerDown = (evt) => {
    evt.preventDefault();
  };

  const keyDown = (evt) => {
    if (props.disabled) return;
    const key = evt.code;
    if (key === "Enter" || key === "Space") {
      evt.preventDefault();
      setValue(!value());
    }
  };

  const click = () => {
    if (props.disabled) return;
    setValue(!value());
  };

  return (
    <div
      on:pointerdown={pointerDown}
      on:keydown={keyDown}
      on:click={click}
      id={id}
      role={"checkbox"}
      classList={{
        [styles.CheckBox]: true,
        [styles.disabled]: props.disabled,
        [styles.hidden]: props.hidden,
        [props.styleName]: props.styleName,
      }}
      tabindex={props.disabled ? -1 : 0}
      aria-disabled={props.disabled}
      aria-checked={value()}
      aria-labelledby={labelId}
      {...props.attrs}
    >
      <label id={labelId} class={styles.label}>
        {props.label}
      </label>
      <div
        classList={{
          [styles.indicator]: true,
          [styles.checked]: value(),
        }}
      >
        <div
          aria-hidden={!value()}
          classList={{
            [styles.check]: true,
            [styles.checked]: value(),
          }}
        />
      </div>
    </div>
  );
};

export default CheckBox;
