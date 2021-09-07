//_______________________________________________
//
import type { NextPage } from "next";
import React, { useContext } from "react";
import styled from "styled-components";
import useEmailList from "~/hook/useEmailList";
import useMailingListAddress from "~/hook/useMailingListAddress";
import { MailingListItem } from "~/mailingList/mailingList/GetMailingList";
import Loading from "../Loading";

//_______________________________________________
// component
const Component: NextPage = () => {
  const { mailingList, loading, fn } = useMailingListAddress();
  const { emailList, setEmailList, fn: emailFn } = useEmailList();

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

  const MailRefresh = (mail: MailingListItem) => async () => {
    const next = await fn.MailRefresh([mail])();
    console.log(next);

    setEmailList(next);
  };

  const AllRefresh = async () => {
    const next = await fn.MailRefresh(mailingList)();
    setEmailList(next);
  };

  // メーリングリスト展開
  const mapMailingAddress = mailingList.map((mail) => (
    <div key={"mailing_list_" + mail.mail}>
      <h2>{mail.mail}</h2>
      <button disabled={loading.loading} onClick={MailRefresh(mail)}>
        更新
      </button>
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
    <Body>
      <button onClick={AllRefresh}>全て更新</button>
      {mapMailingAddress}
      <Loading loading={loading} />
    </Body>
  );
};

//_______________________________________________
// style

const Body = styled.div`
  padding-top: 5rem;
  h2 {
    margin-bottom: 0.2rem;
  }
`;

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
