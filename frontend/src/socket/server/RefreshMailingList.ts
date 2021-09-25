import Puppeteer from "puppeteer";
import { Socket } from "socket.io";
import { LoginZenlogic } from "~/mailingList/login/LoginZenlogic";
import { GetMailingList } from "~/mailingList/mailingList/GetMailingList";
import { SaveMailingList } from "~/mailingList/mailingList/SaveMailingList";

/**
 * メーリングリストアドレス更新
 * @module Main
 * @param socket ソケット
 */
const Main = (socket: Socket) => async (_: string[]) => {
  const browser = await Puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  try {
    socket.emit("process", "ログイン中");
    void (await LoginZenlogic()(page));
    socket.emit("process", "メーリングリスト取得中");
    const list = await GetMailingList(page);
    socket.emit("process", "メーリングリスト保存中");
    void (await SaveMailingList(list));
    socket.emit("complete", list);
    socket.disconnect();
  } catch (error) {
    console.log(error);
  } finally {
    browser.close();
  }
};

export default Main;
