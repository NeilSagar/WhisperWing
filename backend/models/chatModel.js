import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    UserId:{
        type:String,
        required:true,
        unique:true,
    },
    UserName:{
        type:String,
        required:true,
        unique:true
    },
    Name:{
        type:String,
        required:true
    },
    ProfilePic:{
        type:String,
    },
    RequestsSent:[{
        Name: {
            type: String,
            required: true
        },
        UserName: {
            type: String,
            required: true,
            unique: true
        }
    }],
    RequestsReceived:[{
        Name: {
            type: String,
            required: true
        },
        UserName: {
            type: String,
            required: true,
            unique: true
        },ProfilePic:{
            type:String
        }
    }],
    Chats:[{
        UserName:{
            type:String,
            required:true,
            unique:true
        },
        UserId:{
            type:String,
            required:true,
            unique:true
        },
        Name:{
            type:String,
            required:true,
        },
        conversation:[{
            From:{
                type:String,
                required:true,
            },
            TimeStamp:{
                type: Date,
                default: Date.now,
            },
            Message:{
                type:String,
                required:true
            }
        }]
    }]
});


const chatModel = mongoose.model("chat",chatSchema);

export default chatModel;