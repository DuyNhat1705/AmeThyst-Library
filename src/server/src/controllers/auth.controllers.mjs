import { registerUser, loginUser, forgotPassword, resetPassword } from '../services/auth.services.mjs';
import { verifyOtp } from '../services/otp.service.mjs';

const register = async (req, res) => {
  try {
    const { email, password, username, phoneNumber, avatar, role } = req.body;
    const user = await registerUser({ email, password, username, phoneNumber, avatar, role });
    res.status(201).json({ message: 'Register successful', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser({ email, password });
    res.status(200).json(data);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const forgot = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await forgotPassword({ email });
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const verify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await verifyOtp({ email, otp });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const reset = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const result = await resetPassword({ email, newPassword });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { register, login, forgot, verify, reset };
