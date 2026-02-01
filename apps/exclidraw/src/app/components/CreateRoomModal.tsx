import React, { useState, useEffect, useRef } from 'react';

interface CreateRoomModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (roomName: string) => void;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ isOpen, onClose, onCreate }) => {
    const [roomName, setRoomName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
        if (isOpen) setRoomName('');
    }, [isOpen]);

    const handleCreate = () => {
        onCreate(roomName);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm transition-opacity">

            <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all p-8">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Name your Room</h2>
                <p className="text-gray-500 text-center mb-8">Give your new whiteboard a name to get started.</p>

                <div className="space-y-4">
                    <input
                        ref={inputRef}
                        type="text"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                        placeholder="e.g. Q4 Planning Session"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                    />

                    <button
                        onClick={handleCreate}
                        disabled={!roomName.trim()}
                        className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-200"
                    >
                        Create Room
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateRoomModal;