"use client";

import React, { useState } from 'react';
import ProfileTemplate from '../components/templates/ProfileTemplate';
import ProfileCard from '../components/molecules/ProfileCard';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    fullName: "Alex Johnson",
    email: "alex@example.com",
    role: "Student",
    phoneNumber: "123-456-7890",
  });

  const handleUpdate = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ProfileTemplate username={profile.fullName}>
      <h1 className="text-2xl font-bold mb-6 text-[#091426]">Personal Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileCard label="Full Name" value={profile.fullName} onUpdate={(v) => handleUpdate('fullName', v)} />
        <ProfileCard label="Email Address" value={profile.email} onUpdate={(v) => handleUpdate('email', v)} />
        <ProfileCard label="Role" value={profile.role} onUpdate={(v) => handleUpdate('role', v)} />
        <ProfileCard label="Phone Number" value={profile.phoneNumber} onUpdate={(v) => handleUpdate('phoneNumber', v)} />
      </div>
    </ProfileTemplate>
  );
}
