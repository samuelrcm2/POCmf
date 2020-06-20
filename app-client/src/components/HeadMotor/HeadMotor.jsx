import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//CSS
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { createStyles, makeStyles } from "@material-ui/core/styles";
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
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      paddingRight: "8px",
      "& .MuiTextField-root": {
        width: 130,
        color: "white",
        border: "white",
      },
      "& .MuiFormLabel-root": {
        fontSize: "10px",
      },
      "& .MuiInputBase-input": {
        fontSize: "10px",
      },
    },
    margin: {
      margin: theme.spacing(1),
    },
    input: {
      color: "black",
    },
    textField: {
      width: 300,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 130,
    },
    select: {
      fontSize: "10px",
    },
    button: {
      display: "flex",
      justifyContent: "center",
      paddingTop: "10px",
      paddingBottom: "10px",
    },
    result: {
      color: "Black",
      display: "flex",
      justifyContent: "flex-start",
    },
    resultPaper: {
      width: "50%",
      marginRight: "5px",
    },
    switch: {
      paddingTop: "10px",
      paddingLeft: "15px",
    },
  })
);

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
    motorChainButtonIsDisabled,
    motorThickness,
    motorInternalRadius,
    setPossibleScrewPatterns,
    screwPatternsByDiameter,
    setCreatedScrewPitch,
    setCreatedScrewMinMinorDiameter,
    setCreatedScrewMaxMinorDiameter,
    setCreatedScrewMinMajorDiameter,
    setCreatedScrewMaxMajorDiameter,
  } = props;

  const classes = useStyles();
  const [messageError, setMessageError] = useState("");
  const [buttonIsDisabled, setButtonState] = useState(true);
  const [isCreatedPattern, setSwitchState] = useState(false);

  useEffect(() => {
    getAllScrewPatterns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    checkIfHasData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headMotor, isCreatedPattern]);
  useEffect(() => {
    DefinePossibleScrewPatterns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motorThickness, motorInternalRadius]);

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
    let externalRadius = motorThickness + motorInternalRadius;
    let possibleScrewPatterns = screwPatterns.filter(
      (s) =>
        s.minMinorDiameter >= motorInternalRadius &&
        s.maxMajorDiameter <= externalRadius
    );
    possibleScrewPatterns =
      possibleScrewPatterns.length === 0
        ? [new ScrewPattern()]
        : possibleScrewPatterns;
    setPossibleScrewPatterns(possibleScrewPatterns);
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
                value={headMotor.screwPattern}
                onChange={(ev) => setSelectedScrew(ev.target.value)}
              >
                <MenuItem key={0} value={0}>
                  {""}
                </MenuItem>
                {screwPatternsByDiameter.map((screwPattern) => (
                  <MenuItem key={screwPattern.id} value={screwPattern}>
                    {screwPattern.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <TextField
            className={clsx(classes.textField, classes.margin)}
            id="screwHeight"
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
            id="internal-height"
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
            id="motor-chain-thickness"
            onChange={(ev) => setExternalHeight(ev.target.value)}
            label="External Height (mm)"
            type="number"
            defaultValue={headMotor.externalHeadHeight}
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
              onClick={() => calculateScrewMaxStress(headMotor)}
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
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(headMotorActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HeadMotor);
