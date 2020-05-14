import React from "react";
import { Provider } from "react-redux";

import SideBar from "./components/SideBar/SideBar";
import MotorChainComponent from "./components/MotorChain/MotorChain";
import { MotorChain } from "./store/motorChain/motorChainTypes";
import store from "./store/store";
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
      <div className="Main">
        <SideBar />
        <MotorChainComponent motorChain={new MotorChain()} />
      </div>
    </ThemeProvider>
  </Provider>
);

export default App;
