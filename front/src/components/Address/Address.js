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

export default function Address() {
  const classes = useStyles();

  const [state, setState] = useContext(AppContext);
  const [inputDisabled, setInputDisabled] = useState(false);

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, ...{ [name]: value } }));
  };

  return (
    <>
      <Grid item xs={12} sm={6}>
        <FormControl
          required
          className={classes.formControl}
          disabled={inputDisabled}
        >
          <InputLabel id="labelAddressId" disabled={inputDisabled}>
            Тип жилья
          </InputLabel>
          <Select
            labelId="labelAddressId"
            name="addressType"
            value={state.addressType}
            onChange={handleInputChange}
          >
            <MenuItem value="">
              <em>-</em>
            </MenuItem>
            <MenuItem value="Собственная квартира">
              Собственная квартира
            </MenuItem>
            <MenuItem value="У родственников">У родственников</MenuItem>
            <MenuItem value="Социальный найм">Социальный найм</MenuItem>
            <MenuItem value="Аренда">Аренда</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="number"
          name="postcode"
          label="Индекс"
          fullWidth
          autoComplete="off"
          value={state.postcode}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          type="text"
          name="region"
          label="Регион"
          fullWidth
          autoComplete="off"
          value={state.region}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          type="text"
          name="city"
          label="Город"
          fullWidth
          autoComplete="off"
          value={state.city}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          type="text"
          name="street"
          label="Улица"
          fullWidth
          autoComplete="off"
          value={state.street}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          required
          type="text"
          name="house"
          label="Дом"
          fullWidth
          autoComplete="off"
          value={state.house}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          type="text"
          name="cas"
          label="Корпус"
          fullWidth
          autoComplete="off"
          value={state.cas}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          type="text"
          name="flat"
          label="Квартира"
          fullWidth
          autoComplete="off"
          value={state.flat}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
    </>
  );
}
