import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "~/types/next";
import { Server as IO_Server } from "socket.io";
import { Server as NetServer } from "http";
import RefreshMailingListSocket from "~/socket/server/RefreshMailingList";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...");
    const httpServer: NetServer = res.socket.server as any;
    const io = new IO_Server(httpServer, {
      path: "/api/socket",
    });

    io.on("connection", (socket) => {
      socket.on("refresh_mailing_list", RefreshMailingListSocket(socket));
    });
    res.socket.server.io = io;
  }

  res.end();
};
