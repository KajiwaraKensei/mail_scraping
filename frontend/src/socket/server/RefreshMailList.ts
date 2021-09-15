import Nightmare from "nightmare";
import { Socket } from "socket.io";
import { LoginZenlogic } from "~/mailingList/login/LoginZenlogic";
import { GetEmailList } from "~/mailingList/mail/GetEmailList";
import { LoadEmailList } from "~/mailingList/mail/LoadEmailList";
import { SaveEmailList } from "~/mailingList/mail/SaveEmailList";
import { MailingList } from "~/mailingList/mailingList/GetMailingList";

/**
 * メーリングリスト更新
 * @module Main
 * @param socket ソケット
 */
const Main = (socket: Socket) => async (_: MailingList) => {
  const n = new Nightmare();
  try {
    socket.emit("process", "ログイン中");
    await LoginZenlogic()(n); // サイトにログイン
    const allList = await getMailListSub(n, _, socket); // メールリスト取得
    socket.emit("process", "メーリングリスト保存中");
    await SaveEmailList(allList); // メールリスト保存
    socket.emit("complete", allList); // 結果Return
    socket.disconnect(); // 接続解除
  } catch (error) {
    // エラー処理
    console.log(error);
    socket.emit("error", error);
  } finally {
    n.end();
    socket.disconnect();
  }
  return;
};

/**
 * メーリングリスト取得
 * @module getMailListSub
 * @param n ログイン済みのNightmare
 * @param _ 更新するメーリングリストの配列
 * @param socket ソケット
 * @returns 更新後のメーリングリスト
 */
async function getMailListSub(n: Nightmare, _: MailingList, socket: Socket) {
  const allList = await LoadEmailList(); // 既存のメールリストを読み込み

  let count = 0; // 何件目を取得しているかのカウント
  const length = _.length; // 更新する件数

  for (const mail of _) {
    void socket.emit(
      "process",
      `メーリングリスト取得中(${++count}/${length}) ${mail.link}`
    ); // 何件目を取得しているかのメッセージをクライアントに送信

    // メールリストを取得して既存のリストを上書き
    allList[mail.mail] = await GetEmailList(mail.link)(n);
  }
  return allList;
}

export default Main;
