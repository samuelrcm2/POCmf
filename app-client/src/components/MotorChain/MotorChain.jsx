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

    if (calculationType !== CalculationTypes.MAIN_STRESSES) {
      if (
        isNilOrEmpty(motorChain.longitudinalStress) ||
        isNilOrEmpty(motorChain.circumferentialStress)
      ) {
        setMessageError("Please, fill the Stresses field.");
        SetButtonState(true);
        return;
      }
      if (
        checkIfMotorNeedRadiusStressField() &&
        isNilOrEmpty(motorChain.radialStress)
      ) {
        setMessageError("Please, fill the Radial Stress field.");
        SetButtonState(true);
        return;
      }
    }
    SetButtonState(false);
    setMessageError("");
  };
  const SetButtonState = (newState) => {
    if (newState !== buttonIsDisabled) setButtonState();
  };
  const checkIfMotorNeedRadiusStressField = () => {
    if (calculationType === CalculationTypes.THICKNESS) return true;
    if (
      isNilOrEmpty(motorChain.thickness) ||
      isNilOrEmpty(motorChain.internalRadius)
    )
      return false;
    if (motorChain.thickness === 0 || motorChain.internalRadius === 0)
      return false;

    return motorChain.thickness / motorChain.internalRadius > 0.1;
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
        selectOptions: [
          {
            id: CalculationTypes.SAFETY_MARGIN,
            name: "Security Margin",
          },
          {
            id: CalculationTypes.THICKNESS,
            name: "Thickness",
          },
          {
            id: CalculationTypes.MAIN_STRESSES,
            name: "Main Stresses",
          },
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
      },
      {
        type: "TextField",
        id: "mc-longitudinal-stress",
        label: "Longitudinal Stress (MPa)",
        inputType: "number",
        defaultValue: motorChain.longitudinalStress,
        onChange: (value) => props.setLongitudinalStress(value),
        hasTooltip: false,
        isVisible: calculationType !== CalculationTypes.MAIN_STRESSES,
      },
      {
        type: "TextField",
        id: "mc-circunferential-stress",
        label: "Circunferential Stress (MPa)",
        inputType: "number",
        defaultValue: motorChain.circumferentialStress,
        onChange: (value) => props.setCircunferentialStress(value),
        hasTooltip: false,
        isVisible: calculationType !== CalculationTypes.MAIN_STRESSES,
      },
      {
        type: "TextField",
        id: "mc-radial-stress",
        label: "Radial Stress (MPa)",
        inputType: "number",
        defaultValue: motorChain.radialStress,
        onChange: (value) => props.setRadialStress(value),
        hasTooltip: true,
        tooltip: {
          message:
            "Only has to add a Radial Stress when the ratio Thickness/External Raidus is greater than 0.1",
          placeholder: "bottom",
        },
        isVisible:
          calculationType !== CalculationTypes.MAIN_STRESSES &&
          checkIfMotorNeedRadiusStressField(),
      },
    ],
    hasSwitch: false,
    hasButtom: true,
    bottom: {
      disabled: buttonIsDisabled,
      label: "Calculate",
      onClick: () => calculateMotorChainProps(motorChain, calculationType),
      tooltipMessage: messageError,
      tooltipPlaceholder: "bottom",
    },
  };
  console.log(Form);
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
