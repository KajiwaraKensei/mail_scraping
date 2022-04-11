import { io } from "socket.io-client";
import { REFRESH_MAIL_ACCOUNT, REFRESH_TRANSFER_SETTING } from "~/conf/mailingList";
import { EmailListAll } from "~/util/mailingList/transferSetting/GetTransferSetting";
import { MailingList } from "~/util/mailingList/transferSetting/GetEmailAccount";

/**
 * メールアカウント更新【ソケット通信(クライアント側)】
 * @module RefreshMailAccountSocket
 * @param callback 取得中のログメッセージ
 * @returns 更新後のメーリングリスト
 */
export const RefreshMailAccountSocket = (
  callback: (message: string) => void
) => {
  return new Promise<MailingList>((resolve, reject) => {
    const socket = io("/", { path: "/api/socket" });

    socket.on("connect", () => {
      socket.emit(REFRESH_MAIL_ACCOUNT);
    }); // 接続開始

    socket.on("process", callback); // 取得中のログメッセージ
    socket.on("complete", resolve); // 完了
    socket.on("error", reject); // エラー
    socket.on("connect_error", reject); // 接続エラー
  });
};

/**
 * 転送設定更新【ソケット通信(クライアント側)】
 * @module RefreshTransferSettingSocket
 * @param callback 取得中のログメッセージ
 * @returns 更新後のメーリングリスト
 */
export const RefreshTransferSettingSocket = (
  mailingList: MailingList,
  callback: (message: string) => void
) => {
  return new Promise<EmailListAll>((resolve, reject) => {
    const socket = io("/", { path: "/api/socket" });

    socket.on("connect", () => {
      socket.emit(REFRESH_TRANSFER_SETTING, mailingList);
    });

    socket.on("process", callback);
    socket.on("complete", resolve);
    socket.on("error", reject);
    socket.on("connect_error", reject);
  });
};
