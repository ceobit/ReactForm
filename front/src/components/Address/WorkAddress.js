import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";

export default function WorkAddress() {
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
        <TextField
          type="number"
          name="workPostcode"
          label="Индекс"
          fullWidth
          autoComplete="off"
          value={state.workPostcode}
          onChange={handleInputChange}
          disabled={inputDisabled}
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
          value={state.workRegion}
          onChange={handleInputChange}
          disabled={inputDisabled}
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
          value={state.workCity}
          onChange={handleInputChange}
          disabled={inputDisabled}
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
          value={state.workStreet}
          onChange={handleInputChange}
          disabled={inputDisabled}
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
          value={state.workHouse}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          type="text"
          name="workCase"
          label="Корпус"
          fullWidth
          autoComplete="off"
          value={state.workCase}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          type="text"
          name="workOffice"
          label="Офис№"
          fullWidth
          autoComplete="off"
          value={state.workOffice}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
    </>
  );
}
