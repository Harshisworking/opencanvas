"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import Canvas from "./Canvas";
import TopBar from "./TopBar"; // Ensure these are in the same folder or update path
import BottomBar from "./BottomBar"; // Ensure these are in the same folder or update path

export type Tool = "rect" | "circle" | "line" | "hand" | "select";

export default function RoomCanvas({ roomId }: { roomId: number }) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [selectedTool, setSelectedTool] = useState<Tool>("circle");
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading || !user) return;

        const token = localStorage.getItem("token");
        const ws = new WebSocket(`ws://localhost:8080?token=${token}`);

        ws.onopen = () => {
            console.log("Connected to WS Server");
            setSocket(ws);
        };

        ws.onerror = (err) => {
            console.error("WebSocket Connection Failed:", err);
        };

        ws.onclose = () => {
            console.log("Connection closed");
        };

        return () => {
            ws.close();
        };

    }, [user, loading, roomId]);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-100 text-gray-500">
                Verifying User...
            </div>
        );
    }

    if (!socket) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-100 text-gray-500">
                Connecting to Game Server...
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen bg-[#f5f5f5] overflow-hidden font-sans">

            {/* 1. Top Navigation & Tools */}
            <TopBar selectedTool={selectedTool} onSelectTool={setSelectedTool} />

            {/* 2. Main Scrollable Canvas Area */}
            {/* 'top-0' and 'bottom-0' ensure it takes full height, but z-0 keeps it behind the bars if they overlap */}
            <main className="absolute inset-0 overflow-hidden flex items-center justify-center bg-gray-50 z-0">
                {/* We add margin top/bottom so the canvas isn't hidden behind the fixed bars */}
                <div className="relative shadow-md border border-gray-200 bg-white mt-20 mb-20">
                    <Canvas
                        roomId={roomId}
                        socket={socket}
                        selectedTool={selectedTool} // Pass the tool down
                    />
                </div>
            </main>

            {/* 3. Bottom Controls */}
            <BottomBar />

        </div>
    );
}