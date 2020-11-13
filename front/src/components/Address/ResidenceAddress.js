import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../../context";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));

export default function ResidenceAddress() {
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
        <FormControl
          required
          className={classes.formControl}
          disabled={inputDisabled}
        >
          <InputLabel id="labelResidenceAddressId" disabled={inputDisabled}>
            Тип жилья
          </InputLabel>
          <Select
            labelId="labelResidenceAddressId"
            id="selectResidenceAddressId"
            name="residenceAddressType"
            value={state.residenceAddressType}
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
          name="residencePostcode"
          label="Индекс"
          fullWidth
          autoComplete="off"
          value={state.residencePostcode}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          type="text"
          name="residenceRegion"
          label="Регион"
          fullWidth
          autoComplete="off"
          value={state.residenceRegion}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          type="text"
          name="residenceCity"
          label="Город"
          fullWidth
          autoComplete="off"
          value={state.residenceCity}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          type="text"
          name="residenceStreet"
          label="Улица"
          fullWidth
          autoComplete="off"
          value={state.residenceStreet}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          required
          type="text"
          name="residenceHouse"
          label="Дом"
          fullWidth
          autoComplete="off"
          value={state.residenceHouse}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          type="text"
          name="residenceCase"
          label="Корпус"
          fullWidth
          autoComplete="off"
          value={state.residenceCase}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          type="text"
          name="residenceFlat"
          label="Квартира"
          fullWidth
          autoComplete="off"
          value={state.residenceFlat}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
    </>
  );
}
