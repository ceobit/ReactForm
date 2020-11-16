import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import PrintWorkStatementContent from './PrintWorkStatementContent';

const useStyles = makeStyles((theme) => ({
    flex: {
        display: "flex",
        flexDirection: "column",
    },
    buttons: {
        display: "flex",
        justifyContent: "center",
        "@media print": {
            display: "none",
        },
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

export default function PrintWorkStatement() {
    const classes = useStyles();

    const history = useHistory();

    const handleBack = () => {
        history.push("/create");
    };

    return (
        <div className={classes.flex}>
            <PrintWorkStatementContent/>
            <div className={classes.buttons}>
            <Button
                onClick={handleBack}
                className={classes.button}
                variant="contained"
                color="primary"
            >
                Назад
            </Button>
            </div>
        </div>
    );
}
