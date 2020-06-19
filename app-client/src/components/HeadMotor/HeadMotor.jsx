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

import { isNilOrEmpty } from "ramda-adjunct";

import * as headMotorActions from "../../store/HeadMotor/HeadMotorActions";

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
  })
);

const HeadMotor = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.getAllScrewPatterns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    screwPatterns,
    headMotor,
    setSelectedScrew,
    setExternalHeight,
    setInternalHeight,
    setScrewHeight,
    calculateScrewMaxStress,
    motorChainButtonIsDisabled,
  } = props;
  useEffect(() => {
    checkIfHasData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headMotor]);
  const [messageError, setMessageError] = useState("");
  const [buttonIsDisabled, setButtonState] = useState(true);

  const checkIfHasData = () => {
    if (isNilOrEmpty(headMotor.screwPattern.id)) {
      setMessageError("Please, select a Screw Pattern.");
      setButtonState(true);
      return;
    }

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
    setButtonState(false);
    setMessageError("");
  };
  const SetScrewPattern = (screwPatternId) => {
    let screw = screwPatterns.find((s) => (s.id = screwPatternId));
    setSelectedScrew(screw);
  };

  if (motorChainButtonIsDisabled) return null;
  return (
    <div>
      <div className={classes.root}>
        <Paper>
          <FormControl className={classes.formControl} size="small">
            <InputLabel id="calculation-type-select-label">
              Screw Type
            </InputLabel>
            <Select
              labelId="screw-type-select-label"
              id="screw-type-select"
              value={headMotor.screwPattern.id}
              onChange={(ev) => SetScrewPattern(ev.target.value)}
            >
              <MenuItem key={0} value={0}>
                {""}
              </MenuItem>
              {screwPatterns.map((screwPattern) => (
                <MenuItem key={screwPattern.id} value={screwPattern.id}>
                  {screwPattern.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
  motorChainButtonIsDisabled: state.motorChain.buttonIsDisabled,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(headMotorActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HeadMotor);
