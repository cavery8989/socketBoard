import { Socket } from "socket.io-client";

export const bindSocket = (socket: Socket, event: string, cb: (...args) => void) => {
    socket.on(event, cb);
    return () => socket.off(event);
  };