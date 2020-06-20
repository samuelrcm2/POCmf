//react
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

//Third Part Libraries
import { isNilOrEmpty } from "ramda-adjunct";

import * as motorChainActions from "../../store/motorChain/motorChainActions";
import {
  CalculationTypes,
  nameTranslations,
} from "../../store/motorChain/motorChainTypes";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
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

function MotorChainInfo(props) {
  useEffect(() => {
    props.getAllMaterials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    motorChain,
    materials,
    calculationType,
    calculatedData,
    setCalculationType,
    setRadius,
    setHeight,
    setThickness,
    setWorkPressure,
    setMaterial,
    setLongitudinalStress,
    setCircunferentialStress,
    setRadialStress,
    calculateMotorChainProps,
    buttonIsDisabled,
    setButtonState,
  } = props;
  useEffect(() => {
    checkIfHasData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motorChain, calculationType]);

  const classes = useStyles();
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
  const displayCalculatedData = () => {
    let responses = [];
    for (let [Key, value] of Object.entries(calculatedData)) {
      if (value != null)
        responses.push(
          <li key={value}>{`${nameTranslations[Key]}: ${parseFloat(
            value.toFixed(3)
          )} \n`}</li>
        );
    }
    return isNilOrEmpty(responses) ? null : (
      <Paper className={classes.resultPaper}>
        <ul>{responses}</ul>
      </Paper>
    );
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
  return (
    <div>
      <div className={classes.root}>
        <Paper style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <FormControl className={classes.formControl} size="small">
              <InputLabel id="calculation-type-select-label">
                Calculation Type
              </InputLabel>
              <Select
                labelId="calculation-type-select-label"
                id="calculation-type-select"
                value={calculationType}
                onChange={(ev) => setCalculationType(ev.target.value)}
              >
                <MenuItem key={0} value={0}>
                  {""}
                </MenuItem>
                <MenuItem key={"SM-1"} value={CalculationTypes.SAFETY_MARGIN}>
                  Security Margin
                </MenuItem>
                <MenuItem
                  key={"Thickness-2"}
                  value={CalculationTypes.THICKNESS}
                >
                  Thickness
                </MenuItem>
                <MenuItem
                  key={"Main-Stresses"}
                  value={CalculationTypes.MAIN_STRESSES}
                >
                  Main Stresses
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              className={clsx(classes.textField, classes.margin)}
              id="motor-chain-radius"
              onChange={(ev) => setRadius(ev.target.value)}
              label="Internal Radius (mm)"
              type="number"
              defaultValue={motorChain.internalRadius}
              InputProps={{
                className: classes.input,
              }}
            />

            <TextField
              className={clsx(classes.textField, classes.margin)}
              id="motor-chain-height"
              onChange={(ev) => setHeight(ev.target.value)}
              label="Height (mm)"
              type="number"
              defaultValue={motorChain.height}
              margin="normal"
              fullWidth
              InputProps={{
                className: classes.input,
              }}
            />

            {calculationType !== CalculationTypes.THICKNESS ? (
              <TextField
                className={clsx(classes.textField, classes.margin)}
                id="motor-chain-thickness"
                onChange={(ev) => setThickness(ev.target.value)}
                label="Thickness (mm)"
                type="number"
                defaultValue={motorChain.thickness}
                InputProps={{
                  className: classes.input,
                }}
              />
            ) : null}

            <TextField
              className={clsx(classes.textField, classes.margin)}
              id="motor-chain-work-pressure"
              onChange={(ev) => setWorkPressure(ev.target.value)}
              label="Work Pressure (MPa)"
              type="number"
              defaultValue={motorChain.workPressure}
              InputProps={{
                className: classes.input,
              }}
            />

            <FormControl className={classes.formControl} size="small">
              <InputLabel id="demo-simple-select-label">Material</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={motorChain.materialId}
                onChange={(ev) => setMaterial(ev.target.value)}
              >
                <MenuItem key={"nullMaterialValue"} value={""}>
                  {""}
                </MenuItem>
                {materials.map((material) => (
                  <MenuItem key={material.id} value={material.id}>
                    {material.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {calculationType !== CalculationTypes.MAIN_STRESSES && (
              <>
                <TextField
                  className={clsx(classes.textField, classes.margin)}
                  id="motor-chain-longitudinal-stress"
                  onChange={(ev) => setLongitudinalStress(ev.target.value)}
                  label="Longitudinal Stress (MPa)"
                  type="number"
                  defaultValue={motorChain.longitudinalStress}
                  InputProps={{
                    className: classes.input,
                  }}
                />

                <TextField
                  className={clsx(classes.textField, classes.margin)}
                  id="motor-chain-circunferential-stress"
                  onChange={(ev) => setCircunferentialStress(ev.target.value)}
                  label="Circunferential Stress (MPa)"
                  type="number"
                  defaultValue={motorChain.circumferentialStress}
                  InputProps={{
                    className: classes.input,
                  }}
                />
                {checkIfMotorNeedRadiusStressField() && (
                  <Tooltip
                    title="Only has to add a Radial Stress when the ratio Thickness/External Raidus is greater than 0.1"
                    placeholder="bottom"
                  >
                    <TextField
                      className={clsx(classes.textField, classes.margin)}
                      id="motor-chain-circunferential-stress"
                      onChange={(ev) => setRadialStress(ev.target.value)}
                      label="Radial Stress (MPa)"
                      type="number"
                      defaultValue={motorChain.radialStress}
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </Tooltip>
                )}
              </>
            )}
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
              onClick={() =>
                calculateMotorChainProps(motorChain, calculationType)
              }
            >
              Calculate
            </Button>
          </span>
        </Tooltip>
      </div>

      <div className={classes.result}>{displayCalculatedData()}</div>
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
