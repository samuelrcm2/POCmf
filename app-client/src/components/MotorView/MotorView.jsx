import React, { Component } from "react";
import { connect } from "react-redux";

import * as d3 from "d3";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { isNilOrEmpty } from "ramda-adjunct";

import { CalculationTypes } from "../../store/motorChain/motorChainTypes";

const useStyles = () => ({
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
    if (this.isValueInvalid(this.props.motorChain.internalRadius)) return false;

    if (this.isValueInvalid(this.props.motorChain.height)) return false;

    if (
      this.props.calculationType !== CalculationTypes.THICKNESS &&
      this.isValueInvalid(this.props.motorChain.thickness)
    )
      return false;

    if (this.isValueInvalid(this.props.headMotor.screwHeight)) return false;

    if (this.isValueInvalid(this.props.headMotor.internalHeadHeight))
      return false;

    if (this.isValueInvalid(this.props.headMotor.externalHeadHeight))
      return false;

    if (isNilOrEmpty(this.props.headMotor.afterScrewHeight)) return false;

    if (this.isValueInvalid(this.props.headMotor.internalRadius)) return false;

    if (this.isValueInvalid(this.props.headMotor.internalMinorRadius))
      return false;

    if (isNilOrEmpty(this.props.motorNozzle.afterScrewHeight)) return false;

    if (this.isValueInvalid(this.props.motorNozzle.screwHeight)) return false;

    if (this.isValueInvalid(this.props.motorNozzle.internalHeight)) return false;

    if (this.isValueInvalid(this.props.motorNozzle.externalHeight)) return false;

    if (this.isValueInvalid(this.props.motorNozzle.internalMajorRadius))
      return false;

    if (this.isValueInvalid(this.props.motorNozzle.internalMinorRadius))
      return false;

    return true;
  };

  isValueInvalid = (value) => isNilOrEmpty(value) || value === 0;

  createMotorDraw = () => {
    if (!this.checkIfHasData()) {
      d3.select(".svg-container").remove();
      return;
    }
    //Ainda não definido dinamicamente no projeto
    const SEALING_RING_THICKNESS = 2;
    const SEALING_RING_RADIUS_DIFFERENCE = 2;

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
      this.props.headMotor.internalHeadHeight +
      this.props.headMotor.externalHeadHeight +
      this.props.motorNozzle.externalHeight +
      this.props.motorNozzle.internalHeight;
    const scaleFactor = (MAX_HEIGHT - 2 * MIN_Y) / (MAX_Y + MIN_Y);
    const xOffset = (MAX_WIDTH - scaleFactor * (MAX_X + MIN_X)) / 2;

    const HEAD_MOTOR_MINIMUM_THICKNESS =
      this.props.motorChain.thickness +
      this.props.motorChain.internalRadius -
      this.props.headMotor.internalRadius;
    const MOTOR_NOZZLE_MINIMUM_THICKNESS =
      this.props.motorChain.thickness +
      this.props.motorChain.internalRadius -
      this.props.motorNozzle.internalMajorRadius;

    const EXTERNAL_HEAD_HEIGHT =
      MIN_Y + this.props.headMotor.externalHeadHeight;
    const HEAD_MOTOR_RING_EXTERNAL_LEFT_X =
      MIN_X + HEAD_MOTOR_MINIMUM_THICKNESS;
    const HEAD_MOTOR_RING_INTERNAL_LEFT_X =
      MIN_X + HEAD_MOTOR_MINIMUM_THICKNESS + SEALING_RING_RADIUS_DIFFERENCE;
    const HEAD_MOTOR_RING_EXTERNAL_RIGHT_X =
      MAX_X - HEAD_MOTOR_MINIMUM_THICKNESS;
    const HEAD_MOTOR_RING_INTERNAL_RIGHT_X =
      MAX_X - (HEAD_MOTOR_MINIMUM_THICKNESS + SEALING_RING_RADIUS_DIFFERENCE);

    const MOTOR_NOZZLE_RING_EXTERNAL_LEFT_X =
      MIN_X + MOTOR_NOZZLE_MINIMUM_THICKNESS;
    const MOTOR_NOZZLE_RING_INTERNAL_LEFT_X =
      MIN_X + MOTOR_NOZZLE_MINIMUM_THICKNESS + SEALING_RING_RADIUS_DIFFERENCE;
    const MOTOR_NOZZLE_RING_EXTERNAL_RIGHT_X =
      MAX_X - MOTOR_NOZZLE_MINIMUM_THICKNESS;
    const MOTOR_NOZZLE_RING_INTERNAL_RIGHT_X =
      MAX_X - (MOTOR_NOZZLE_MINIMUM_THICKNESS + SEALING_RING_RADIUS_DIFFERENCE);

    const RING_SUPERIOR_DOWN_Y =
      MIN_Y + this.props.headMotor.externalHeadHeight + SEALING_RING_THICKNESS;
    const RING_INFERIOR_UP_Y =
      MAX_Y - (this.props.motorNozzle.externalHeight + SEALING_RING_THICKNESS);
    const RING_INFERIOR_DOWN_Y = MAX_Y - this.props.motorNozzle.externalHeight;

    const MOTOR_HEAD_INTERNAL_MINIMUM_RADIUS_LEFT =
      MIN_X +
      this.props.motorChain.thickness +
      this.props.motorChain.internalRadius -
      this.props.headMotor.internalMinorRadius;
    const MOTOR_HEAD_INTERNAL_MINIMUM_RADIUS_RIGHT =
      MIN_X +
      this.props.motorChain.thickness +
      this.props.motorChain.internalRadius +
      this.props.headMotor.internalMinorRadius;
    const MOTOR_HEAD_MAXIMUM_HEIGHT =
      MIN_Y +
      this.props.headMotor.externalHeadHeight +
      this.props.headMotor.internalHeadHeight;

    const MOTOR_HEAD_INTERNAL_INICIAL_HEIGHT =
      MOTOR_HEAD_MAXIMUM_HEIGHT -
      (this.props.headMotor.afterScrewHeight +
        this.props.headMotor.screwHeight);

    const NOZZLE_INTERNAL_MINIMUM_RADIUS_LEFT =
      MIN_X +
      this.props.motorChain.thickness +
      this.props.motorChain.internalRadius -
      this.props.motorNozzle.internalMinorRadius;
    const NOZZLE_INTERNAL_MINIMUM_RADIUS_RIGHT =
      MIN_X + 
      this.props.motorChain.thickness +
      this.props.motorChain.internalRadius +
      this.props.motorNozzle.internalMinorRadius;
    const NOZZLE_MAXIMUM_HEIGHT =
      MAX_Y -
      (this.props.motorNozzle.externalHeight +
        this.props.motorNozzle.internalHeight);
    const NOZZLE_FINAL_MINIMUM_RADIUS_HEIGHT =
      NOZZLE_MAXIMUM_HEIGHT + this.props.motorNozzle.afterScrewHeight;
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
      {
        x: MIN_X,
        y: EXTERNAL_HEAD_HEIGHT,
      },
      //Anel de vedação superior
      {
        x: HEAD_MOTOR_RING_INTERNAL_LEFT_X,
        y: EXTERNAL_HEAD_HEIGHT,
      },
      {
        x: HEAD_MOTOR_RING_INTERNAL_LEFT_X,
        y: RING_SUPERIOR_DOWN_Y,
      },
      {
        x: HEAD_MOTOR_RING_EXTERNAL_LEFT_X,
        y: RING_SUPERIOR_DOWN_Y,
      },
      {
        x: HEAD_MOTOR_RING_EXTERNAL_LEFT_X,
        y: EXTERNAL_HEAD_HEIGHT,
      },
    ];

    let nozzleHead = [
      //Anel de vedação inferior
      {
        x: MOTOR_NOZZLE_RING_EXTERNAL_LEFT_X,
        y: RING_INFERIOR_DOWN_Y,
      },
      {
        x: MOTOR_NOZZLE_RING_EXTERNAL_LEFT_X,
        y: RING_INFERIOR_UP_Y,
      },
      {
        x: MOTOR_NOZZLE_RING_INTERNAL_LEFT_X,
        y: RING_INFERIOR_UP_Y,
      },
      {
        x: MOTOR_NOZZLE_RING_INTERNAL_LEFT_X,
        y: RING_INFERIOR_DOWN_Y,
      },

      {
        x: MIN_X,
        y: RING_INFERIOR_DOWN_Y,
      },
      {
        x: MAX_X,
        y: RING_INFERIOR_DOWN_Y,
      },
      //Anel de vedação inferior
      {
        x: MOTOR_NOZZLE_RING_INTERNAL_RIGHT_X,
        y: RING_INFERIOR_DOWN_Y,
      },
      {
        x: MOTOR_NOZZLE_RING_INTERNAL_RIGHT_X,
        y: RING_INFERIOR_UP_Y,
      },
      {
        x: MOTOR_NOZZLE_RING_EXTERNAL_RIGHT_X,
        y: RING_INFERIOR_UP_Y,
      },
      {
        x: MOTOR_NOZZLE_RING_EXTERNAL_RIGHT_X,
        y: RING_INFERIOR_DOWN_Y,
      },
    ];

    let headHead = [
      {
        x: MOTOR_NOZZLE_RING_EXTERNAL_RIGHT_X,
        y: EXTERNAL_HEAD_HEIGHT,
      },
      //Anel de vedação superior
      {
        x: HEAD_MOTOR_RING_EXTERNAL_RIGHT_X,
        y: RING_SUPERIOR_DOWN_Y,
      },
      {
        x: HEAD_MOTOR_RING_INTERNAL_RIGHT_X,
        y: RING_SUPERIOR_DOWN_Y,
      },
      {
        x: HEAD_MOTOR_RING_INTERNAL_RIGHT_X,
        y: EXTERNAL_HEAD_HEIGHT,
      },

      {
        x: MAX_X,
        y: EXTERNAL_HEAD_HEIGHT,
      },
      //Linhas internas
      {
        x: HEAD_MOTOR_RING_INTERNAL_LEFT_X,
        y: EXTERNAL_HEAD_HEIGHT,
      },
    ];

    let headMotorInternalLines = [
      {
        x: HEAD_MOTOR_RING_INTERNAL_RIGHT_X,
        y: RING_INFERIOR_DOWN_Y,
      },
      {
        x: HEAD_MOTOR_RING_INTERNAL_RIGHT_X,
        y: RING_INFERIOR_UP_Y,
      },
      {
        x: HEAD_MOTOR_RING_EXTERNAL_RIGHT_X,
        y: RING_INFERIOR_UP_Y,
      },
      {
        x: HEAD_MOTOR_RING_EXTERNAL_RIGHT_X,
        y: RING_INFERIOR_DOWN_Y,
      },
    ];

    let headMotorLeftScrewLines = [
      {
        x: HEAD_MOTOR_RING_EXTERNAL_LEFT_X,
        y: RING_SUPERIOR_DOWN_Y,
      },
      {
        x: HEAD_MOTOR_RING_EXTERNAL_LEFT_X,
        y: MOTOR_HEAD_INTERNAL_INICIAL_HEIGHT,
      },
    ];
    const hmScrewCoordenatePointsLeft = this.hmCreateScrewCoordenatesLeftSide(
      {
        x: HEAD_MOTOR_RING_EXTERNAL_LEFT_X,
        y: MOTOR_HEAD_INTERNAL_INICIAL_HEIGHT,
      },
      this.props.headMotor
    );
    hmScrewCoordenatePointsLeft.forEach((c) => headMotorLeftScrewLines.push(c));
    headMotorLeftScrewLines.push({
      x: MOTOR_HEAD_INTERNAL_MINIMUM_RADIUS_LEFT,
      y: MOTOR_HEAD_MAXIMUM_HEIGHT,
    });

    let headMotorRightScrewLines = [
      {
        x: HEAD_MOTOR_RING_INTERNAL_LEFT_X,
        y: RING_SUPERIOR_DOWN_Y,
      },
      {
        x: HEAD_MOTOR_RING_EXTERNAL_RIGHT_X,
        y: RING_SUPERIOR_DOWN_Y,
      },
      {
        x: HEAD_MOTOR_RING_EXTERNAL_RIGHT_X,
        y: MOTOR_HEAD_INTERNAL_INICIAL_HEIGHT,
      },
    ];
    const hmScrewCoordenatePoints = this.hmCreateScrewCoordenatesRightSide(
      {
        x: HEAD_MOTOR_RING_EXTERNAL_RIGHT_X,
        y: MOTOR_HEAD_INTERNAL_INICIAL_HEIGHT,
      },
      this.props.headMotor
    );
    hmScrewCoordenatePoints.forEach((c) => headMotorRightScrewLines.push(c));
    headMotorRightScrewLines.push({
      x: MOTOR_HEAD_INTERNAL_MINIMUM_RADIUS_RIGHT,
      y: MOTOR_HEAD_MAXIMUM_HEIGHT,
    });
    headMotorRightScrewLines.push({
      x: MOTOR_HEAD_INTERNAL_MINIMUM_RADIUS_LEFT,
      y: MOTOR_HEAD_MAXIMUM_HEIGHT,
    });

    let motorChain = [
      {
        x: MOTOR_CHAIN_RIGHT_X,
        y: MOTOR_CHAIN_TOP_Y,
      },
      {
        x: MOTOR_CHAIN_LEFT_X,
        y: MOTOR_CHAIN_TOP_Y,
      },
      {
        x: MOTOR_CHAIN_LEFT_X,
        y: MOTOR_CHAIN_BOTTOM_Y,
      },
      {
        x: MOTOR_CHAIN_RIGHT_X,
        y: MOTOR_CHAIN_BOTTOM_Y,
      },
      {
        x: MOTOR_CHAIN_RIGHT_X,
        y: MOTOR_CHAIN_TOP_Y,
      },
    ];

    let internalNozzleLeft = [
      {
        x: NOZZLE_INTERNAL_MINIMUM_RADIUS_LEFT,
        y: NOZZLE_MAXIMUM_HEIGHT,
      },
      {
        x: NOZZLE_INTERNAL_MINIMUM_RADIUS_LEFT,
        y: NOZZLE_FINAL_MINIMUM_RADIUS_HEIGHT,
      },
    ];

    const mnScrewLinesLeft = this.mnCreateScrewCoordenatesLeftSide(
      {
        x: NOZZLE_INTERNAL_MINIMUM_RADIUS_LEFT,
        y: NOZZLE_FINAL_MINIMUM_RADIUS_HEIGHT,
      },
      this.props.motorNozzle
    );
    mnScrewLinesLeft.forEach((c) => internalNozzleLeft.push(c));
    internalNozzleLeft.push({
      x: MOTOR_NOZZLE_RING_EXTERNAL_LEFT_X,
      y: RING_INFERIOR_UP_Y,
    });
    internalNozzleLeft.push({
      x: MOTOR_NOZZLE_RING_EXTERNAL_RIGHT_X,
      y: RING_INFERIOR_UP_Y,
    });

    let internalNozzleRight = [
      {
        x: NOZZLE_INTERNAL_MINIMUM_RADIUS_RIGHT,
        y: NOZZLE_MAXIMUM_HEIGHT,
      },
      {
        x: NOZZLE_INTERNAL_MINIMUM_RADIUS_RIGHT,
        y: NOZZLE_FINAL_MINIMUM_RADIUS_HEIGHT,
      },
    ];
    const mnScrewLinesRight = this.mnCreateScrewCoordenatesRightide(
      {
        x: NOZZLE_INTERNAL_MINIMUM_RADIUS_RIGHT,
        y: NOZZLE_FINAL_MINIMUM_RADIUS_HEIGHT,
      },
      this.props.motorNozzle
    );
    mnScrewLinesRight.forEach((c) => internalNozzleRight.push(c));
    internalNozzleRight.push({
      x: MOTOR_NOZZLE_RING_EXTERNAL_RIGHT_X,
      y: RING_INFERIOR_UP_Y,
    });
    let lineMotorFunction = d3
      .line()
      .x((d) => {
        return d.x * scaleFactor + xOffset;
      })
      .y((d) => {
        return d.y * scaleFactor;
      })
      .curve(d3.curveLinear);

    let lineFunction = d3
      .line()
      .x((d) => {
        return d.x.toFixed(3);
      })
      .y((d) => {
        return d.y.toFixed(3);
      })
      .curve(d3.curveLinear);

    d3.select(".svg-container").remove();

    d3.select("#motor-view-container")
      .append("div")
      .classed("svg-container", true);

    let svgContainer = d3
      .select(".svg-container")
      .append("svg")
      .attr("width", MAX_WIDTH)
      .attr("height", MAX_HEIGHT);

    svgContainer
      .append("text")
      .attr("x", () => MAX_WIDTH - 50)
      .attr("y", () => MAX_HEIGHT - MIN_Y)
      .text(() => {
        const scaleValue = 25 / scaleFactor;
        return `${scaleValue.toFixed(3)}mm`;
      });

    let scaleLine = [
      { x: MAX_WIDTH - 2 * MIN_X, y: MAX_HEIGHT - 5 * MIN_Y },
      { x: MAX_WIDTH - (2 * MIN_X + 25), y: MAX_HEIGHT - 5 * MIN_Y },
    ];

    svgContainer
      .append("path")
      .attr("d", lineFunction(scaleLine))
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("fill", "none");

    const DrawRocketBody = (svgContainer, pointersList) => {
      pointersList.forEach((list) => {
        svgContainer
          .append("path")
          .attr("d", lineMotorFunction(list))
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
      headMotorLeftScrewLines,
      headMotorRightScrewLines,
      motorChain,
      internalNozzleLeft,
      internalNozzleRight,
    ]);
  };

  hmCreateScrewCoordenatesRightSide = (inicialCordenate, headMotor) => {
    const diamtetersDifference = Number(
      headMotor.screwPattern.minMajorDiameter -
        headMotor.screwPattern.minMinorDiameter
    );
    const cogOffset = Number((headMotor.screwPattern.pitch * 5) / 16);
    const finalXValue = Number(
      inicialCordenate.x -
        headMotor.internalRadius +
        headMotor.internalMinorRadius
    );
    let screwCoordenates = [];
    let coordenate = {
      x:
        inicialCordenate.x -
        headMotor.internalRadius +
        headMotor.screwPattern.minMinorDiameter / 2,
      y: inicialCordenate.y,
    };
    screwCoordenates.push(coordenate);
    while (
      coordenate.y + headMotor.screwPattern.pitch - inicialCordenate.y <
      headMotor.screwHeight
    ) {
      let firstPoint = {
        x: coordenate.x,
        y: coordenate.y + headMotor.screwPattern.pitch / 4,
      };
      screwCoordenates.push(firstPoint);
      let secondPoint = {
        x: firstPoint.x + diamtetersDifference,
        y: firstPoint.y + cogOffset,
      };
      screwCoordenates.push(secondPoint);
      let thridPoint = {
        x: secondPoint.x,
        y: secondPoint.y + headMotor.screwPattern.pitch / 8,
      };
      screwCoordenates.push(thridPoint);
      let fourthPoint = {
        x: thridPoint.x - diamtetersDifference,
        y: thridPoint.y + cogOffset,
      };
      screwCoordenates.push(fourthPoint);
      coordenate = fourthPoint;
    }
    screwCoordenates.push({
      x: coordenate.x,
      y: headMotor.screwHeight + inicialCordenate.y,
    });
    screwCoordenates.push({
      x: finalXValue,
      y: headMotor.screwHeight + inicialCordenate.y,
    });
    return screwCoordenates;
  };

  hmCreateScrewCoordenatesLeftSide = (inicialCordenate, headMotor) => {
    const diamtetersDifference = Number(
      headMotor.screwPattern.minMajorDiameter -
        headMotor.screwPattern.minMinorDiameter
    );
    const cogOffset = Number((headMotor.screwPattern.pitch * 5) / 16);
    const finalXValue = Number(
      inicialCordenate.x +
        headMotor.internalRadius -
        headMotor.internalMinorRadius
    );
    let screwCoordenates = [];
    let coordenate = {
      x:
        inicialCordenate.x +
        headMotor.internalRadius -
        headMotor.screwPattern.minMinorDiameter / 2,
      y: inicialCordenate.y,
    };
    screwCoordenates.push(coordenate);
    while (
      coordenate.y + headMotor.screwPattern.pitch - inicialCordenate.y <
      headMotor.screwHeight
    ) {
      let firstPoint = {
        x: coordenate.x,
        y: coordenate.y + headMotor.screwPattern.pitch / 4,
      };
      screwCoordenates.push(firstPoint);
      let secondPoint = {
        x: firstPoint.x - diamtetersDifference,
        y: firstPoint.y + cogOffset,
      };
      screwCoordenates.push(secondPoint);
      let thridPoint = {
        x: secondPoint.x,
        y: secondPoint.y + headMotor.screwPattern.pitch / 8,
      };
      screwCoordenates.push(thridPoint);
      let fourthPoint = {
        x: thridPoint.x + diamtetersDifference,
        y: thridPoint.y + cogOffset,
      };
      screwCoordenates.push(fourthPoint);
      coordenate = fourthPoint;
    }
    screwCoordenates.push({
      x: coordenate.x,
      y: headMotor.screwHeight + inicialCordenate.y,
    });
    screwCoordenates.push({
      x: finalXValue,
      y: headMotor.screwHeight + inicialCordenate.y,
    });
    return screwCoordenates;
  };

  mnCreateScrewCoordenatesRightide = (inicialCordenate, motorNozzle) => {
    const diamtetersDifference = Number(
      motorNozzle.screwPattern.minMajorDiameter -
        motorNozzle.screwPattern.minMinorDiameter
    );
    const cogOffset = Number((motorNozzle.screwPattern.pitch * 5) / 16);
    const finalXValue = Number(
      inicialCordenate.x +
        motorNozzle.internalMajorRadius -
        motorNozzle.internalMinorRadius
    );
    let screwCoordenates = [];
    let coordenate = {
      x:
        inicialCordenate.x -
        motorNozzle.internalMinorRadius +
        motorNozzle.screwPattern.minMinorDiameter / 2,
      y: inicialCordenate.y,
    };
    screwCoordenates.push(coordenate);
    while (
      coordenate.y + motorNozzle.screwPattern.pitch - inicialCordenate.y <
      motorNozzle.screwHeight
    ) {
      let firstPoint = {
        x: coordenate.x,
        y: coordenate.y + motorNozzle.screwPattern.pitch / 4,
      };
      screwCoordenates.push(firstPoint);
      let secondPoint = {
        x: firstPoint.x + diamtetersDifference,
        y: firstPoint.y + cogOffset,
      };
      screwCoordenates.push(secondPoint);
      let thridPoint = {
        x: secondPoint.x,
        y: secondPoint.y + motorNozzle.screwPattern.pitch / 8,
      };
      screwCoordenates.push(thridPoint);
      let fourthPoint = {
        x: thridPoint.x - diamtetersDifference,
        y: thridPoint.y + cogOffset,
      };
      screwCoordenates.push(fourthPoint);
      coordenate = fourthPoint;
    }
    screwCoordenates.push({
      x: coordenate.x,
      y: motorNozzle.screwHeight + inicialCordenate.y,
    });
    screwCoordenates.push({
      x: finalXValue,
      y: motorNozzle.screwHeight + inicialCordenate.y,
    });
    return screwCoordenates;
  };
  mnCreateScrewCoordenatesLeftSide = (inicialCordenate, motorNozzle) => {
    const diamtetersDifference = Number(
      motorNozzle.screwPattern.minMajorDiameter -
        motorNozzle.screwPattern.minMinorDiameter
    );
    const cogOffset = Number((motorNozzle.screwPattern.pitch * 5) / 16);
    const finalXValue = Number(
      inicialCordenate.x -
        motorNozzle.internalMajorRadius +
        motorNozzle.internalMinorRadius
    );
    let screwCoordenates = [];
    let coordenate = {
      x:
        inicialCordenate.x +
        motorNozzle.internalMinorRadius -
        motorNozzle.screwPattern.minMinorDiameter / 2,
      y: inicialCordenate.y,
    };
    screwCoordenates.push(coordenate);
    while (
      coordenate.y + motorNozzle.screwPattern.pitch - inicialCordenate.y <
      motorNozzle.screwHeight
    ) {
      let firstPoint = {
        x: coordenate.x,
        y: coordenate.y + motorNozzle.screwPattern.pitch / 4,
      };
      screwCoordenates.push(firstPoint);
      let secondPoint = {
        x: firstPoint.x - diamtetersDifference,
        y: firstPoint.y + cogOffset,
      };
      screwCoordenates.push(secondPoint);
      let thridPoint = {
        x: secondPoint.x,
        y: secondPoint.y + motorNozzle.screwPattern.pitch / 8,
      };
      screwCoordenates.push(thridPoint);
      let fourthPoint = {
        x: thridPoint.x + diamtetersDifference,
        y: thridPoint.y + cogOffset,
      };
      screwCoordenates.push(fourthPoint);
      coordenate = fourthPoint;
    }
    screwCoordenates.push({
      x: coordenate.x,
      y: motorNozzle.screwHeight + inicialCordenate.y,
    });
    screwCoordenates.push({
      x: finalXValue,
      y: motorNozzle.screwHeight + inicialCordenate.y,
    });
    return screwCoordenates;
  };

  render() {
    const { classes } = this.props;
    this.createMotorDraw();
    if (!this.checkIfHasData()) return null
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
            <Paper className={classes.paper} id="motor-view-container"></Paper>
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
