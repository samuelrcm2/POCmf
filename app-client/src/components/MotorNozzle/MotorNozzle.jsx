import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { isNilOrEmpty } from "ramda-adjunct";
import * as MotorNozzleActions from "../../store/MotorNozzle/MotorNozzleActions";
import { ScrewPattern } from "../../store/HeadMotor/HeadMotorTypes";
import FormBuilder from "../Generic/FormBuilder/FormBuilder";

const MotorNozzle = (props) => {
  const [isCreatedPattern, setSwitchState] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [buttonIsDisabled, setButtonState] = useState(true);
  const [screwPatternIsCopied, setScrewPatternIsCopied] = useState(false);
  const {
    motorNozzle,
    screwPatternsByDiameter,
    motorInternalRadius,
    setPossibleScrewPatterns,
    motorThickness,
    screwPatterns,
    copyHeadMotorScrewPattern,
  } = props;

  useEffect(() => {
    if (isNilOrEmpty(screwPatterns)) {
      props.getAllScrewPatterns();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    checkIfHasData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motorNozzle, isCreatedPattern]);
  useEffect(() => {
    DefinePossibleScrewPatterns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motorNozzle, motorInternalRadius, screwPatterns]);

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

  const checkIfHasData = () => {
    if (isNilOrEmpty(motorNozzle.screwHeight)) {
      setMessageError("Please, select a Screw Height.");
      setButtonState(true);
      return;
    }

    if (isNilOrEmpty(motorNozzle.internalHeight)) {
      setMessageError("Please, select an Internal Height.");
      setButtonState(true);
      return;
    }

    if (isNilOrEmpty(motorNozzle.externalHeight)) {
      setMessageError("Please, select an External Height.");
      setButtonState(true);
      return;
    }

    if (isNilOrEmpty(motorNozzle.internalMajorRadius)) {
      setMessageError("Please, insert an Internal Major Radius.");
      setButtonState(true);
      return;
    }

    if (isNilOrEmpty(motorNozzle.internalMinorRadius)) {
      setMessageError("Please, insert an Internal Minor Radius.");
      setButtonState(true);
      return;
    }

    if (isCreatedPattern) {
      if (isNilOrEmpty(motorNozzle.screwPattern.pitch)) {
        setMessageError("Please, insert a Pitch.");
        setButtonState(true);
        return;
      }

      if (isNilOrEmpty(motorNozzle.screwPattern.minMinorDiameter)) {
        setMessageError("Please, insert a Minimum Minor Diameter.");
        setButtonState(true);
        return;
      }

      if (isNilOrEmpty(motorNozzle.screwPattern.maxMinorDiameter)) {
        setMessageError("Please, insert a Maximum Minor Diameter.");
        setButtonState(true);
        return;
      }

      if (isNilOrEmpty(motorNozzle.screwPattern.minMajorDiameter)) {
        setMessageError("Please, insert a Minimum Major Diameter.");
        setButtonState(true);
        return;
      }

      if (isNilOrEmpty(motorNozzle.screwPattern.maxMajorDiameter)) {
        setMessageError("Please, insert a Maximum Major Diameter.");
        setButtonState(true);
        return;
      }
    } else {
      if (isNilOrEmpty(motorNozzle.screwPattern.id)) {
        setMessageError("Please, select a Screw Pattern.");
        setButtonState(true);
        return;
      }
    }
    setButtonState(false);
    setMessageError("");
    return;
  };
  const onFiedlsChange = (f) => {
    setScrewPatternIsCopied(false);
    f();
  }
  const Form = {
    forms: [
      {
        type: "TextField",
        id: "hm-created-pitch",
        label: "Pitch (mm)",
        inputType: "number",
        defaultValue: motorNozzle.screwPattern.pitch,
        onChange: (value) => onFiedlsChange(() => props.setCreatedScrewPitch(value)),
        hasTooltip: false,
        isVisible: isCreatedPattern,
      },
      {
        type: "TextField",
        id: "hm-created-min-minor-diameter",
        label: "Minimum Minor Diameter (mm)",
        inputType: "number",
        defaultValue: motorNozzle.screwPattern.minMinorDiameter,
        onChange: (value) => onFiedlsChange(() => props.setCreatedScrewMinMinorDiameter(value)),
        hasTooltip: false,
        isVisible: isCreatedPattern,
      },
      {
        type: "TextField",
        id: "hm-created-max-minor-diameter",
        label: "Maximum Minor Diameter (mm)",
        inputType: "number",
        defaultValue: motorNozzle.screwPattern.maxMinorDiameter,
        onChange: (value) => onFiedlsChange(() => props.setCreatedScrewMaxMinorDiameter(value)),
        hasTooltip: false,
        isVisible: isCreatedPattern,
      },
      {
        type: "TextField",
        id: "hm-created-min-major-diameter",
        label: "Minimum Major Diameter (mm)",
        inputType: "number",
        defaultValue: motorNozzle.screwPattern.maxMajorDiameter,
        onChange: (value) => onFiedlsChange(() => props.setCreatedScrewMinMajorDiameter(value)),
        hasTooltip: false,
        isVisible: isCreatedPattern,
      },
      {
        type: "TextField",
        id: "hm-created-max-major-diameter",
        label: "Maximum Major Diameter (mm)",
        inputType: "number",
        defaultValue: motorNozzle.screwPattern.maxMajorDiameter,
        onChange: (value) => onFiedlsChange(() => props.setCreatedScrewMaxMajorDiameter(value)),
        hasTooltip: false,
        isVisible: isCreatedPattern,
      },
      {
        type: "Select",
        id: "hm-created-max-major-diameter",
        label: "Screw Type",
        inputType: "number",
        defaultValue: motorNozzle.screwPattern.id,
        onChange: (value) => onFiedlsChange(() => props.setSelectedScrew(value)),
        hasTooltip: false,
        isVisible: !isCreatedPattern,
        selectOptions: screwPatternsByDiameter,
      },
      {
        type: "TextField",
        id: "hm-screw-height",
        label: "Screw Height (mm)",
        inputType: "number",
        defaultValue: motorNozzle.screwHeight,
        onChange: (value) => onFiedlsChange(() => props.setScrewHeight(value)),
        hasTooltip: false,
        isVisible: true,
      },
      {
        type: "TextField",
        id: "hm-internal-height",
        label: "Internal Height (mm)",
        inputType: "number",
        defaultValue: motorNozzle.internalHeight,
        onChange: (value) => onFiedlsChange(() => props.setInternalHeight(value)),
        hasTooltip: false,
        isVisible: true,
      },
      {
        type: "TextField",
        id: "hm-after-screw-height",
        label: "After Screw Height (mm)",
        inputType: "number",
        defaultValue: motorNozzle.afterScrewHeight,
        onChange: (value) => onFiedlsChange(() => props.setAfterScrewHeight(value)),
        hasTooltip: false,
        isVisible: true,
      },
      {
        type: "TextField",
        id: "hm-external-height",
        label: "External Height (mm)",
        inputType: "number",
        defaultValue: motorNozzle.externalHeight,
        onChange: (value) => onFiedlsChange(() => props.setExternalHeight(value)),
        hasTooltip: false,
        isVisible: true,
      },
      {
        type: "TextField",
        id: "hm-internal-major-radius",
        label: "Internal Major Radius (mm)",
        inputType: "number",
        defaultValue: motorNozzle.internalMajorRadius,
        onChange: (value) => onFiedlsChange(() => props.setInternalMajorRadius(value)),
        hasTooltip: false,
        isVisible: true,
      },
      {
        type: "TextField",
        id: "hm-internal-minor-radius",
        label: "Internal Minor Radius (mm)",
        inputType: "number",
        defaultValue: motorNozzle.internalMinorRadius,
        onChange: (value) => onFiedlsChange(() => props.setInternalMinorRadius(value)),
        hasTooltip: false,
        isVisible: true,
      },
    ],
    hasSwitch: true,
    hasButtom: true,
    switch: [
      {
      checked: isCreatedPattern,
      onChange: () => setSwitchState(!isCreatedPattern),
      name: "checkedB",
      label: "Own Pattern",
      tooltipTitle: "Define your own screw pattern.",
      tooltipPlaceholder: "bottom",
      },
      {
      checked: screwPatternIsCopied,
      onChange: () => {
        copyHeadMotorScrewPattern();
        setScrewPatternIsCopied(!screwPatternIsCopied);
      },
      name: "checkedB",
      label: "Copy Motor Head Pattern",
      tooltipTitle: "Use the same pattern used in the Motor Head screw.",
      tooltipPlaceholder: "bottom",
      }
    ],
    bottom: {
      disabled: buttonIsDisabled,
      label: "Calculate",
      onClick: () => console.log(),
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
  motorNozzle: state.motorNozzle.motorNozzle,
  screwPatternsByDiameter: state.headMotor.screwPatternsByDiameter,
  motorChainButtonIsDisabled: state.motorChain.buttonIsDisabled,
  motorThickness: state.motorChain.motorChain.thickness,
  motorInternalRadius: state.motorChain.motorChain.internalRadius,
  motorWorkPressure: state.motorChain.motorChain.workPressure,
  motorMaterialId: state.motorChain.motorChain.materialId,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(MotorNozzleActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MotorNozzle);
