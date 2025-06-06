import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    const user =
      typeof localStorage !== "undefined" ? JSON.parse(localStorage.getItem("user")!) : {};
    const __access_token__ = user?.accessToken;

    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      path: "/live/chat",
      transports: ["websocket"],
      withCredentials: true,
      auth: {
        __access_token__,
      },
    });
  }

  return socket;
};
