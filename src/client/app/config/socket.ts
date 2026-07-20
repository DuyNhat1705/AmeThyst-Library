'use client';

import { io } from 'socket.io-client';

let socket;

export const getSocket = (token) => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL, {
      auth: { token },
      autoConnect: false, // tự connect thủ công để kiểm soát khi nào connect
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};