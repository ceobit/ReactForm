import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import "./App.css";

import DocumentsContainer from "./components/DocumentsContainer/DocumentsContainer";
import MenuAppBar from "./components/AppBar/AppBar";

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
      }}
    >
      <BrowserRouter>
        <>
          {isAuthenticated && <MenuAppBar />}
          {routes}
        </>
      </BrowserRouter>
    </AuthContext.Provider>

    // <>
    // <MenuAppBar />
    // <DocumentsContainer />
    // </>
  );
}

export default App;