import { io } from "socket.io-client";

const endpoint =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://glacial-atoll-21218.herokuapp.com/ ";

const socket = io(endpoint);
export const useSocket = () => {
  return { socket };
};
