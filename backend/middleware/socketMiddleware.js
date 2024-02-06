import jwt from "jsonwebtoken";
import chatModel from "../models/chatModel.js";


const socketMiddleware = async (socket, next) => {
    
    try {
        const token = await socket.handshake.auth.token;
        if (!token) {
            throw new Error("Token not provided.");
        }
        
        const { userId } = jwt.decode(token);
        if (!userId) {
            throw new Error("UserId required.");
        }
        const foundUser = await chatModel.findOne({ UserId:userId });
        if (!foundUser) {
            throw new Error("User not authorized.");
        }
        next();
    } catch (error) {
        console.error("Socket connection error:", error.message);
        next(error);
    }
};

export { socketMiddleware };







































