import { createContext, useContext, useState } from "react";
import { handleLogIn } from "../services/api";
import { useUtils } from "./UtilsContext";

const AuthContext = createContext();

function AuthProvider({children}){
    const [authErrorMsg, setAuthErrorMsg] = useState(null);
    const [token,setToken] = useState(localStorage.getItem('baatchit-jwt-token'));
    const {clearAllUserDetatils} = useUtils();

    async function logInWithEmailandPassword(logInDetails){
        const result = await handleLogIn(logInDetails);
        if(result && result.status ===201){
            setToken(result.JWToken);
            localStorage.setItem('baatchit-jwt-token',result.JWToken);
        }else if(result){
            setAuthErrorMsg(result.message);
        }else{
            setAuthErrorMsg("Server not connected.");
        }
    }
    async function logOut(){
        clearAllUserDetatils();
        localStorage.removeItem('baatchit-jwt-token');
        localStorage.removeItem('baatchit-profile');
        setToken(null);
    }

    return (
        <AuthContext.Provider
            value={{
                logInWithEmailandPassword,
                token,
                authErrorMsg,setAuthErrorMsg,
                logOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function UserAuth(){
    return useContext(AuthContext);
}

export {AuthProvider,UserAuth};