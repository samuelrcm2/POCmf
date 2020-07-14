import React, { Component } from "react";
import * as d3 from "d3";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import BugReportIcon from "@material-ui/icons/BugReport";
import { withStyles } from "@material-ui/styles";

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
  componentDidMount() {
    let externalRectangle = [
      //Camada externa
      { x: 5, y: 5 },
      { x: 5, y: 430 },
      { x: 80, y: 430 },
      { x: 80, y: 5 },
      { x: 5, y: 5 },
      //Tampos
      { x: 5, y: 20 },
      //Anel de vedação superior
      { x: 15, y: 20 },
      { x: 15, y: 25 },
      { x: 10, y: 25 },
      { x: 10, y: 20 },
    ];
    let nozzleHead = [
      //Anel de vedação inferior
      { x: 10, y: 415 },
      { x: 10, y: 410 },
      { x: 15, y: 410 },
      { x: 15, y: 415 },

      { x: 5, y: 415 },
      { x: 80, y: 415 },
      //Anel de vedação inferior
      { x: 70, y: 415 },
      { x: 70, y: 410 },
      { x: 75, y: 410 },
      { x: 75, y: 415 },
    ];
    let headHead = [
      { x: 75, y: 20 },
      //Anel de vedação superior
      { x: 75, y: 25 },
      { x: 70, y: 25 },
      { x: 70, y: 20 },

      { x: 80, y: 20 },
      //Linhas internas
      { x: 15, y: 20 },
    ];

    let headMotorInternalLines = [
      { x: 70, y: 415 },
      { x: 70, y: 410 },
      { x: 75, y: 410 },
      { x: 75, y: 415 },
    ];

    let internalMotorHeadLines = [
      { x: 15, y: 25 },
      { x: 75, y: 25 },
      { x: 75, y: 60 },
      { x: 73, y: 61 },
      { x: 73, y: 61.5 },
      { x: 75, y: 62.5 },
      { x: 75, y: 62.75 },
      { x: 73, y: 63.75 },
      { x: 73, y: 64.25 },
      { x: 75, y: 65.25 },
      { x: 75, y: 65.5 },
      { x: 73, y: 66.5 },
      { x: 73, y: 67 },
      { x: 75, y: 68 },
      { x: 75, y: 68.25 },
      { x: 73, y: 69.25 },
      { x: 73, y: 69.75 },
      { x: 75, y: 70.75 },
      { x: 75, y: 71 },
      { x: 73, y: 72 },
      { x: 73, y: 72.5 },
      { x: 75, y: 73.5 },
      { x: 75, y: 73.75 },
      { x: 73, y: 74.75 },
      { x: 73, y: 75.25 },
      { x: 75, y: 76.25 },
      { x: 75, y: 76.5 },
      { x: 73, y: 77.5 },
      { x: 73, y: 78 },
      { x: 75, y: 79 },
      { x: 75, y: 79.25 },
      { x: 73, y: 80.25 },
      { x: 73, y: 80.75 },
      { x: 73, y: 84 },
      { x: 12, y: 84 },

      { x: 12, y: 80.75 },
      { x: 12, y: 80.25 },
      { x: 10, y: 79.25 },
      { x: 10, y: 79 },
      { x: 12, y: 78 },
      { x: 12, y: 77.5 },
      { x: 10, y: 76.5 },
      { x: 10, y: 76.25 },
      { x: 12, y: 75.25 },
      { x: 12, y: 74.75 },
      { x: 10, y: 73.75 },
      { x: 10, y: 73.5 },
      { x: 12, y: 72.5 },
      { x: 12, y: 72 },
      { x: 10, y: 71 },
      { x: 10, y: 70.75 },
      { x: 12, y: 69.75 },
      { x: 12, y: 69.25 },
      { x: 10, y: 68.25 },
      { x: 10, y: 68 },
      { x: 12, y: 67 },
      { x: 12, y: 66.5 },
      { x: 10, y: 65.5 },
      { x: 10, y: 65.25 },
      { x: 12, y: 64.25 },
      { x: 12, y: 63.75 },
      { x: 10, y: 62.75 },
      { x: 10, y: 62.5 },
      { x: 12, y: 61.5 },
      { x: 12, y: 61 },
      { x: 10, y: 60 },
      { x: 10, y: 25 },
    ];

    let motorChain = [
      { x: 73, y: 84 },
      { x: 12, y: 84 },
      { x: 12, y: 350 },
      { x: 73, y: 350 },
      { x: 73, y: 84 },
    ];

    let internalNozzleLeft = [
      { x: 12, y: 350 },

      { x: 12, y: 353.5 },
      { x: 10, y: 354.5 },
      { x: 10, y: 354.75 },
      { x: 12, y: 355.75 },
      { x: 12, y: 356.25 },
      { x: 10, y: 357.25 },
      { x: 10, y: 357.5 },
      { x: 12, y: 358.5 },
      { x: 12, y: 359 },
      { x: 10, y: 360 },
      { x: 10, y: 360.25 },
      { x: 12, y: 361.25 },
      { x: 12, y: 361.75 },
      { x: 10, y: 362.75 },
      { x: 10, y: 363 },
      { x: 12, y: 364 },
      { x: 12, y: 364.5 },
      { x: 10, y: 365.5 },
      { x: 10, y: 365.75 },
      { x: 12, y: 366.75 },
      { x: 12, y: 367.25 },
      { x: 10, y: 368.25 },
      { x: 10, y: 368.5 },
      { x: 12, y: 369.5 },
      { x: 12, y: 370 },
      { x: 10, y: 371 },
      { x: 10, y: 371.25 },
      { x: 12, y: 372.25 },
      { x: 12, y: 372.75 },
      { x: 10, y: 373.75 },
      { x: 10, y: 374 },
      { x: 10, y: 410 },
      { x: 75, y: 410 },
    ];
    let internalNozzleRight = [
      { x: 73, y: 350 },

      { x: 73, y: 353.5 },
      { x: 75, y: 354.5 },
      { x: 75, y: 354.75 },
      { x: 73, y: 355.75 },
      { x: 73, y: 356.25 },
      { x: 75, y: 357.25 },
      { x: 75, y: 357.5 },
      { x: 73, y: 358.5 },
      { x: 73, y: 359 },
      { x: 75, y: 360 },
      { x: 75, y: 360.25 },
      { x: 73, y: 361.25 },
      { x: 73, y: 361.75 },
      { x: 75, y: 362.75 },
      { x: 75, y: 363 },
      { x: 73, y: 364 },
      { x: 73, y: 364.5 },
      { x: 75, y: 365.5 },
      { x: 75, y: 365.75 },
      { x: 73, y: 366.75 },
      { x: 73, y: 367.25 },
      { x: 75, y: 368.25 },
      { x: 75, y: 368.5 },
      { x: 73, y: 369.5 },
      { x: 73, y: 370 },
      { x: 75, y: 371 },
      { x: 75, y: 371.25 },
      { x: 73, y: 372.25 },
      { x: 73, y: 372.75 },
      { x: 75, y: 373.75 },
      { x: 75, y: 374 },
      { x: 75, y: 410 },
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
      .attr("width", 500)
      .attr("height", 500);

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
  }

  render() {
    const { classes } = this.props;
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
export default withStyles(useStyles)(MotorView);
