import { io } from "socket.io-client";
import { REFRESH_MAILING_LIST, REFRESH_MAIL_LIST } from "~/conf/mailingList";
import { EmailList, EmailListAll } from "~/mailingList/mail/GetEmailList";
import {
  MailingList,
  MailingListItem,
} from "~/mailingList/mailingList/GetMailingList";

export const RefreshMailingListSocket = (
  callback: (message: string) => void
) => {
  return new Promise<MailingList>((resolve, reject) => {
    const socket = io("http://localhost:3000", {
      path: "/api/socket",
    });

    socket.on("connect", () => {
      socket.emit(REFRESH_MAILING_LIST);
    });

    socket.on("process", callback);

    socket.on("complete", (e) => {
      resolve(e);
      socket.disconnect();
    });
    socket.on("error", reject);
    socket.on("connect_error", reject);
  });
};

export const RefreshMailListSocket = (
  mailingList: MailingList,
  callback: (message: string) => void
) => {
  return new Promise<EmailListAll>((resolve, reject) => {
    const socket = io("http://localhost:3000", {
      path: "/api/socket",
    });

    socket.on("connect", () => {
      socket.emit(REFRESH_MAIL_LIST, mailingList);
    });

    socket.on("process", callback);

    socket.on("complete", resolve);
    socket.on("error", reject);
    socket.on("connect_error", reject);
  });
};
