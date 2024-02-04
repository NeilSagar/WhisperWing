import mongoose from "mongoose";

const authSchema = mongoose.Schema({

    Email:{
        type:String,
        required:true,
        unique:true,
    },
    Password:{
        type:String,
        required:true
    },
});



const authModel = mongoose.model("auth",authSchema);

export default authModel;