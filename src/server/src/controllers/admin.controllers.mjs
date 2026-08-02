import {
  getUsersListService,
  getUsersStatsService,
  getUserDetailsService,
  updateUserRoleService,
  suspendUserService,
  unsuspendUserService,
  getExportUsersListService,
  getAuditLogsService
} from '../services/admin.services.mjs';

const sendError = (res, status, code, message) => {
  return res.status(status).json({
    success: false,
    error: { code, message }
  });
};

const validateQueryParams = (query) => {
  const { role, status, page, limit } = query;
  
  if (role && !['admin', 'librarian', 'user'].includes(role)) {
    return { valid: false, error: 'Allowed roles are: admin, librarian, user.' };
  }
  
  if (status && !['active', 'suspended'].includes(status)) {
    return { valid: false, error: 'Allowed statuses are: active, suspended.' };
  }
  
  if (page !== undefined) {
    const pageNum = Number(page);
    if (isNaN(pageNum) || !Number.isInteger(pageNum) || pageNum < 1) {
      return { valid: false, error: 'Page parameter must be a positive integer >= 1.' };
    }
  }
  
  if (limit !== undefined) {
    const limitNum = Number(limit);
    if (isNaN(limitNum) || !Number.isInteger(limitNum) || limitNum < 1 || limitNum > 100) {
      return { valid: false, error: 'Limit parameter must be a positive integer between 1 and 100.' };
    }
  }
  
  return { valid: true };
};

export const getUsersList = async (req, res) => {
  try {
    const validation = validateQueryParams(req.query);
    if (!validation.valid) {
      return sendError(res, 400, 'BAD_REQUEST', validation.error);
    }
    const { search, role, status, page, limit } = req.query;
    const result = await getUsersListService({ search, role, status, page, limit });
    return res.status(200).json({
      success: true,
      data: result.users,
      meta: result.pagination
    });
  } catch (err) {
    console.error('getUsersList Controller Error:', err);
    return sendError(res, 500, 'INTERNAL_SERVER_ERROR', 'Failed to retrieve users list.');
  }
};

export const getUsersStats = async (req, res) => {
  try {
    const stats = await getUsersStatsService();
    return res.status(200).json({
      success: true,
      data: stats
    });
  } catch (err) {
    console.error('getUsersStats Controller Error:', err);
    return sendError(res, 500, 'INTERNAL_SERVER_ERROR', 'Failed to retrieve statistics.');
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return sendError(res, 400, 'BAD_REQUEST', 'User ID parameter is required.');
    }
    const details = await getUserDetailsService(userId);
    if (!details) {
      return sendError(res, 404, 'USER_NOT_FOUND', 'User not found.');
    }
    return res.status(200).json({
      success: true,
      data: details
    });
  } catch (err) {
    console.error('getUserDetails Controller Error:', err);
    return sendError(res, 500, 'INTERNAL_SERVER_ERROR', 'Failed to retrieve user details.');
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    const actorId = req.user.userId;

    if (!role) {
      return sendError(res, 400, 'ROLE_REQUIRED', 'Role parameter is required in body.');
    }

    if (!['admin', 'librarian', 'user'].includes(role)) {
      return sendError(res, 400, 'INVALID_ROLE', 'Allowed roles are: admin, librarian, user.');
    }

    const result = await updateUserRoleService(actorId, userId, role);
    return res.status(200).json({
      success: true,
      message: 'User role updated successfully.',
      data: result
    });
  } catch (err) {
    console.error('updateUserRole Controller Error:', err);
    if (err.code === 'SELF_MUTATION_BLOCKED') {
      return sendError(res, 400, err.code, err.message);
    }
    if (err.code === 'FINAL_ADMIN_SAFESHIFT_BLOCKED') {
      return sendError(res, 400, err.code, err.message);
    }
    if (err.code === 'USER_NOT_FOUND') {
      return sendError(res, 404, err.code, err.message);
    }
    return sendError(res, 500, 'INTERNAL_SERVER_ERROR', 'Failed to update user role.');
  }
};

