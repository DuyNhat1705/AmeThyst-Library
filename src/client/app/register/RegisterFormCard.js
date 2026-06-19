import React, { useMemo } from 'react';
import { FormField } from '../components/molecules';
import { Button } from '../components/atoms';
import RoleSelector from './RoleSelector';
import SecurityIndicator from './SecurityIndicator';
import { OAuthButtons } from '../components/molecules';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setState(prev => ({ ...prev, error: "Passwords do not match" }));
      return;
    }
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.fullName,
          phoneNumber: formData.phoneNumber || null,
          avatar: formData.avatar || null
        })
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Registration failed');
      }

      const data = await res.json();
      setState(prev => ({ ...prev, isLoading: false, isSuccess: true }));
      
      // Redirect to login after success
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      console.error('Register error:', err);
      setState(prev => ({ ...prev, isLoading: false, error: err.message }));
    }
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
        <FormField
          label="Full Name"
          id="fullName"
          placeholder="Alex Johnson"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          error={state.validationErrors.fullName}
          disabled={state.isLoading}
        />

        <FormField
          label="Email Address"
          id="email"
          type="email"
          placeholder="alex@university.edu"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={state.validationErrors.email}
          disabled={state.isLoading}
        />

        <RoleSelector
          selectedRole={formData.role}
          onChange={(role) => setFormData({ ...formData, role })}
          disabled={state.isLoading}
        />

        <div className="flex flex-col gap-2">
          <FormField
            label="Password"
            id="password"
            type="password"
            placeholder="Min. 8 characters"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={state.validationErrors.password}
            disabled={state.isLoading}
          />
          <FormField
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword || ""}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            error={state.validationErrors.confirmPassword}
            disabled={state.isLoading}
          />
          <SecurityIndicator level={passwordStrength} />
        </div>

        <Button
          type="submit"
          className="w-full h-[52px] mt-2"
          isLoading={state.isLoading}
        >
          Create Account
        </Button>

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