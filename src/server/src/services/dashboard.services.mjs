import { findEventsByMonth, findEventsByDateRange, insertEvent } from '../models/dashboard.models.mjs';

const fetchEventsByMonth = async (userId, month, year) => {
  const rows = await findEventsByMonth(userId, month, year);
  return rows.map((r) => ({
    id: r.event_id,
    title: r.title,
    date: r.event_date,
    time: r.event_time,
    location: r.location,
    type: r.event_type,
    description: r.description,
  }));
};

const fetchAgenda = async (userId) => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const todayEvents = await findEventsByDateRange(userId, todayStr, todayStr);
  const tomorrowEvents = await findEventsByDateRange(userId, tomorrowStr, tomorrowStr);

  const mapEvent = (r) => ({
    id: r.event_id,
    title: r.title,
    time: r.event_time,
    location: r.location,
    type: r.event_type,
  });

  return {
    today: todayEvents.map(mapEvent),
    tomorrow: tomorrowEvents.map(mapEvent),
  };
};

const createPersonalTask = async (userId, { title, date, time, location, type, description }) => {
  const event = await insertEvent(userId, { title, date, time, location, type, description });
  return {
    id: event.event_id,
    title: event.title,
    date: event.event_date,
    time: event.event_time,
    location: event.location,
    type: event.event_type,
    description: event.description,
  };
};

export { fetchEventsByMonth, fetchAgenda, createPersonalTask };
