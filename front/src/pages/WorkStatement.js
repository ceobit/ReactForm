import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import CustomTable from "../components/CustomTable/CustomTable";
import arrayCompleteWorks from "../data/arrayCompleteWorks";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import Calendar from '../components/Calendar/Calendar';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  part: {
    padding: "30px 0 0 0",
  }
}));


export default function WorkStatement() {
  const classes = useStyles();
  const [state, setState] = useContext(AppContext);
  const [inputDisabled, setInputDisabled] = useState(false);

  const handleWorkStatementDate = (value) => {
    setState((prev) => ({ ...prev, ...{ ["workStatementDate"]: value } }));
  };

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
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" className={classes.part}>
                    Заполните дату акта
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                    <Calendar
                        label="Дата акта"
                        name="workStatementDate"
                        value={state.workStatementDate}
                        onChangeValue={(value) => handleWorkStatementDate(value)}
                    />
            </Grid>
        </Grid>
      <Typography variant="subtitle2" className={classes.part}>
        Для акта выполненных работ можете заполнить таблицу выполненных
        работ (услуг), если не заполнять, таблица на печати будет пустой
      </Typography>
      <CustomTable
        arrayHeading={arrayCompleteWorks}
        tableHeading=""
        stateKey="completeWorks"
      />
    </>
  );
}
