import express from 'express';
import cors from 'cors';
import passport from './config/passport.mjs';
import dotenv from 'dotenv';
import libraryRoutes from './routes/library.mjs';
import authRoutes from './routes/auth.routes.mjs';
import userRoutes from './routes/user.routes.mjs';
import searchRoutes from './routes/search.routes.mjs';
import historyRoutes from './routes/history.routes.mjs';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use(libraryRoutes);
app.use(searchRoutes);
app.use(historyRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
