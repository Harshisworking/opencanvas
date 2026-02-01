"use client";
import React from "react";
import Link from "next/link";
import { Play } from "lucide-react";

export default function Hero() {
    return (
        <section className="pt-32 pb-20 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <div>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-[1.15] mb-6">
                        Collaborate Visually, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                            Anywhere.
                        </span>
                    </h1>
                    <p className="text-lg text-gray-500 mb-8 max-w-lg leading-relaxed">
                        The infinite canvas for teams to brainstorm, plan, and design together in real-time. No limits, just creativity.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <Link href="/signup">
                            <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:-translate-y-1">
                                Start Drawing Now
                            </button>
                        </Link>
                        <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center gap-2">
                            <Play className="w-4 h-4 fill-current" />
                            Watch Demo
                        </button>
                    </div>

                    <div className="mt-12">
                        <p className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Trusted by teams at</p>
                        <div className="flex gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Simple Text Logos for demo */}
                            <span className="text-xl font-bold font-serif text-gray-800">TechFlow</span>
                            <span className="text-xl font-bold font-sans text-gray-800">GlobalSync</span>
                            <span className="text-xl font-bold font-mono text-gray-800">Innovate</span>
                        </div>
                    </div>
                </div>

                {/* Right Image (CSS Mockup) */}
                <div className="relative">
                    {/* Decorative Blob */}
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                    {/* Browser Window Mockup */}
                    <div className="relative rounded-xl bg-white shadow-2xl border border-gray-200 overflow-hidden transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                        {/* Browser Header */}
                        <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <div className="mx-auto bg-white px-3 py-1 rounded text-xs text-gray-400 border border-gray-200 w-1/2 text-center">
                                opencanvas.com/board/new
                            </div>
                        </div>

                        {/* Fake UI Content */}
                        <div className="aspect-[4/3] bg-white p-6 relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                            {/* Fake sticky notes and cursors */}
                            <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-100 rounded shadow-sm transform -rotate-3 border border-yellow-200 p-4 font-hand text-sm text-yellow-800">
                                Brainstorming ideas for Q4...
                            </div>
                            <div className="absolute top-24 left-52 w-40 h-24 bg-purple-100 rounded shadow-sm transform rotate-2 border border-purple-200 p-4 font-hand text-sm text-purple-800">
                                Connect API endpoints
                            </div>
                            {/* Cursor 1 */}
                            <div className="absolute top-32 left-48">
                                <svg className="w-6 h-6 text-indigo-600 fill-current" viewBox="0 0 24 24"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /></svg>
                                <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded ml-4">Sarah</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}