import React, { useState } from 'react';
import { FormField } from '../components/molecules';
import { Button } from '../components/atoms';

const ForgotPasswordCard = ({ onBackToSignIn, onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className="w-full max-w-[480px] rounded-xl bg-white border border-[#C5C6CD] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="pt-12 pb-12 px-6 sm:pt-16 sm:px-12 flex flex-col items-start w-full gap-2">
        <h1 className="text-2xl sm:text-[32px] leading-9 sm:leading-10 font-semibold text-[#091426]" style={{ letterSpacing: '-0.01em' }}>
          Forgot Password
        </h1>
        <p className="text-sm sm:text-base leading-6 text-[#45474C]">
          Enter the email address associated with your LIMA account to receive a secure password reset link.
        </p>

        <form onSubmit={handleSubmit} className="w-full py-6 px-0 flex flex-col gap-6">
          <FormField
            label="Email Address"
            id="email"
            type="email"
            placeholder="researcher@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-full h-[52px] gap-2"
          >
            Send Reset Link
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M9.13125 6.75H0V5.25H9.13125L4.93125 1.05L6 0L12 6L6 12L4.93125 10.95L9.13125 6.75Z" fill="white" />
            </svg>
          </Button>
        </form>

        <div className="pt-8 w-full border-t border-t-[#C5C6CD] flex items-center justify-center gap-1.5 cursor-pointer group" onClick={onBackToSignIn}>
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