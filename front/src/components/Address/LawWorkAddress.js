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

export default function LawWorkAddress() {
  const classes = useStyles();

  const [state, setState] = useContext(AppContext);

  const [commonState, setCommonState] = useState({
    lawWorkPostcode: "",
    lawWorkRegion: "",
    lawWorkCity: "",
    lawWorkStreet: "",
    lawWorkHouse: "",
    lawWorkCase: "",
    lawWorkOffice: "",
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
          name="lawWorkPostcode"
          label="Индекс"
          fullWidth
          autoComplete="off"
          value={commonState.lawWorkPostcode}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          type="text"
          name="lawWorkRegion"
          label="Регион"
          fullWidth
          autoComplete="off"
          value={commonState.lawWorkRegion}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          type="text"
          name="lawWorkCity"
          label="Город"
          fullWidth
          autoComplete="off"
          value={commonState.lawWorkCity}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          type="text"
          name="lawWorkStreet"
          label="Улица"
          fullWidth
          autoComplete="off"
          value={commonState.lawWorkStreet}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          required
          type="text"
          name="lawWorkHouse"
          label="Дом"
          fullWidth
          autoComplete="off"
          value={commonState.lawWorkHouse}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          type="text"
          name="lawWorkCase"
          label="Корпус"
          fullWidth
          autoComplete="off"
          value={commonState.lawWorkCase}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          type="text"
          name="lawWorkOffice"
          label="Офис№"
          fullWidth
          autoComplete="off"
          value={commonState.lawWorkOffice}
          onChange={handleInputChange}
        />
      </Grid>
    </>
  );
}
