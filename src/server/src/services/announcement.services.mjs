import * as announcementModel from '../models/announcement.models.mjs';
import { getIO } from '../config/socket.mjs';

const emitAnnouncementChanged = (action, payload) => {
  try {
    const io = getIO();
    io.emit('announcement:changed', { action, announcement: payload });
  } catch (err) {
    console.error('[Socket.IO Emit Error] Failed to emit announcement change:', err.message);
  }
};

const isValidDate = (dateStr) => {
  if (dateStr === null || dateStr === undefined || dateStr === '') return false;
  const timestamp = Date.parse(dateStr);
  return !isNaN(timestamp);
};

const getAnnouncementOrThrow = async (announceId) => {
  const announcement = await announcementModel.findAnnouncementById(announceId);

  if (!announcement) {
    const error = new Error('Announcement not found.');
    error.status = 404;
    throw error;
  }

  return announcement;
};

const validateAnnouncementData = (title, content) => {
  if (!title || typeof title !== 'string' || !title.trim()) {
    const error = new Error('Title is required.');
    error.status = 400;
    throw error;
  }

  if (!content || typeof content !== 'string' || !content.trim()) {
    const error = new Error('Content is required.');
    error.status = 400;
    throw error;
  }
};

const formatExpiredDate = (expiredDate) => {
  return expiredDate === '' ||
         expiredDate === null ||
         expiredDate === undefined
    ? null
    : expiredDate;
};

const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const validateExpiredDate = (expiredDate, isActive, errorMessage) => {
  if (expiredDate === null) return;

  if (!isValidDate(expiredDate)) {
    const error = new Error('Invalid expired date format.');
    error.status = 400;
    throw error;
  }

  const today = getToday();
  const expiry = new Date(expiredDate);

  if (isActive && expiry < today) {
    const error = new Error(errorMessage);
    error.status = 400;
    throw error;
  }
};

/**
 * Service to create a new announcement.
 * @param {Object} details
 * @param {string} details.title
 * @param {string} details.content
 * @param {string|null} details.expiredDate
 * @param {string} [details.status]
 * @returns {Promise<Object>}
 */
export const createAnnouncementService = async ({ title, content, expiredDate, status = 'draft' }) => {
  validateAnnouncementData(title, content);

  const formattedExpiredDate = formatExpiredDate(expiredDate);

  validateExpiredDate(
    formattedExpiredDate,
    status === 'active',
    'Cannot set status to active with an expiration date in the past.'
  );

  const result = await announcementModel.insertAnnouncement({
    title: title.trim(),
    content: content.trim(),
    expiredDate: formattedExpiredDate,
    status
  });

  emitAnnouncementChanged('created', result);
  return result;
};

/**
 * Service to get all announcements for management with pagination and status filter.
 * @param {Object} params
 * @param {number} [params.page]
 * @param {number} [params.limit]
 * @param {string} [params.status]
 * @returns {Promise<Object>}
 */
export const getAnnouncementsForManagementService = async ({ page = 1, limit = 10, status } = {}) => {
  let parsedPage = parseInt(page);
  let parsedLimit = parseInt(limit);

  if (isNaN(parsedPage) || parsedPage < 1) {
    parsedPage = 1;
  }
  if (isNaN(parsedLimit) || parsedLimit < 1) {
    parsedLimit = 10;
  }

  const offset = (parsedPage - 1) * parsedLimit;

  const [announcements, total] = await Promise.all([
    announcementModel.findAnnouncementsForManagement({ limit: parsedLimit, offset, status }),
    announcementModel.countAnnouncementsForManagement({ status })
  ]);

  const totalPages = Math.ceil(total / parsedLimit);

  return {
    announcements,
    pagination: {
      total,
      page: parsedPage,
      limit: parsedLimit,
      totalPages
    }
  };
};

/**
 * Service to update the status of an announcement.
 * @param {string} announceId
 * @param {string} status
 * @returns {Promise<Object>}
 */
export const updateAnnouncementStatusService = async (announceId, status) => {
  const allowedStatuses = ['draft', 'active', 'expired'];
  if (!status || !allowedStatuses.includes(status)) {
    const error = new Error('Invalid status.');
    error.status = 400;
    throw error;
  }

  const announcement = await getAnnouncementOrThrow(announceId);

  if (status === 'active' && announcement.expiredDate) {
    const today = getToday();
    const expiry = new Date(announcement.expiredDate);
    if (expiry < today) {
      const error = new Error('Cannot set status to active with an expiration date in the past.');
      error.status = 400;
      throw error;
    }
  }

  const updated = await announcementModel.updateAnnouncementStatus(announceId, status);
  if (updated) {
    emitAnnouncementChanged('status_changed', updated);
  }
  return updated;
};

/**
 * Service to edit title, content, and expiration date of an announcement.
 * @param {string} announceId
 * @param {Object} details
 * @param {string} details.title
 * @param {string} details.content
 * @param {string|null} details.expiredDate
 * @returns {Promise<Object>}
 */
export const editAnnouncementDetailsService = async (announceId, { title, content, expiredDate }) => {
  validateAnnouncementData(title, content);

  const announcement = await getAnnouncementOrThrow(announceId);

  const formattedExpiredDate = formatExpiredDate(expiredDate);

  validateExpiredDate(
    formattedExpiredDate,
    announcement.status === 'active',
    'Cannot set expiration date in the past for active announcement.'
  );

  const updated = await announcementModel.updateAnnouncementDetails(announceId, {
    title: title.trim(),
    content: content.trim(),
    expiredDate: formattedExpiredDate
  });

  if (updated) {
    emitAnnouncementChanged('updated', updated);
  }

  return updated;
};

/**
 * Service to delete an announcement.
 * @param {string} announceId
 * @returns {Promise<Object>}
 */
export const deleteAnnouncementService = async (announceId) => {
  await getAnnouncementOrThrow(announceId);
  const result = await announcementModel.deleteAnnouncementById(announceId);
  if (result) {
    emitAnnouncementChanged('deleted', { announceId });
  }
  return result;
};

/**
 * Service to get all active, non-expired announcements for the public page.
 * @returns {Promise<Array>}
 */
export const getActiveAnnouncementsService = async () => {
  return await announcementModel.findActiveAnnouncements();
};

/**
 * Service to transition expired active announcements to 'expired'.
 * @returns {Promise<Array>}
 */
export const expireOutdatedAnnouncementsService = async () => {
  const expiredList = await announcementModel.updateExpiredAnnouncements();
  if (expiredList && expiredList.length > 0) {
    for (const item of expiredList) {
      emitAnnouncementChanged('status_changed', { announceId: item.announceId });
    }
  }
  return expiredList;
};

/**
 * Service to retrieve a single announcement by ID.
 * @param {string} announceId
 * @returns {Promise<Object>}
 */
export const getAnnouncementByIdService = async (announceId) => {
  return await getAnnouncementOrThrow(announceId);
};
