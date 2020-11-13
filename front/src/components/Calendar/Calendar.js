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
import getAge from '../../aux/getAge';

const useStyles = makeStyles((theme) => ({
  age: {
    margin: "5px 0 0 0",
  },
}));

export default function Calendar({ id, label, value, name, onChangeValue = f => f}) {
  const classes = useStyles();

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
            name={name}
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
