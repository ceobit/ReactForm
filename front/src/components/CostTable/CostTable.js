import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import React, { useContext, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../../context";

const cost = [
  "Плата за образование",
  "Арендные платежи",
  "Алименты уплачиваемые",
  "Выплаты по исполнительным документам",
  "Страхование",
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

export default function CostTable() {
  const classes = useStyles();

  const [state, setState] = useContext(AppContext);

  const value0 = useRef(0);
  const value1 = useRef(0);
  const value2 = useRef(0);
  const value3 = useRef(0);
  const value4 = useRef(0);

  const [inputDisabled, setInputDisabled] = useState(false);

  const calculation = () => {
    const cost0 = +value0.current.value;
    const cost1 = +value1.current.value;
    const cost2 = +value2.current.value;
    const cost3 = +value3.current.value;
    const cost4 = +value4.current.value;

    let sum = cost0 + cost1 + cost2 + cost3 + cost4;

    setState((prev) => ({
      ...prev,
      ...{
        ["costSum"]: sum,
        ["cost0"]: cost0,
        ["cost1"]: cost1,
        ["cost2"]: cost2,
        ["cost3"]: cost3,
        ["cost4"]: cost4,
      },
    }));
  };

  useEffect(() => {
    if (state.pullData) {
      setState((state) => {
        return {
          ...state
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
        <Typography variant="subtitle1">Ежемесячные платежи:</Typography>
      </Grid>
      {cost.map((item, index) => {
        return (
          <>
            <Grid
              key={index}
              item
              xs={12}
              sm={8}
              className={classes.table}
            >
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
            <Grid
              key={index}
              item
              xs={12}
              sm={4}
              className={classes.table}
            >
              <TextField
                key={index}
                type="number"
                variant="outlined"
                inputRef={eval(`value${index}`)}
                size="small"
                fullWidth
                label="Сумма"
                value={eval(`state.cost${index}`)}
                onChange={() => {
                  calculation();
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
          name="costSum"
          value={state.costSum}
          InputProps={{
            readOnly: true,
          }}
          disabled={inputDisabled}
        />
      </Grid>
    </>
  );
}
