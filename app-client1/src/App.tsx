import React from "react";
import { Provider } from "react-redux";

import SideBar from "./components/SideBar";
import MotorChainComponent from "./components/MotorChain";
import { MotorChain } from "./store/ducks/motorChain/types";
import store from "./store/index";
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
      <div className="Main" style={{ backgroundColor: "black" }}>
        <SideBar />
        <MotorChainComponent motorChan={new MotorChain()} />
      </div>
    </ThemeProvider>
  </Provider>
);

export default App;
