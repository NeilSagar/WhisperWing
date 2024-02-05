import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    contactName: {
        type: String,
        required: true
    },
    contactUserName: {
        type: String,
        required: true,
    },
    contactUserId:{
        type:String,
        required:true,
    },
    contactProfilePic:{
        type:String
    }
});

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
        type: [contactSchema],
        required: false,
        default: []
    },
});

const userModel = mongoose.model('user', userSchema);

export default userModel;
