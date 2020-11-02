import React, { useCallback, useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Form from "../Form/Form";
import Contract from "../../pages/Contract";
import WorkStatement from "../WorkStatement/WorkStatement";
import { useHttp } from "../../hooks/http.hook";
import { AppContext } from "../../context";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import PrintFormContent from '../PrintForm/PrintFormContent';
import PrintForm from '../PrintForm/PrintForm';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        Roman Lebedenko ceobit90@gmail.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Заявка", "Договор", "Акт выполненных работ"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Form />;
    case 1:
      return <Contract />;
    case 2:
      return <WorkStatement />;
    default:
      throw new Error("Unknown step");
  }
}

export default function DocumentContainer() {
  const classes = useStyles();

  const { request } = useHttp();
  const [state, setState] = useContext(AppContext);
  const [activeStep, setActiveStep] = useState(0);
  const token = useContext(AuthContext);
  const history = useHistory();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSave = () => {
    setState((state) => {
      return { ...state, pullData: true };
    });
  };

  const handlePrint = () => {
    history.push("/print");
  };

  useEffect(() => {
    if (state.pullData) {
      setState((state) => {
        return { ...state, submit: true };
      });
    }
  }, [state.pullData]);

  useEffect(async () => {
    if (state.submit) {
      try {
        const data = await request("/form", "POST", state, {
          Authorization: `Bearer${token}`,
        });
        setState((state) => {
          return { ...state, submit: false };
        });
      } catch (e) {}
      console.log("Submitted up to date", state);
    }
  }, [state.submit]);

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h6" align="center">
            Этап оформления
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={state.currentFormId === "" ? handleSave: handlePrint}
                  >
                    {" "}
                    {state.currentFormId === "" ? "Сохранить": "Печатать"}
                  </Button>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Назад
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Дальше"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
