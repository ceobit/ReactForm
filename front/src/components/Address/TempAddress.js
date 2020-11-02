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

export default function TempAddress() {
  const classes = useStyles();

  const [state, setState] = useContext(AppContext);

  const [commonState, setCommonState] = useState({
    tempAddressType: "",
    tempPostcode: "",
    tempRegion: "",
    tempCity: "",
    tempStreet: "",
    tempHouse: "",
    tempCase: "",
    tempFlat: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCommonState((prev) => ({ ...prev, ...{ [name]: value } }));
  };

  useEffect(() => {
    if (state.pullData) {
      setState((state) => {
        return { ...state, ...commonState };
      });
        console.log(commonState);
    }
  }, [state.pullData]);

  return (
    <>
        <Grid item xs={12} sm={6}>
          <FormControl required className={classes.formControl}>
            <InputLabel id="labelTempAddressId">Тип жилья</InputLabel>
            <Select
              labelId="labelTempAddressId"
              name="tempAddressType"
              value={commonState.tempAddressType}
              onChange={handleInputChange}
            >
              <MenuItem value="">
                <em>-</em>
              </MenuItem>
              <MenuItem value="10">Собственная квартира</MenuItem>
              <MenuItem value="20">У родственников</MenuItem>
              <MenuItem value="30">Социальный найм</MenuItem>
              <MenuItem value="40">Аренда</MenuItem>
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
          value={commonState.tempPostcode}
          onChange={handleInputChange}
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
          value={commonState.tempRegion}
          onChange={handleInputChange}
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
          value={commonState.tempCity}
          onChange={handleInputChange}
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
          value={commonState.tempStreet}
          onChange={handleInputChange}
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
          value={commonState.tempHouse}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          type="text"
          name="tempCase"
          label="Корпус"
          fullWidth
          autoComplete="off"
          value={commonState.tempCase}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          type="text"
          name="tempFlat"
          label="Квартира"
          fullWidth
          autoComplete="off"
          value={commonState.tempFlat}
          onChange={handleInputChange}
        />
      </Grid>
    </>
  );
}
