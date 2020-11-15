import React, { useContext, useEffect, useState } from "react";
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
import WorkStatement from "../../pages/WorkStatement";
import { useHttp } from "../../hooks/http.hook";
import { AppContext } from "../../context";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

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

export default function DocumentContainer() {
  const classes = useStyles();

  const { request } = useHttp();
  const [state, setState] = useContext(AppContext);
  const [activeStep, setActiveStep] = useState(0);
  const token = useContext(AuthContext);
  const history = useHistory();

  const handleNext = (e) => {
    e.preventDefault();
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setState((state) => {
      return { ...state, pullData: true };
    });
  };

  // const handleCheckAndNext = (e) => {
  //   e.preventDefault();
  //   setActiveStep(activeStep + 1);
  // };

  const handlePrint = (event) => {
    const { id } = event.target.parentElement;
    switch (id) {
      case "btnForm":
        return history.push("/printForm");
      case "btnContract":
        return history.push("/printContract");
      case "btnWorkStatement":
        return history.push("/printWorkStatement");
      default:
      // throw new Error("Неизвестная печатная форма");
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Form handleSave={handleSave} />;
      case 1:
        return <Contract handleSave={handleSave} />;
      case 2:
        return <WorkStatement handleSave={handleSave} />;
      default:
        throw new Error("Unknown step");
    }
  };

  useEffect(() => {
    if (state.pullData) {
      setState((state) => {
        return { ...state, submit: true };
      });
    }
  }, [state.pullData, setState]);

  useEffect(async () => {
    let id;
    if (state.needChangeForm && state.currentFormId !== "") {
      id = `/${state.currentFormId}`;
    } else {
      id = "";
    }

    if (state.submit) {
      try {
        const data = await request(`/api/form${id}`, "POST", state, {
          Authorization: `Bearer${token}`,
        });
        setState((state) => {
          return {
            ...state,
            submit: false,
            currentFormId: data.data.formNumber,
            needChangeForm: false,
          };
        });
      } catch (e) {}
      console.log("Submitted up to date", state);
    }
  }, [state.submit, setState, state.needChangeForm]);

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
                  Работа с клиентом завершена
                </Typography>
                <Typography variant="subtitle1"></Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <form
                  onSubmit={activeStep === 0 ? handleNext : handleSave}
                >
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <>
                        <Button
                          className={classes.button}
                          type="submit"
                          id="btnForm"
                          variant="contained"
                          color="primary"
                          onClick={
                            state.currentFormId === "" || state.needChangeForm
                              ? null
                              : handlePrint
                          }
                        >
                          {" "}
                          {state.currentFormId === "" || state.needChangeForm
                            ? "Сохранить"
                            : "Печать анкеты"}
                        </Button>
                        {state.currentFormId !== "" && !state.needChangeForm && (
                          <Button
                            type="submit"
                            className={classes.button}
                            id="btnContract"
                            variant="contained"
                            color="primary"
                            onClick={
                              state.currentFormId === "" || state.needChangeForm
                                ? null
                                : handlePrint
                            }
                          >
                            {" "}
                            Печать договора
                          </Button>
                        )}
                        {activeStep === steps.length - 1 &&
                          state.currentFormId !== "" &&
                          !state.needChangeForm && (
                            <Button
                              id="btnWorkStatement"
                              variant="contained"
                              color="primary"
                              onClick={handlePrint}
                              className={classes.button}
                            >
                              Печать акта
                            </Button>
                          )}
                        <Button onClick={handleBack} className={classes.button}>
                          Назад
                        </Button>
                      </>
                    )}
                    {activeStep !== steps.length - 1 && (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={
                          activeStep === 0 ? null : handleNext
                        }
                        className={classes.button}
                      >
                        Дальше
                      </Button>
                    )}
                  </div>
                </form>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
