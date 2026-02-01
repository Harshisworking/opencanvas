"use client"

import React, { useState, ChangeEvent, useEffect } from 'react';
import Header from '@/app/components/Header';
import ActionCard from '@/app/components/ActionCard';
import RecentRooms from '@/app/components/RecentRoom';
import CreateRoomModal from '@/app/components/CreateRoomModal';
import { useRouter } from 'next/navigation';
import axios from "axios"
import { useAuth } from '@/app/Hooks/useAuth';

export default function Dashboard() {
    const [roomId, setRoomId] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter()
    const [authToken, setToken] = useState<string>();
    const { userDetails } = useAuth();
    const [Email, setEmail] = useState<string>("");
    const [id, setId] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
        }
    }, [])

    useEffect(() => {
        if (userDetails) {
            setEmail(userDetails.email);
            setId(userDetails.id);
        }
    }, [userDetails])

    const handleCreateRoom = async (roomName: string) => {
        const response = await axios.post("http://localhost:3002/room", { slug: roomName }, {
            headers: {
                'Authorization': authToken
            }
        })
        const newId = response.data.roomId;

        if (response) {
            router.push(`/canvas/${newId}`);
        }
        console.log(`Creating room: ${roomName}`);
    };

    const handleJoinRoom = () => {
        console.log(`Joining room: ${roomId}`);
        router.push(`/canvas/${roomId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-100">

            {/* Light Grid Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>
            <Header userEmail={Email} />

            <main className="relative z-10 max-w-6xl mx-auto px-6 py-16">

                <div className="grid md:grid-cols-2 gap-8 mb-20">

                    {/* Create Room Card */}
                    <ActionCard
                        title="New Whiteboard"
                        description="Start a fresh canvas and invite others to collaborate."
                        variant="blue"
                        onClick={() => setIsModalOpen(true)}
                        icon={
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        }
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsModalOpen(true);
                            }}
                            className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
                        >
                            Create Room
                        </button>
                    </ActionCard>

                    {/* Join Room Card */}
                    <ActionCard
                        title="Join Session"
                        description="Enter a Room ID to jump into an ongoing meeting."
                        variant="purple"
                        icon={
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        }
                    >
                        <div className="flex w-full max-w-xs gap-2">
                            <input
                                type="text"
                                placeholder="Room ID..."
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:bg-white transition-all"
                            />
                            <button
                                onClick={handleJoinRoom}
                                className="px-6 py-3 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold transition-colors shadow-lg shadow-fuchsia-100"
                            >
                                Join
                            </button>
                        </div>
                    </ActionCard>

                </div>

                <RecentRooms />

            </main>

            <CreateRoomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateRoom}
            />
        </div>
    );
}