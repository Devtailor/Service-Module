import React, { FC } from "react";
import { Track } from "../..";
import pointer from "../../../assets/images/pointer.svg";
import './Step.scss';

type StepProps = {
  step: number;
  name: string;
  activeStep: number;
};

const Step: FC<StepProps> = ({ step, name, activeStep }) => {
  return (
    <Track>
      <Track gap={8} className={activeStep === step ? "active-step" : ""} style={{ padding: 8, height: 38 }}>
        <p className="step" >{step}</p>
        <p className={activeStep === step ? "active-step__name" : ""} style={{ whiteSpace: "nowrap" }}>{name}</p>
      </Track>
      {activeStep === step && <img src={pointer} style={{ height: 38 }} />}
    </Track>
  );
};

export default Step;
