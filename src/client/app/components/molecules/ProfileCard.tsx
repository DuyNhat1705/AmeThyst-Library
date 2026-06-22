"use client";

import React, { useState, useEffect } from 'react';
import { useI18n } from '../../providers/I18nProvider';

interface ProfileCardProps {
  label: string;
  value: string;
  onUpdate: (value: string) => void;
  editable?: boolean;
}

export default function ProfileCard({ label, value, onUpdate, editable = true }: ProfileCardProps) {
  const { t } = useI18n();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleSave = () => {
    onUpdate(tempValue);
    setIsEditing(false);
  };

  return (
    <div
      className={`p-4 border border-transparent ${editable ? 'hover:border-[#486C7E] cursor-pointer dark:hover:border-neutral-500' : 'opacity-60'} rounded-lg transition-all bg-[#FFF] shadow-sm dark:bg-neutral-800`}
      onClick={() => editable && !isEditing && setIsEditing(true)}
    >
      <h3 className="text-sm text-[#45474C] font-semibold dark:text-neutral-400">{label}</h3>
      {isEditing ? (
        <input
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleSave}
          autoFocus
          className="w-full border-b border-[#486C7E] outline-none bg-transparent dark:border-neutral-500 dark:text-neutral-200"
        />
      ) : (
        <p className={`text-base ${value ? 'text-[#091426] dark:text-neutral-200' : 'text-[#A1A3A7] dark:text-neutral-500'}`}>
          {value || t('profile.not_provided')}
        </p>
      )}
    </div>
  );
}
