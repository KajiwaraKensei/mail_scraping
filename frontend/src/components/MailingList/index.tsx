//_______________________________________________
//
import type { NextPage } from "next";
import React from "react";
import styled from "styled-components";
import useEmailList from "~/hook/useEmailList";
import useMailingListAddress from "~/hook/useMailingListAddress";

//_______________________________________________
// component
const Component: NextPage = () => {
  const { mailingList, loading, fn } = useMailingListAddress();
  const { emailList, fn: emailFn } = useEmailList();

  // メールアドレス表示
  const mapMailList = (key: string) =>
    (emailList[key] || []).map((mail) => (
      <tr key={"mailing_list_" + key + "_" + mail.email}>
        <td>{mail.email}</td>
        <td>{mail.comment}</td>
        <td>{mail.post ? "●" : "✖︎"}</td>
        <td>{mail.subscribe ? "●" : "✖︎"}</td>
      </tr>
    ));

  // メーリングリスト展開
  const mapMailingAddress = mailingList.map((mail) => (
    <div key={"mailing_list_" + mail.mail}>
      <h2>{mail.mail}</h2>
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
          {emailList[mail.mail] ? (
            mapMailList(mail.mail)
          ) : (
            <tr>
              <td>データなし</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  ));
  return (
    <>
      <button disabled={loading.loading} onClick={fn.MailingListRefresh}>
        リフレッシュ
      </button>
      <button disabled={loading.loading} onClick={fn.MailingListLoad}>
        リロード
      </button>

      <div>{loading.loading ? "通信中" : ""}</div>
      <div>{loading.message.length ? loading.message : ""}</div>
      {mapMailingAddress}
    </>
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
