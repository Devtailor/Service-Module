import React, { FC } from "react";
import { Track } from "..";
import "./HeaderStepCounter.scss";
import Step from "./HeaderStep";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../resources/routes-constants";
import { EndpointData } from "../../types/endpoint";

type StepCounterProps = {
  activeStep: number;
  endpoints?: EndpointData[];
  flow?: string;
};

const HeaderStepCounter: FC<StepCounterProps> = ({ activeStep, endpoints, flow }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Track className="header-step-counter" gap={24}>
      <Step step={1} activeStep={activeStep} name={t("newService.trainingModuleSetup")} />
      <Step
        step={2}
        activeStep={activeStep}
        name={t("newService.serviceSetup")}
        onClick={() => navigate(ROUTES.NEWSERVICE_ROUTE, { state: { endpoints: endpoints, flow: flow } })}
      />
      <Step
        step={3}
        activeStep={activeStep}
        name={t("newService.serviceFlowCreation")}
        onClick={() => navigate(ROUTES.FLOW_ROUTE, { state: { endpoints: endpoints, flow: flow } })}
      />
    </Track>
  );
};

export default HeaderStepCounter;
