import React, { useContext, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../components/CopyRight/CopyRight";

import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
// import API_URL from '../data/URL';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AuthPage() {
  const classes = useStyles();

  const auth = useContext(AuthContext);
  const { loading, request } = useHttp();

  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const [error, setError] = useState(false);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request(`/signup`, "POST", { ...form });
      // message(data.message);
    } catch (e) {
      setError(true);
    }
  };

  const loginHandler = async () => {
    try {
      const data = await request(`/signin`, "POST", { ...form });
      // debugger;
      auth.login(data.token, data.user.userId, data.user.name);
    } catch (e) {
      setError(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Финансовая компания
        </Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h2" variant="h6">
          Вход в систему
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Логин"
            name="login"
            autoComplete="none"
            autoFocus
            onChange={changeHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={changeHandler}
          />
          {error && (
            <Typography component="subtitle2" color="error">
              Ошибка в логине или пароле
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
            onClick={loginHandler}
          >
            Вход
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                {"У вас нет учетной записи? Обратитесь к руководителю"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
