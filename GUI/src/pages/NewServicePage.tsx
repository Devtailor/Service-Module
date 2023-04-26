import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, FormInput, ApiEndpointCard, FormTextarea, Layout, NewServiceHeader, Track } from "../components";
import { v4 as uuid } from "uuid";
import { ROUTES } from "../resources/routes-constants";
import { EndpointData } from "../types/endpoint-data";
import { Node } from "reactflow";

const NewServicePage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [endpoints, setEndpoints] = useState<EndpointData[]>(location.state?.endpoints ?? []);
  const onDelete = (id: string) => {
    setEndpoints((prevEndpoints) => prevEndpoints.filter((prevEndpoint) => prevEndpoint.id !== id));
  };
  const [clientInputs, setClientInputs] = useState<string[]>([]);

  useEffect(() => {
    const nodes: Node[] = location.state?.flow ? JSON.parse(location.state?.flow)?.nodes : undefined;
    setClientInputs(
      nodes.filter((node) => node.data.stepType === "input").map((node) => `{{ClientInput.${node.data.clientInputId}}}`)
    );
  }, []);

  const saveDraft = () => {
    console.log(
      endpoints.map((endpoint) => {
        return {
          ...endpoint,
          selectedEndpoint: endpoint.definedEndpoints.find((definedEndpoint) => definedEndpoint.isSelected),
        };
      })
    );
  };

  const getSelectedEndpoints = () => {
    return endpoints.map((endpoint) => {
      return {
        ...endpoint,
        selectedEndpoint: endpoint.definedEndpoints.find((definedEndpoint) => definedEndpoint.isSelected),
      };
    });
  };

  const getAvailableRequestValues = (endpointId: string): string[] => {
    const requestValues: string[] = clientInputs;
    const otherEndpoints = getSelectedEndpoints().filter((otherEndpoint) => otherEndpoint.id !== endpointId);
    otherEndpoints.forEach((endpoint) => {
      endpoint.selectedEndpoint?.response?.forEach((response) => {
        requestValues.push(`{{${endpoint.name === "" ? endpoint.id : endpoint.name}.${response.name}}}`);
      });
    });
    return requestValues;
  };

  return (
    <Layout
      disableMenu
      customHeader={
        <NewServiceHeader
          activeStep={2}
          saveDraftOnClick={saveDraft}
          continueOnClick={() =>
            navigate(ROUTES.FLOW_ROUTE, { state: { endpoints: endpoints, flow: location.state?.flow } })
          }
        />
      }
    >
      <Track style={{ width: 800, alignSelf: "center" }} direction="vertical" gap={16} align="stretch">
        <h1>{t("newService.serviceSetup")}</h1>
        <Card>
          <Track direction="vertical" align="stretch" gap={16}>
            <div>
              <label htmlFor="name">{t("newService.name")}</label>
              <FormInput name="name" label="" />
            </div>
            <div>
              <label htmlFor="description">{t("newService.description")}</label>
              <FormTextarea
                name="description"
                label=""
                style={{
                  height: 120,
                  resize: "vertical",
                }}
              />
            </div>
          </Track>
        </Card>

        {endpoints.map((endpoint) => (
          <ApiEndpointCard
            key={endpoint.id}
            onDelete={() => onDelete(endpoint.id)}
            endpoint={endpoint}
            setEndpoints={setEndpoints}
            requestValues={getAvailableRequestValues(endpoint.id)}
          />
        ))}
        <Button
          appearance="text"
          onClick={() =>
            setEndpoints((endpoints) => {
              return [...endpoints, { id: uuid(), name: "", definedEndpoints: [] }];
            })
          }
        >
          {t("newService.endpoint.add")}
        </Button>
      </Track>
    </Layout>
  );
};

export default NewServicePage;
