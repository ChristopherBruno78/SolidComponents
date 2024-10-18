import styles from "../Components.module.css";
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

  const toggleActive = () => {
    setActive(!active());
    if (onToggle) {
      onToggle.call(this, active());
    }
  };

  const pointerDown = (evt) => {
    if (evt.button === 0) {
      if (!toggle) {
        setActive(true);
      } else {
        toggleActive();
      }
    }
  };

  const pointerUp = () => {
    if (!toggle) {
      setActive(false);
    }
  };

  const pointerLeave = () => {
    if (!toggle) {
      setActive(false);
    }
  };

  const keyDown = (evt) => {
    const key = evt.code;
    if (key === "Enter" || key === "Space") {
      if (!toggle) {
        setActive(true);
      } else {
        toggleActive();
      }
    }
  };

  const keyUp = () => {
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
      on:keydown={keyDown}
      on:keyup={keyUp}
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

export default Button;
