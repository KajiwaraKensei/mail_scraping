import type { NextPage } from "next";
import React from "react";
import styled from "styled-components";
import TransferSettingComponent from "~/components/TransferSetting";
const Home: NextPage = () => {
    return (
        <Body>
            <TransferSettingComponent />
        </Body>
    );
};

const Body = styled.div`
  padding: 1rem;
`;

export default Home;

