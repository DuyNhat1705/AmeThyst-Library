import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import pool from './postgres.mjs';

let io;

/**
 * Khởi tạo Socket.IO, gắn vào HTTP server có sẵn
 * @param {http.Server} server
 * @returns {Server} io instance
 */
export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*', // production nên thay bằng domain frontend cụ thể
      methods: ['GET', 'POST']
    }
  });

  // Middleware xác thực bằng JWT + kiểm tra token_version
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error('Authentication error: No token provided'));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded?.userId) return next(new Error('Authentication error: Token has no userId'));

      const result = await pool.query(
        'SELECT token_version FROM public.users WHERE user_id = $1',
        [decoded.userId]
      );
      const stored = result.rows[0];
      if (!stored || (decoded.token_version ?? 0) !== (stored.token_version ?? 0)) {
        return next(new Error('Authentication error: Token version mismatch'));
      }

      socket.userId = decoded.userId;
      socket.role = decoded.role;
      next();
    } catch (err) {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  // Xử lý kết nối
  io.on('connection', (socket) => {
    console.log(`User ${socket.userId} connected via socket ${socket.id}`);

    socket.join(`user:${socket.userId}`);

    socket.on('disconnect', () => {
      console.log(`User ${socket.userId} disconnected`);
    });
  });

  return io;
};

/**
 * Lấy lại io instance ở bất kỳ đâu (controller, service...)
 * @returns {Server} io instance
 */
export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io chưa được khởi tạo. Gọi initSocket(server) trước.');
  }
  return io;
};

export const emitStudyGroupChanged = (groupId, changeType) => {
  if (io) io.emit('study-group:changed', { groupId, changeType });
};

export const emitUserNotification = (userId, notification) => {
  if (io && userId) io.to(`user:${userId}`).emit('notification:new', notification);
};

export const emitAuthorizationChanged = (entry) => {
  if (io) io.emit('authorization:changed', entry);
};
