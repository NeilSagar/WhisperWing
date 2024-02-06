import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {createServer} from "http";
import { Server } from 'socket.io';

import router from "./routes/router.js";
import { connectDB } from "./db/connectDB.js";
import { handleSocketConnection } from "./controller/socketio.js";
import {  socketMiddleware } from "./middleware/socketMiddleware.js";

dotenv.config();
const app = express();
const httpServer = createServer(app);

app.use(cors({
    origin: 'http://localhost:3000',  
    credentials: true,
  },
));
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials:true
  }
});


app.use(express.urlencoded({ extended: true,limit:'5mb' }));
app.use(express.json({ limit: '5mb' }));
app.use("/",router);

io.use(socketMiddleware);
io.on("connection",handleSocketConnection);
connectDB();
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT,()=>{
    console.log("Server started on PORT:",PORT);
})