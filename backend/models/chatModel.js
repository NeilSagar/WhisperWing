import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    From: {
        type: String,
        required: true,
    },
    TimeStamp: {
        type: Date,
        default: Date.now,
    },
    Message: {
        type: String,
        required: true
    },
});

const requestsReceivedSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    UserName: {
        type: String,
        required: true,
    },
    ProfilePic: {
        type: String
    }
});

const requestSentSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    UserName: {
        type: String,
        required: true,
    },
});

const chatMessageSchema = mongoose.Schema({
    UserName: {
        type: String,
        required: true,
    },
    UserId: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    ProfilePic: {
        type: String,
    },
    conversation: {
        type: [messageSchema],
        default: [],
        required: false,
    }
});

const chatSchema = mongoose.Schema({
    UserId: {
        type: String,
        required: true,
        unique: true,
    },
    UserName: {
        type: String,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true
    },
    ProfilePic: {
        type: String,
    },
    RequestsSent: [requestSentSchema],
    RequestsReceived: [requestsReceivedSchema],
    Chats: [chatMessageSchema]
});

const chatModel = mongoose.model("chat", chatSchema);

export default chatModel;
