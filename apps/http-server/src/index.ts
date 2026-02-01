import express from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "@repo/backend-common";
import { SingupUserSchema, LoginUserSchema, CreateRoomSchema } from "@repo/common";
import { client } from "@repo/db/";
import bcrypt from "bcrypt";
import { middleware } from "./middleware";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
    const data = SingupUserSchema.safeParse(req.body);
    if (!data.success) {
        return res.status(400).json({ error: "Invalid data" });
    }
    const { name, email, password } = data.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await client.user.create({
            data: {
                photo: "",
                name,
                email,
                password: hashedPassword,
            }
        })
        res.json({ message: "Signed up successfully" });
    } catch (e) {
        return res.status(400).json({ message: "User already exists" });
    }
})

app.post("/login", async (req, res) => {
    const data = LoginUserSchema.safeParse(req.body);
    if (!data.success) {
        return res.status(400).json({ error: "Invalid data" });
    }
    const { email, password } = data.data;

    const user = await client.user.findUnique({
        where: {
            email,
        }
    })

    if (!user) {
        return res.status(400).json({ error: "User not found" });
    }

    const verifiedUser = await bcrypt.compare(password, user.password);

    if (!verifiedUser) {
        return res.status(400).json({ error: "Invalid password" });
    }

    const user_id = user.id;
    const token = jwt.sign({ user_id }, jwtSecret);
    res.json({ token });
})

app.post("/room", middleware, async (req, res) => {
    const data = CreateRoomSchema.safeParse(req.body);
    if (!data.success) {
        return res.status(400).json({ error: "Invalid data" });
    }
    const { slug } = data.data;

    const room = await client.room.create({
        data: {
            adminId: (req.user as jwt.JwtPayload).user_id,
            slug,
        }
    })
    res.json({ message: "Room created", roomId: room.id });

})

app.get("/chats/:roomId", async (req, res) => {
    const roomId = Number(req.params.roomId);
    const messages = await client.chat.findMany({
        where: {
            roomId,
        },
        orderBy: {
            id: "desc"
        },
        take: 50
    })
    res.json({ messages });
})

app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    const room = await client.room.findUnique({
        where: {
            slug,
        }
    })

    res.json({ room });
})

app.get("/verify-token", middleware, async (req, res) => {
    const userId = req.user;
    console.log(userId);
    const userDetails = await client.user.findUnique({
        select: {
            id: true,
            name: true,
            email: true,
            photo: true,
            password: false,
        },
        where: {
            id: (userId as jwt.JwtPayload).user_id,
        }
    })
    console.log(userDetails)

    res.json({
        valid: true,
        userId,
        userDetails
    });
});

app.get("/getrooms", middleware, async (req, res) => {
    const userId = req.user;
    const rooms = await client.room.findMany({
        select: {
            id: true,
            slug: true,
            createdAt: true,
            adminId: false,
        },
        where: {
            adminId: (userId as jwt.JwtPayload).user_id,
        }
    })
    res.json({ rooms });
})

app.listen(3002, () => {
    console.log("Server started on port 3002");
});