import { clearAllPins, cleanupExpiredPins, cleanupExpiredReservations } from '../services/library.services.mjs';
import { backfillDefaultedCheckouts } from '../models/room.models.mjs';

export const runStartupPinCleanup = async () => {
  try {
    const [pinCount, resCount, backfilled] = await Promise.all([
      clearAllPins(),
      cleanupExpiredReservations(),
      backfillDefaultedCheckouts(),
    ]);
    if (pinCount > 0) {
      console.log(`Cleared ${pinCount} pending PIN(s) (books + rooms) on startup`);
    }
    if (resCount > 0) {
      console.log(`Cleaned up ${resCount} expired reservation(s) on startup`);
    }
    if (backfilled > 0) {
      console.log(`Backfilled ${backfilled} defaulted room checkout(s) on startup`);
    }
    return { pinCount, resCount, backfilled };
  } catch (err) {
    console.error('Startup cleanup failed:', err);
    return { pinCount: 0, resCount: 0, backfilled: 0 };
  }
};

export const startPeriodicPinCleanup = (intervalMs = 60 * 1000) => {
  const intervalId = setInterval(async () => {
    try {
      const [pinCount, resCount, backfilled] = await Promise.all([
        cleanupExpiredPins(),
        cleanupExpiredReservations(),
        backfillDefaultedCheckouts(),
      ]);
      if (pinCount > 0) {
        console.log(`Cleaned up ${pinCount} expired PIN(s) (books + rooms)`);
      }
      if (resCount > 0) {
        console.log(`Cleaned up ${resCount} expired reservation(s)`);
      }
      if (backfilled > 0) {
        console.log(`Backfilled ${backfilled} defaulted room checkout(s)`);
      }
    } catch (err) {
      console.error('Periodic cleanup failed:', err);
    }
  }, intervalMs);
  return intervalId;
};
