import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../../context";
import Calendar from '../Calendar/Calendar';

const useStyles = makeStyles((theme) => ({

}));

export default function ChangedName() {
    const classes = useStyles();

    const [state, setState] = useContext(AppContext);

    const [commonState, setCommonState] = useState({
        oldName: "",
    });

    const [oldNameDate, setOldNameDate] = useState(new Date());


    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setCommonState((prev) => ({ ...prev, ...{ [name]: value } }));
    };

    const handleOldNameDate = (date) => setOldNameDate(date);

    useEffect(() => {
        if (state.pullData) {
            setState((state) => {
                return { ...state, ...commonState, oldNameDate};
            });
        }
    }, [state.pullData]);

    return (
        <>
            <Grid item xs={12} sm={6}>
                <TextField
                    value={commonState.oldName}
                    required
                    type="text"
                    name="oldName"
                    label="Прежнее ФИО"
                    fullWidth
                    autoComplete="off"
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Calendar
                    label="Дата смены ФИО"
                    id="oldNameDate"
                    value={oldNameDate}
                    onChangeValue={handleOldNameDate}
                />
            </Grid>
        </>
    );
}
