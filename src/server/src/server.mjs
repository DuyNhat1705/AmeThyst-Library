import 'sharp';
import './config/env.mjs';
import express from 'express';
import cors from 'cors';
import http from 'http';
import passport from './config/passport.mjs';
import { initSocket } from './config/socket.mjs';
import libraryRoutes from './routes/library.routes.mjs';
import authRoutes from './routes/auth.routes.mjs';
import userRoutes from './routes/user.routes.mjs';
import dashboardRoutes from './routes/dashboard.user.routes.mjs';
import dashboardLibrarianRoutes from './routes/dashboard.librarian.routes.mjs';
import { runStartupPinCleanup, startPeriodicPinCleanup } from './utils/pinScheduler.mjs';
import searchRoutes from './routes/search.routes.mjs';
import historyRoutes from './routes/history.routes.mjs';
import roomRoutes from './routes/room.routes.mjs';
import announcementRoutes from './routes/announcement.routes.mjs';
import { runStartupCleanup as runStartupAnnouncementCleanup, startPeriodicCleanup as startPeriodicAnnouncementCleanup } from './utils/announcementScheduler.mjs';
import wishlistRoutes from './routes/wishlist.routes.mjs';
import recommendationRoutes from './routes/recommendation.routes.mjs';
import { initScheduler } from './services/scheduler.services.mjs';
import studyGroupRoutes from './routes/study-group.routes.mjs';
import systemConfigurationRoutes from './routes/system-configuration.routes.mjs';
import { systemConfigurationService } from './services/system-configuration.services.mjs';
import adminRoutes from './routes/admin.routes.mjs';
import statisticsRoutes from './routes/statistics.routes.mjs';


const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/dashboard/user', dashboardRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/study-groups', studyGroupRoutes);
app.use('/api/dashboard/admin/system-configuration', systemConfigurationRoutes);
app.use('/dashboard/librarian', dashboardLibrarianRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/statistics', statisticsRoutes);
app.use(libraryRoutes);
app.use(searchRoutes);
app.use(historyRoutes);
app.use(recommendationRoutes);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const startServer = async () => {
  try {
    await systemConfigurationService.initialize();
    initSocket(server);
    runStartupPinCleanup();
    startPeriodicPinCleanup();
    runStartupAnnouncementCleanup();
    startPeriodicAnnouncementCleanup();
    initScheduler();
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Server startup aborted: system configuration is unavailable.', error.cause || error);
    process.exitCode = 1;
  }
};

startServer();

export { app, server, startServer };
