"use client";
import React from "react";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                        O
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight">OpenCanvas</span>
                </div>

                {/* Links (Hidden on mobile) */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                    <Link href="#features" className="hover:text-indigo-600 transition-colors">Features</Link>
                    <Link href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link>
                    <Link href="#enterprise" className="hover:text-indigo-600 transition-colors">Enterprise</Link>
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <button className="px-5 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                            Login
                        </button>
                    </Link>
                    <Link href="/signup">
                        <button className="px-5 py-2.5 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                            Sign Up for Free
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}