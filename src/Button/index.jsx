import styles from "../Components.module.css";
import { createMemo, createSignal, createUniqueId } from "solid-js";

/**
 * @param {{
 *     id
 *     type,
 *     label,
 *     icon,
 *     iconOnly,
 *     onClick,
 *     styleName,
 *     tooltip,
 *     toggle,
 *     onToggle,
 *     disabled,
 *     hidden,
 *     attrs
 * }} props
 * @returns {Node | JSX.ArrayElement | string | number | boolean}
 * @constructor
 */
const Button = (props) => {
  const [active, setActive] = createSignal(false);

  const toggleActive = () => {
    setActive(!active());
    if (props.onToggle) {
      props.onToggle.call(this, active());
    }
  };

  const pointerDown = (evt) => {
    if (props.disabled) return;
    if (evt.button === 0) {
      if (!props.toggle) {
        setActive(true);
      } else {
        toggleActive();
      }
    }
  };

  const pointerUp = () => {
    if (!props.toggle) {
      setActive(false);
    }
  };

  const pointerLeave = () => {
    if (!props.toggle) {
      setActive(false);
    }
  };

  const keyDown = (evt) => {
    if (props.disabled) return;
    const key = evt.code;
    if (key === "Enter" || key === "Space") {
      if (!props.toggle) {
        setActive(true);
      } else {
        toggleActive();
      }
    }
  };

  const keyUp = () => {
    if (!props.toggle) {
      setActive(false);
    }
  };
  const id = props.id || createUniqueId();
  return (
    <button
      id={id}
      on:pointerdown={pointerDown}
      on:pointerup={pointerUp}
      on:pointerleave={pointerLeave}
      on:click={(evt) => {
        if (props.disabled) return;
        if (props.onClick) {
          props.onClick(evt);
        }
      }}
      on:keydown={keyDown}
      on:keyup={keyUp}
      classList={{
        [styles.Button]: true,
        [styles.default]: !props.type,
        [styles[props.type]]: props.type,
        [styles.iconOnly]: props.iconOnly,
        [styles.noIcon]: !props.icon,
        [styles.disabled]: props.disabled,
        [styles.active]: active(),
        [styles.hidden]: props.hidden,
        [props.styleName]: props.styleName,
      }}
      aria-disabled={props.disabled}
      title={props.tooltip || ""}
      {...props.attrs}
    >
      <div>
        {props.icon ? <i className={styles.icon + " " + props.icon}></i> : null}
        {!props.iconOnly ? (
          <label className={styles.label}>{props.label}</label>
        ) : null}
      </div>
    </button>
  );
};

export default Button;
