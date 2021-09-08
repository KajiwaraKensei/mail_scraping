//_______________________________________________
//
import type { NextPage } from "next";
import React from "react";
import styled from "styled-components";
import { Loading } from "~/util/loading";

type Props = {
  loading: Loading;
};
//_______________________________________________
// component
const Component: NextPage<Props> = (props) => {
  return (
    <Body loading={String(props.loading.loading)}>
      <div>
        <h3>通信中...</h3>
        <div>{props.loading.message}</div>
      </div>
    </Body>
  );
};

//_______________________________________________
// style

const Body = styled.div<{ loading: string }>`
  position: fixed;

  top: 0;
  left: 0;
  background-color: #44444444;
  width: 100vw;
  height: 100vh;
  transition: 0.2s;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    min-height: 10rem;
    max-width: 20rem;

    & > div {
      word-wrap: break-all;
      word-break: break-all;
    }
  }

  opacity: ${(p) => (p.loading == "true" ? "1" : "0")};
  ${(p) => (p.loading == "true" ? "" : "pointer-events: none")};
`;

export default Component;
