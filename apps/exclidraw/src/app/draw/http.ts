import axios from "axios"
export async function getRects(roomId: number) {
    const result = await axios.get(`http://localhost:3002/chats/${roomId}`);
    console.log(result.data);
    const messages = result.data.messages;
    console.log(messages);

    const shapes = messages.map((x: { message: string }) => {
        return JSON.parse(x.message);
    })

    return shapes;
}
