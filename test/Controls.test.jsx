import styles from "./Test.module.css";
import { Button, CheckBox, Radio, RadioGroup, Switch } from "../src";
import { createSignal } from "solid-js";

const ControlsTest = () => {
  const [disabled, setDisabled] = createSignal(false);

  return (
    <div className={styles.container}>
      <Button
        label={"Default"}
        icon={"las la-plus"}
        onClick={() => {
          alert("Default");
        }}
        disabled={disabled()}
      />
      <Button label={"Primary"} type={"primary"} disabled={disabled()} />
      <Button label={"Link"} type={"link"} disabled={disabled()} />
      <Button
        disabled={disabled()}
        iconOnly={true}
        toggle={true}
        onToggle={(state) => {
          console.log(state);
        }}
        tooltip={"Icon Only"}
        icon={"las la-search"}
        styleName={styles.iconOnly}
      />
      <CheckBox label={"Check Me"} disabled={disabled()} />
      <Switch label={"Switch Me"} disabled={disabled()} />
      <RadioGroup
        disabled={disabled()}
        valueChanged={(value) => {
          alert(value);
        }}
        value={"r2"}
      >
        <Radio label={"Radio 1"} value={"r1"} />
        <Radio label={"Radio 2"} value={"r2"} />
        <Radio label={"Radio 3"} value={"r3"} disabled={false} />
      </RadioGroup>
      <Button
        label={disabled() ? "Enable" : "Disable"}
        onClick={() => {
          setDisabled(!disabled());
        }}
      />
    </div>
  );
};

export default ControlsTest;
