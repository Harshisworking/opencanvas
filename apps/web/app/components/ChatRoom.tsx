import axios from "axios";
import { BACKEND_URL } from "../config";
import ChatRoomClient from "./ChatRoomClient";

async function getChats(roomId: string) {
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`)
    return response.data.messages;
}



export async function ChatRoom({
    id
}: {
    id: string
}) {
    console.log(id)
    const messages = await getChats(id);
    console.log(messages)
    return (
        <ChatRoomClient id={id} messages={messages} />
    )
}