import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";

import { AuthContext } from "../../context/AuthContext";
import { AppContext } from "../../context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logout: {
    "&:hover": {
      backgroundColor: "blue",
    },
  },
  appBar: {
    "@media print": {
      display: "none",
    },
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();

  const auth = useContext(AuthContext);
  const [state, setState] = useContext(AppContext);
  const history = useHistory();

  const handleLogout = () => {
    auth.logout();
    history.push("/");
  };

  const handleMainPage = () => {
    history.push("/");
  };

  const handleRegisterPage = () => {
    history.push("/register");
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={handleMainPage}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Финансовая компания
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          {state.userName}
        </Button>
        {(state.login === "Fakir" || state.login === "Fomchenko") && (
          <Button color="inherit" onClick={handleRegisterPage}>
            +
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
