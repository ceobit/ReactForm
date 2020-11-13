import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { AppContext } from "../../context";

const useStyles = makeStyles((theme) => ({
  gridSubtitle: {
    padding: "20px 12px 0 12px!important",
    margin: theme.spacing(0),
  },
  table: {
    padding: "5px 0 0 0!important",
    margin: theme.spacing(0),
    fontSize: "3px!important",
  },
}));

export default function CustomTable({ arrayHeading, tableHeading, stateKey }) {
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

  const widthCells =
    arrayHeading.length === 3 ? 4 : arrayHeading.length === 4 ? 3 : 12;

  let heightCells = 1;
  if (arrayHeading.length > 1) {
    arrayHeading.forEach((item) =>
      item.length >= 20 ? (heightCells = 3) : null
    );
  }

  const createInput = () => {
    return state[stateKey].map((el, i) => (
      <>
        <Grid key={i} item xs={12} sm={widthCells} className={classes.table}>
          <TextField
            key={i}
            variant="outlined"
            value={el || ""}
            size="small"
            margin="none"
            fullWidth
            onChange={(e) => handleChange(i, e)}
            disabled={inputDisabled}
          />
        </Grid>
        {(i + 1) % arrayHeading.length === 0 && (
          <Grid key={i} item xs={12} sm={12} className={classes.table}>
            <Button
              key={i}
              variant="outlined"
              color="primary"
              onClick={(e) => removeClick(i, e)}
              disabled={inputDisabled}
            >
              Удалить
            </Button>
          </Grid>
        )}
      </>
    ));
  };

  const handleChange = (i, e) => {
    let stateKeyAr = [...state[stateKey]];
    stateKeyAr[i] = e.target.value;
    setState((prevState) => ({
      ...prevState,
      [stateKey]: stateKeyAr,
    }));
  };

  const addClick = () => {
    let i = arrayHeading.length;
    while (i) {
      setState((prevState) => ({
        ...prevState,
        [stateKey]: [...prevState[stateKey], ""],
      }));
      i--;
    }
  };

  const removeClick = (i, e) => {
    let stateKeyAr = [...state[stateKey]];
    stateKeyAr.splice(i - (arrayHeading.length - 1), arrayHeading.length);
    setState((prevState) => ({
      ...prevState,
      [stateKey]: stateKeyAr,
    }));
  };

  return (
    <>
      <Grid item xs={12} className={classes.gridSubtitle}>
        <Typography variant="subtitle1">{tableHeading}</Typography>
      </Grid>
      {arrayHeading.map((item, index) => {
        return (
          <Grid
            key={`ct_g_${index}`}
            item
            xs={12}
            sm={widthCells}
            className={classes.table}
          >
            <TextField
              key={`ct_tf_${index}`}
              type="text"
              variant="outlined"
              color="primary"
              id={`${index}`}
              size="small"
              fullWidth
              defaultValue={item}
              InputProps={{
                readOnly: true,
              }}
              multiline
              rows={heightCells}
            />
          </Grid>
        );
      })}
      {createInput()}
      <Grid item xs={12} sm={6} className={classes.table}>
        <Button
          variant="outlined"
          onClick={addClick}
          color="primary"
          disabled={inputDisabled}
        >
          Добавить
        </Button>
      </Grid>
    </>
  );
}
