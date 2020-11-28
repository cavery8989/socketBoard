import { io } from "socket.io-client";
console.log(process.env.REACT_APP_API_ROOT!)
const socket = io(process.env.REACT_APP_API_ROOT!);

socket.on('connect', () => {
  console.log('client connected')
})

export const useSocket = () => {

  return {
    socket 
  };
};
