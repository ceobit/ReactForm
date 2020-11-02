import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  age: {
    margin: "5px 0 0 0",
  },
}));

export default function Calendar({ id, label, value, onChangeValue = f => f}) {
  const classes = useStyles();

  const agetostr = (age) => {
    let txt;
    let count = age % 100;
    if (count >= 5 && count <= 20) {
      txt = "лет";
    } else {
      count = count % 10;
      if (count === 1) {
        txt = "год";
      } else if (count >= 2 && count <= 4) {
        txt = "года";
      } else {
        txt = "лет";
      }
    }
    return age + " " + txt;
  };

  const getAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return agetostr(age);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            id={id}
            label={label}
            value={value}
            onChange={onChangeValue}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
        {id === "idBirthday" && (
          <FormHelperText className={classes.age}>
            `Текущий возраст: {getAge(value)}`
          </FormHelperText>
        )}
      </>
    </MuiPickersUtilsProvider>
  );
}
