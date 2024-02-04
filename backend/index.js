import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/router.js";
import { connectDB } from "./db/connectDB.js";

dotenv.config();
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',  
    credentials: true,
  },
));
  
app.use(express.urlencoded({ extended: true,limit:'5mb' }));
app.use(express.json({ limit: '5mb' }));
app.use("/",router);


connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Server started on PORT:",PORT);
})