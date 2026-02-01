"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUp() {
    const router = useRouter();

    // State for form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // State for UI handling
    const [pageLoading, setPageLoading] = useState(true); // For initial token check
    const [isSubmitting, setIsSubmitting] = useState(false); // For form submission

    // Logic: Check for existing token on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/Dashboard");
        } else {
            setPageLoading(false);
        }
    }, [router]);

    // Logic: Handle Form Submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await axios.post("http://localhost:3002/signup", {
                name,
                email,
                password
            });

            // Success handling based on your snippet
            alert(result.data.message);

            // Optional: Redirect to login after successful signup
            router.push("/login");

        } catch (error) {
            console.error(error);
            alert("Error signing up. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Prevent flash of content while checking token
    if (pageLoading) {
        return null; // Or return a simple loading spinner div here
    }

    return (
        // Background Container
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Main Card */}
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl z-10 relative border border-gray-100">

                {/* Header Section */}
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg mb-4">
                        <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Create an account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Join <span className="font-semibold text-blue-600">OpenCanvas</span> and start creating
                    </p>
                </div>

                {/* Form Section */}
                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>

                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-1 mb-1">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="appearance-none block w-full px-5 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
                            placeholder="John Doe"
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 ml-1 mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none block w-full px-5 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
                            placeholder="name@company.com"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 ml-1 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none block w-full px-5 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating account...
                                </span>
                            ) : 'Sign Up'}
                        </button>
                    </div>
                </form>

                {/* Footer Link */}
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}