import React from "react";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import BugReportIcon from "@material-ui/icons/BugReport";

const useStyles = makeStyles((theme) =>
  createStyles({
    icon: {
      width: "300px",
      height: "300px",
    },
    paper: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },
  })
);
const MotorView = () => {
  const classes = useStyles();
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
            <Tooltip
              title="The component MotorView was not implemented yet"
              placeholder="bottom"
            >
              <BugReportIcon className={classes.icon} color="primary" />
            </Tooltip>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default MotorView;
