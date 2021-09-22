import { io } from "socket.io-client";
import { REFRESH_MAILING_LIST, REFRESH_MAIL_LIST } from "~/conf/mailingList";
import { EmailListAll } from "~/mailingList/mail/GetEmailList";
import { MailingList } from "~/mailingList/mailingList/GetMailingList";

/**
 * メーリングリスト更新【ソケット通信(クライアント側)】
 * @module RefreshMailingListSocket
 * @param callback 取得中のログメッセージ
 * @returns 更新後のメーリングリスト
 */
export const RefreshMailingListSocket = (
  callback: (message: string) => void
) => {
  return new Promise<MailingList>((resolve, reject) => {
    const socket = io("/", { path: "/api/socket" });

    socket.on("connect", () => {
      socket.emit(REFRESH_MAILING_LIST);
    }); // 接続開始

    socket.on("process", callback); // 取得中のログメッセージ
    socket.on("complete", resolve); // 完了
    socket.on("error", reject); // エラー
    socket.on("connect_error", reject); // 接続エラー
  });
};

/**
 * メールリスト更新【ソケット通信(クライアント側)】
 * @module RefreshMailListSocket
 * @param callback 取得中のログメッセージ
 * @returns 更新後のメーリングリスト
 */
export const RefreshMailListSocket = (
  mailingList: MailingList,
  callback: (message: string) => void
) => {
  return new Promise<EmailListAll>((resolve, reject) => {
    const socket = io("/", { path: "/api/socket" });

    socket.on("connect", () => {
      socket.emit(REFRESH_MAIL_LIST, mailingList);
    });

    socket.on("process", callback);
    socket.on("complete", resolve);
    socket.on("error", reject);
    socket.on("connect_error", reject);
  });
};
