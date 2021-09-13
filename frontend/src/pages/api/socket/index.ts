//_______________________________________________
// ソケット通信設定
import { NextApiRequest } from "next";
import { Server as IO_Server } from "socket.io";
import { Server as NetServer } from "http";
import RefreshMailingListSocket from "~/socket/server/RefreshMailingList";
import RefreshMailList from "~/socket/server/RefreshMailList";
import { REFRESH_MAILING_LIST, REFRESH_MAIL_LIST } from "~/conf/mailingList";
import { NextApiResponseServerIO } from "~/types/next";

//_______________________________________________
//
export default async (_: NextApiRequest, res: NextApiResponseServerIO) => {
  // もしソケットサーバーがなければ作成
  if (!res.socket.server.io) {
    console.log("New Socket.io server...");
    const httpServer: NetServer = res.socket.server as any;
    const io = new IO_Server(httpServer, {
      path: "/api/socket",
    });

    io.on("connection", (socket) => {
      // イベント登録
      socket.on(REFRESH_MAILING_LIST, RefreshMailingListSocket(socket));
      socket.on(REFRESH_MAIL_LIST, RefreshMailList(socket));
    });

    res.socket.server.io = io;
  }

  res.end();
};
