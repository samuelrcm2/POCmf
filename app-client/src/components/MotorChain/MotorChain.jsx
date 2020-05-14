import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import * as motorChainActions from "../../store/motorChain/motorChainActions";
import { CalculationTypes } from "../../store/motorChain/motorChainTypes";
const useStyles = makeStyles((theme) =>
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
      color: "black",
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
    button: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

function MotorChainInfo(props) {
  useEffect(() => {
    props.getAllMaterials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let {
    motorChain,
    materials,
    calculationType,
    setCalculationType,
    setRadius,
    setHeight,
    setThickness,
    setVolume,
    setWorkPressure,
    setMaterial,
    setAdmissiveStress,
    setLongitudinalStress,
  } = props;
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel id="calculation-type-select-label">
            Tipo de Cálculo
          </InputLabel>
          <Select
            labelId="calculation-type-select-label"
            id="calculation-type-select"
            value={calculationType}
            onChange={(ev) => setCalculationType(ev.target.value)}
          >
            <MenuItem key={"nullCalculationTypeValue"} value={""}>
              {""}
            </MenuItem>
            <MenuItem key={"SM-1"} value={CalculationTypes.SAFETY_MARGIN}>
              Security Margin
            </MenuItem>
            <MenuItem key={"Thickness-2"} value={CalculationTypes.THICKNESS}>
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
          label="Radius"
          type="number"
          defaultValue={motorChain.radius}
          InputProps={{
            className: classes.input,
          }}
        />

        <TextField
          className={clsx(classes.textField, classes.margin)}
          id="motor-chain-height"
          onChange={(ev) => setHeight(ev.target.value)}
          label="Height"
          type="number"
          defaultValue={motorChain.height}
          InputProps={{
            className: classes.input,
          }}
        />

        {calculationType !== CalculationTypes.THICKNESS ? (
          <TextField
            className={clsx(classes.textField, classes.margin)}
            id="motor-chain-thickness"
            onChange={(ev) => setThickness(ev.target.value)}
            label="Thickness"
            type="number"
            defaultValue={motorChain.thickness}
            InputProps={{
              className: classes.input,
            }}
          />
        ) : null}

        <TextField
          className={clsx(classes.textField, classes.margin)}
          id="motor-chain-volume"
          onChange={(ev) => setVolume(ev.target.value)}
          label="Volume"
          type="number"
          defaultValue={motorChain.volume}
          InputProps={{
            className: classes.input,
          }}
        />

        <TextField
          className={clsx(classes.textField, classes.margin)}
          id="motor-chain-work-pressure"
          onChange={(ev) => setWorkPressure(ev.target.value)}
          label="Work Pressure"
          type="number"
          defaultValue={motorChain.work_pressure}
          InputProps={{
            className: classes.input,
          }}
        />

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Material</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={motorChain.material_id}
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
          <div>
            <TextField
              className={clsx(classes.textField, classes.margin)}
              id="motor-chain-admissive-stress"
              onChange={(ev) => setAdmissiveStress(ev.target.value)}
              label="Admissive Stress"
              type="number"
              defaultValue={motorChain.admissive_stress}
              InputProps={{
                className: classes.input,
              }}
            />

            <TextField
              className={clsx(classes.textField, classes.margin)}
              id="motor-chain-longitudinal-stress"
              onChange={(ev) => setLongitudinalStress(ev.target.value)}
              label="Longitudinal Stress"
              type="number"
              defaultValue={motorChain.longitudinal_stress}
              InputProps={{
                className: classes.input,
              }}
            />
          </div>
        )}
      </div>
      <div className={classes.button}>
        <button onClick={() => console.log("CLIQUEI")}>COMO VAI O TCC?</button>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  motorChain: state.motorChain.motorChain,
  materials: state.motorChain.allMaterials,
  calculationType: state.motorChain.calculationType,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(motorChainActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MotorChainInfo);
