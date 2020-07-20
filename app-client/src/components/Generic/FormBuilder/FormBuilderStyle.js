import { createStyles, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        width: 130,
        color: "white",
        border: "white",
      },
      "& .MuiFormLabel-root": {
        fontSize: "10px",
      },
      "& .MuiInputBase-input": {
        fontSize: "10px",
      },
    },
    margin: {
      margin: theme.spacing(1),
    },
    input: {
      color: "black",
    },
    textField: {
      width: 300,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 130,
    },
    select: {
      fontSize: "10px",
    },
    button: {
      display: "flex",
      justifyContent: "center",
      paddingTop: "10px",
      paddingBottom: "10px",
    },
    result: {
      color: "Black",
      display: "flex",
      justifyContent: "flex-start",
    },
    resultPaper: {
      width: "50%",
      marginRight: "5px",
    },
    switch: {
      paddingTop: "10px",
      paddingLeft: "15px",
    },
    form: {
      display: "flex",
      justifyContent: "space-evenly",
    },
  })
);
