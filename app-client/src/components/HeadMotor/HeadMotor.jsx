import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//CSS
import Paper from "@material-ui/core/Paper";

import { isNilOrEmpty } from "ramda-adjunct";

import * as headMotorActions from "../../store/HeadMotor/HeadMotorActions";
import { ScrewPattern } from "../../store/HeadMotor/HeadMotorTypes";
import useStyles from "./HeadMotorStyle";
import FormBuilder from "../Generic/FormBuilder/FormBuilder";
const HeadMotor = (props) => {
  const {
    getAllScrewPatterns,
    screwPatterns,
    headMotor,
    calculateScrewMaxStress,
    motorThickness,
    motorInternalRadius,
    motorWorkPressure,
    motorMaterialId,
    setPossibleScrewPatterns,
    screwPatternsByDiameter,
  } = props;

  const classes = useStyles();
  const [messageError, setMessageError] = useState("");
  const [buttonIsDisabled, setButtonState] = useState(true);
  const [isCreatedPattern, setSwitchState] = useState(false);

  useEffect(() => {
    if (isNilOrEmpty(screwPatterns)) {
      getAllScrewPatterns();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    checkIfHasData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headMotor, isCreatedPattern]);
  useEffect(() => {
    DefinePossibleScrewPatterns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motorThickness, motorInternalRadius, screwPatterns]);

  const checkIfHasData = () => {
    if (isNilOrEmpty(headMotor.screwHeight)) {
      setMessageError("Please, select a Screw Height.");
      setButtonState(true);
      return;
    }

    if (isNilOrEmpty(headMotor.internalHeadHeight)) {
      setMessageError("Please, select a Internal Height.");
      setButtonState(true);
      return;
    }

    if (isNilOrEmpty(headMotor.externalHeadHeight)) {
      setMessageError("Please, select a External Height.");
      setButtonState(true);
      return;
    }

    if (isNilOrEmpty(headMotor.afterScrewHeight)) {
      setMessageError("Please, insert a After Screw Height.");
      setButtonState(true);
      return;
    }

    if (isNilOrEmpty(headMotor.internalRadius)) {
      setMessageError("Please, insert a Internal Radius.");
      setButtonState(true);
      return;
    }

    if (isNilOrEmpty(headMotor.internalMinorRadius)) {
      setMessageError("Please, insert a Minor Internal Radius.");
      setButtonState(true);
      return;
    }

    if (isCreatedPattern) {
      if (isNilOrEmpty(headMotor.screwPattern.pitch)) {
        setMessageError("Please, insert a Pitch.");
        setButtonState(true);
        return;
      }

      if (isNilOrEmpty(headMotor.screwPattern.minMinorDiameter)) {
        setMessageError("Please, insert a Minimum Minor Diameter.");
        setButtonState(true);
        return;
      }

      if (isNilOrEmpty(headMotor.screwPattern.maxMinorDiameter)) {
        setMessageError("Please, insert a Maximum Minor Diameter.");
        setButtonState(true);
        return;
      }

      if (isNilOrEmpty(headMotor.screwPattern.minMajorDiameter)) {
        setMessageError("Please, insert a Minimum Major Diameter.");
        setButtonState(true);
        return;
      }

      if (isNilOrEmpty(headMotor.screwPattern.maxMajorDiameter)) {
        setMessageError("Please, insert a Maximum Major Diameter.");
        setButtonState(true);
        return;
      }
    } else {
      if (isNilOrEmpty(headMotor.screwPattern.id)) {
        setMessageError("Please, select a Screw Pattern.");
        setButtonState(true);
        return;
      }
    }
    setButtonState(false);
    setMessageError("");
    return;
  };

  const DefinePossibleScrewPatterns = () => {
    if (!motorThickness || !motorInternalRadius) return;
    let externalRadius = motorThickness + motorInternalRadius;
    let possibleScrewPatterns = screwPatterns.filter(
      (s) =>
        s.maxMinorDiameter <= motorInternalRadius * 2 &&
        s.minMajorDiameter >= motorInternalRadius * 2 &&
        s.maxMajorDiameter <= externalRadius * 2
    );
    possibleScrewPatterns =
      possibleScrewPatterns.length === 0
        ? [new ScrewPattern()]
        : possibleScrewPatterns;
    setPossibleScrewPatterns(possibleScrewPatterns);
  };

  const HandleHeadMotorCalculation = () => {
    headMotor.workPressure = motorWorkPressure;
    headMotor.internalRadius = motorInternalRadius;
    headMotor.thickness = motorThickness;
    headMotor.materialId = motorMaterialId;
    calculateScrewMaxStress(headMotor);
  };

  const Form = {
    forms: [
      {
        type: "TextField",
        id: "hm-created-pitch",
        label: "Pitch (mm)",
        inputType: "number",
        defaultValue: headMotor.screwPattern.pitch,
        onChange: (value) => props.setCreatedScrewPitch(value),
        hasTooltip: false,
        isVisible: isCreatedPattern,
      },
      {
        type: "TextField",
        id: "hm-created-min-minor-diameter",
        label: "Minimum Minor Diameter (mm)",
        inputType: "number",
        defaultValue: headMotor.screwPattern.minMinorDiameter,
        onChange: (value) => props.setCreatedScrewMinMinorDiameter(value),
        hasTooltip: false,
        isVisible: isCreatedPattern,
      },
      {
        type: "TextField",
        id: "hm-created-max-minor-diameter",
        label: "Maximum Minor Diameter (mm)",
        inputType: "number",
        defaultValue: headMotor.screwPattern.maxMinorDiameter,
        onChange: (value) => props.setCreatedScrewMaxMinorDiameter(value),
        hasTooltip: false,
        isVisible: isCreatedPattern,
      },
      {
        type: "TextField",
        id: "hm-created-min-major-diameter",
        label: "Minimum Major Diameter (mm)",
        inputType: "number",
        defaultValue: headMotor.screwPattern.maxMajorDiameter,
        onChange: (value) => props.setCreatedScrewMinMajorDiameter(value),
        hasTooltip: false,
        isVisible: isCreatedPattern,
      },
      {
        type: "TextField",
        id: "hm-created-max-major-diameter",
        label: "Maximum Major Diameter (mm)",
        inputType: "number",
        defaultValue: headMotor.screwPattern.maxMajorDiameter,
        onChange: (value) => props.setCreatedScrewMaxMajorDiameter(value),
        hasTooltip: false,
        isVisible: isCreatedPattern,
      },
      {
        type: "Select",
        id: "hm-created-max-major-diameter",
        label: "Screw Type",
        inputType: "number",
        defaultValue: headMotor.screwPattern.id,
        onChange: (value) => props.setSelectedScrew(value),
        hasTooltip: false,
        isVisible: !isCreatedPattern,
        selectOptions: screwPatternsByDiameter,
      },
      {
        type: "TextField",
        id: "hm-screw-height",
        label: "Screw Height (mm)",
        inputType: "number",
        defaultValue: headMotor.screwHeight,
        onChange: (value) => props.setScrewHeight(value),
        hasTooltip: false,
        isVisible: true,
      },
      {
        type: "TextField",
        id: "hm-internal-height",
        label: "Internal Height (mm)",
        inputType: "number",
        defaultValue: headMotor.internalHeadHeight,
        onChange: (value) => props.setInternalHeight(value),
        hasTooltip: false,
        isVisible: true,
      },
      {
        type: "TextField",
        id: "hm-after-screw-height",
        label: "After Screw Height (mm)",
        inputType: "number",
        defaultValue: headMotor.afterScrewHeight,
        onChange: (value) => props.setAfterScrewHeight(value),
        hasTooltip: false,
        isVisible: true,
      },
      {
        type: "TextField",
        id: "hm-external-height",
        label: "External Height (mm)",
        inputType: "number",
        defaultValue: headMotor.externalHeadHeight,
        onChange: (value) => props.setExternalHeight(value),
        hasTooltip: false,
        isVisible: true,
      },
      {
        type: "TextField",
        id: "hm-internal-major-radius",
        label: "Internal Major Radius (mm)",
        inputType: "number",
        defaultValue: headMotor.internalRadius,
        onChange: (value) => props.setInternalRadius(value),
        hasTooltip: false,
        isVisible: true,
      },
      {
        type: "TextField",
        id: "hm-internal-minor-radius",
        label: "Internal Minor Radius (mm)",
        inputType: "number",
        defaultValue: headMotor.internalMinorRadius,
        onChange: (value) => props.setInternalMinorRadius(value),
        hasTooltip: false,
        isVisible: true,
      },
    ],
    hasSwitch: true,
    hasButtom: true,
    switch: {
      checked: isCreatedPattern,
      onChange: () => setSwitchState(!isCreatedPattern),
      name: "checkedB",
      label: "Own Pattern",
      tooltipTitle: "Define your own screw pattern.",
      tooltipPlaceholder: "bottom",
    },
    bottom: {
      disabled: buttonIsDisabled,
      label: "Calculate",
      onClick: () => HandleHeadMotorCalculation(),
      tooltipMessage: messageError,
      tooltipPlaceholder: "bottom",
    },
  };
  return (
    <div className="Form-Base-Paper">
          <FormBuilder formProps={Form} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  screwPatterns: state.headMotor.screwPatterns,
  headMotor: state.headMotor.headMotor,
  screwPatternsByDiameter: state.headMotor.screwPatternsByDiameter,
  motorChainButtonIsDisabled: state.motorChain.buttonIsDisabled,
  motorThickness: state.motorChain.motorChain.thickness,
  motorInternalRadius: state.motorChain.motorChain.internalRadius,
  motorWorkPressure: state.motorChain.motorChain.workPressure,
  motorMaterialId: state.motorChain.motorChain.materialId,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(headMotorActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HeadMotor);
