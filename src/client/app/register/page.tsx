"use client";

import React, { useState } from 'react';
import RegisterTemplate from '../components/templates/RegisterTemplate';
import RegisterFormCard from './RegisterFormCard';

const RegisterPage = () => {
  const [state, setState] = useState({
    isLoading: false,
    error: null as string | null,
    validationErrors: {} as Record<string, string>,
    isSuccess: false,
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "student",
    password: "",
  });

  return (
    <RegisterTemplate>
        <RegisterFormCard 
            formData={formData}
            setFormData={setFormData}
            state={state}
            setState={setState}
        />
    </RegisterTemplate>
  );
};

export default RegisterPage;
