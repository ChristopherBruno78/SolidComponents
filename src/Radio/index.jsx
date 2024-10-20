import styles from "../Components.module.css";
import { createSignal, createUniqueId, children, mergeProps } from "solid-js";

/**
 *
 * @param {{
 *     label,
 *     disabled,
 *     styleName
 * }} props
 * @returns {*}
 * @constructor
 */
const Radio = (props) => {
  return props;
};

/**
 *
 * @param {{
 *     setGroupValue,
 *     groupValue,
 *     disabled,
 *     value,
 *     label
 * }} props
 * @returns {Node | JSX.ArrayElement | string | number | boolean}
 * @constructor
 */
const RadioButton = (props) => {
  const labelId = createUniqueId();

  const click = (evt) => {
    if (props.disabled) return;
    const oldValue = props.groupValue();
    if (props.value !== oldValue) {
      props.setGroupValue(props.value);
      if (props.valueChanged) {
        props.valueChanged(props.value);
      }
    }
  };

  return (
    <li
      role={"radio"}
      classList={{
        [styles.Radio]: true,
        [styles.disabled]: props.disabled,
        [props.styleName]: props.styleName,
      }}
      on:click={click}
      aria-disabled={props.disabled}
      aria-checked={props.groupValue() === props.value}
      aria-labelledby={labelId}
    >
      <div
        classList={{
          [styles.indicator]: true,
          [styles.checked]: props.groupValue() === props.value,
        }}
      />
      <label id={labelId} class={styles.label}>
        {props.label}
      </label>
    </li>
  );
};

/**
 *
 * @param {{
 *     id,
 *     disabled,
 *     valueChanged,
 *     value,
 *     styleName
 * }} props
 * @returns {Node | JSX.ArrayElement | string | number | boolean}
 * @constructor
 */
const RadioGroup = (props) => {
  const id = props.id || createUniqueId();
  const [value, setValue] = createSignal(props.value);
  const values = createSignal([]);
  const resolvedChildren = children(() => props.children);

  const keyDown = (evt) => {
    if (props.disabled) return;
    const key = evt.key;
    let i = values.indexOf(value());
    if (key === "ArrowUp" || key === "ArrowLeft") {
      i -= 1;
    } else if (key === "ArrowDown" || key === "ArrowRight") {
      i += 1;
    }
    if (i > -1 && i < values.length) {
      setValue(values[i]);
    }
  };

  return (
    <ul
      id={id}
      role={"radiogroup"}
      classList={{
        [styles.RadioGroup]: true,
        [props.styleName]: props.styleName,
      }}
      tabindex={props.disabled ? -1 : 0}
      on:keydown={keyDown}
    >
      {resolvedChildren().map((child, index) => {
        child.value = child.value || index;
        values.push(child.value);
        const disabled = props.disabled ? true : child.disabled;
        return (
          <RadioButton
            {...mergeProps(child, {
              key: index,
              setGroupValue: setValue,
              groupValue: value,
              valueChanged: props.valueChanged,
              disabled: disabled,
            })}
          />
        );
      })}
    </ul>
  );
};

export { Radio, RadioGroup };
