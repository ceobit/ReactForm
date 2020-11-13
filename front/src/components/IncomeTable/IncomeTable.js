import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import React, { useContext, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../../context";
import getRandom from "../../aux/getRandom";

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

  const value0 = useRef("");
  const value1 = useRef("");
  const value2 = useRef("");
  const value3 = useRef("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, ...{ [name]: value } }));
  };

  const incomeCalculation = () => {
    const income0 = +value0.current.value;
    const income1 = +value1.current.value;
    const income2 = +value2.current.value;
    const income3 = +value3.current.value;

    let sum = income0 + income1 + income2 + income3;

    setState((prev) => ({
      ...prev,
      ...{
        ["incomeSum"]: sum,
        ["income0"]: income0,
        ["income1"]: income1,
        ["income2"]: income2,
        ["income3"]: income3,
      },
    }));
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
          <>
            <Grid key={index} item xs={12} sm={8} className={classes.table}>
              <TextField
                key={index}
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
            <Grid key={index} item xs={12} sm={4} className={classes.table}>
              <TextField
                key={index}
                type="number"
                variant="outlined"
                inputRef={eval(`value${index}`)}
                size="small"
                fullWidth
                label="Сумма"
                value={eval(`state.income${index}`)}
                onChange={() => {
                  incomeCalculation();
                }}
                disabled={inputDisabled}
              />
            </Grid>
          </>
        );
      })}
      <Grid item xs={12} sm={8} className={classes.table}>
        <TextField
          variant="outlined"
          defaultValue="Итого:"
          InputProps={{
            readOnly: true,
          }}
          size="small"
          margin="none"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4} className={classes.table}>
        <TextField
          type="number"
          variant="outlined"
          size="small"
          fullWidth
          label="Сумма"
          name="incomeSum"
          value={state.incomeSum}
          InputProps={{
            readOnly: true,
          }}
          disabled={inputDisabled}
        />
      </Grid>
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
