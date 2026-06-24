import { fetchEventsByMonth, fetchAgenda, createPersonalTask } from '../services/dashboard.services.mjs';

const getEvents = async (req, res) => {
  try {
    const { month, year } = req.query;
    const userId = req.user.userId;
    if (!month || !year) {
      return res.status(400).json({ error: 'month and year are required' });
    }
    const events = await fetchEventsByMonth(userId, parseInt(month), parseInt(year));
    res.json({ events });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAgenda = async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await fetchAgenda(userId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, date, time, location, type, description } = req.body;
    if (!title || !date || !type) {
      return res.status(400).json({ error: 'title, date, and type are required' });
    }
    const event = await createPersonalTask(userId, { title, date, time, location, type, description });
    res.status(201).json({ message: 'Event created', event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getEvents, getAgenda, createEvent };
