import { getRects } from "./http"; // Ensure this path is correct

type Tool = "rect" | "circle" | "line" | "hand" | "select";
type Point = { x: number, y: number };
type Shape = {
    id: string;
    types: Tool;
    x: number;
    y: number;
    width: number;
    height: number;
    path?: Point[];
    strokeColor?: string;
    isSelected?: boolean;
};

export class DrawLogicWithClass {
    private shapesToDelete: { id: string }[] = [];
    private selectMode: boolean = false;
    private canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    private roomId: number;
    private existingRect: Shape[];
    private currentPath: Point[] = [];
    private socket: WebSocket;
    private cameraOffset: Point = { x: 0, y: 0 };
    private isPanning = false;
    private spacePressed = false;
    private lastMousePos = { x: 0, y: 0 }
    private isHolding = false;
    private selectModeStartX = 0;
    private selectModeStartY = 0;
    private selectModeEndX = 0;
    private selectModeEndY = 0;

    // -- State Variables --
    private clicked: boolean = false;
    private selectedTool: Tool = "rect";
    private strokeColor: string = "#000000";

    // -- Drawing Coordinates --
    private startX = 0;
    private startY = 0;

    constructor(canvas: HTMLCanvasElement, roomId: number, socket: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.roomId = roomId;
        this.existingRect = [];
        this.socket = socket;

        this.init();
        this.initSocketHandler();
        this.initInteractionHandlers();
    }

    getWorldPos(e: MouseEvent) {
        const screenPos = this.getMousePos(e);
        return {
            x: screenPos.x - this.cameraOffset.x,
            y: screenPos.y - this.cameraOffset.y
        }
    }

    // --- Public API ---

    setShape(shape: Tool) {
        this.selectedTool = shape;
    }

    setHolding(holding: boolean) {
        this.isHolding = holding;
    }

    setStrokeColor(color: string) {
        this.strokeColor = color;
        this.ctx.strokeStyle = color;
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
        this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
    }

    // --- Initialization ---

    async init() {
        this.existingRect = await getRects(this.roomId);
        this.redrawCanvas();
    }

