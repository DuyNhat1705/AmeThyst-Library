import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8EFE6] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-extrabold text-[#091426] mb-4">AmeThyst Library</h1>
      <p className="text-xl text-[#45474C] mb-12 max-w-lg">Your gateway to a world of knowledge. Explore our extensive collection, manage your profile, and join our vibrant community.</p>
      
      <div className="flex flex-col gap-6 w-full max-w-sm">
        <Link href="/library" className="w-full px-8 py-4 bg-[#006F66] text-white rounded-2xl font-bold text-lg hover:bg-[#005a53] transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]">
          Explore Library
        </Link>
        
        <div className="flex gap-4">
          <Link href="/login" className="flex-1 px-6 py-3 bg-white border border-[#006F66] text-[#006F66] rounded-xl font-semibold hover:bg-gray-50 transition">
            Sign In
          </Link>
          <Link href="/register" className="flex-1 px-6 py-3 bg-[#486C7E] text-white rounded-xl font-semibold hover:bg-[#3e5e6e] transition">
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
}
