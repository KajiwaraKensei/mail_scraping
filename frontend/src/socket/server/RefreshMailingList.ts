import Puppeteer from "puppeteer";
import { Socket } from "socket.io";

import { LoginZenlogic } from "~/util/mailingList/login/LoginZenlogic";
import { GetMailingList } from "~/util/mailingList/mailingList/GetMailingList";
import { SaveMailingList } from "~/util/mailingList/mailingList/SaveMailingList";

/**
 * メーリングリストアドレス更新
 * @module RefreshMailingList
 * @param socket ソケット
 */
export const RefreshMailingList = (socket?: Socket) => async (_: string[]) => {
  const browser = await Puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  try {
    socket && socket.emit("process", "ログイン中");
    void (await LoginZenlogic()(page));
    socket && socket.emit("process", "メーリングリスト取得中");
    const list = await GetMailingList(page);
    socket && socket.emit("process", "メーリングリスト保存中");
    void (await SaveMailingList(list));
    socket && socket.emit("complete", list);
    socket && socket.disconnect();
    return list
  } catch (error) {
    console.log(error);
  } finally {
    browser.close();
  }
};

export default RefreshMailingList;
