"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Room {
    id: number;
    slug: string;
    createdAt: string;
}


const RecentRooms: React.FC = () => {
    const [room, setRoom] = useState<Room[]>([]);
    const [token, setToken] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const tokens = localStorage.getItem('token');
        if (tokens) {
            setToken(tokens);
        }
    }, []);

    useEffect(() => {
        const fetchRooms = async () => {
            // 1. Guard clause: Don't fetch if there is no token
            if (!token) return;

            try {
                const response = await fetch(`http://localhost:3002/getrooms`, {
                    headers: {
                        'Authorization': token
                    }
                });

                // 2. Check for HTTP errors (like 401 Unauthorized or 404)
                if (!response.ok) {
                    console.error("Failed to fetch rooms:", response.statusText);
                    setRoom([]); // Ensure it stays an array
                    setLoading(false);
                    return;
                }

                const data = await response.json();

                // 3. Safety check: Ensure data.rooms actually exists
                if (data.rooms && Array.isArray(data.rooms)) {
                    setRoom(data.rooms);
                } else {
                    setRoom([]);
                }
            } catch (error) {
                console.error("Error connecting to server:", error);
                setRoom([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [token]);

    const handleReEnterRoom = (roomId: number) => {
        router.push(`/canvas/${roomId}`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                    Recent Sessions
                </h3>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                    View All History
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {room.map((room) => (
                    <div key={room.id} className="group p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="text-xs font-medium text-gray-400 font-mono bg-gray-50 px-2 py-1 rounded">ID: {room.id}</span>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">{room.slug}</h4>
                        <p className="text-sm text-gray-500 mb-4">Last edited {room.createdAt}</p>
                        <button onClick={() => handleReEnterRoom(room.id)} className="w-full py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors">
                            Re-Enter Room
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentRooms;