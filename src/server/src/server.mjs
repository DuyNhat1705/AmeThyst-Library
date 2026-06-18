import express from 'express';
import cors from 'cors';
import passport from './config/passport.mjs';
import libraryRoutes from './routes/library.mjs';
import authRoutes from './routes/auth.routes.mjs';
import userRoutes from './routes/user.routes.mjs';

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use(libraryRoutes);

const PORT = 5000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// app.post('/library/calculate', (req, res) => {
//   const { num1, num2 } = req.body;
//   const result = num1 + num2;
//   res.json({ result });
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
