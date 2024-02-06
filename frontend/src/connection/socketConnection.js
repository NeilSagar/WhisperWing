import {io} from "socket.io-client";

const URL = "http://localhost:5000";

export const connectSocket = (token) => {
    const socket = io.connect(URL, { auth: { token: token } });
    return socket;
};
