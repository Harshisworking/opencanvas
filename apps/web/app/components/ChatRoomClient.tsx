"use client";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";

export default function ChatRoomClient({
    messages,
    id }: {
        messages: { message: string }[],
        id: string
    }) {

    const { socket, loding } = useSocket();
    const [chats, setChats] = useState(messages);
    const [currentMessage, setCurrentMessage] = useState("");

    useEffect(() => {
        if (socket && !loding) {
            socket.send(JSON.stringify({ type: "join_room", room: id }));
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === "chat") {
                    console.log("chat")
                    setChats((prev) => [...prev, { message: data.message }]);
                }
            }
        }
    }, [socket, loding, id])

    return (
        <div>
            <h1>Chat Room {id}</h1>
            {chats.map((m, index) => (
                <p key={index}>{m.message}</p>
            ))}

            <input value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} type="text" />
            <button onClick={() => socket?.send(JSON.stringify({ type: "chat", room: id, message: currentMessage }))}>Send</button>
        </div>
    )
}