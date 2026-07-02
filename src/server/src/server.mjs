import './config/env.mjs';
import express from 'express';
import cors from 'cors';
import passport from './config/passport.mjs';
import libraryRoutes from './routes/library.mjs';
import authRoutes from './routes/auth.routes.mjs';
import userRoutes from './routes/user.routes.mjs';
import dashboardRoutes from './routes/dashboard.user.routes.mjs';
import { clearAllPins, cleanupExpiredPins } from './services/library.services.mjs';
import searchRoutes from './routes/search.routes.mjs';
import historyRoutes from './routes/history.routes.mjs';
import roomRoutes from './routes/room.routes.mjs';


const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/api/rooms', roomRoutes);
app.use(libraryRoutes);
app.use(searchRoutes);
app.use(historyRoutes);

const PORT = process.env.PORT || 5000;

clearAllPins().then(count => {
  if (count > 0) {
    console.log(`Cleared ${count} pending PIN(s) on startup`);
  }
}).catch(err => {
  console.error('Startup PIN cleanup failed:', err);
});

setInterval(async () => {
  const cleaned = await cleanupExpiredPins();
  if (cleaned > 0) {
    console.log(`Cleaned up ${cleaned} expired PIN(s)`);
  }
}, 60 * 1000);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