    initSocketHandler() {
        this.socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data.toString());
                if (data.type === "chat") {
                    console.log("chat", data.message);
                    const message = JSON.parse(data.message);
                    this.existingRect.push(message);
                    this.redrawCanvas();
                }
                if (data.type === "delete") {
                    console.log("deleting", data.id);
                    this.existingRect = this.existingRect.filter(s => s.id !== data.id);
                    this.redrawCanvas();
                }
            } catch (e) {
                console.error("Error parsing socket message", e);
            }
        };
    }

    initInteractionHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler);
        this.canvas.addEventListener("mouseup", this.mouseUpHandler);
        this.canvas.addEventListener("mousemove", this.mouseMoveHandler);

        window.addEventListener("keydown", this.keyDownHandler);
        window.addEventListener("keyup", this.keyUpHandler);
    }

    keyDownHandler = (e: KeyboardEvent) => {
        if (e.code === "Backspace" || e.code === "Delete") {

            if (this.shapesToDelete.length > 0) {

                // Create a Set of IDs to delete for faster/safer lookup
                const idsToDelete = new Set(this.shapesToDelete.map(shape => shape.id));

                try {
                    this.shapesToDelete.forEach(shape => {
                        this.socket.send(JSON.stringify({
                            type: "delete",
                            room: this.roomId,
                            id: shape.id
                        }));
                    });
                } catch (error) {
                    console.error("Error deleting shapes", error);
                }

                // ✅ FIX: Filter by ID instead of object reference
                this.existingRect = this.existingRect.filter(
                    shape => !idsToDelete.has(shape.id)
                );

                // Clear the selection
                this.shapesToDelete = [];

                // Force a redraw immediately after updating state
                this.redrawCanvas();
            }
        }

        if (e.code === "Space") {
            // Prevent browser scrolling
            e.preventDefault();
            if (!this.spacePressed) {
                this.spacePressed = true;
                this.canvas.style.cursor = "grab"; // Visual cue
            }
        }
    };

    keyUpHandler = (e: KeyboardEvent) => {
        if (e.code === "Space") {
            this.spacePressed = false;
            this.isPanning = false; // Stop panning if key is released
            this.canvas.style.cursor = "crosshair"; // Back to drawing
        }
    };

    // --- Coordinate Helper (Required for mouse alignment) ---
    getMousePos(e: MouseEvent): Point {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;

        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }

    // --- Rendering Logic ---

    redrawCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();
        this.ctx.translate(this.cameraOffset.x, this.cameraOffset.y);

        if (this.selectMode && this.clicked) {

            this.ctx.strokeStyle = "#277dbeff";
            this.ctx.strokeRect(this.selectModeStartX, this.selectModeStartY, this.selectModeEndX - this.selectModeStartX, this.selectModeEndY - this.selectModeStartY);

        }

        this.existingRect.forEach(shape => {
            // Use stored color or fallback to black
            this.ctx.strokeStyle = shape.strokeColor || "#000000";
            if (shape.isSelected) {
                this.ctx.setLineDash([2, 4]);
                this.ctx.strokeStyle = "#277dbeff";
                this.ctx.strokeRect(shape.x - 10, shape.y - 10, shape.width + 20, shape.height + 20);
                this.ctx.strokeRect(shape.x + 10, shape.y + 10, shape.width - 20, shape.height - 20);
                this.ctx.setLineDash([]);
            }


            this.ctx.strokeStyle = "#000000";
            if (shape.types === "rect") {
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.types === "circle") {
                const centerX = shape.x + shape.width / 2;
                const centerY = shape.y + shape.height / 2;
                const radius = Math.abs(Math.max(shape.width, shape.height) / 2);
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                this.ctx.stroke();
            } else if (shape.types === "line" && shape.path) {
                this.drawPath(shape.path);
            }
        });

        this.ctx.restore();
    }

    drawPath(path: Point[]) {
        if (path.length < 2) return;
        this.ctx.beginPath();
        this.ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
            this.ctx.lineTo(path[i].x, path[i].y);
        }
        this.ctx.stroke();
    }

    // --- Interaction Handlers ---

    mouseDownHandler = (e: MouseEvent) => {

        if (this.spacePressed || this.isHolding) {
            this.isPanning = true;
            this.lastMousePos = { x: e.clientX, y: e.clientY };
            this.canvas.style.cursor = "grabbing";
            return; // Stop here, don't start drawing
        }

        if (this.selectedTool === "select") {
            this.selectMode = true;
            const { x, y } = this.getWorldPos(e);
            this.selectModeStartX = x;
            this.selectModeStartY = y;
        }

        this.clicked = true;
        const { x, y } = this.getWorldPos(e);

        this.startX = x;
        this.startY = y;
        this.ctx.strokeStyle = this.strokeColor;

        if (this.selectedTool === "line") {
            this.currentPath = [{ x, y }];
        }
    };

    mouseMoveHandler = (e: MouseEvent) => {
        if ((this.spacePressed && this.isPanning) || (this.isHolding && this.isPanning)) {
            const deltaX = e.clientX - this.lastMousePos.x;
            const deltaY = e.clientY - this.lastMousePos.y;
            this.cameraOffset.x += deltaX;
            this.cameraOffset.y += deltaY;
            this.lastMousePos = { x: e.clientX, y: e.clientY };
            this.redrawCanvas();
            return;
        }

        if (this.clicked) {
            const { x, y } = this.getWorldPos(e);
            const width = x - this.startX;
            const height = y - this.startY;
            this.selectModeEndX = x;
            this.selectModeEndY = y;

            this.redrawCanvas(); // Draw stored shapes

            // Draw current shape (Preview)
            this.ctx.save();
            this.ctx.translate(this.cameraOffset.x, this.cameraOffset.y);
            this.ctx.strokeStyle = this.strokeColor;

            if (this.selectedTool === "rect") {
                this.ctx.strokeRect(this.startX, this.startY, width, height);
            } else if (this.selectedTool === "circle") {
                const centerX = this.startX + width / 2;
                const centerY = this.startY + height / 2;
                const radius = Math.abs(Math.max(width, height) / 2);
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                this.ctx.stroke();
            } else if (this.selectedTool === "line") {
                this.currentPath.push({ x, y });
                this.drawPath(this.currentPath);
            }
        }
        this.ctx.restore();
    };

    mouseUpHandler = (e: MouseEvent) => {

        if (this.spacePressed || this.isHolding) {
            this.isPanning = false;
            this.canvas.style.cursor = "crosshair";
            return;
        }
        if (this.selectMode) {
            if (this.shapesToDelete.length > 0) {
                this.shapesToDelete = [];
            }
            console.log("selectMode");
            const { x, y } = this.getWorldPos(e);
            this.existingRect.forEach((shape, index) => {
                const isSelected = this.inSelectedRange(shape, x, y, this.selectModeStartX, this.selectModeStartY)
                if (isSelected) {
                    this.shapesToDelete.push({ id: shape.id });
                    shape.isSelected = true;
                } else {
                    shape.isSelected = false;
                }
            })

            console.log(this.shapesToDelete);
            this.redrawCanvas();
            this.selectMode = false;
            return;
        }
        if (this.clicked) {
            this.clicked = false;
            const { x, y } = this.getWorldPos(e);
            const width = x - this.startX;
            const height = y - this.startY;

            const id = crypto.randomUUID();
            const shape: Shape = {
                id,
                types: this.selectedTool,
                x: this.startX,
                y: this.startY,
                width,
                height,
                path: this.selectedTool === "line" ? [...this.currentPath] : undefined,
                strokeColor: this.strokeColor
            };

            // Send to WebSocket
            const message = JSON.stringify({
                id,
                type: "chat",
                room: this.roomId,
                message: JSON.stringify(shape)
            });
            this.socket.send(message);

            this.existingRect.push({ ...shape, id });
            this.redrawCanvas();
        }
    };


    inSelectedRange = (shape: Shape, currentX: number, currentY: number, startX: number, startY: number) => {
        const rect = shape;
        const isXInBounds = currentX >= rect.x && startX <= rect.x + rect.width;
        const isYInBounds = currentY >= rect.y && startY <= rect.y + rect.height;
        return isXInBounds && isYInBounds;
    }
}
