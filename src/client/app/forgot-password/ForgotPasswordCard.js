"use client";

import React, { useState } from 'react';
import { FormField } from '../components/molecules';
import { Button } from '../components/atoms';

const ForgotPasswordCard = ({ onBackToSignIn, onSubmit, isLoading = false }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleStep1 = async (e) => {
    e.preventDefault();
    const result = await onSubmit({ step: 1, email });
    if (result && result.success) { 
      setError(''); 
      setStep(2); 
    } else { 
      setError(result?.error || 'Email does not exist'); 
    }
  };

  const handleStep2 = async (e) => {
    e.preventDefault();
    const result = await onSubmit({ step: 2, email, otp });
    if (result && result.success) { 
      setError(''); 
      setStep(3); 
    } else { 
      setError(result?.error || 'OTP is incorrect or has expired'); 
    }
  };

  const handleStep3 = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    const result = await onSubmit({ step: 3, email, otp, newPassword });
    if (result && result.success) {
      setError('');
      setIsSuccess(true);
    } else {
      setError(result?.error || 'Password reset failed, please try again');
    }
  };

  return (
    <div className="w-full max-w-[480px] rounded-xl bg-white border border-[#C5C6CD] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="pt-12 pb-12 px-6 sm:pt-16 sm:px-12 flex flex-col items-start w-full gap-2">

        {isSuccess ? (
          <div className="w-full flex flex-col gap-2">
            <h1 className="text-2xl sm:text-[32px] leading-9 sm:leading-10 font-semibold text-[#091426]" style={{ letterSpacing: '-0.01em' }}>
              Success!
            </h1>
            <p className="text-sm sm:text-base leading-6 text-[#45474C] mb-6">
              Your password has been successfully reset. Redirecting you to the sign-in page...
            </p>
          </div>
        ) : (
          <>
            {/* Step 1 — Enter email */}
            {step === 1 && (
              <>
                <h1 className="text-2xl sm:text-[32px] leading-9 sm:leading-10 font-semibold text-[#091426]" style={{ letterSpacing: '-0.01em' }}>
                  Forgot Password
                </h1>
                <p className="text-sm sm:text-base leading-6 text-[#45474C]">
                  Enter the email address associated with your account.
                </p>
                <form onSubmit={handleStep1} className="w-full py-6 px-0 flex flex-col gap-6">
                  <FormField
                    label="Email Address"
                    id="email"
                    type="email"
                    placeholder="researcher@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button type="submit" className="w-full h-[52px] gap-2" isLoading={isLoading} disabled={isLoading}>
                    Send OTP
                  </Button>
                </form>
              </>
            )}

            {/* Step 2 — Enter OTP */}
            {step === 2 && (
              <>
                <h1 className="text-2xl sm:text-[32px] leading-9 sm:leading-10 font-semibold text-[#091426]" style={{ letterSpacing: '-0.01em' }}>
                  Enter OTP
                </h1>
                <p className="text-sm sm:text-base leading-6 text-[#45474C]">
                  Check your email <b>{email}</b> for the OTP code.
                </p>
                <form onSubmit={handleStep2} className="w-full py-6 px-0 flex flex-col gap-6">
                  <FormField
                    label="OTP Code"
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button type="submit" className="w-full h-[52px] gap-2" isLoading={isLoading} disabled={isLoading}>
                    Verify OTP
                  </Button>
                </form>
              </>
            )}

            {/* Step 3 — Enter new password */}
            {step === 3 && (
              <>
                <h1 className="text-2xl sm:text-[32px] leading-9 sm:leading-10 font-semibold text-[#091426]" style={{ letterSpacing: '-0.01em' }}>
                  New Password
                </h1>
                <p className="text-sm sm:text-base leading-6 text-[#45474C]">
                  Enter your new password below.
                </p>
                <form onSubmit={handleStep3} className="w-full py-6 px-0 flex flex-col gap-6">
                  <FormField
                    label="New Password"
                    id="newPassword"
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <FormField
                    label="Confirm Password"
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button type="submit" className="w-full h-[52px] gap-2" isLoading={isLoading} disabled={isLoading}>
                    Reset Password
                  </Button>
                </form>
              </>
            )}
          </>
        )}

        <div
          className="pt-8 w-full border-t border-t-[#C5C6CD] flex items-center justify-center gap-1.5 cursor-pointer group"
          onClick={onBackToSignIn}
          style={{ pointerEvents: isLoading ? 'none' : 'auto', opacity: isLoading ? 0.5 : 1 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 group-hover:-translate-x-0.5 transition-transform">
            <path d="M2.86875 6.75L7.06875 10.95L6 12L0 6L6 0L7.06875 1.05L2.86875 5.25H12V6.75H2.86875Z" fill="#091426" />
          </svg>
          <span className="text-sm font-semibold text-[#091426]" style={{ letterSpacing: '0.01em' }}>Back to Sign In</span>
        </div>

      </div>
    </div>
  );
};

export default ForgotPasswordCard;