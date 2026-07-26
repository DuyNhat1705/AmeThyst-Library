'use client';

import { io, type Socket } from 'socket.io-client';

let socket: Socket | null = null;
let activeToken: string | null = null;

export const getSocket = (token: string) => {
  if (!socket || activeToken !== token) {
    socket?.disconnect();
    socket = io(process.env.NEXT_PUBLIC_API_URL, {
      auth: { token },
      autoConnect: false, // tự connect thủ công để kiểm soát khi nào connect
    });
    activeToken = token;
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    activeToken = null;
  }
};
