import { Router } from "express";
import { 
    handleLogIn, 
    handleRegister,
    handleUserDetails,
    handleSearchedUser,
    handleSearchedUserDetails,
    handleCreateRequest,
    handleFetchRequests,
    handleRequest, 
    handleFetchingChat,
    handleUpdatingChat} from "../controller/controller.js";
import authenticateJwt from "../middleware/middleware.js";

const router = Router();

router.post("/register",handleRegister);
router.post("/logIn",handleLogIn);
router.get("/userDetails",authenticateJwt,handleUserDetails);
router.post("/getSearchedUser",authenticateJwt,handleSearchedUser);
router.post("/getSearchedUserDetails",authenticateJwt,handleSearchedUserDetails);
router.post("/createRequest",authenticateJwt,handleCreateRequest);
router.post("/fetchRequests",authenticateJwt,handleFetchRequests);
router.post("/handleRequest",authenticateJwt,handleRequest);
router.post("/fetchchat",authenticateJwt,handleFetchingChat);
router.post("/updateChat",authenticateJwt,handleUpdatingChat);

export default router;