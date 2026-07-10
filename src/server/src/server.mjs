import 'sharp';
import './config/env.mjs';
import express from 'express';
import cors from 'cors';
import passport from './config/passport.mjs';
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


const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/dashboard/user', dashboardRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/dashboard/librarian', dashboardLibrarianRoutes);
app.use('/api/announcements', announcementRoutes);
app.use(libraryRoutes);
app.use(searchRoutes);
app.use(historyRoutes);

const PORT = process.env.PORT || 5000;

runStartupPinCleanup();
startPeriodicPinCleanup();
runStartupAnnouncementCleanup();
startPeriodicAnnouncementCleanup();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
