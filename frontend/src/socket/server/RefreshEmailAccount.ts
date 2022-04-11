import Puppeteer from "puppeteer";
import { Socket } from "socket.io";

import { LoginZenlogic } from "~/util/mailingList/login/LoginZenlogic";
import { GetEmailAccount } from "~/util/mailingList/transferSetting/GetEmailAccount";
import { SaveEmailAccount } from "~/util/mailingList/transferSetting/SaveEmailAccount";

/**
 * メールアカウント更新
 * @module RefreshEmailAccount
 * @param socket ソケット
 */
export const RefreshEmailAccount = (socket?: Socket) => async (_: string[]) => {
  const browser = await Puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  
  try {
    socket && socket.emit("process", "ログイン中");
    void (await LoginZenlogic()(page));
    socket && socket.emit("process", "メールアカウント取得中");
    console.log("a");
    
    const list = await GetEmailAccount(page);
    socket && socket.emit("process", "メールアカウント保存中");
    void (await SaveEmailAccount(list));
    socket && socket.emit("complete", list);
    socket && socket.disconnect();
    return list
  } catch (error) {
    console.log(error);
  } finally {
    browser.close();
  }
};

export default RefreshEmailAccount;
