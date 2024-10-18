import styles from "./Button.module.css";
import { createSignal } from "solid-js";

/**
 *
 * @param props
 * @returns {Node | JSX.ArrayElement | string | number | boolean}
 * @constructor
 */
const Button = (props) => {
  const {
    title,
    type,
    icon,
    iconOnly,
    onClick,
    styleName,
    tooltip,
    toggle,
    onToggle,
  } = props;

  const [active, setActive] = createSignal(false);

  const pointerDown = (evt) => {
    if (!toggle) {
      setActive(true);
    } else {
      setActive(!active());
      if (onToggle) {
        onToggle.call(this, active());
      }
    }
  };

  const pointerUp = (evt) => {
    if (!toggle) {
      setActive(false);
    }
  };

  const pointerLeave = (evt) => {
    if (!toggle) {
      setActive(false);
    }
  };

  return (
    <button
      on:pointerdown={pointerDown}
      on:pointerup={pointerUp}
      on:pointerleave={pointerLeave}
      on:click={onClick}
      classList={{
        [styles.Button]: true,
        [styles.default]: !type,
        [styles[type]]: type,
        [styles.iconOnly]: iconOnly,
        [styles.noIcon]: !icon,
        [styles.active]: active(),
        [styleName]: styleName,
      }}
      title={tooltip || ""}
    >
      <div>
        {icon ? <i className={styles.icon + " " + icon}></i> : null}
        {!iconOnly ? <label className={styles.label}>{title}</label> : null}
      </div>
    </button>
  );
};

export { Button };
