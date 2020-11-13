import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import DocumentsContainer from './components/DocumentsContainer/DocumentsContainer';
import PrintForm from './components/PrintForm/PrintForm';
import PrintContract from './components/PrintContract/PrintContract';
import WorkStatement from './pages/WorkStatement';
import PrintWorkStatement from './components/PrintWorkStatement/PrintWorkStatement';

export const useRoutes = (isAuth) => {
    if (isAuth) {
        return(
            <Switch>
                <Route path="/main" exact>
                    <MainPage />
                    {/*<DocumentsContainer/>*/}
                    {/*<PrintForm/>*/}
                    {/*<WorkStatement/>*/}
                    {/*<PrintWorkStatement/>*/}
                </Route>
                <Route path="/create" exact>
                    <DocumentsContainer/>
                </Route>
                <Route path="/printForm" exact>
                    <PrintForm/>
                </Route>
                <Route path="/printContract" exact>
                    <PrintContract/>
                </Route>
                <Route path="/printWorkStatement" exact>
                    <PrintWorkStatement/>
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
