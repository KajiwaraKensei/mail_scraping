import type { NextPage } from "next";
import React from "react";
import styled from "styled-components";
import MailingList from "~/components/MailingList";
const Home: NextPage = () => {
  return (
    <Body>
      <MailingList />
    </Body>
  );
};

const Body = styled.div`
  padding: 1rem;
`;

export default Home;
