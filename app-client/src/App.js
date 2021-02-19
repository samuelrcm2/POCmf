import React, { useState} from "react";
import { Provider} from "react-redux";
import SideBar from "./components/SideBar/SideBar";
import MotorChainComponent from "./components/MotorChain/MotorChain";
import HeadMotorComponent from "./components/HeadMotor/HeadMotor";
import MotorNozzleComponent from "./components/MotorNozzle/MotorNozzle";
import CalculatedDataComponent from "./components/CalculatedData/CalculatedData";
import MotorView from "./components/MotorView/MotorView";
import { MotorChain } from "./store/motorChain/motorChainTypes";
import store from "./store/store";
import Loader from "./components/Generic/Loader";
import GenericAlert from "./components/Generic/Alert";
import AboutPage from  "./components/AboutPage/AboutPage"

import "./App.css";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import lime from "@material-ui/core/colors/lime";
import green from "@material-ui/core/colors/green";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
const theme = createMuiTheme({
  palette: {
    primary: lime,
    secondary: green,
  },
});

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: "40px",
      "& .MuiTab-root": {
        minHeight: "15px",
        alignItems: "start",
      },
      "& .MuiTab-labelIcon": {
        height: "20px",
      },
      "& .MuiTab-wrapper": {
        fontSize: "10px",
      },
      "& .MuiTabs-scroller": {
        height: "30px",
      },
    },
    root1: {
      height: "20px",
    },
  })
);
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"} variant={"body2"}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

const App = () => {
  const [page, setChosenPage] = useState(1);
  const [appBarValue, setAppBarValue] = useState(0);
  const classes = useStyles();
  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const handleChange = (_, newValue) => {
    setAppBarValue(newValue);
  };
  const setContent = () => {
    if (page === 2)
      return  (<div className="App-Body" > <AboutPage /> </div>)
    
    return (
      <div className="App-Body" >
<div className="Motor-View">
                <MotorView />
              </div>
              <div className="Form-Tabs">
              <AppBar position="static" className={classes.root}>
                  <Tabs
                    value={appBarValue}
                    onChange={handleChange}
                    aria-label="Form-tabs"
                    centered
                  >
                    <Tab
                      className={classes.root}
                      label="Motor Chain"
                      {...a11yProps(0)}
                    />
                    <Tab
                      className={classes.root}
                      label="Motor Head"
                      {...a11yProps(1)}
                    />
                    <Tab
                      className={classes.root}
                      label="Motor Nozzle"
                      {...a11yProps(2)}
                    />
                  </Tabs>
                </AppBar>
                <TabPanel value={appBarValue} index={0}>
                  <MotorChainComponent motorChain={new MotorChain()} />
                </TabPanel>
                <TabPanel value={appBarValue} index={1}>
                  <HeadMotorComponent />
                </TabPanel>
                <TabPanel value={appBarValue} index={2}>
                  <MotorNozzleComponent />
                </TabPanel>
                <CalculatedDataComponent />
              </div>
              </div>
    )
  }

  return (
    <div className="Main">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Loader>
            <SideBar setPage={(value) => setChosenPage(value)} />
              {setContent()}
            <GenericAlert />
          </Loader>
        </ThemeProvider>
      </Provider>
    </div>
  );
};

export default App;
