import { io } from "socket.io-client";

const endpoint =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://whispering-bayou-18693.herokuapp.com/";

const socket = io(endpoint);
export const useSocket = () => {
  return { socket };
};
