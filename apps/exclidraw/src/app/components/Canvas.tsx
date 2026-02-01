"use client";
import { useEffect, useRef, useState } from "react";
import { DrawLogicWithClass } from "../draw/drawlogicwithclassapproch"; // Ensure path is correct!
type Tool = "rect" | "circle" | "line" | "hand" | "select";

interface CanvasProps {
    roomId: number;
    socket: WebSocket;
    selectedTool: Tool;
}

export default function Canvas({ roomId, socket, selectedTool }: CanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [drawInstance, setDrawInstance] = useState<DrawLogicWithClass | null>(null);
    const [isHolding, setIsHolding] = useState(false);

    // 1. Update the tool in logic whenever prop changes
    useEffect(() => {
        if (drawInstance) {
            drawInstance.setShape(selectedTool);
            if (selectedTool === "hand") {
                drawInstance.setHolding(true);
            } else {
                drawInstance.setHolding(false);
            }
        }
    }, [drawInstance, selectedTool, isHolding]);

    // 2. Initialize Canvas
    useEffect(() => {
        if (!canvasRef.current) return;

        // Ensure socket is open
        if (socket.readyState !== WebSocket.OPEN) {
            socket.onopen = () => {
                socket.send(JSON.stringify({ type: "join_room", room: roomId }));
            };
        } else {
            socket.send(JSON.stringify({ type: "join_room", room: roomId }));
        }

        const logic = new DrawLogicWithClass(canvasRef.current, roomId, socket);

        // IMPORTANT: Set stroke color to black/gray for white canvas
        logic.setStrokeColor("#1e293b");

        setDrawInstance(logic);

        return () => {
            logic.destroy();
        };
    }, [canvasRef, roomId, socket]);

    return (
        <canvas
            ref={canvasRef}
            width={2000}
            height={1000}
            className="bg-white shadow-sm"
            style={{ cursor: "crosshair" }}
        ></canvas>
    );
}