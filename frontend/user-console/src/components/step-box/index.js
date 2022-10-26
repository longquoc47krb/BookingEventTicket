import React, { useState } from "react";
import { Steps } from "antd";
import { useTranslation } from "react-i18next";
const { Step } = Steps;
function StepBox(props) {
  const { steps } = props;
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    setCurrent(value);
  };
  return (
    <>
      <Steps
        type="navigation"
        current={current}
        onChange={onChange}
        className="site-navigation-steps"
      >
        <Step status={steps.step1.status} title={t(steps.step1)} />
        <Step status={steps.step2.status} title={t(steps.step2)} />
        <Step status={steps.step3.status} title={t(steps.step3)} />
        <Step status={steps.step4.status} title={t(steps.step4)} />
      </Steps>
    </>
  );
}

export default StepBox;
