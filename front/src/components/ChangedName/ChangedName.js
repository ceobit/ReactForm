import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";
import Calendar from "../Calendar/Calendar";

export default function ChangedName() {
  const [state, setState] = useContext(AppContext);
  const [inputDisabled, setInputDisabled] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, ...{ [name]: value } }));
  };

  const handleOldNameDate = (value) => {
    setState((prev) => ({ ...prev, ...{ ["oldNameDate"]: value } }));
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
          value={state.oldName}
          required
          type="text"
          name="oldName"
          label="Прежнее ФИО"
          fullWidth
          autoComplete="off"
          onChange={handleInputChange}
          disabled={inputDisabled}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Calendar
          label="Дата смены ФИО"
          id="oldNameDate"
          value={state.oldNameDate}
          onChangeValue={handleOldNameDate}
        />
      </Grid>
    </>
  );
}
