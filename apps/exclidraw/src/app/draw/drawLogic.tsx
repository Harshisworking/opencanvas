import axios from "axios";



export default async function DrawLogic(canvasRef: HTMLCanvasElement, roomId: number, socket: WebSocket) {
    let existingRect: { x: number, y: number, width: number, height: number }[] = await getRects(roomId);
    const canvas = canvasRef;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return;
    }

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data.toString());
        if (data.type === "chat") {
            const message = data.message;
            console.log(message);
            existingRect.push(JSON.parse(message));
            clearRects(ctx, canvas.width, canvas.height, existingRect)
        }
    }

    clearRects(ctx, canvas.width, canvas.height, existingRect)


    let clicked = false;
    let startX = 0;
    let startY = 0;

    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    })


    canvas.addEventListener("mouseup", async (e) => {
        clicked = false;
        console.log(e.clientX);
        console.log(e.clientY);

        const width = e.clientX - startX;
        const height = e.clientY - startY;

        const data = JSON.stringify({ type: "chat", room: roomId, message: JSON.stringify({ x: startX, y: startY, width, height }) });

        socket.send(data);

        console.log(data);

        existingRect.push({ x: startX, y: startY, width, height })

        clearRects(ctx, canvas.width, canvas.height, existingRect)
    })

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            console.log(e.clientX);
            console.log(e.clientY);

            const width = e.clientX - startX;
            const height = e.clientY - startY;

            clearRects(ctx, canvas.width, canvas.height, existingRect)

            ctx.strokeRect(startX, startY, width, height)
        }
    })
}


function clearRects(ctx: CanvasRenderingContext2D, width: number, height: number, existingRect: { x: number, y: number, width: number, height: number }[]) {
    ctx.clearRect(0, 0, width, height);
    existingRect.forEach(rect => {
        ctx.strokeRect(rect.x, rect.y, rect.width, rect.height)
    })
}

async function getRects(roomId: number) {
    const result = await axios.get(`http://localhost:3002/chats/${roomId}`);
    console.log(result.data);
    const messages = result.data.messages;
    console.log(messages);

    const shapes = messages.map((x: { message: string }) => {
        return JSON.parse(x.message);
    })

    return shapes;
}
