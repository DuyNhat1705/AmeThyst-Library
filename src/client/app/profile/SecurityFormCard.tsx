"use client";

import React, { useState, useMemo } from 'react';
import { FormField } from '../components/molecules';
import { Button } from '../components/atoms';
import SecurityIndicator from '../register/SecurityIndicator';

export default function SecurityFormCard() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculatePasswordStrength = (password: string) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const passwordStrength = useMemo(() => calculatePasswordStrength(newPassword), [newPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Password updated successfully!");
    }, 1000);
  };

  return (
    <div className="w-full max-w-[380px] flex flex-col gap-6">
      <header className="flex flex-col gap-1 text-center">
        <h2 className="text-3xl font-semibold tracking-[-0.01em] text-[#0B1C30]">
          Security Settings
        </h2>
      </header>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <FormField
          label="Current Password"
          id="currentPassword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex flex-col gap-2">
          <FormField
            label="New Password"
            id="newPassword"
            type="password"
            placeholder="Min. 8 characters"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <FormField
            label="Confirm New Password"
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <SecurityIndicator level={passwordStrength} />
        </div>

        <Button type="submit" className="w-full h-[52px] mt-2" isLoading={isLoading}>
          Update Password
        </Button>
      </form>
    </div>
  );
}
