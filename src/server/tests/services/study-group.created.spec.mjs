import { describe, expect, it } from 'vitest';
import { effectiveStatus, normalizeMetadata, parsePagination } from '../../src/services/study-group.services.mjs';

describe('created Study Groups', () => {
  it('derives active lifecycle and trims editable metadata', () => {
    const future = { status: 'upcoming', reservation_status: 'reserved', start_date: '2030-01-10', start_time: '09:00:00', end_time: '11:00:00', current_num: 4, capacity: 4 };
    expect(effectiveStatus(future, new Date('2030-01-09T00:00:00'))).toBe('full');
    expect(normalizeMetadata({ title: ' T ', requirements: [' R ', ' '] })).toMatchObject({ title: 'T', requirements: ['R'] });
  });
  it('uses bounded pagination defaults', () => expect(parsePagination({})).toEqual({ page: 1, pageSize: 8 }));
});

