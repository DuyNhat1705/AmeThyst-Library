// hooks/useSocket.js
'use client';

import { useEffect } from 'react';
import { getSocket, disconnectSocket } from '../config/socket';

export const useSocket = (token: string | null) => {
  const socket = token ? getSocket(token) : null;

  useEffect(() => {
    if (!token) {
      disconnectSocket();
      return;
    }

    const socket = getSocket(token);

    if (!socket.connected) {
      socket.connect();
    }

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
    });

    return () => {
      // Không disconnect ngay khi unmount 1 component,
      // chỉ disconnect khi thực sự rời khỏi app/logout
      socket.off('connect');
      socket.off('connect_error');
    };
  }, [token]);

  return socket;
};
