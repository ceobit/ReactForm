import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import React, { useContext, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../../context";

const income = [
  "Основная Зарплата (форма 2НДФЛ)",
  "Доход от сдачи в аренду недвижимости",
  "Алименты",
  "Прочие",
];

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

export default function IncomeTable() {
  const classes = useStyles();

  const [state, setState] = useContext(AppContext);
  const [inputDisabled, setInputDisabled] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, ...{ [name]: value } }));
  };

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

  return (
    <>
      <Grid item xs={12} sm={6} className={classes.gridSubtitle}>
        <Typography variant="subtitle1">Ежемесячные доходы:</Typography>
      </Grid>
      {income.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <Grid
              key={`g_${index}`}
              item
              xs={12}
              sm={8}
              className={classes.table}
            >
              <TextField
                key={`tf_${index}`}
                variant="outlined"
                defaultValue={item}
                InputProps={{
                  readOnly: true,
                }}
                size="small"
                margin="none"
                fullWidth
              />
            </Grid>
            <Grid
              key={`g1_${index}`}
              item
              xs={12}
              sm={4}
              className={classes.table}
            >
              <TextField
                key={`tf1_${index}`}
                variant="outlined"
                name={`income${index}`}
                size="small"
                fullWidth
                value={eval(`state.income${index}`)}
                onChange={handleInputChange}
                disabled={inputDisabled}
              />
            </Grid>
          </React.Fragment>
        );
      })}
      <Grid item xs={12}>
        <TextField
          type="number"
          name="averageIncome"
          label="Среднемесячный доход семьи"
          fullWidth
          autoComplete="off"
          value={state.averageIncome}
          disabled={inputDisabled}
          onChange={handleInputChange}
        />
      </Grid>
    </>
  );
}
