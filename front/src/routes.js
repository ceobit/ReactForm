import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import DocumentsContainer from './components/DocumentsContainer/DocumentsContainer';
import PrintForm from './components/PrintForm/PrintForm';

export const useRoutes = (isAuth) => {
    if (isAuth) {
        return(
            <Switch>
                <Route path="/main" exact>
                    <MainPage />
                    {/*<DocumentsContainer/>*/}
                    {/*<PrintForm/>*/}
                </Route>
                <Route path="/create" exact>
                    <DocumentsContainer/>
                </Route>
                <Route path="/print" exact>
                    <PrintForm/>
                </Route>
                <Redirect to="/main" />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" exact />
        </Switch>
    )
};
