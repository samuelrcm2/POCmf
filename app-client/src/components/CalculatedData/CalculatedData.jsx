//react
import React from "react";
import { connect } from "react-redux";

//CSS
import Paper from "@material-ui/core/Paper";

//Third Part Libraries
import { isNilOrEmpty } from "ramda-adjunct";

import { nameTranslations } from "../../store/motorChain/motorChainTypes";
import useStyles from "./CalculatedDataStyle";

const CalculatedData = (props) => {
  const classes = useStyles();
  const { motorChainCalculatedData, headMotorCalculatedData } = props;
  const displayData = (data) => {
    if (!data) return null;
    let responses = [];
    for (let [Key, value] of Object.entries(data)) {
      if (value != null)
        responses.push(
          <li key={value}>{`${nameTranslations[Key]}: ${parseFloat(
            value.toFixed(3)
          )} \n`}</li>
        );
    }
    return isNilOrEmpty(responses) ? null : <ul>{responses}</ul>;
  };
  if (
    isNilOrEmpty(motorChainCalculatedData) &&
    isNilOrEmpty(headMotorCalculatedData)
  )
    return null;
  return (
    <Paper>
      <div className={classes.resultPaper}>
        <h3>Motor Chain</h3>
        <div className={classes.result}>
          {displayData(motorChainCalculatedData)}
        </div>
        <h3>Screw</h3>
        <div className={classes.result}>
          {displayData(headMotorCalculatedData)}
        </div>
      </div>
    </Paper>
  );
};
const mapStateToProps = (state) => ({
  motorChain: state.motorChain.motorChain,
  materials: state.motorChain.allMaterials,
  calculationType: state.motorChain.calculationType,
  motorChainCalculatedData: state.motorChain.calculatedData,
  headMotorCalculatedData: state.headMotor.calculatedData,
  buttonIsDisabled: state.motorChain.buttonIsDisabled,
});

export default connect(mapStateToProps)(CalculatedData);
