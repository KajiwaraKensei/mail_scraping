import type { NextPage } from "next";
import React from "react";
import styled from "styled-components";
import useMailingListAddress from "~/hook/useMailingListAddress";
const Home: NextPage = () => {
  const { mailingList, loading } = useMailingListAddress();

  const mapMailingAddress = mailingList.map((mail) => (
    <li key={"h_mailing_list_address_" + mail.mail}>
      {mail.mail} : {mail.comment}
    </li>
  ));
  return (
    <div>
      <Title>Hello World!!</Title>
      <div>
        <div>{loading.loading ? "通信中" : "取得済み"}</div>
        <div>{loading.isError && "エラー"}</div>
        <ul>{mapMailingAddress}</ul>
      </div>
    </div>
  );
};

const Title = styled.h1``;

export default Home;
