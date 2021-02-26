//react
import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//CSS
import "./MotorChain.css"
//Third Part Libraries
import { isNilOrEmpty } from "ramda-adjunct";

import * as motorChainActions from "../../store/motorChain/motorChainActions";
import { CalculationTypes } from "../../store/motorChain/motorChainTypes";
import FormBuilder from "../Generic/FormBuilder/FormBuilder";

function MotorChainInfo(props) {
  const {
    motorChain,
    materials,
    calculationType,
    calculateMotorChainProps,
    buttonIsDisabled,
    setButtonState,
  } = props;
  useEffect(() => {
    if (isNilOrEmpty(materials)) {
      props.getAllMaterials();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    checkIfHasData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motorChain, calculationType]);

  const [messageError, setMessageError] = useState("");
  const checkIfHasData = () => {
    if (isNilOrEmpty(calculationType)) {
      setMessageError("Please, select a Calculation Type.");
      SetButtonState(true);
      return;
    }

    if (isNilOrEmpty(motorChain.internalRadius)) {
      setMessageError("Please, fill the External Radius field.");
      SetButtonState(true);
      return;
    }

    if (isNilOrEmpty(motorChain.height)) {
      setMessageError("Please, fill the Height field.");
      SetButtonState(true);
      return;
    }

    if (isNilOrEmpty(motorChain.workPressure)) {
      setMessageError("Please, fill the Work Pressure field.");
      SetButtonState(true);
      return;
    }

    if (isNilOrEmpty(motorChain.materialId)) {
      setMessageError("Please, select a Material.");
      SetButtonState(true);
      return;
    }

    if (
      calculationType !== CalculationTypes.THICKNESS &&
      isNilOrEmpty(motorChain.thickness)
    ) {
      setMessageError("Please, fill the Thickness field.");
      SetButtonState(true);
      return;
    }
    SetButtonState(false);
    setMessageError("");
  };
  const SetButtonState = (newState) => {
    if (newState !== buttonIsDisabled) setButtonState();
  };
  const Form = {
    forms: [
      {
        type: "Select",
        id: "mc-calculation-type-select",
        label: "Calculation Type",
        inputType: "number",
        defaultValue: calculationType,
        onChange: (value) => props.setCalculationType(value),
        hasTooltip: false,
        isVisible: true,
        error: false,
        helperText: "",
        selectOptions: [
          {
            id: CalculationTypes.SAFETY_MARGIN,
            name: "Security Margin",
          },
          {
            id: CalculationTypes.THICKNESS,
            name: "Thickness",
          }
        ],
      },
      {
        type: "TextField",
        id: "mc-internal-radius",
        label: "Internal Radius (mm)",
        inputType: "number",
        defaultValue: motorChain.internalRadius,
        onChange: (value) => props.setRadius(value),
        hasTooltip: false,
        isVisible: true,
        error: false,
        helperText: "",
      },
      {
        type: "TextField",
        id: "mc-height",
        label: "Height (mm)",
        inputType: "number",
        defaultValue: motorChain.height,
        onChange: (value) => props.setHeight(value),
        hasTooltip: false,
        isVisible: true,
        error: false,
        helperText: "",
      },
      {
        type: "TextField",
        id: "mc-thickness",
        label: "Thickness (mm)",
        inputType: "number",
        defaultValue: motorChain.thickness,
        onChange: (value) => props.setThickness(value),
        hasTooltip: false,
        isVisible: calculationType !== CalculationTypes.THICKNESS,
        error: false,
        helperText: "",
      },
      {
        type: "TextField",
        id: "mc-work-pressure",
        label: "Work Pressure (MPa)",
        inputType: "number",
        defaultValue: motorChain.workPressure,
        onChange: (value) => props.setWorkPressure(value),
        hasTooltip: false,
        isVisible: true,
        error: false,
        helperText: "",
      },
      {
        type: "Select",
        id: "mc-material",
        label: "Material",
        inputType: "number",
        defaultValue: motorChain.materialId,
        onChange: (value) => props.setMaterial(value),
        hasTooltip: false,
        isVisible: true,
        selectOptions: materials,
        error: false,
        helperText: "",
      },
      {
        type: "TextField",
        id: "mc-temperature-variation",
        label: "Temperature Variation (K)",
        inputType: "number",
        defaultValue: motorChain.temperatureVariation,
        onChange: (value) => props.setTemperatureVariation(value),
        hasTooltip: true,
        tooltip: {
          message:
            "Insert the expected temperature in the inside part for the chaimber",
          placeholder: "bottom",
        },
        isVisible: motorChain.hasAditionalHeatStress,
        error: false,
        helperText: "",
      },
    ],
    hasSwitch: true,
    hasButtom: true,
    switch: [{
      checked: motorChain.hasAditionalHeatStress,
      onChange: (value) => props.setHasAdditionalStress(value),
      name: "checkedB",
      label: "Consider Thermal Effects",
      tooltipTitle: "Set the temperature considered for the motor chain's internal shell.",
      tooltipPlaceholder: "bottom",
    }],
    bottom: {
      disabled: buttonIsDisabled,
      label: "Calculate",
      onClick: () => calculateMotorChainProps(motorChain, calculationType),
      tooltipMessage: messageError,
      tooltipPlaceholder: "bottom",
    },
  };

  return (
      <div className="Form-Base-Paper">
            <FormBuilder formProps={Form} />
      </div>
  );
}
const mapStateToProps = (state) => ({
  motorChain: state.motorChain.motorChain,
  materials: state.motorChain.allMaterials,
  calculationType: state.motorChain.calculationType,
  calculatedData: state.motorChain.calculatedData,
  buttonIsDisabled: state.motorChain.buttonIsDisabled,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(motorChainActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MotorChainInfo);
