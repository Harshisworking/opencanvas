import React from 'react';
import { useRouter } from 'next/navigation';

const Header: React.FC<{ userEmail: string }> = ({ userEmail }) => {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <header className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
                {/* Logo Icon */}
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Open<span className="text-indigo-600">Canvas</span>
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:block px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-sm text-gray-600 font-medium">
                    {userEmail}
                </div>
                <button onClick={handleLogout} className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors">
                    Log Out
                </button>
            </div>
        </header>
    );
};

export default Header;