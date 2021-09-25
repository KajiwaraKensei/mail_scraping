//_______________________________________________
//
import type { NextPage } from "next";
import React from "react";
import styled from "styled-components";
import { EmailList } from "~/util/mailingList/mail/GetEmailList";

//_______________________________________________
// component
const Component: NextPage = (mailingList: any, email: EmailList) => {
  // メールアドレス表示
  const mapMailList = email.map((mail) => (
    <tr key={"mailing_list_" + mailingList.mail + "_" + mail.email}>
      <td>{mail.email}</td>
      <td>{mail.comment}</td>
      <td>{mail.post ? "●" : "✖︎"}</td>
      <td>{mail.subscribe ? "●" : "✖︎"}</td>
    </tr>
  ));

  return (
    <div>
      <h2>{mailingList.mail}</h2>
      <Table>
        <thead>
          <tr>
            <th>メールアドレス</th>
            <th>コメント</th>
            <th>投稿</th>
            <th>購読</th>
          </tr>
        </thead>
        <tbody>
          {mapMailList.length ? (
            mapMailList
          ) : (
            <tr>
              <td>データなし</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

//_______________________________________________
// style

const Table = styled.table`
  border-collapse: collapse;
  & td,
  & th {
    border: 1px solid;
    min-width: 5rem;
    padding: 0.5rem;
    &:first-child {
      width: 30rem;
      max-width: 30rem;
    }
    &:nth-child(2) {
      width: 10rem;
      max-width: 10rem;
    }
    &:nth-child(3),
    &:nth-child(4) {
      text-align: center;
    }
  }
`;

export default Component;
