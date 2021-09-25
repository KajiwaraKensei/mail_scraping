//_______________________________________________
// メーリングリスト一覧
import type { NextPage } from "next";
import React, { useContext } from "react";

import styled from "styled-components";
import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";

import Loading from "../Loading";
import Login from "~/components/Login";
import { StoreContext } from "~/pages/_app";
import useEmailList from "~/hook/useEmailList";
import useMailingListAddress from "~/hook/useMailingListAddress";
import useCheckList from "~/hook/useCheckList";
import { MailingListItem } from "~/util/mailingList/mailingList/GetMailingList";
import { CSV_Download } from "~/util/CSV_Download";

//_______________________________________________
// component
const Component: NextPage = () => {
  const { state } = useContext(StoreContext);
  const { mailingList, loading, fn } = useMailingListAddress();
  const { emailList, setEmailList, fn: emailFn } = useEmailList();
  const { checkList, fn: checkFn } = useCheckList("mailing_list");

  // CSVダウンロード
  const handleClickCSV = () => {
    const selectItems = checkFn.checkData(emailList); // チェックしている項目を取得
    const csv = emailFn.toCSV(selectItems); // CSVデータに変換

    // ダウンロード
    CSV_Download(
      csv,
      "メーリングリスト_" + new Date().toLocaleDateString() + ".csv",
      "SJIS"
    );
  };

  // メールリスト再読み込み
  const MailRefresh = (mail: MailingListItem) => async () => {
    const next = await fn.MailListRefresh([mail])();
    setEmailList(next);
  };

  // 全てのメールリスト再読み込み
  const AllRefresh = async () => {
    const next = await fn.MailListRefresh(mailingList)();
    setEmailList(next);
  };

  // メールリスト展開
  const mapMailList = (key: string) =>
    (emailList[key] || []).map((mail) => (
      <TableRow key={"mailing_list_" + key + "_" + mail.email}>
        <TableCell component="th">{mail.email}</TableCell>
        <TableCell>{mail.comment}</TableCell>
        <TableCell align="center">{mail.post ? "✔️" : ""}</TableCell>
        <TableCell align="center">{mail.subscribe ? "✔️" : ""}</TableCell>
      </TableRow>
    ));

  // メーリングリスト展開
  const mapMailingAddress = mailingList.map((mail) => (
    <div key={"mailing_list_" + mail.mail} className="mail_table">
      <h3>
        <Checkbox
          checked={!!checkList[mail.mail]}
          onChange={checkFn.handleChangeCheckBox(mail.mail)}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        {mail.mail}
        <IconButton disabled={loading.loading} onClick={MailRefresh(mail)}>
          <RefreshIcon fontSize="small" />
        </IconButton>
      </h3>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell component="th">メールアドレス</TableCell>
              <TableCell component="th">コメント</TableCell>
              <TableCell component="th" align="center">
                投稿
              </TableCell>
              <TableCell component="th" align="center">
                購読
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emailList[mail.mail] ? (
              mapMailList(mail.mail)
            ) : (
              <tr>
                <td>データなし</td>
              </tr>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ));

  return (
    <Body>
      {state.login.state && <button onClick={AllRefresh}>全て更新</button>}
      {state.login.state && (
        <button onClick={checkFn.checkAll(Object.keys(emailList))}>
          全てチェック
        </button>
      )}
      {state.login.state && (
        <button onClick={handleClickCSV}>
          チェックを入れたのをダウンロード
        </button>
      )}
      {mapMailingAddress}
      {mailingList.length <= 0 && <div>データなし</div>}
      <Loading loading={loading} />
      {!state.login.state && <Login />}
    </Body>
  );
};

//_______________________________________________
// style

const Body = styled.div`
  h2 {
    margin-bottom: 0.2rem;
  }
  .mail_table {
    padding: 1rem 0.5rem;
    max-width: 60rem;
  }

  th {
    font-weight: bold;
  }
  & td,
  & th {
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

const Table1 = styled.table`
  border-collapse: collapse;
  th {
    background-color: #333;
    color: #222;
  }
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
