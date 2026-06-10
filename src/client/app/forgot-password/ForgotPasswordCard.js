import React, { useState } from 'react';
import Link from 'next/link';

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
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-[#091426]" style={{ letterSpacing: '0.01em' }}>
              Email Address
            </label>
            <div className="relative flex items-center w-full">
              <div className="absolute left-4 flex items-center justify-center pointer-events-none">
                <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.66667 13.3333C1.20833 13.3333 0.815972 13.1701 0.489583 12.8438C0.163194 12.5174 0 12.125 0 11.6667V1.66667C0 1.20833 0.163194 0.815972 0.489583 0.489583C0.815972 0.163194 1.20833 0 1.66667 0H15C15.4583 0 15.8507 0.163194 16.1771 0.489583C16.5035 0.815972 16.6667 1.20833 16.6667 1.66667V11.6667C16.6667 12.125 16.5035 12.5174 16.1771 12.8438C15.8507 13.1701 15.4583 13.3333 15 13.3333H1.66667ZM8.33333 7.5L1.66667 3.33333V11.6667H15V3.33333L8.33333 7.5ZM8.33333 5.83333L15 1.66667H1.66667L8.33333 5.83333ZM1.66667 3.33333V1.66667V3.33333V11.6667V3.33333Z" fill="#45474C" />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                className="w-full py-[14px] pr-4 pl-11 border border-[#C5C6CD] bg-[#FFFFFF] rounded text-base text-[#091426] focus:outline-none transition-colors focus:border-[#091426]"
                placeholder="researcher@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 py-4 px-4 bg-[#091426] hover:bg-[#122544] rounded shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors text-sm font-semibold text-[#FFFFFF] text-nowrap"
            style={{ letterSpacing: '0.01em' }}
          >
            Send Reset Link
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M9.13125 6.75H0V5.25H9.13125L4.93125 1.05L6 0L12 6L6 12L4.93125 10.95L9.13125 6.75Z" fill="white" />
            </svg>
          </button>
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