import mongoose from "mongoose";



const userSchema = mongoose.Schema({
    UserId:{
        type:String,
        required:true,
        unique:true,
    },
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    UserName: {
        type: String,
        required: true,
        unique: true
    },
    ProfilePic: {
        type: String
    },
    Contacts: {
        type: [{
            contactName: {
                type: String,
                required: true
            },
            contactUserName: {
                type: String,
                required: true,
                unique:true
            },
            contactUserId:{
                type:String,
                required:true,
                unique:true
            },
        }],
        required: false,
        default: []
    },
});

const userModel = mongoose.model('user', userSchema);

export default userModel;
