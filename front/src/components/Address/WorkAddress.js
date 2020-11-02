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

export default function WorkAddress() {
  const classes = useStyles();

  const [state, setState] = useContext(AppContext);

  const [commonState, setCommonState] = useState({
    workPostcode: "",
    workRegion: "",
    workCity: "",
    workStreet: "",
    workHouse: "",
    workCase: "",
    workOffice: "",
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
        <TextField
          type="number"
          name="workPostcode"
          label="Индекс"
          fullWidth
          autoComplete="off"
          value={commonState.workPostcode}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          type="text"
          name="workRegion"
          label="Регион"
          fullWidth
          autoComplete="off"
          value={commonState.workRegion}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          type="text"
          name="workCity"
          label="Город"
          fullWidth
          autoComplete="off"
          value={commonState.workCity}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          type="text"
          name="workStreet"
          label="Улица"
          fullWidth
          autoComplete="off"
          value={commonState.workStreet}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          required
          type="text"
          name="workHouse"
          label="Дом"
          fullWidth
          autoComplete="off"
          value={commonState.workHouse}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          type="text"
          name="workCase"
          label="Корпус"
          fullWidth
          autoComplete="off"
          value={commonState.workCase}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          type="text"
          name="workOffice"
          label="Офис№"
          fullWidth
          autoComplete="off"
          value={commonState.workOffice}
          onChange={handleInputChange}
        />
      </Grid>
    </>
  );
}
