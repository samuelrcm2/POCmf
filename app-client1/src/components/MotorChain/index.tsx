import React, { useEffect } from "react";
import clsx from "clsx";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import { MotorChain, Material } from "../../store/ducks/motorChain/types";
import { AplicationState } from "../../store/index";
import * as motorChainActions from "../../store/ducks/motorChain/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: 150,
        color: "white",
        border: "white",
      },
    },
    margin: {
      margin: theme.spacing(1),
    },
    input: {
      color: "white",
    },
    textField: {
      width: 500,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

interface OwnProps {
  motorChan: MotorChain;
  materials: Material[];
}

function MotorChainInfo({ motorChan, materials }: OwnProps) {
  useEffect(() => {
    motorChainActions.getAllMaterials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();

  const setRadius = (event: React.ChangeEvent<HTMLInputElement>) => {
    motorChan.radius = Number(event.target.value);
  };

  const setHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    motorChan.height = Number(event.target.value);
  };

  const setThickness = (event: React.ChangeEvent<HTMLInputElement>) => {
    motorChan.thickness = Number(event.target.value);
  };

  const setVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    motorChan.volume = Number(event.target.value);
  };

  const setWorkPressure = (event: React.ChangeEvent<HTMLInputElement>) => {
    motorChan.work_pressure = Number(event.target.value);
  };

  const setMaterial = (event: React.ChangeEvent<{ value: unknown }>) => {
    motorChan.material_id = Number(event.target.value);
  };

  const setAdmissiveStress = (event: React.ChangeEvent<HTMLInputElement>) => {
    motorChan.admissive_stress = Number(event.target.value);
  };

  const setLongitudinalStress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    motorChan.longitudinal_stress = Number(event.target.value);
  };
  return (
    <div className={classes.root}>
      <TextField
        className={clsx(classes.textField, classes.margin)}
        id="motor-chain-radius"
        onChange={setRadius}
        label="Radius"
        type="number"
        defaultValue={motorChan.radius}
        InputProps={{
          className: classes.input,
        }}
      />

      <TextField
        className={clsx(classes.textField, classes.margin)}
        id="motor-chain-height"
        onChange={setHeight}
        label="Height"
        type="number"
        defaultValue={motorChan.height}
        InputProps={{
          className: classes.input,
        }}
      />

      <TextField
        className={clsx(classes.textField, classes.margin)}
        id="motor-chain-thickness"
        onChange={setThickness}
        label="Thickness"
        type="number"
        defaultValue={motorChan.thickness}
        InputProps={{
          className: classes.input,
        }}
      />

      <TextField
        className={clsx(classes.textField, classes.margin)}
        id="motor-chain-volume"
        onChange={setVolume}
        label="Volume"
        type="number"
        defaultValue={motorChan.volume}
        InputProps={{
          className: classes.input,
        }}
      />

      <TextField
        className={clsx(classes.textField, classes.margin)}
        id="motor-chain-work-pressure"
        onChange={setWorkPressure}
        label="Work Pressure"
        type="number"
        defaultValue={motorChan.work_pressure}
        InputProps={{
          className: classes.input,
        }}
      />

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Material</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={motorChan.material_id}
          onChange={setMaterial}
        >
          {materials.map((material) => (
            <MenuItem key={material.id} value={material.id}>
              {material.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        className={clsx(classes.textField, classes.margin)}
        id="motor-chain-admissive-stress"
        onChange={setAdmissiveStress}
        label="Admissive Stress"
        type="number"
        defaultValue={motorChan.admissive_stress}
        InputProps={{
          className: classes.input,
        }}
      />

      <TextField
        className={clsx(classes.textField, classes.margin)}
        id="motor-chain-longitudinal-stress"
        onChange={setLongitudinalStress}
        label="Longitudinal Stress"
        type="number"
        defaultValue={motorChan.longitudinal_stress}
        InputProps={{
          className: classes.input,
        }}
      />
    </div>
  );
}
const mapStateToProps = (state: AplicationState) => ({
  motorChain: state.motorChain.motorChain,
  materials: state.motorChain.allMaterials,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(motorChainActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MotorChainInfo);
