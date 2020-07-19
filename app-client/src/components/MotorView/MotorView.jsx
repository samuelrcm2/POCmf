import React, { Component } from "react";
import { connect } from "react-redux";

import * as d3 from "d3";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { isNilOrEmpty } from "ramda-adjunct";

import { CalculationTypes } from "../../store/motorChain/motorChainTypes";
const useStyles = (theme) => ({
  icon: {
    width: "300px",
    height: "800px",
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
});
class MotorView extends Component {
  checkIfHasData = () => {
    if (isNilOrEmpty(this.props.calculationType)) return false;

    if (isNilOrEmpty(this.props.motorChain.internalRadius)) return false;

    if (isNilOrEmpty(this.props.motorChain.height)) return false;

    if (isNilOrEmpty(this.props.motorChain.workPressure)) return false;

    if (
      this.props.calculationType !== CalculationTypes.THICKNESS &&
      isNilOrEmpty(this.props.motorChain.thickness)
    )
      return false;

    if (this.props.calculationType !== CalculationTypes.MAIN_STRESSES) {
      if (
        isNilOrEmpty(this.props.motorChain.longitudinalStress) ||
        isNilOrEmpty(this.props.motorChain.circumferentialStress)
      )
        return false;

      if (
        this.checkIfMotorNeedRadiusStressField() &&
        isNilOrEmpty(this.props.motorChain.radialStress)
      )
        return false;
    }

    if (isNilOrEmpty(this.props.headMotor.screwHeight)) return false;

    if (isNilOrEmpty(this.props.headMotor.internalHeadHeight)) return false;

    if (isNilOrEmpty(this.props.headMotor.externalHeadHeight)) return false;

    if (isNilOrEmpty(this.props.headMotor.afterScrewHeight)) return false;

    if (isNilOrEmpty(this.props.headMotor.internalRadius)) return false;

    if (isNilOrEmpty(this.props.headMotor.internalMinorRadius)) return false;

    if (isNilOrEmpty(this.props.headMotor.thickness)) return false;

    if (isNilOrEmpty(this.props.motorNozzle.screwHeight)) return false;

    if (isNilOrEmpty(this.props.motorNozzle.internalHeight)) return false;

    if (isNilOrEmpty(this.props.motorNozzle.externalHeight)) return false;

    if (isNilOrEmpty(this.props.motorNozzle.internalMajorRadius)) return false;

    if (isNilOrEmpty(this.props.motorNozzle.internalMinorRadius)) return false;

    return true;
  };

  checkIfMotorNeedRadiusStressField = () => {
    if (this.props.calculationType === CalculationTypes.THICKNESS) return true;
    if (
      isNilOrEmpty(this.props.motorChain.thickness) ||
      isNilOrEmpty(this.props.motorChain.internalRadius)
    )
      return false;
    if (
      this.props.motorChain.thickness === 0 ||
      this.props.motorChain.internalRadius === 0
    )
      return false;

    return (
      this.props.motorChain.thickness / this.props.motorChain.internalRadius >
      0.1
    );
  };

  createMotorDraw = () => {
    console.log("chamei a função");
    if (!this.checkIfHasData()) return;
    //Ainda não definido dinamicamente no projeto
    const SEALING_RING_THICKNESS = 5;
    const SEALING_RING_RADIUS_DIFFERENCE = 5;

    const MAX_WIDTH = 500;
    const MAX_HEIGHT = 500;

    const MIN_X = 5;
    const MIN_Y = 5;
    const MAX_X =
      MIN_X +
      (this.props.motorChain.internalRadius + this.props.motorChain.thickness) *
        2;
    const MAX_Y =
      MIN_Y +
      this.props.motorChain.height +
      this.props.headMotor.screwHeight +
      this.props.headMotor.internalHeadHeight +
      this.props.headMotor.externalHeadHeight +
      this.props.motorNozzle.externalHeight +
      this.props.motorNozzle.internalHeight;
    const EXTERNAL_HEAD_HEIGHT =
      MIN_Y + this.props.headMotor.externalHeadHeight;

    const RING_EXTERNAL_RIGHT_X = MIN_X + this.props.headMotor.thickness;
    const RING_INTERNAL_RIGHT_X =
      MIN_X + this.props.headMotor.thickness + SEALING_RING_RADIUS_DIFFERENCE;
    const RING_EXTERNAL_LEFT_X = MAX_X - this.props.headMotor.thickness;
    const RING_INTERNAL_LEFT_X =
      MAX_X - (this.props.headMotor.thickness + SEALING_RING_RADIUS_DIFFERENCE);

    const RING_SUPERIOR_UP_Y = MIN_Y + this.props.headMotor.externalHeadHeight;
    const RING_SUPERIOR_DOWN_Y =
      MIN_Y + this.props.headMotor.externalHeadHeight + SEALING_RING_THICKNESS;
    const RING_INFERIOR_UP_Y =
      MAX_Y - (this.props.motorNozzle.externalHeight + SEALING_RING_THICKNESS);
    const RING_INFERIOR_DOWN_Y = MAX_Y - this.props.motorNozzle.externalHeight;

    const MOTOR_HEAD_INTERNAL_MINIMUM_RADIUS_LEFT =
      MIN_X +
      this.props.headMotor.thickness +
      this.props.headMotor.internalRadius -
      this.props.headMotor.internalMinorRadius;
    const MOTOR_HEAD_INTERNAL_MINIMUM_RADIUS_RIGHT =
      MIN_X +
      this.props.headMotor.thickness +
      this.props.headMotor.internalRadius +
      this.props.headMotor.internalMinorRadius;
    const MOTOR_HEAD_MAXIMUM_HEIGHT =
      MIN_Y +
      this.props.headMotor.externalHeadHeight +
      this.props.headMotor.internalHeadHeight +
      this.props.headMotor.screwHeight +
      this.props.headMotor.afterScrewHeight;

    const NOZZLE_INTERNAL_MINIMUM_RADIUS_LEFT =
      MIN_X +
      this.props.motorNozzle.thickness +
      this.props.motorNozzle.internalMajorRadius -
      this.props.motorNozzle.internalMinorRadius;
    const NOZZLE_INTERNAL_MINIMUM_RADIUS_RIGHT =
      MIN_X +
      this.props.motorNozzle.thickness +
      this.props.motorNozzle.internalMajorRadius +
      this.props.motorNozzle.internalMinorRadius;
    const NOZZLE_MAXIMUM_HEIGHT =
      MIN_Y -
      (this.props.motorNozzle.externalHeight +
        this.props.motorNozzle.internalHeight +
        this.props.motorNozzle.screwHeight +
        this.props.motorNozzle.afterScrewHeight);

    const MOTOR_CHAIN_LEFT_X = MOTOR_HEAD_INTERNAL_MINIMUM_RADIUS_LEFT;
    const MOTOR_CHAIN_RIGHT_X = MOTOR_HEAD_INTERNAL_MINIMUM_RADIUS_RIGHT;
    const MOTOR_CHAIN_TOP_Y = MOTOR_HEAD_MAXIMUM_HEIGHT;
    const MOTOR_CHAIN_BOTTOM_Y = NOZZLE_MAXIMUM_HEIGHT;

    let externalRectangle = [
      //Camada externa
      { x: MIN_X, y: MIN_Y },
      { x: MIN_X, y: MAX_Y },
      { x: MAX_X, y: MAX_Y },
      { x: MAX_X, y: MIN_Y },
      { x: MIN_X, y: MIN_Y },
      //Tampos
      { x: MIN_X, y: EXTERNAL_HEAD_HEIGHT },
      //Anel de vedação superior
      { x: RING_INTERNAL_RIGHT_X, y: EXTERNAL_HEAD_HEIGHT },
      { x: RING_INTERNAL_RIGHT_X, y: RING_SUPERIOR_DOWN_Y },
      { x: RING_EXTERNAL_RIGHT_X, y: RING_SUPERIOR_DOWN_Y },
      { x: RING_EXTERNAL_RIGHT_X, y: EXTERNAL_HEAD_HEIGHT },
    ];

    let nozzleHead = [
      //Anel de vedação inferior
      { x: RING_EXTERNAL_RIGHT_X, y: RING_INFERIOR_DOWN_Y },
      { x: RING_EXTERNAL_RIGHT_X, y: RING_INFERIOR_UP_Y },
      { x: RING_INTERNAL_RIGHT_X, y: RING_INFERIOR_UP_Y },
      { x: RING_INTERNAL_RIGHT_X, y: RING_INFERIOR_DOWN_Y },

      { x: MIN_X, y: RING_INFERIOR_DOWN_Y },
      { x: MAX_X, y: RING_INFERIOR_DOWN_Y },
      //Anel de vedação inferior
      { x: RING_INTERNAL_LEFT_X, y: RING_INFERIOR_DOWN_Y },
      { x: RING_INTERNAL_LEFT_X, y: RING_INFERIOR_UP_Y },
      { x: RING_EXTERNAL_LEFT_X, y: RING_INFERIOR_UP_Y },
      { x: RING_EXTERNAL_LEFT_X, y: RING_INFERIOR_DOWN_Y },
    ];

    let headHead = [
      { x: RING_EXTERNAL_LEFT_X, y: EXTERNAL_HEAD_HEIGHT },
      //Anel de vedação superior
      { x: RING_EXTERNAL_LEFT_X, y: RING_SUPERIOR_DOWN_Y },
      { x: RING_INTERNAL_LEFT_X, y: RING_SUPERIOR_DOWN_Y },
      { x: RING_INTERNAL_LEFT_X, y: EXTERNAL_HEAD_HEIGHT },

      { x: MAX_X, y: EXTERNAL_HEAD_HEIGHT },
      //Linhas internas
      { x: RING_INTERNAL_RIGHT_X, y: EXTERNAL_HEAD_HEIGHT },
    ];

    let headMotorInternalLines = [
      { x: RING_INTERNAL_LEFT_X, y: RING_INFERIOR_DOWN_Y },
      { x: RING_INTERNAL_LEFT_X, y: RING_INFERIOR_UP_Y },
      { x: RING_EXTERNAL_LEFT_X, y: RING_INFERIOR_UP_Y },
      { x: RING_EXTERNAL_LEFT_X, y: RING_INFERIOR_DOWN_Y },
    ];

    let internalMotorHeadLines = [
      { x: RING_INTERNAL_RIGHT_X, y: RING_SUPERIOR_DOWN_Y },
      { x: RING_EXTERNAL_LEFT_X, y: RING_SUPERIOR_DOWN_Y },
      // { x: RING_EXTERNAL_LEFT_X, y: 60 },
      // { x: 73, y: 61 },
      // { x: 73, y: 61.5 },
      // { x: RING_EXTERNAL_LEFT_X, y: 62.5 },
      // { x: RING_EXTERNAL_LEFT_X, y: 62.75 },
      // { x: 73, y: 63.75 },
      // { x: 73, y: 64.25 },
      // { x: RING_EXTERNAL_LEFT_X, y: 65.25 },
      // { x: RING_EXTERNAL_LEFT_X, y: 65.5 },
      // { x: 73, y: 66.5 },
      // { x: 73, y: 67 },
      // { x: RING_EXTERNAL_LEFT_X, y: 68 },
      // { x: RING_EXTERNAL_LEFT_X, y: 68.25 },
      // { x: 73, y: 69.25 },
      // { x: 73, y: 69.75 },
      // { x: RING_EXTERNAL_LEFT_X, y: 70.75 },
      // { x: RING_EXTERNAL_LEFT_X, y: 71 },
      // { x: 73, y: 72 },
      // { x: 73, y: 72.5 },
      // { x: RING_EXTERNAL_LEFT_X, y: 73.5 },
      // { x: RING_EXTERNAL_LEFT_X, y: 73.75 },
      // { x: 73, y: 74.75 },
      // { x: 73, y: 75.25 },
      // { x: RING_EXTERNAL_LEFT_X, y: 76.25 },
      // { x: RING_EXTERNAL_LEFT_X, y: 76.5 },
      // { x: 73, y: 77.5 },
      // { x: 73, y: 78 },
      // { x: RING_EXTERNAL_LEFT_X, y: 79 },
      // { x: RING_EXTERNAL_LEFT_X, y: 79.25 },
      // { x: 73, y: 80.25 },
      // { x: 73, y: 80.75 },
      // { x: MOTOR_HEAD_INTERNAL_MINIMUM_RADIUS_RIGHT, y: 80.75 },
      {
        x: MOTOR_HEAD_INTERNAL_MINIMUM_RADIUS_RIGHT,
        y: MOTOR_HEAD_MAXIMUM_HEIGHT,
      },

      {
        x: MOTOR_HEAD_INTERNAL_MINIMUM_RADIUS_LEFT,
        y: MOTOR_HEAD_MAXIMUM_HEIGHT,
      },
      // { x: MOTOR_HEAD_INTERNAL_MINIMUM_RADIUS_LEFT, y: 80.75 },
      // { x: 12, y: 80.75 },
      // { x: 12, y: 80.25 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 79.25 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 79 },
      // { x: 12, y: 78 },
      // { x: 12, y: 77.5 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 76.5 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 76.25 },
      // { x: 12, y: 75.25 },
      // { x: 12, y: 74.75 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 73.75 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 73.5 },
      // { x: 12, y: 72.5 },
      // { x: 12, y: 72 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 71 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 70.75 },
      // { x: 12, y: 69.75 },
      // { x: 12, y: 69.25 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 68.25 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 68 },
      // { x: 12, y: 67 },
      // { x: 12, y: 66.5 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 65.5 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 65.25 },
      // { x: 12, y: 64.25 },
      // { x: 12, y: 63.75 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 62.75 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 62.5 },
      // { x: 12, y: 61.5 },
      // { x: 12, y: 61 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 60 },
      { x: RING_EXTERNAL_RIGHT_X, y: RING_SUPERIOR_DOWN_Y },
    ];

    let motorChain = [
      { x: MOTOR_CHAIN_RIGHT_X, y: MOTOR_CHAIN_TOP_Y },
      { x: MOTOR_CHAIN_LEFT_X, y: MOTOR_CHAIN_TOP_Y },
      { x: MOTOR_CHAIN_LEFT_X, y: MOTOR_CHAIN_BOTTOM_Y },
      { x: MOTOR_CHAIN_RIGHT_X, y: MOTOR_CHAIN_BOTTOM_Y },
      { x: MOTOR_CHAIN_RIGHT_X, y: MOTOR_CHAIN_TOP_Y },
    ];

    let internalNozzleLeft = [
      { x: NOZZLE_INTERNAL_MINIMUM_RADIUS_LEFT, y: NOZZLE_MAXIMUM_HEIGHT },
      // { x: NOZZLE_INTERNAL_MINIMUM_RADIUS_LEFT, y: 353.5 },

      // { x: 12, y: 353.5 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 354.5 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 354.75 },
      // { x: 12, y: 355.75 },
      // { x: 12, y: 356.25 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 357.25 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 357.5 },
      // { x: 12, y: 358.5 },
      // { x: 12, y: 359 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 360 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 360.25 },
      // { x: 12, y: 361.25 },
      // { x: 12, y: 361.75 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 362.75 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 363 },
      // { x: 12, y: 364 },
      // { x: 12, y: 364.5 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 365.5 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 365.75 },
      // { x: 12, y: 366.75 },
      // { x: 12, y: 367.25 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 368.25 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 368.5 },
      // { x: 12, y: 369.5 },
      // { x: 12, y: 370 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 371 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 371.25 },
      // { x: 12, y: 372.25 },
      // { x: 12, y: 372.75 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 373.75 },
      // { x: RING_EXTERNAL_RIGHT_X, y: 374 },
      { x: RING_EXTERNAL_RIGHT_X, y: RING_INFERIOR_UP_Y },
      { x: RING_EXTERNAL_LEFT_X, y: RING_INFERIOR_UP_Y },
    ];

    let internalNozzleRight = [
      { x: NOZZLE_INTERNAL_MINIMUM_RADIUS_RIGHT, y: NOZZLE_MAXIMUM_HEIGHT },
      // { x: NOZZLE_INTERNAL_MINIMUM_RADIUS_RIGHT, y: 353.5 },

      // { x: 73, y: 353.5 },
      // { x: RING_EXTERNAL_LEFT_X, y: 354.5 },
      // { x: RING_EXTERNAL_LEFT_X, y: 354.75 },
      // { x: 73, y: 355.75 },
      // { x: 73, y: 356.25 },
      // { x: RING_EXTERNAL_LEFT_X, y: 357.25 },
      // { x: RING_EXTERNAL_LEFT_X, y: 357.5 },
      // { x: 73, y: 358.5 },
      // { x: 73, y: 359 },
      // { x: RING_EXTERNAL_LEFT_X, y: 360 },
      // { x: RING_EXTERNAL_LEFT_X, y: 360.25 },
      // { x: 73, y: 361.25 },
      // { x: 73, y: 361.75 },
      // { x: RING_EXTERNAL_LEFT_X, y: 362.75 },
      // { x: RING_EXTERNAL_LEFT_X, y: 363 },
      // { x: 73, y: 364 },
      // { x: 73, y: 364.5 },
      // { x: RING_EXTERNAL_LEFT_X, y: 365.5 },
      // { x: RING_EXTERNAL_LEFT_X, y: 365.75 },
      // { x: 73, y: 366.75 },
      // { x: 73, y: 367.25 },
      // { x: RING_EXTERNAL_LEFT_X, y: 368.25 },
      // { x: RING_EXTERNAL_LEFT_X, y: 368.5 },
      // { x: 73, y: 369.5 },
      // { x: 73, y: 370 },
      // { x: RING_EXTERNAL_LEFT_X, y: 371 },
      // { x: RING_EXTERNAL_LEFT_X, y: 371.25 },
      // { x: 73, y: 372.25 },
      // { x: 73, y: 372.75 },
      // { x: RING_EXTERNAL_LEFT_X, y: 373.75 },
      // { x: RING_EXTERNAL_LEFT_X, y: 374 },
      { x: RING_EXTERNAL_LEFT_X, y: RING_INFERIOR_UP_Y },
    ];

    let lineFunction = d3
      .line()
      .x((d) => {
        return d.x;
      })
      .y((d) => {
        return d.y;
      })
      .curve(d3.curveLinear);
    let svgContainer = d3
      .select("#motor-front-view")
      .append("svg")
      .attr("width", MAX_WIDTH)
      .attr("height", MAX_HEIGHT);

    const DrawRocketBody = (svgContainer, pointersList) => {
      pointersList.forEach((list) => {
        svgContainer
          .append("path")
          .attr("d", lineFunction(list))
          .attr("stroke", "black")
          .attr("stroke-width", 1)
          .attr("fill", "none");
      });
    };
    DrawRocketBody(svgContainer, [
      externalRectangle,
      nozzleHead,
      headHead,
      headMotorInternalLines,
      internalMotorHeadLines,
      motorChain,
      internalNozzleLeft,
      internalNozzleRight,
    ]);
  };

  render() {
    const { classes } = this.props;
    console.log("rodei");
    this.createMotorDraw();
    return (
      <div>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <svg className={classes.icon} id="motor-front-view"></svg>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  motorChain: state.motorChain.motorChain,
  headMotor: state.headMotor.headMotor,
  motorNozzle: state.motorNozzle.motorNozzle,
  materials: state.motorChain.allMaterials,
  calculationType: state.motorChain.calculationType,
  calculatedData: state.motorChain.calculatedData,
  buttonIsDisabled: state.motorChain.buttonIsDisabled,
});

export default connect(mapStateToProps)(withStyles(useStyles)(MotorView));
