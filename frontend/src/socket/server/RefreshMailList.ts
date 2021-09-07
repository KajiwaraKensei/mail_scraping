import Nightmare from "nightmare";
import { Socket } from "socket.io";
import { LoginZenlogic } from "~/mailingList/login/LoginZenlogic";
import { GetEmailList } from "~/mailingList/mail/GetEmailList";
import { LoadEmailList } from "~/mailingList/mail/LoadEmailList";
import { SaveEmailList } from "~/mailingList/mail/SaveEmailList";
import { MailingList } from "~/mailingList/mailingList/GetMailingList";

const Main = (socket: Socket) => async (_: MailingList) => {
  try {
    const n = new Nightmare();
    socket.emit("process", "ログイン中");
    void (await LoginZenlogic()(n));
    const allList = await LoadEmailList();

    for (const mail of _) {
      socket.emit("process", "メーリングリスト取得中 - " + mail.link);
      allList[mail.mail] = await GetEmailList(mail.link)(n);
    }
    socket.emit("process", "メーリングリスト保存中");
    void (await SaveEmailList(allList));
    socket.emit("complete", allList);
    socket.disconnect();
  } catch (error) {
    console.log(error);

    socket.emit("error", error);
    socket.disconnect();
  }
};

export default Main;
