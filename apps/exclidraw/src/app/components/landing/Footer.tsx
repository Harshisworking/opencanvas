"use client";
import React from "react";
import { Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white font-bold text-xs">O</div>
                            <span className="font-bold text-gray-900">OpenCanvas</span>
                        </div>
                        <p className="text-sm text-gray-500">
                            Making visual collaboration accessible for everyone, everywhere.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-indigo-600">Features</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Pricing</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Security</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-indigo-600">About</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-indigo-600"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-indigo-600"><Github className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-indigo-600"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} OpenCanvas. All rights reserved.
                </div>
            </div>
        </footer>
    );
}