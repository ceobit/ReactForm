import React, { useState } from "react";
import initialState from '../data/initialState';

const AppContext = React.createContext([{}, p => {}]);

const AppContextProvider = (props) => {
  const [state, setState] = useState(initialState);

  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
