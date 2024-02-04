import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authModel from "../models/authModel.js";


dotenv.config();

async function authenticateJwt(req,res,next){
    const {authorization} = req.headers;
    
    if(!authorization || authorization ==="Bearer undefined"){
        return res.status(404).json({message:"Authorization token required."});
    }
    
    const token=authorization.split(' ')[1];
    const tokenVerify = jwt.verify(token,process.env.JWT_SECRET);
    
    // console.log(tokenVerify);
    try {
        const authUser = await authModel.findOne({_id:tokenVerify.userId});
        if(! authUser){
            return res.status(404).json({message:"Invalid User."});
        }
        req.user_id=tokenVerify.userId;
        next();
    } catch (error) {
        return res.status(404).json({message:error.message});
    }

}

export default authenticateJwt;