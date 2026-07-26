export const DAMAGE_COEFFICIENTS = {
  perfect_condition: 0.0,
  slight_cover_scratches: 0.05,
  folded_pages: 0.10,
  pencil_marks: 0.15,
  ink_marks: 0.40,
  torn_pages: 0.50,
  water_damage: 0.70,
  damaged_binding: 0.30,
  missing_mats: 0.30,
  missing_pages: 1.00,
  lost: 2.00
};

export const FEE_ADMIN = 1;
export const FEE_ADDON = 0.5;

export const calculateDamageCost = (conditions, bookPrice, lostPenaltyAmount) => {
  const coefficients = conditions
    .map(c => DAMAGE_COEFFICIENTS[c] || 0)
    .filter(c => c > 0);

  if (coefficients.length === 0) return 0;

  const m_max = Math.max(...coefficients);
  const N_errors = conditions.length;

  let cost = (m_max * bookPrice) + FEE_ADMIN + (N_errors - 1) * FEE_ADDON;
  cost = Math.max(0, cost);

  if (lostPenaltyAmount) {
    cost = Math.min(cost, lostPenaltyAmount);
  }

  return cost;
};

export const calculateOverdueCost = (overdueDays, bookPrice) => {
  if (overdueDays <= 0) return 0;
  return 0.05 * bookPrice + Math.max(0, overdueDays - 3) * 0.02 * bookPrice;
};

export const calculateLostPenalty = (lostPenaltyAmount, bookPrice) => {
  return lostPenaltyAmount || (bookPrice * 2);
};

export const calculateTotalPenalty = (conditions, bookPrice, overdueDays, lostPenaltyAmount) => {
  if (conditions.includes('lost')) {
    return { amount: calculateLostPenalty(lostPenaltyAmount, bookPrice), issue: 'LOST' };
  }

  const isPerfect = conditions.includes('perfect_condition');
  const hasDamage = conditions.some(c => c !== 'perfect_condition');

  if (isPerfect && !hasDamage) {
    return { amount: 0, issue: null };
  }

  let damageCost = hasDamage ? calculateDamageCost(conditions, bookPrice, lostPenaltyAmount) : 0;
  let issue = 'DAMAGED';

  if (overdueDays > 0) {
    const overdueCost = calculateOverdueCost(overdueDays, bookPrice);
    damageCost += overdueCost;
    issue = overdueDays > 0 && hasDamage ? 'COMBINED' : 'OVERDUE';
  }

  return { amount: Math.round(damageCost * 100) / 100, issue };
};
