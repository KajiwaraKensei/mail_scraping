//_______________________________________________
// ログインページ
import type { NextPage } from "next";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { StoreContext } from "~/pages/_app";

import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import { Paper, TextField } from "@material-ui/core";

type Props = {};

//_______________________________________________
// component
const Component: NextPage<Props> = () => {
  const { state, dispatch } = useContext(StoreContext);

  const [userId, setUserId] = useState(state.login.userId);
  const [password, setPassword] = useState(state.login.password);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: "setLogin",
      payload: {
        login: {
          userId,
          password,
        },
      },
    });
  };

  const handleChangeInput =
    (key: "userId" | "password") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      (key === "userId" ? setUserId : setPassword)(e.target.value);
    };

  return (
    <Body>
      <div>
        <Paper>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                id="login_usr_id"
                label="Account ID"
                value={userId}
                onChange={handleChangeInput("userId")}
              />
            </div>
            <div>
              <TextField
                id="login_password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={handleChangeInput("password")}
                value={password}
              />
            </div>
            <div>
              <Button
                endIcon={<SendIcon fontSize="small" />}
                type="submit"
                variant="outlined"
                color="primary"
              >
                ログイン
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </Body>
  );
};

//_______________________________________________
// style

const Body = styled.div`
  position: fixed;

  top: 0;
  left: 0;
  background-color: #44444444;
  width: 100vw;
  height: 100vh;
  transition: 0.2s;
  & > div {
    & > div {
      word-wrap: break-all;
      word-break: break-all;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    min-height: 10rem;
    max-width: 20rem;
    word-wrap: break-all;
  }
  form > * {
    padding: 0.5rem 1rem 0.25rem;
    &:last-child {
      padding-bottom: 0.5rem;
    }
  }
`;

export default Component;
