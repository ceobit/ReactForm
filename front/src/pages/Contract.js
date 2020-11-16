import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  part: {
    padding: "30px 0 0 0",
  },
  formControl: {
    minWidth: 120,
  },
  gridSubtitle: {
    padding: "20px 12px 0 12px!important",
    margin: theme.spacing(0),
  },
  table: {
    padding: "5px 0 0 0!important",
    margin: theme.spacing(0),
    fontSize: "3px!important",
  },
  tableHead: {
    fontSize: "3px!important",
  },
}));

export default function Contract() {
  const classes = useStyles();

  const [state, setState] = useContext(AppContext);
  const [inputDisabled, setInputDisabled] = useState(false);

  useEffect(() => {
    if (state.pullData) {
      setState((state) => {
        return {
          ...state,
        };
      });
    }
  }, [state.pullData]);

  useEffect(() => {
    if (state.currentFormId !== "" && !state.needChangeForm) {
      setInputDisabled(true);
    }
  }, [state.currentFormId, state.needChangeForm]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, ...{ [name]: value } }));
  };

  return (
    <>
      <Typography variant="h4" gutterBottom align="center">
        Договор № {state.currentFormId}
      </Typography>
      <Typography variant="h6">Параметры для оформления договора</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" className={classes.gridSubtitle}>
            Срок оказания услуг не позднее (дней)
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="number"
            name="serviceTime"
            label="Срок оказания услуг"
            fullWidth
            value={state.serviceTime}
            autoComplete="off"
            onChange={handleInputChange}
            disabled={inputDisabled}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" className={classes.gridSubtitle}>
            Стоимость услуг по этапу № 1
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="number"
            name="costFirstStep"
            label="Стоимость 1-го этапа"
            fullWidth
            value={state.costFirstStep}
            autoComplete="off"
            onChange={handleInputChange}
            disabled={inputDisabled}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" className={classes.gridSubtitle}>
            Стоимость услуг по этапу № 2
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="number"
            name="costSecondStep"
            label="Стоимость 2-го этапа"
            fullWidth
            value={state.costSecondStep}
            autoComplete="off"
            onChange={handleInputChange}
            disabled={inputDisabled}
          />
        </Grid>
      </Grid>
    </>
  );
}
