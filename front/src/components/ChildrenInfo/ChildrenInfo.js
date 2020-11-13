import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Calendar from "../Calendar/Calendar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { AppContext } from "../../context";

export default function ChildrenInfo({
  idBirthDay,
  liveTogetherId,
  dependenceId,
}) {


  const [state, setState] = useContext(AppContext);
  //
  //
  // useEffect(() => {
  //   if (state.pullData) {
  //     setState((state) => {
  //       return {
  //         ...state,
  //         ...commonState,
  //       };
  //     });
  //   }
  // }, [state.pullData]);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setCommonState((prev) => ({ ...prev, ...{ [name]: value } }));
  // };

  return (
    <>
      <Grid item xs={12} sm={4}>
        <Calendar label="Дата рождения" id={idBirthDay} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              name={liveTogetherId}
              value="no"
              id={liveTogetherId}
            />
          }
          label="Проживает совместно"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              name={dependenceId}
              value="no"
              id={dependenceId}
            />
          }
          label="На иждивении"
        />
      </Grid>
    </>
  );
}