export const suspendUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;
    const actorId = req.user.userId;

    if (!reason || reason.trim() === '') {
      return sendError(res, 400, 'REASON_REQUIRED', 'A suspension reason must be provided.');
    }

    const result = await suspendUserService(actorId, userId, reason);
    return res.status(200).json({
      success: true,
      message: 'User account has been suspended successfully.',
      data: result
    });
  } catch (err) {
    console.error('suspendUser Controller Error:', err);
    if (err.code === 'SELF_MUTATION_BLOCKED') {
      return sendError(res, 400, err.code, err.message);
    }
    if (err.code === 'FINAL_ADMIN_SAFESHIFT_BLOCKED') {
      return sendError(res, 400, err.code, err.message);
    }
    if (err.code === 'USER_NOT_FOUND') {
      return sendError(res, 404, err.code, err.message);
    }
    return sendError(res, 500, 'INTERNAL_SERVER_ERROR', 'Failed to suspend user account.');
  }
};

export const unsuspendUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const actorId = req.user.userId;

    const result = await unsuspendUserService(actorId, userId);
    return res.status(200).json({
      success: true,
      message: 'User account status has been restored successfully.',
      data: result
    });
  } catch (err) {
    console.error('unsuspendUser Controller Error:', err);
    if (err.code === 'SELF_MUTATION_BLOCKED') {
      return sendError(res, 400, err.code, err.message);
    }
    if (err.code === 'USER_NOT_FOUND') {
      return sendError(res, 404, err.code, err.message);
    }
    return sendError(res, 500, 'INTERNAL_SERVER_ERROR', 'Failed to restore user account status.');
  }
};

function escapeCsvCell(val) {
  if (val === null || val === undefined) return '';
  let str = String(val);
  
  // Neutralize spreadsheet formula injection
  if (['=', '+', '-', '@'].includes(str.charAt(0))) {
    str = "'" + str;
  }
  
  // Escape commas, quotes, and line breaks
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export const exportUsers = async (req, res) => {
  try {
    const validation = validateQueryParams(req.query);
    if (!validation.valid) {
      return sendError(res, 400, 'BAD_REQUEST', validation.error);
    }
    const { search, role, status } = req.query;
    const users = await getExportUsersListService({ search, role, status });

    // Build CSV Headers
    const headers = ['User ID', 'Username', 'Email', 'Phone Number', 'Role', 'Status', 'Joined Date', 'Last Login'];
    let csvContent = headers.join(',') + '\n';

    // Build CSV Rows
    for (const u of users) {
      const row = [
        escapeCsvCell(u.userId),
        escapeCsvCell(u.username),
        escapeCsvCell(u.email),
        escapeCsvCell(u.phoneNumber),
        escapeCsvCell(u.role),
        escapeCsvCell(u.status),
        escapeCsvCell(u.joinedDate ? u.joinedDate.toISOString() : ''),
        escapeCsvCell(u.lastLogin ? u.lastLogin.toISOString() : '')
      ];
      csvContent += row.join(',') + '\n';
    }

    // Set Response Headers
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="users_export.csv"');
    
    return res.status(200).send(csvContent);
  } catch (err) {
    console.error('exportUsers Controller Error:', err);
    return sendError(res, 500, 'INTERNAL_SERVER_ERROR', 'Failed to export users list.');
  }
};

export const getAuditLogs = async (req, res) => {
  try {
    const validation = validateQueryParams({ page: req.query.page, limit: req.query.limit });
    if (!validation.valid) {
      return sendError(res, 400, 'BAD_REQUEST', validation.error);
    }
    const { targetId, actorId, page, limit } = req.query;
    const result = await getAuditLogsService({ targetId, actorId, page, limit });
    return res.status(200).json({
      success: true,
      data: result.logs,
      meta: result.meta
    });
  } catch (err) {
    console.error('getAuditLogs Controller Error:', err);
    return sendError(res, 500, 'INTERNAL_SERVER_ERROR', 'Failed to retrieve audit logs.');
  }
};
