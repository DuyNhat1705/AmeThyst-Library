"use client";

import React, { useState } from 'react';
import RegisterTemplate from '../components/templates/RegisterTemplate';
import ForgotPasswordCard from './ForgotPasswordCard';

export default function ForgotPasswordPage() {
  const [state, setState] = useState({
    isLoading: false,
    error: null as string | null,
    validationErrors: {},
    isSuccess: false,
  });

  const handleBackToSignIn = () => {
    window.location.href = '/login';
  };

  const handleSubmit = async (data: any) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      let endpoint = '';
      let body = {};

      if (data.step === 1) {
        endpoint = '/auth/forgot-password';
        body = { email: data.email };
      } else if (data.step === 2) {
        endpoint = '/auth/verify-otp';
        body = { email: data.email, otp: data.otp };
      } else if (data.step === 3) {
        endpoint = '/auth/reset-password';
        body = { email: data.email, otp: data.otp, newPassword: data.newPassword };
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        let errorMessage = 'Something went wrong';
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorMessage;
        } catch (_) {
          // fallback to default error message if response is not JSON
        }
        throw new Error(errorMessage);
      }

      if (data.step === 3) {
        setState(prev => ({ ...prev, isLoading: false, isSuccess: true }));
        setTimeout(() => { 
          window.location.href = '/login'; 
        }, 1500);
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
      return { success: true };
    } catch (err: any) {
      console.error('Forgot password error:', err);
      setState(prev => ({ ...prev, isLoading: false, error: err.message }));
      return { success: false, error: err.message };
    }
  };

  return (
    <RegisterTemplate>
        <ForgotPasswordCard 
            onBackToSignIn={handleBackToSignIn} 
            onSubmit={handleSubmit}
            isLoading={state.isLoading}
        />
    </RegisterTemplate>
  );
}
