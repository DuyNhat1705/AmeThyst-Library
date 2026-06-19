"use client";

import React, { useState } from 'react';

interface ProfileCardProps {
  label: string;
  value: string;
  onUpdate: (value: string) => void;
}

export default function ProfileCard({ label, value, onUpdate }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onUpdate(tempValue);
    setIsEditing(false);
  };

  return (
    <div 
      className="p-4 border border-transparent hover:border-[#486C7E] rounded-lg transition-all cursor-pointer bg-[#FFF] shadow-sm"
      onClick={() => !isEditing && setIsEditing(true)}
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
