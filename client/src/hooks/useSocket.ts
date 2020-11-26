import {io} from 'socket.io-client';

const endpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'prodOne'
const socket = io('http://localhost:3000')


export const useSocket = () => {
    return {socket}
}