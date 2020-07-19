import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

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
import * as MotorNozzleActions from "../../store/MotorNozzle/MotorNozzleActions";
import { ScrewPattern } from "../../store/HeadMotor/HeadMotorTypes";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
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
    form: {
      display: "flex",
      justifyContent: "space-evenly",
    },
  })
);

const MotorNozzle = (props) => {
  const classes = useStyles();
  const [isCreatedPattern, setSwitchState] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [buttonIsDisabled, setButtonState] = useState(true);
  const {
    motorNozzle,
    screwPatternsByDiameter,
    setCreatedScrewPitch,
    setCreatedScrewMinMinorDiameter,
    setCreatedScrewMaxMinorDiameter,
    setCreatedScrewMinMajorDiameter,
    setCreatedScrewMaxMajorDiameter,
    setSelectedScrew,
    setAfterScrewHeight,
    motorInternalRadius,
    setPossibleScrewPatterns,
    motorThickness,
    screwPatterns,
    getAllScrewPatterns,
    setInternalHeight,
    setExternalHeight,
    setInternalMajorRadius,
    setInternalMinorRadius,
    setScrewHeight,
  } = props;

  useEffect(() => {
    if (isNilOrEmpty(screwPatterns)) {
      getAllScrewPatterns();
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
          <div>
            {isCreatedPattern ? (
              <div>
                <TextField
                  className={clsx(classes.textField, classes.margin)}
                  id="mn-created-pitch"
                  onChange={(ev) => setCreatedScrewPitch(ev.target.value)}
                  label="Pitch (mm)"
                  type="number"
                  defaultValue={motorNozzle.screwPattern.pitch}
                  InputProps={{
                    className: classes.input,
                  }}
                />

                <TextField
                  className={clsx(classes.textField, classes.margin)}
                  id="mn-created-min-minor-diameter"
                  onChange={(ev) =>
                    setCreatedScrewMinMinorDiameter(ev.target.value)
                  }
                  label="Minimum Minor Diameter (mm)"
                  type="number"
                  defaultValue={motorNozzle.screwPattern.minMinorDiameter}
                  InputProps={{
                    className: classes.input,
                  }}
                />
                <TextField
                  className={clsx(classes.textField, classes.margin)}
                  id="mn-created-max-minor-diameter"
                  onChange={(ev) =>
                    setCreatedScrewMaxMinorDiameter(ev.target.value)
                  }
                  label="Maximum Minor Diameter (mm)"
                  type="number"
                  defaultValue={motorNozzle.screwPattern.maxMinorDiameter}
                  InputProps={{
                    className: classes.input,
                  }}
                />
                <TextField
                  className={clsx(classes.textField, classes.margin)}
                  id="mn-created-min-major-diameter"
                  onChange={(ev) =>
                    setCreatedScrewMinMajorDiameter(ev.target.value)
                  }
                  label="Minimum Major Diameter (mm)"
                  type="number"
                  defaultValue={motorNozzle.screwPattern.maxMajorDiameter}
                  InputProps={{
                    className: classes.input,
                  }}
                />
                <TextField
                  className={clsx(classes.textField, classes.margin)}
                  id="mn-created-max-major-diameter"
                  onChange={(ev) =>
                    setCreatedScrewMaxMajorDiameter(ev.target.value)
                  }
                  label="Maximum Major Diameter (mm)"
                  type="number"
                  defaultValue={motorNozzle.screwPattern.maxMajorDiameter}
                  InputProps={{
                    className: classes.input,
                  }}
                />
              </div>
            ) : (
              <FormControl className={classes.formControl} size="small">
                <InputLabel id="mn-select-screw-pattern">Screw Type</InputLabel>
                <Select
                  labelId="screw-type-select-label"
                  id="screw-type-select"
                  value={motorNozzle.screwPattern.id}
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
              id="mn-screw-height"
              onChange={(ev) => setScrewHeight(ev.target.value)}
              label="Screw Height(mm)"
              type="number"
              defaultValue={motorNozzle.screwHeight}
              InputProps={{
                className: classes.input,
              }}
            />

            <TextField
              className={clsx(classes.textField, classes.margin)}
              id="mn-internal-height"
              onChange={(ev) => setInternalHeight(ev.target.value)}
              label="Internal Height (mm)"
              type="number"
              defaultValue={motorNozzle.internalHeight}
              InputProps={{
                className: classes.input,
              }}
            />

            <TextField
              className={clsx(classes.textField, classes.margin)}
              id="mn-after-screw-height"
              onChange={(ev) => setAfterScrewHeight(ev.target.value)}
              label="After Screw Height (mm)"
              type="number"
              defaultValue={motorNozzle.afterScrewHeight}
              margin="normal"
              fullWidth
              InputProps={{
                className: classes.input,
              }}
            />

            <TextField
              className={clsx(classes.textField, classes.margin)}
              id="mn-external-height"
              onChange={(ev) => setExternalHeight(ev.target.value)}
              label="External Height (mm)"
              type="number"
              defaultValue={motorNozzle.externalHeight}
              InputProps={{
                className: classes.input,
              }}
            />

            <TextField
              className={clsx(classes.textField, classes.margin)}
              id="mn-internal-major-radius"
              onChange={(ev) => setInternalMajorRadius(ev.target.value)}
              label="Internal Major Radius (mm)"
              type="number"
              defaultValue={motorNozzle.internalMajorRadius}
              InputProps={{
                className: classes.input,
              }}
            />
            <TextField
              className={clsx(classes.textField, classes.margin)}
              id="mn-internal-minor-radius"
              onChange={(ev) => setInternalMinorRadius(ev.target.value)}
              label="Internal Minor Radius (mm)"
              type="number"
              defaultValue={motorNozzle.internalMinorRadius}
              InputProps={{
                className: classes.input,
              }}
            />
          </div>
        </Paper>
      </div>
      <div className={classes.button}>
        <Tooltip title={messageError} placeholder="bottom">
          <span>
            <Button
              variant="contained"
              color="primary"
              disabled={buttonIsDisabled}
              onClick={() => console.log()}
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
