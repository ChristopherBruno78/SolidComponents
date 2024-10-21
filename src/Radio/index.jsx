import styles from "../Components.module.css";
import { createSignal, createUniqueId, children, mergeProps } from "solid-js";

/**
 *
 * @param {{
 *     label: string
 *     disabled: boolean
 *     value: string
 *     hidden: boolean
 *     styleName: string
 *     attrs: object
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
 *     hidden
 *     value,
 *     label,
 *     attrs,
 *     styleName
 * }} props
 * @returns {Node | JSX.ArrayElement | string | number | boolean}
 * @constructor
 */
const RadioButton = (props) => {
  const labelId = createUniqueId();

  const click = (evt) => {
    if (props.disabled) return;
    evt.preventDefault();
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
        [styles.hidden]: props.hidden,
        [props.styleName]: props.styleName,
      }}
      on:click={click}
      aria-disabled={props.disabled}
      aria-checked={props.groupValue() === props.value}
      aria-labelledby={labelId}
      {...props.attrs}
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
 *     id: string
 *     disabled: boolean
 *     hidden: boolean
 *     valueChanged: callback
 *     value : string
 *     styleName: string
 *     attrs: object
 * }} props
 * @returns {Node | JSX.ArrayElement | string | number | boolean}
 * @constructor
 */
const RadioGroup = (props) => {
  const id = props.id || createUniqueId();
  const [groupValue, setGroupValue] = createSignal(props.value);
  const values = [];
  const resolvedChildren = children(() => props.children);

  const keyDown = (evt) => {
    if (props.disabled) return;
    const key = evt.key;
    let idx = values.indexOf(groupValue());
    let newIdx = idx;
    if (key === "ArrowUp" || key === "ArrowLeft") {
      newIdx -= 1;
    } else if (key === "ArrowDown" || key === "ArrowRight") {
      newIdx += 1;
    }
    if (idx !== newIdx && newIdx > -1 && newIdx < values.length) {
      setGroupValue(values[newIdx]);
      if (typeof props.valueChanged === "function") {
        props.valueChanged(groupValue());
      }
    }
  };

  return (
    <ul
      id={id}
      role={"radiogroup"}
      classList={{
        [styles.RadioGroup]: true,
        [styles.hidden]: props.hidden,
        [props.styleName]: props.styleName,
      }}
      tabindex={props.disabled ? -1 : 0}
      on:keydown={keyDown}
      {...props.attrs}
    >
      {resolvedChildren().map((child, index) => {
        child.value = child.value || index;
        values.push(child.value);
        const disabled = props.disabled ? true : child.disabled;
        return (
          <RadioButton
            {...mergeProps(child, {
              key: index,
              setGroupValue: setGroupValue,
              groupValue: groupValue,
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
