"use client";
import React from "react";
import { CloudLightning, Maximize2, Users } from "lucide-react";

export default function Features() {
    return (
        <section className="py-24 bg-white" id="features">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-16">
                    <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">Features</h2>
                    <h3 className="text-3xl font-bold text-gray-900">Everything you need to create together</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    <FeatureCard
                        icon={<CloudLightning className="w-6 h-6 text-indigo-600" />}
                        title="Real-time Sync"
                        description="Instantly see others' changes. No lag, just seamless collaboration across the globe."
                    />
                    <FeatureCard
                        icon={<Maximize2 className="w-6 h-6 text-purple-600" />}
                        title="Infinite Canvas"
                        description="Never run out of space. Expand your ideas in any direction without hitting a wall."
                    />
                    <FeatureCard
                        icon={<Users className="w-6 h-6 text-pink-600" />}
                        title="Team Folders"
                        description="Organize your boards, manage permissions, and keep everyone on the same page."
                    />
                </div>

            </div>
        </section>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300">
            <div className="w-14 h-14 mx-auto bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6">
                {icon}
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">{title}</h4>
            <p className="text-gray-500 leading-relaxed">
                {description}
            </p>
        </div>
    )
}