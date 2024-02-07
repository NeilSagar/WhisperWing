import {socketMap} from "../constants/socketMap.js";


function handleChatMessage(payload,socket){
    const {UserId,chatWithId,Message,TimeStamp} = payload;
    if(UserId && chatWithId && Message && TimeStamp){
        if(socketMap[chatWithId]){
            const sendTo = socketMap[chatWithId];
            socket.to(sendTo).emit("chat-message",{Message,TimeStamp,FromId:UserId,ToId:chatWithId});
        }else{
            console.log(chatWithId," is not online");
        }
        
    }
}

const handleSocketConnection = (socket)=>{
    const socketId = socket.id;
    // console.log(socket.id)
    socket.on("user-connected",(payload)=>{
        const {UserId} = payload;
        if(UserId){
            socketMap[UserId] = socketId;
        }
    });
    socket.on("chat-message",(payload)=>handleChatMessage(payload,socket));
}

export {handleSocketConnection};