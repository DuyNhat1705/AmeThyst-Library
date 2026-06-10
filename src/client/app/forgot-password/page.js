"use client";

import ForgotPasswordCard from './components/ForgotPasswordCard';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const router = useRouter();

  const handleBackToSignIn = () => {
    router.push('/login');
  };

  const handleSubmit = (email) => {
    console.log('Reset link sent for:', email);
    // Add API call here
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <ForgotPasswordCard onBackToSignIn={handleBackToSignIn} onSubmit={handleSubmit} />
    </main>
  );
}
