"use client";
import React from "react";
import { Minus, Plus, Undo2, Redo2, HelpCircle } from "lucide-react";

export default function BottomBar() {
    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-between items-end pointer-events-none z-50">

            {/* Zoom & History */}
            <div className="pointer-events-auto flex gap-3">
                {/* Zoom */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex items-center p-1">
                    <button className="p-2 hover:bg-gray-100 rounded-md text-gray-500">
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-medium text-gray-600 w-12 text-center">100%</span>
                    <button className="p-2 hover:bg-gray-100 rounded-md text-gray-500">
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                {/* Undo/Redo */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex items-center p-1">
                    <button className="p-2 hover:bg-gray-100 rounded-md text-gray-500">
                        <Undo2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-md text-gray-500">
                        <Redo2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Help */}
            <div className="pointer-events-auto">
                <button className="bg-white p-2 rounded-full shadow-sm border border-gray-200 text-gray-500 hover:text-gray-700">
                    <HelpCircle className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}