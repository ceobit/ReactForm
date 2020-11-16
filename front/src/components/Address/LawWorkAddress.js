import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";


export default function LawWorkAddress() {
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
          name="lawWorkPostcode"
          label="Индекс"
          fullWidth
          autoComplete="off"
          value={state.lawWorkPostcode}
          onChange={handleInputChange}
          disabled={inputDisabled}
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
          value={state.lawWorkRegion}
          onChange={handleInputChange}
          disabled={inputDisabled}
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
          value={state.lawWorkCity}
          onChange={handleInputChange}
          disabled={inputDisabled}
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
          value={state.lawWorkStreet}
          onChange={handleInputChange}
          disabled={inputDisabled}
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
          value={state.lawWorkHouse}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          type="text"
          name="lawWorkCase"
          label="Корпус"
          fullWidth
          autoComplete="off"
          value={state.lawWorkCase}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          type="text"
          name="lawWorkOffice"
          label="Офис№"
          fullWidth
          autoComplete="off"
          value={state.lawWorkOffice}
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
    </>
  );
}
