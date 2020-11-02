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

  const [commonState, setCommonState] = useState({
    values: [],
  });

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setCommonState((prev) => ({ ...prev, ...{ [name]: value } }));
  // };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCommonState({values: {...commonState, [name]:value}});
  };


  // useEffect(() => {
  //   if (state.pullData) {
  //     setState((state) => {
  //       return { ...state, ...commonState };
  //     });
  //   }
  // }, [state.pullData]);

  // const incomeCalculation = () => {
  //   let sum =
  //     +commonState.income1 +
  //     +commonState.income2 +
  //     +commonState.income3 +
  //     +commonState.income4;
  //
  //   console.log(+commonState.income1);
  //   setCommonState(sum);
  // };

  return (
    <>
      <Grid item xs={12} sm={6} className={classes.gridSubtitle}>
        <Typography variant="subtitle1">Ежемесячные доходы:</Typography>
      </Grid>
      {income.map((item, index) => {
        return (
          <>
            <Grid
              item
              xs={12}
              sm={8}
              className={classes.table}
              key={Math.random()}
            >
              <TextField
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
              item
              xs={12}
              sm={4}
              className={classes.table}
              key={Math.random()}
            >
              <TextField
                type="number"
                variant="outlined"
                name={`commonState.values[index]`}
                size="small"
                fullWidth
                label="Сумма"
                // value={commonState.values[index]}
                // onChange={() => {
                //   incomeCalculation();
                // }}
                  onChange={handleInputChange}
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
          // value={commonState.incomeSum}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="number"
          id="companyName"
          name="companyName"
          label="Среднемесячный доход семьи"
          fullWidth
          autoComplete="off"
        />
      </Grid>
    </>
  );
}
