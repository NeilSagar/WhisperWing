import { createContext, useContext, useEffect, useState } from "react";
import { handleLogIn } from "../services/api";
import { useUtils } from "./UtilsContext";
import Cookie from 'js-cookie';

const AuthContext = createContext();

function AuthProvider({children}){
    const [authErrorMsg, setAuthErrorMsg] = useState(null);
    const [token,setToken] = useState(Cookie.get('varta-auth'));
    const {clearAllUserDetatils} = useUtils();

    async function logInWithEmailandPassword(logInDetails){
        const result = await handleLogIn(logInDetails);
        if(result && result.status ===200){
            setToken(Cookie.get('varta-auth'));
        }else if(result){
            setAuthErrorMsg(result.message);
        }else{
            setAuthErrorMsg("Server not connected.");
        }
    }

    async function logOut(){
        clearAllUserDetatils();
        Cookie.remove('varta-auth');
        localStorage.removeItem('varta-profile');
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