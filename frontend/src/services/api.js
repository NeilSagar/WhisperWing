import axios from "axios";

// Create a reusable Axios instance with base configurations
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper function for setting the Authorization header with a token
const authHeader = (token) => ({
    headers: {
        'Authorization': `Bearer ${token}`,
    },
});

// Centralized error handler function
const handleError = (error) => {
    const response = error.response;
    const status = response ? response.status : 500;
    const message = response ? response.data.message : error.message;
    return { status, message };
};

// API function to handle user registration
export const handleRegister = async (userDetails) => {
    try {
        const response = await api.post("/register", userDetails);
        return { status: response.status, message: response.data.message };
    } catch (error) {
        return handleError(error);
    }
};

// API function to handle user login
export const handleLogIn = async (logInDetails) => {
    try {
        const response = await api.post("/logIn", logInDetails);
        return { status: response.status, message: response.data.message, JWToken: response.data.jwt };
    } catch (error) {
        return handleError(error);
    }
};

// API function to fetch user details
export const handleFetchUserDetails = async (token) => {
    console.log(process.env.REACT_APP_API_URL);
    try {
        const response = await api.get("/userDetails", authHeader(token));
        return { status: response.status, message: response.data.message, recentChats: response.data.recentChats };
    } catch (error) {
        return handleError(error);
    }
};

// API function to search for a user
export const handleSearchedUser = async (searchedUser, token) => {
    const data = JSON.stringify({ searchedUser });
    try {
        const response = await api.post("/getSearchedUser", data, authHeader(token));
        return { status: response.status, message: response.data.message };
    } catch (error) {
        return handleError(error);
    }
};

// API function to get detailed information of a searched user
export const handleSearchedUserDetails = async (currentUserName, searchedUserName, token) => {
    const data = JSON.stringify({ currentUserName, searchedUserName });
    try {
        const response = await api.post("/getSearchedUserDetails", data, authHeader(token));
        return { status: response.status, message: response.data.message };
    } catch (error) {
        return handleError(error);
    }
};

// API function to create a connection request
export const handleCreateRequest = async (userNameFrom, userNameTo, token) => {
    const data = JSON.stringify({ userNameFrom, userNameTo });
    try {
        const response = await api.post("/createRequest", data, authHeader(token));
        return { status: response.status, message: response.data.message };
    } catch (error) {
        return handleError(error);
    }
};

// API function to fetch connection requests
export const handleFetchRequests = async (username, token) => {
    const data = JSON.stringify({ UserName: username });
    try {
        const response = await api.post("/fetchRequests", data, authHeader(token));
        return { status: response.status, message: response.data.message };
    } catch (error) {
        return handleError(error);
    }
};

// API function to handle request approval/rejection
export const handleRequestVerdict = async (From, To, Verdict, token) => {
    const data = JSON.stringify({ From, To, Verdict });
    try {
        const response = await api.post("/handleRequest", data, authHeader(token));
        return { status: response.status, message: response.data.message };
    } catch (error) {
        return handleError(error);
    }
};

// API function to fetch chat messages between two users
export const handleFetchChat = async (userId, chatWithId, token) => {
    const data = JSON.stringify({ userId, chatWithId });
    try {
        const response = await api.post("/fetchchat", data, authHeader(token));
        return { status: response.status, message: response.data.message };
    } catch (error) {
        return handleError(error);
    }
};

// API function to update chat messages
export const handleUpdateChat = async (UserId, chatWithId, message, token) => {
    const data = { UserId, chatWithId, message };
    try {
        const response = await api.post("/updateChat", data, authHeader(token));
        return { status: response.status, message: response.data.message };
    } catch (error) {
        return handleError(error);
    }
};
