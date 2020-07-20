import { createStyles, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) =>
  createStyles({
    root: {
      result: {
        color: "Black",
        display: "flex",
        justifyContent: "flex-start",
      },
      resultPaper: {
        width: "50%",
        marginRight: "5px",
        paddingRight: "15px",
      },
    },
  })
);
