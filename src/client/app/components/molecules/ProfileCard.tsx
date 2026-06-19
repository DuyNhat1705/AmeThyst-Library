"use client";

import React, { useState, useEffect } from 'react';

interface ProfileCardProps {
  label: string;
  value: string;
  onUpdate: (value: string) => void;
  editable?: boolean;
}

export default function ProfileCard({ label, value, onUpdate, editable = true }: ProfileCardProps) {
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
      className={`p-4 border border-transparent ${editable ? 'hover:border-[#486C7E] cursor-pointer' : 'opacity-60'} rounded-lg transition-all bg-[#FFF] shadow-sm`}
      onClick={() => editable && !isEditing && setIsEditing(true)}
    >
      <h3 className="text-sm text-[#45474C] font-semibold">{label}</h3>
      {isEditing ? (
        <input
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleSave}
          autoFocus
          className="w-full border-b border-[#486C7E] outline-none"
        />
      ) : (
        <p className={`text-base ${value ? 'text-[#091426]' : 'text-[#A1A3A7]'}`}>
          {value || 'Not provided'}
        </p>
      )}
    </div>
  );
}
