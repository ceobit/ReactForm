import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import DocumentsContainer from "./components/DocumentsContainer/DocumentsContainer";
import PrintForm from "./components/PrintForm/PrintForm";
import PrintContract from "./components/PrintContract/PrintContract";
import PrintWorkStatement from "./components/PrintWorkStatement/PrintWorkStatement";
import RegisterPage from "./pages/RegisterPage";

export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/main" exact>
          <MainPage />
        </Route>
        <Route path="/create" exact>
          <DocumentsContainer />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/printForm" exact>
          <PrintForm />
        </Route>
        <Route path="/printContract" exact>
          <PrintContract />
        </Route>
        <Route path="/printWorkStatement" exact>
          <PrintWorkStatement />
        </Route>
        <Redirect to="/main" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <LoginPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
