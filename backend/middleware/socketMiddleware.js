import jwt from "jsonwebtoken";
import chatModel from "../models/chatModel.js";

const socketMiddleware = async (socket,next)=>{
    const token = await socket.handshake.auth.token;
    if(token){
        console.log(token);
        const {UserId} = jwt.decode(token);
        if(!UserId){
            const err = new Error("UserId required.");
            err.data = { content: "Please try after logging in." };
            next(err);
        }
        try {
            const foundUser = await chatModel.findOne({UserId});
            if(!foundUser){
                const err = new Error("not authorized");
                err.data = { content: "Please retry later" };
                next(err);
            }
            console.log("connected");
            next();
        } catch (error) {
            console.log(error.message);
            const err = new Error("not authorized");
            err.data = { content: error.message };
            next(err);
        }
    }
}

export {socketMiddleware};






































