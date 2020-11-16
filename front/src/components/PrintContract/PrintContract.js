import React from "react";
import PrintContractContent from "./PrintContractContent";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    flexDirection: "column",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    "@media print": {
      display: "none",
    },
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function PrintContract() {
  const classes = useStyles();

  const history = useHistory();

  const handleBack = () => {
    history.push("/create");
  };

  return (
    <div className={classes.flex}>
      <PrintContractContent />
      <div className={classes.buttons}>
        <style>{`@media print {.buttons{display: none;}}`}</style>
        <Button
          onClick={handleBack}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Назад
        </Button>
      </div>
    </div>
  );
}
