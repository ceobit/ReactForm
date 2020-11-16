import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import CustomTable from "../components/CustomTable/CustomTable";
import arrayCompleteWorks from "../data/arrayCompleteWorks";
import Typography from "@material-ui/core/Typography";

export default function WorkStatement() {
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

  return (
    <>
      <Typography variant="subtitle2">
        Для акта выполненных работ необходимо заполнить таблицу выполненных
        работ (услуг)
      </Typography>
      <CustomTable
        arrayHeading={arrayCompleteWorks}
        tableHeading=""
        stateKey="completeWorks"
      />
    </>
  );
}
