import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

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

  // Middleware xác thực bằng JWT
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error('Authentication error: No token provided'));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.userId; // chỉnh lại field nếu payload token khác
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