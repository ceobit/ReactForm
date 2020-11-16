import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../../context";

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
  },
}));

export default function TempAddress() {
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
        return { ...state };
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
      <Grid item xs={12} sm={6}>
        <FormControl required className={classes.formControl} disabled={inputDisabled}>
          <InputLabel id="labelTempAddressId">
            Тип жилья
          </InputLabel>
          <Select
            labelId="labelTempAddressId"
            name="tempAddressType"
            value={state.tempAddressType}
            onChange={handleInputChange}
          >
            <MenuItem value="">
              <em>-</em>
            </MenuItem>
            <MenuItem value="Собственная квартира">Собственная квартира</MenuItem>
            <MenuItem value="У родственников">У родственников</MenuItem>
            <MenuItem value="Социальный найм">Социальный найм</MenuItem>
            <MenuItem value="Аренда">Аренда</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="number"
          name="tempPostcode"
          label="Индекс"
          fullWidth
          autoComplete="off"
          value={state.tempPostcode}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          type="text"
          name="tempRegion"
          label="Регион"
          fullWidth
          autoComplete="off"
          value={state.tempRegion}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          type="text"
          name="tempCity"
          label="Город"
          fullWidth
          autoComplete="off"
          value={state.tempCity}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          type="text"
          name="tempStreet"
          label="Улица"
          fullWidth
          autoComplete="off"
          value={state.tempStreet}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          required
          type="text"
          name="tempHouse"
          label="Дом"
          fullWidth
          autoComplete="off"
          value={state.tempHouse}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          type="text"
          name="tempCase"
          label="Корпус"
          fullWidth
          autoComplete="off"
          value={state.tempCase}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          type="text"
          name="tempFlat"
          label="Квартира"
          fullWidth
          autoComplete="off"
          value={state.tempFlat}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
    </>
  );
}
