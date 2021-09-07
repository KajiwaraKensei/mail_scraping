import type { NextPage } from "next";
import React from "react";
import MailingList from "~/components/MailingList";
const Home: NextPage = () => {
  return (
    <div>
      <MailingList />
    </div>
  );
};

export default Home;
