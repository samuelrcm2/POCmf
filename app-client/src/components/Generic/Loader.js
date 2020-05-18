import React, { useEffect, useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../Services/api";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 100000000,
  },
}));

const Loader = (props) => {
  const { children } = props;
  const [requestCounter, setRequestCounter] = useState(0);
  const classes = useStyles();

  let newValue = 0;
  const handleLoader = (diff) => {
    newValue += diff;

    return setRequestCounter(newValue);
  };

  useEffect(() => {
    api.interceptors.request.use(
      (config) => {
        handleLoader(1);
        return config;
      },
      (error) => {
        handleLoader(-1);
        return Promise.reject(error);
      }
    );

    api.interceptors.response.use(
      (response) => {
        handleLoader(-1);
        return response;
      },
      (error) => {
        handleLoader(-1);
        return Promise.reject(error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading = () => {
    return requestCounter > 0;
  };

  return (
    <>
      {children}
      <Backdrop className={classes.backdrop} open={isLoading()}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};

export default Loader;
