import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { jwtSecret } from "@repo/backend-common";
import { client } from "@repo/db";

interface User {
    ws: WebSocket;
    userId: string;
    room: string[];
}

const users: User[] = [];

function checkUser(token: string): string | null {
    const decodedToken = jwt.verify(token, jwtSecret);

    if (!decodedToken) {
        return null;
    }
    //@ts-ignore
    const userId = decodedToken.user_id;
    return userId;
}

const wss = new WebSocketServer({ port: 8080 }, () => {
    console.log("Server started on port 8080");
});

wss.on("connection", (ws, request) => {
    console.log("Client connected");
    const url = request.url;
    if (!url) {
        return;
    }
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token");


    if (!token) {
        console.log("No token");
        ws.close();
        return;
    }
    const authenticatedUser = checkUser(token);

    if (!authenticatedUser) {
        ws.close();
        return;
    }

    const user: User = {
        userId: authenticatedUser,
        room: [],
        ws
    };
    users.push(user);

    ws.on("message", async (message) => {
        const data = JSON.parse(message.toString());

        if (data.type === "join_room") {
            const room = data.room;
            user.room.push(room);
            ws.send(JSON.stringify({ type: "join_room", room }));
        }

        if (data.type === "delete") {
            const id = data.id;
            const room = data.room;
            try {
                await client.chat.delete({
                    where: {
                        id,
                    }
                })
            } catch (e) {

            }

            users.forEach(client => {
                if (client.room.includes(data.room)) {
                    client.ws.send(JSON.stringify({
                        type: "delete",
                        room,
                        id: data.id
                    }));
                }
            });
        }

        if (data.type === "leave_room") {
            const room = data.room;
            user.room = user.room.filter((r) => r !== room);
        }

        if (data.type === "chat") {
            const room = data.room;
            const message = data.message;
            const id = data.id;
            try {
                const chat = await client.chat.create({
                    data: {
                        id,
                        message,
                        roomId: room,
                        userId: authenticatedUser
                    }
                })
                if (!chat) {
                    ws.send(JSON.stringify({ type: "error", message: "Chat not created" }));
                    return;
                }
            } catch (error) {
                console.log(error);
            }

            users.forEach((u) => {
                if (u.room.includes(room)) {
                    console.log("hi there on sending", message, id)
                    u.ws.send(JSON.stringify({ type: "chat", message, id }));
                }
            })
        }
    });


    ws.on("close", () => {
        const index = users.indexOf(user);
        if (index !== -1) {
            users.splice(index, 1);
        }
        console.log(users.length)
    });
});

