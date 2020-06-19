import React from "react";
import { Provider } from "react-redux";

import SideBar from "./components/SideBar/SideBar";
import MotorChainComponent from "./components/MotorChain/MotorChain";
import HeadMotorComponent from "./components/HeadMotor/HeadMotor";
import MotorView from "./components/MotorView/MotorView";
import { MotorChain } from "./store/motorChain/motorChainTypes";
import store from "./store/store";
import Loader from "./components/Generic/Loader";
import GenericAlert from "./components/Generic/Alert";
import "./App.css";

import Grid from "@material-ui/core/Grid";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import lime from "@material-ui/core/colors/lime";
import green from "@material-ui/core/colors/green";
const theme = createMuiTheme({
  palette: {
    primary: lime,
    secondary: green,
  },
});

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Loader>
        <div className="Main">
          <SideBar />
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <MotorView />
            </Grid>
            <Grid item xs={6}>
              <MotorChainComponent motorChain={new MotorChain()} />
              <HeadMotorComponent />
            </Grid>
          </Grid>
        </div>
        <GenericAlert />
      </Loader>
    </ThemeProvider>
  </Provider>
);

export default App;
