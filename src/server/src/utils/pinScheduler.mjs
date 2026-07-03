import { clearAllPins, cleanupExpiredPins, cleanupExpiredReservations } from '../services/library.services.mjs';

export const runStartupPinCleanup = async () => {
  try {
    const [pinCount, resCount] = await Promise.all([
      clearAllPins(),
      cleanupExpiredReservations(),
    ]);
    if (pinCount > 0) {
      console.log(`Cleared ${pinCount} pending PIN(s) on startup`);
    }
    if (resCount > 0) {
      console.log(`Cleaned up ${resCount} expired reservation(s) on startup`);
    }
    return { pinCount, resCount };
  } catch (err) {
    console.error('Startup cleanup failed:', err);
    return { pinCount: 0, resCount: 0 };
  }
};

export const startPeriodicPinCleanup = (intervalMs = 60 * 1000) => {
  const intervalId = setInterval(async () => {
    try {
      const [pinCount, resCount] = await Promise.all([
        cleanupExpiredPins(),
        cleanupExpiredReservations(),
      ]);
      if (pinCount > 0) {
        console.log(`Cleaned up ${pinCount} expired PIN(s)`);
      }
      if (resCount > 0) {
        console.log(`Cleaned up ${resCount} expired reservation(s)`);
      }
    } catch (err) {
      console.error('Periodic cleanup failed:', err);
    }
  }, intervalMs);
  return intervalId;
};
