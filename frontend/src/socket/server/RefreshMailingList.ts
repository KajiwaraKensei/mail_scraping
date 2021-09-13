import Nightmare from "nightmare";
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
  const n = new Nightmare();
  socket.emit("process", "ログイン中");
  void (await LoginZenlogic()(n));
  socket.emit("process", "メーリングリスト取得中");
  const list = await GetMailingList(n);
  socket.emit("process", "メーリングリスト保存中");
  void (await SaveMailingList(list));
  socket.emit("complete", list);
  socket.disconnect();
};

export default Main;
