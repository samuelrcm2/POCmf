import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import HelpIcon from '@material-ui/icons/Help';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssessmentIcon from '@material-ui/icons/Assessment';
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const TemporaryDrawer = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    isOpem: false,
  });

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={() => setState({ ...state, isOpem: false })}
      onKeyDown={() => setState({ ...state, isOpem: false })}
    >
      <List>
          <ListItem button key={"POCmf"} onClick={() => props.setPage(1)}>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary={"POCmf"} />
          </ListItem>
          <ListItem button key={"About the Software"} onClick={() => props.setPage(2)}>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary={"About the Software"} />
          </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={() => setState({ ...state, isOpem: true })}>
        <MenuIcon style={{ color: "white"}}/>
      </Button>
      <Drawer
        open={state.isOpem}
        onClose={() => setState({ ...state, isOpem: false })}
      >
        {sideList()}
      </Drawer>
    </div>
  );
}

export default TemporaryDrawer;
