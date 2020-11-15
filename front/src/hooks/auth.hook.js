import {useState, useCallback, useEffect, useContext} from "react";
import {AppContext} from '../context';

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [state, setState] = useContext(AppContext);

  const login = useCallback((jwtToken, id, name, login) => {
    setToken(jwtToken);
    setUserId(id);
    setState((state) => ({ ...state, userName:name, login: login}));

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwtToken,
        userName: name,
        login: login
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId, data.userName, data.login);
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready };
};
