"use client";
import React from "react";
import {
    Hand,
    MousePointer2,
    Square,
    Circle,
    Minus,
    Type,
    Image as ImageIcon,
    Undo2,
    Redo2,
    Menu,
    Lock,
    PencilLine,
} from "lucide-react";

type Tool = "rect" | "circle" | "line" | "hand" | "select"; // Add more as needed

interface TopBarProps {
    selectedTool: Tool;
    onSelectTool: (tool: Tool) => void;
}

export default function TopBar({ selectedTool, onSelectTool }: TopBarProps) {
    return (
        <div className="fixed top-0 left-0 right-0 p-4 flex justify-between items-start pointer-events-none z-50">
            {/* Left: Menu */}
            <div className="pointer-events-auto bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                <button className="p-2 hover:bg-gray-100 rounded-md">
                    <Menu className="w-5 h-5 text-gray-700" />
                </button>
            </div>

            {/* Center: Toolbar */}
            <div className="pointer-events-auto bg-white rounded-lg shadow-sm border border-gray-200 flex items-center p-1 gap-1">
                {/* Selection / View Tools */}
                <div className="flex gap-1 px-2 border-r border-gray-200">
                    <IconButton icon={<Lock className="w-4 h-4" />} />
                    <IconButton icon={<Hand className="w-4 h-4" />} active={selectedTool === "hand"} onClick={() => onSelectTool("hand")} />
                    <IconButton icon={<MousePointer2 className="w-4 h-4" />} active={selectedTool === "select"} onClick={() => onSelectTool("select")} />
                </div>

                {/* Drawing Tools */}
                <div className="flex gap-1 px-2">
                    <IconButton
                        icon={<Square className="w-4 h-4" />}
                        active={selectedTool === "rect"}
                        onClick={() => onSelectTool("rect")}
                    />
                    <IconButton
                        icon={<Circle className="w-4 h-4" />}
                        active={selectedTool === "circle"}
                        onClick={() => onSelectTool("circle")}
                    />
                    <IconButton
                        icon={<PencilLine className="w-4 h-4" />}
                        active={selectedTool === "line"}
                        onClick={() => onSelectTool("line")}
                    />
                    <IconButton icon={<Type className="w-4 h-4" />} />
                    <IconButton icon={<ImageIcon className="w-4 h-4" />} />
                </div>
            </div>

            {/* Right: User / Share */}
            <div className="pointer-events-auto flex gap-2">
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors">
                    Share
                </button>
            </div>
        </div>
    );
}

// Helper for buttons
function IconButton({
    icon,
    active,
    onClick,
}: {
    icon: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`p-2 rounded-md transition-all ${active
                ? "bg-indigo-100 text-indigo-700"
                : "hover:bg-gray-100 text-gray-700"
                }`}
        >
            {icon}
        </button>
    );
}