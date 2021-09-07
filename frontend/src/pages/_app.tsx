import "../styles/globals.css";
import type { AppProps } from "next/app";

import React, { FC, useReducer, createContext } from "react";

const initialState = { count: 0 };

interface StateProps {
  count: number;
}

interface ActionProps {
  type: string;
}

const reducer = (state: StateProps, action: ActionProps) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

interface StoreContextProps {
  state: StateProps;
  dispatch: ({ type }: ActionProps) => void;
}

export const StoreContext = createContext({} as StoreContextProps);

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </StoreContext.Provider>
  );
}
export default MyApp;
