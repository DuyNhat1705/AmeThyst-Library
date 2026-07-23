import { describe, expect, it } from 'vitest';
import { effectiveStatus } from '../../src/services/study-group.services.mjs';

const base = { status: 'upcoming', reservation_status: 'reserved', start_date: '2030-01-10', start_time: '09:00:00', end_time: '11:00:00', current_num: 1, capacity: 3 };
describe('effective Study Group lifecycle', () => {
  it.each([
    [{ ...base, reservation_status: 'cancelled' }, '2030-01-01T00:00:00+07:00', 'cancelled'],
    [base, '2030-01-10T10:00:00+07:00', 'expired'],
    [base, '2030-01-10T12:00:00+07:00', 'expired'],
    [{ ...base, reservation_status: 'used' }, '2030-01-10T10:00:00+07:00', 'inprogress'],
    [{ ...base, reservation_status: 'used' }, '2030-01-10T12:00:00+07:00', 'completed'],
    [{ ...base, current_num: 3 }, '2030-01-09T00:00:00+07:00', 'full'],
    [base, '2030-01-09T00:00:00+07:00', 'upcoming'],
  ])('derives %s at %s', (row, now, expected) => expect(effectiveStatus(row, new Date(now))).toBe(expected));

  it('treats the reservation clock as Vietnam time regardless of the instant notation', () => {
    const used = { ...base, reservation_status: 'used' };
    expect(effectiveStatus(used, new Date('2030-01-10T01:30:00Z'))).toBe('upcoming');
    expect(effectiveStatus(used, new Date('2030-01-10T02:00:00Z'))).toBe('inprogress');
    expect(effectiveStatus(used, new Date('2030-01-10T04:00:00Z'))).toBe('completed');
  });
});
