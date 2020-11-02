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

export default function Address({ sameAddress }) {
  const classes = useStyles();

  let address;

  const [state, setState] = useContext(AppContext);

  address = {
    addressType: "",
    postcode: "",
    region: "",
    city: "",
    street: "",
    house: "",
    case: "",
    flat: "",
  };
  const [commonState, setCommonState] = useState(address);

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
          <InputLabel id="labelAddressId">Тип жилья</InputLabel>
          <Select
            labelId="labelAddressId"
            name="addressType"
            value={commonState.addressType}
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
          name="postcode"
          label="Индекс"
          fullWidth
          autoComplete="off"
          value={commonState.postcode}
          onChange={handleInputChange}
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
          value={commonState.region}
          onChange={handleInputChange}
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
          value={commonState.city}
          onChange={handleInputChange}
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
          value={commonState.street}
          onChange={handleInputChange}
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
          value={commonState.house}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          type="text"
          name="case"
          label="Корпус"
          fullWidth
          autoComplete="off"
          value={commonState.case}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          type="text"
          name="flat"
          label="Квартира"
          fullWidth
          autoComplete="off"
          value={commonState.flat}
          onChange={handleInputChange}
        />
      </Grid>
    </>
  );
}
