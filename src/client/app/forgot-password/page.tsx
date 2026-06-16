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

  const handleSubmit = (email: string) => {
    console.log('Reset link sent for:', email);
    // Add API call here
  };

  return (
    <RegisterTemplate>
        <ForgotPasswordCard 
            onBackToSignIn={handleBackToSignIn} 
            onSubmit={handleSubmit} 
        />
    </RegisterTemplate>
  );
}
