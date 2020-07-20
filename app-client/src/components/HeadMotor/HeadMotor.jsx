import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//CSS
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { isNilOrEmpty } from "ramda-adjunct";

import * as headMotorActions from "../../store/HeadMotor/HeadMotorActions";
import { ScrewPattern } from "../../store/HeadMotor/HeadMotorTypes";
import useStyles from "./HeadMotorStyle";

const HeadMotor = (props) => {
  const {
    getAllScrewPatterns,
    screwPatterns,
    headMotor,
    setSelectedScrew,
    setExternalHeight,
    setInternalHeight,
    setScrewHeight,
    calculateScrewMaxStress,
    motorThickness,
    motorInternalRadius,
    motorWorkPressure,
    motorMaterialId,
    setPossibleScrewPatterns,
    screwPatternsByDiameter,
    setCreatedScrewPitch,
    setCreatedScrewMinMinorDiameter,
    setCreatedScrewMaxMinorDiameter,
    setCreatedScrewMinMajorDiameter,
    setCreatedScrewMaxMajorDiameter,
    setAfterScrewHeight,
    setInternalRadius,
    setInternalMinorRadius,
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
  // if (motorChainButtonIsDisabled) return null;
  return (
    <div>
      <div className={classes.root}>
        <Paper>
          <div className={classes.switch}>
            <Tooltip
              title="Define your own screw pattern."
              placeholder="bottom"
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={isCreatedPattern}
                    onChange={() => setSwitchState(!isCreatedPattern)}
                    name="checkedB"
                    color="primary"
                    size="small"
                  />
                }
                label="Own Pattern"
              />
            </Tooltip>
          </div>
          {isCreatedPattern ? (
            <div>
              <TextField
                className={clsx(classes.textField, classes.margin)}
                id="created-pitch"
                onChange={(ev) => setCreatedScrewPitch(ev.target.value)}
                label="Pitch (mm)"
                type="number"
                defaultValue={headMotor.screwPattern.pitch}
                InputProps={{
                  className: classes.input,
                }}
              />

              <TextField
                className={clsx(classes.textField, classes.margin)}
                id="created-min-minor-diameter"
                onChange={(ev) =>
                  setCreatedScrewMinMinorDiameter(ev.target.value)
                }
                label="Minimum Minor Diameter (mm)"
                type="number"
                defaultValue={headMotor.screwPattern.minMinorDiameter}
                InputProps={{
                  className: classes.input,
                }}
              />
              <TextField
                className={clsx(classes.textField, classes.margin)}
                id="created-max-minor-diameter"
                onChange={(ev) =>
                  setCreatedScrewMaxMinorDiameter(ev.target.value)
                }
                label="Maximum Minor Diameter (mm)"
                type="number"
                defaultValue={headMotor.screwPattern.maxMinorDiameter}
                InputProps={{
                  className: classes.input,
                }}
              />
              <TextField
                className={clsx(classes.textField, classes.margin)}
                id="created-min-major-diameter"
                onChange={(ev) =>
                  setCreatedScrewMinMajorDiameter(ev.target.value)
                }
                label="Minimum Major Diameter (mm)"
                type="number"
                defaultValue={headMotor.screwPattern.maxMajorDiameter}
                InputProps={{
                  className: classes.input,
                }}
              />
              <TextField
                className={clsx(classes.textField, classes.margin)}
                id="created-max-major-diameter"
                onChange={(ev) =>
                  setCreatedScrewMaxMajorDiameter(ev.target.value)
                }
                label="Maximum Major Diameter (mm)"
                type="number"
                defaultValue={headMotor.screwPattern.maxMajorDiameter}
                InputProps={{
                  className: classes.input,
                }}
              />
            </div>
          ) : (
            <FormControl className={classes.formControl} size="small">
              <InputLabel id="calculation-type-select-label">
                Screw Type
              </InputLabel>
              <Select
                labelId="screw-type-select-label"
                id="screw-type-select"
                value={headMotor.screwPattern.id}
                onChange={(ev) => setSelectedScrew(ev.target.value)}
              >
                {screwPatternsByDiameter.map((screwPattern) => (
                  <MenuItem key={screwPattern.id} value={screwPattern.id}>
                    {screwPattern.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <TextField
            className={clsx(classes.textField, classes.margin)}
            id="hm-screw-height"
            onChange={(ev) => setScrewHeight(ev.target.value)}
            label="Screw Height (mm)"
            type="number"
            defaultValue={headMotor.screwHeight}
            InputProps={{
              className: classes.input,
            }}
          />

          <TextField
            className={clsx(classes.textField, classes.margin)}
            id="hm-internal-height"
            onChange={(ev) => setInternalHeight(ev.target.value)}
            label="Internal Height (mm)"
            type="number"
            defaultValue={headMotor.internalHeadHeight}
            margin="normal"
            fullWidth
            InputProps={{
              className: classes.input,
            }}
          />

          <TextField
            className={clsx(classes.textField, classes.margin)}
            id="hm-after-screw-height"
            onChange={(ev) => setAfterScrewHeight(ev.target.value)}
            label="After Screw Height (mm)"
            type="number"
            defaultValue={headMotor.afterScrewHeight}
            margin="normal"
            fullWidth
            InputProps={{
              className: classes.input,
            }}
          />

          <TextField
            className={clsx(classes.textField, classes.margin)}
            id="hm-external-height"
            onChange={(ev) => setExternalHeight(ev.target.value)}
            label="External Height (mm)"
            type="number"
            defaultValue={headMotor.externalHeadHeight}
            InputProps={{
              className: classes.input,
            }}
          />

          <TextField
            className={clsx(classes.textField, classes.margin)}
            id="hm-internal-major-radius"
            onChange={(ev) => setInternalRadius(ev.target.value)}
            label="Internal Major Radius (mm)"
            type="number"
            defaultValue={headMotor.internalRadius}
            InputProps={{
              className: classes.input,
            }}
          />
          <TextField
            className={clsx(classes.textField, classes.margin)}
            id="hm-internal-minor-radius"
            onChange={(ev) => setInternalMinorRadius(ev.target.value)}
            label="Internal Minor Radius (mm)"
            type="number"
            defaultValue={headMotor.internalMinorRadius}
            InputProps={{
              className: classes.input,
            }}
          />
        </Paper>
      </div>
      <div className={classes.button}>
        <Tooltip title={messageError} placeholder="bottom">
          <span>
            <Button
              variant="contained"
              color="primary"
              disabled={buttonIsDisabled}
              onClick={() => HandleHeadMotorCalculation()}
            >
              Calculate
            </Button>
          </span>
        </Tooltip>
      </div>
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
