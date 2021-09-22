import type { AppProps } from "next/app";
import Head from "next/head";

import React, { useReducer, createContext } from "react";

interface StateProps {
  login: {
    state: boolean;
    userId: string;
    password: string;
  };
}

const initialState: StateProps = {
  login: {
    state: true,
    userId: "",
    password: "",
  },
};

type ActionProps = setLogin;

type setLogin = {
  type: "setLogin";
  payload: {
    login: {
      userId: string;
      password: string;
    };
  };
};

const reducer = (state: StateProps, action: ActionProps): StateProps => {
  switch (action.type) {
    case "setLogin":
      return {
        ...state,
        login: { ...state.login, ...action.payload.login, state: true },
      };
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
  React.useEffect(() => {
    fetch("api/socket");
  }, []);
  return (
    <>
      <Head>
        <title>mailing list</title>
      </Head>
      <StoreContext.Provider value={{ state, dispatch }}>
        <Component {...pageProps} />
      </StoreContext.Provider>
    </>
  );
}
export default MyApp;
