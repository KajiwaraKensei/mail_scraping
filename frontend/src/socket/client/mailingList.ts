import { io } from "socket.io-client";
import { REFRESH_MAILING_LIST } from "~/conf/mailingList";
import { MailingList } from "~/mailingList/mailingList/GetMailingList";

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
