//_______________________________________________
// メーリングリスト一覧
import type { NextPage } from "next";
import React, { useContext } from "react";
import Link from "next/link";

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
  Typography,
} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";

import RefreshIcon from "@material-ui/icons/Refresh";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Loading from "../Loading";
import Login from "~/components/Login";
import { StoreContext } from "~/pages/_app";
import useEmailList from "~/hook/useTransferSetting";
import useMailingListAddress from "~/hook/useEmailSetting";
import useCheckList from "~/hook/useCheckList";
import { MailingList, MailingListItem } from "~/util/mailingList/transferSetting/GetEmailAccount";
import { CSV_Download } from "~/util/CSV_Download";
import FilterInputComponent from "../MailingList/FilterInput";

//_______________________________________________
// component
const TransferSettingComponent: NextPage = () => {
  const { state } = useContext(StoreContext);
  const { mailSettings, loading } = useMailingListAddress();
  const {
    emailList,
    fn: emailFn,
    loading: emailLoading,
    isAllShow,
  } = useEmailList();
  const { checkList, fn: checkFn } = useCheckList("transfer_setting");

  // CSVダウンロード
  const handleClickCSV = () => {
    const selectItems = checkFn.checkData(emailList); // チェックしている項目を取得
    const csv = emailFn.toCSV(selectItems); // CSVデータに変換

    // ダウンロード
    CSV_Download(
      csv,
      "転送設定_" + new Date().toLocaleDateString() + ".csv",
      "SJIS"
    );
  };

  // メールリスト再読み込み
  const MailRefresh = (mail: MailingListItem) => async () => {
    await emailFn.MailListRefresh([mail])();
  };

  // 全てのメールリスト再読み込み
  const AllRefresh =
  (_mailingList = mailSettings) =>
  async () => {
    await emailFn.MailListRefresh(_mailingList)();
  };

  // メーリングリスト一覧際読み込み
  const RefreshMailList = async () => {
    const list = checkFn.checkData(emailList);
    console.log(list);
    
    if (Object.keys(list).length > 0) {
      const array = Object.keys(list).map(key => {
        return mailSettings.find((a)=> a.mail === key)
      }).filter(v => v) as MailingList
      AllRefresh(array)();
      return;
    }
  };

  // メールリスト展開
  const mapMailList = (key: string) =>
    (emailList[key] || []).map((mail) => (
      <TableRow
        key={"mailing_list_" + key + "_" + mail.forwardingAddress + mail.head}
      >
        <TableCell component="th">{mail.forwardingAddress}</TableCell>
        <TableCell>{mail.head}</TableCell>
        <TableCell>{mail.terms}</TableCell>
      </TableRow>
    ));

  // メーリングリスト展開
  const mapMailingAddress = mailSettings.map((mail) => {
    if (
      (!emailList[mail.mail] || emailList[mail.mail].length === 0) &&
      !isAllShow
    ) {
      return null;
    }

    return (
      <div key={"mailing_list_" + mail.mail} className="mail_table">
        <h3>
          <Checkbox
            checked={!!checkList[mail.mail]}
            onChange={checkFn.handleChangeCheckBox(mail.mail)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <a href={mail.link} target="noreferrer noopener _blank" >{mail.mail}</a>
          <IconButton disabled={loading.loading} onClick={MailRefresh(mail)}>
            <RefreshIcon fontSize="small" />
          </IconButton>
        </h3>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell component="th">転送先</TableCell>
                <TableCell component="th">メールヘッダー</TableCell>
                <TableCell component="th" align="center">
                  条件
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mapMailList(mail.mail)}
              {(!emailList[mail.mail] || emailList[mail.mail].length === 0) && (
                <TableRow>
                  <TableCell>設定なし</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  });

  const HeadDom = state.login.state && (
    <div>
      <Typography variant="h4">転送設定一覧</Typography>
      <ButtonGroup aria-label="outlined button group">
        <Button>
          <Link href="/">メーリングリストに切り替え</Link>
        </Button>
        <Button onClick={checkFn.checkAll(Object.keys(emailList))}>
          全てチェック
        </Button>
        <Button onClick={RefreshMailList}>チェックを更新</Button>
        <Button onClick={handleClickCSV}>CSVにエクスポート</Button>
      </ButtonGroup>
      <FilterInputComponent handleSubmit={emailFn.filterList} />
    </div>
  );

  return (
    <Body>
      {HeadDom}
      {mapMailingAddress}
      {Object.keys(emailList).length <= 0 && <div>データなし</div>}
      <Loading loading={loading} />
      <Loading loading={emailLoading} />
      {!state.login.state && <Login />}
    </Body>
  );
};

//_______________________________________________
// style

const Body = styled.div`
  h4 {
    margin-bottom: 1rem;
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

export default TransferSettingComponent;
