import React from "react";
import { Steps } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { currentStepSelector } from "../../redux/slices/ticketSlice";
const { Step } = Steps;
function StepBox(props) {
  const { steps } = props;
  const { t } = useTranslation();
  const currentStep = useSelector(currentStepSelector);
  return (
    <>
      <Steps
        type="navigation"
        current={currentStep}
        className="site-navigation-steps"
      >
        <Step status={steps.step1.status} title={t(steps.step1)} />
        <Step status={steps.step2.status} title={t(steps.step2)} />
        <Step status={steps.step3.status} title={t(steps.step3)} />
      </Steps>
    </>
  );
}

export default StepBox;
