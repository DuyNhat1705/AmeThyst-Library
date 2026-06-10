import React, { useMemo } from 'react';
import InputField from '../login/InputField';
import RoleSelector from './RoleSelector';
import SecurityIndicator from './SecurityIndicator';
import OAuthButtons from '../components/OAuthButtons';
import Link from 'next/link';

const RegisterFormCard = ({ 
  formData, 
  setFormData, 
  state, 
  setState 
}) => {
  const calculatePasswordStrength = (password) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const passwordStrength = useMemo(() => calculatePasswordStrength(formData.password), [formData.password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setState(prev => ({ ...prev, isLoading: true }));
    
    // Mock submission delay
    setTimeout(() => {
      setState(prev => ({ ...prev, isLoading: false, isSuccess: true }));
    }, 2000);
  };

  return (
    <div className="w-full max-w-[380px] flex flex-col gap-6">
      {/* Căn giữa text tiêu đề để phù hợp với bố cục center của trang */}
      <header className="flex flex-col gap-1 text-center">
        <h2 className="text-3xl font-semibold tracking-[-0.01em] text-[#0B1C30]">
          Create Account
        </h2>
        <p className="text-sm text-[#45474C]">
          Please fill in the details to create your account.
        </p>
      </header>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <InputField
          label="Full Name"
          id="fullName"
          placeholder="Alex Johnson"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          error={state.validationErrors.fullName}
        />

        <InputField
          label="Email Address"
          id="email"
          type="email"
          placeholder="alex@university.edu"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={state.validationErrors.email}
        />

        <RoleSelector
          selectedRole={formData.role}
          onChange={(role) => setFormData({ ...formData, role })}
        />

        <div className="flex flex-col gap-2">
          <InputField
            label="Password"
            id="password"
            type="password"
            placeholder="Min. 8 characters"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={state.validationErrors.password}
          />
          <SecurityIndicator level={passwordStrength} />
        </div>

        <button
          type="submit"
          className="cursor-pointer text-nowrap flex py-4 px-0 justify-center items-center rounded-lg bg-[#091426] w-full text-white font-semibold leading-5 tracking-[0.01em] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed h-[52px] mt-2"
          disabled={state.isLoading}
        >
          {state.isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            "Create Account"
          )}
        </button>

        <div className="flex pb-px flex-col items-center w-full relative my-2">
          <div className="absolute w-full h-[1px] bg-[#C5C6CD] top-1/2 -translate-y-1/2" />
          {/* Đổi bg sang transparent hoặc bg-[#FFF8EB] trùng màu card */}
          <div className="flex py-0 px-4 justify-center items-start bg-[#FFF8EB] w-fit relative z-10">
            <p className="text-[#45474C] font-inter text-xs font-medium leading-4 w-fit tracking-[0.02em]">
              OR CONTINUE WITH
            </p>
          </div>
        </div>

        <OAuthButtons label="Sign up with Google" />

        <div className="flex pt-2 flex-col items-center w-full">
          <p className="text-[#091426] font-inter text-sm leading-5 w-fit">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-[#091426] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterFormCard;