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

  const [commonState, setCommonState] = useState({
    residenceAddressType: "",
    residencePostcode: "",
    residenceRegion: "",
    residenceCity: "",
    residenceStreet: "",
    residenceHouse: "",
    residenceCase: "",
    residenceFlat: "",
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
            <InputLabel id="labelResidenceAddressId">Тип жилья</InputLabel>
            <Select
              labelId="labelResidenceAddressId"
              id="selectResidenceAddressId"
              name="residenceAddressType"
              value={commonState.residenceAddressType}
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
          name="residencePostcode"
          label="Индекс"
          fullWidth
          autoComplete="off"
          value={commonState.residencePostcode}
          onChange={handleInputChange}
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
          value={commonState.residenceRegion}
          onChange={handleInputChange}
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
          value={commonState.residenceCity}
          onChange={handleInputChange}
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
          value={commonState.residenceStreet}
          onChange={handleInputChange}
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
          value={commonState.residenceHouse}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          type="text"
          name="residenceCase"
          label="Корпус"
          fullWidth
          autoComplete="off"
          value={commonState.residenceCase}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          type="text"
          name="residenceFlat"
          label="Квартира"
          fullWidth
          autoComplete="off"
          value={commonState.residenceFlat}
          onChange={handleInputChange}
        />
      </Grid>
    </>
  );
}
