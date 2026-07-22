"use client";

import { useI18n } from '../../providers/I18nProvider';
import ConditionCheckbox from '../atoms/ConditionCheckbox';

interface ConditionItem {
  id: string;
  labelKey: string;
  coefficient: number;
}

const CONDITIONS: ConditionItem[] = [
  { id: 'perfect_condition', labelKey: 'dashboard.inspection_perfect', coefficient: 0.0 },
  { id: 'slight_cover_scratches', labelKey: 'dashboard.inspection_condition_slight_cover_scratches', coefficient: 0.05 },
  { id: 'folded_pages', labelKey: 'dashboard.inspection_condition_folded_pages', coefficient: 0.10 },
  { id: 'pencil_marks', labelKey: 'dashboard.inspection_condition_pencil_marks', coefficient: 0.15 },
  { id: 'ink_marks', labelKey: 'dashboard.inspection_condition_ink_marks', coefficient: 0.40 },
  { id: 'torn_pages', labelKey: 'dashboard.inspection_condition_torn_pages', coefficient: 0.50 },
  { id: 'water_damage', labelKey: 'dashboard.inspection_condition_water_damage', coefficient: 0.70 },
  { id: 'damaged_binding', labelKey: 'dashboard.inspection_condition_damaged_binding', coefficient: 0.30 },
  { id: 'missing_mats', labelKey: 'dashboard.inspection_condition_missing_mats', coefficient: 0.30 },
  { id: 'missing_pages', labelKey: 'dashboard.inspection_condition_missing_pages', coefficient: 1.00 },
  { id: 'lost', labelKey: 'dashboard.inspection_lost', coefficient: 2.00 },
];

interface ConditionSelectorProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function ConditionSelector({ selected, onChange }: ConditionSelectorProps) {
  const { t } = useI18n();

  const isPerfect = selected.includes('perfect_condition');
  const isLost = selected.includes('lost');
  const isDisabled = (id: string) => {
    if (isPerfect && id !== 'perfect_condition') return true;
    if (isLost && id !== 'lost') return true;
    return false;
  };

  const handleToggle = (id: string) => {
    if (id === 'perfect_condition') {
      if (isPerfect) {
        onChange([]);
      } else {
        onChange(['perfect_condition']);
      }
      return;
    }
    if (id === 'lost') {
      if (isLost) {
        onChange([]);
      } else {
        onChange(['lost']);
      }
      return;
    }
    if (isPerfect || isLost) return;

    const next = selected.includes(id)
      ? selected.filter(s => s !== id)
      : [...selected, id];
    onChange(next);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {CONDITIONS.map(condition => (
        <ConditionCheckbox
          key={condition.id}
          id={condition.id}
          label={t(condition.labelKey)}
          fee={condition.coefficient}
          checked={selected.includes(condition.id)}
          onChange={() => handleToggle(condition.id)}
          disabled={isDisabled(condition.id)}
        />
      ))}
    </div>
  );
}
