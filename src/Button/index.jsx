import styles from "../Components.module.css";
import { createMemo, createSignal, createUniqueId } from "solid-js";

/**
 * @param {{
 *     id: string
 *     type: string,
 *     label: string,
 *     icon: string,
 *     iconOnly:boolean,
 *     onClick:callback,
 *     styleName:string,
 *     tooltip:string,
 *     toggle: boolean,
 *     onToggle: callback,
 *     disabled: boolean,
 *     hidden: boolean,
 *     attrs: object
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
    if (evt.button === 0) {
      evt.preventDefault();
      if (props.disabled) return;
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
      tabindex={props.disabled ? -1 : 0}
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
