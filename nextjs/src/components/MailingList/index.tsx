import type { NextPage } from "next";
import React from "react";
import styled from "styled-components";
import useMailingListAddress from "~/hook/useMailingListAddress";
const Home: NextPage = () => {
  const { mailingList, loading, fn } = useMailingListAddress();

  const mapMailingAddress = mailingList.map((mail) => (
    <tr key={"h_mailing_list_address_" + mail.mail}>
      <td>{mail.mail}</td>
      <td>{mail.comment}</td>
    </tr>
  ));
  return (
    <>
      <button disabled={loading.loading} onClick={fn.MailingListRefresh}>
        リフレッシュ
      </button>
      <div>{loading.loading ? "通信中" : ""}</div>
      <Table>
        <tbody>{mapMailingAddress}</tbody>
      </Table>
    </>
  );
};

const Table = styled.table`
  & td {
    border: 1px solid;
  }
`;

export default Home;
