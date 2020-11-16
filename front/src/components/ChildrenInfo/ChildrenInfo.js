import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Calendar from "../Calendar/Calendar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { AppContext } from "../../context";

export default function ChildrenInfo({ stateKey }) {
  const [state, setState] = useContext(AppContext);

  const [inputDisabled, setInputDisabled] = useState(false);

  useEffect(() => {
    if (state.pullData) {
      setState((state) => {
        return {
          ...state,
        };
      });
    }
  }, [state.pullData]);

  useEffect(() => {
    if (state.currentFormId !== "" && !state.needChangeForm) {
      setInputDisabled(true);
    }
  }, [state.currentFormId, state.needChangeForm]);

  const handleChange = (i, e) => {
    debugger;
    const { name, checked } =
      e.target === undefined ? { name: "childBirthDay", checked: e } : e.target;
    let stateKeyAr = [...state[stateKey]];
    stateKeyAr[i] = { ...stateKeyAr[i], [name]: checked };
    setState((prevState) => ({
      ...prevState,
      [stateKey]: stateKeyAr,
    }));
  };

  const createComponents = () => {
    return state[stateKey].map((el, i) => (
      <>
        <Grid item xs={12} sm={4} key={i}>
          <Calendar
            label="Дата рождения"
            id="childBirthDay"
            value={el.childBirthDay}
            onChangeValue={(value) => handleChange(i, value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                key={i}
                color="primary"
                name="liveTogether"
                onChange={(e) => handleChange(i, e)}
                checked={el.liveTogether}
                disabled={inputDisabled}
              />
            }
            label="Проживает совместно"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                key={el + i}
                color="primary"
                name="dependence"
                onChange={(e) => handleChange(i, e)}
                checked={el.dependence}
                disabled={inputDisabled}
              />
            }
            label="На иждивении"
          />
        </Grid>
      </>
    ));
  };

  return <>{createComponents()}</>;
}
