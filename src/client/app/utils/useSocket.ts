'use client';
import { useEffect } from 'react';
import { getSocket } from '../config/socket';

export const useSocket = (_legacyToken?: string | null) => {
  const socket = getSocket();
  useEffect(() => {
    if (!socket.connected) socket.connect();
    const onError = (error: Error) => console.error('Socket connection error:', error.message);
    socket.on('connect_error', onError);
    return () => { socket.off('connect_error', onError); };
  }, [socket]);
  return socket;
};
