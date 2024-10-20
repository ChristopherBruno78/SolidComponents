import styles from "../Components.module.css";
import { createSignal, createUniqueId } from "solid-js";

/**
 * @param {{
 *     id,
 *     styleName,
 *     label,
 *     disabled,
 *     hidden,
 *     attrs
 * }} props
 * @returns {Node | JSX.ArrayElement | string | number | boolean}
 * @constructor
 */
const Switch = (props) => {
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

  const click = (evt) => {
    if (props.disabled) return;
    setValue(!value());
  };

  return (
    <div
      id={id}
      role={"checkbox"}
      on:pointerdown={pointerDown}
      on:keydown={keyDown}
      on:click={click}
      classList={{
        [styles.Switch]: true,
        [styles.checked]: value(),
        [styles.disabled]: props.disabled,
        [styles.hidden]: props.hidden,
        [props.styleName]: props.styleName,
      }}
      aria-disabled={props.disabled}
      aria-checked={value()}
      aria-labelledby={labelId}
      {...props.attrs}
    >
      <div class={styles.indicator} />
      <label id={labelId} class={styles.label}>
        {props.label}
      </label>
    </div>
  );
};

export default Switch;
