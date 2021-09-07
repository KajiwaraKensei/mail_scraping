import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "~/types/next";
import { Server as IO_Server } from "socket.io";
import { Server as NetServer } from "http";
import RefreshMailingListSocket from "~/socket/server/RefreshMailingList";
import { REFRESH_MAILING_LIST, REFRESH_MAIL_LIST } from "~/conf/mailingList";
import RefreshMailList from "~/socket/server/RefreshMailList";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...");
    const httpServer: NetServer = res.socket.server as any;
    const io = new IO_Server(httpServer, {
      path: "/api/socket",
    });

    io.on("connection", (socket) => {
      socket.on(REFRESH_MAILING_LIST, RefreshMailingListSocket(socket));
      socket.on(REFRESH_MAIL_LIST, RefreshMailList(socket));
    });

    res.socket.server.io = io;
  }

  res.end();
};
