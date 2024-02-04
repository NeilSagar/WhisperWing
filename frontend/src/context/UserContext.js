import { createContext, useContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import { handleCreateRequest, handleFetchUserDetails, handleSearchedUserDetails,handleFetchRequests, handleRequestVerdict } from "../services/api";
import { useUtils } from "./UtilsContext";


const userContext = createContext();

function UserProvider({children}){
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("baatchit-profile")));
    const [window,setWindow] = useState(null);
    const [profileDetails,setProfileDetails] = useState(null);
    const [requests,setRequests] = useState(null);

    const {token} = UserAuth();
    const {setClearFunctions} = useUtils();
    async function fetchUserDetails() {
        if (token) {
            const userData = await handleFetchUserDetails(token);
            if (userData.status === 201) {
                // Set the user details using setUser function
                setUser(userData.message);
                setProfileDetails(userData.message);
                localStorage.setItem("baatchit-profile", JSON.stringify(userData.message));
                return {status:201,result:userData.message};
            }
        }
    }

    async function fetchSearchedDetails(username){
        if (!user) return;

        if(user && user.UserName === username){
            const response = await fetchUserDetails();
            if(response && response.status === 201){
                setProfileDetails(response.result);
                setWindow("Profile");
                return;
            }
            if(response)return;
        }

        if(user.UserName !== username){
            const response = await handleSearchedUserDetails(user.UserName,username,token);
            if(response){
                setProfileDetails(response.message);
                setWindow("Profile");
            }
        }
    }

    async function createRequest(UserNameFrom,UserNameTo){
        const response = await handleCreateRequest(UserNameFrom,UserNameTo,token);
        if(response && response.status===201){
            console.log(response);
        }
    }

    async function fetchRequests(username){
        const response = await handleFetchRequests(username,token);
        if(response){
            if(response.status === 201){
                setRequests(response.message);
            }
        }
    }

    async function fetchContacts(){
        await fetchUserDetails();
    }

    async function verdictRequest(From,Verdict){
        const To = user.UserName;
        const response = await handleRequestVerdict(From,To,Verdict,token);
        if(response ){
            return response;
        }
    }

    useEffect(()=>{
        setClearFunctions(
            [setUser,
            setWindow,
            setProfileDetails,
            setRequests]
        );
    },[]);
    return (
        <userContext.Provider
            value={{
                fetchUserDetails,
                window,setWindow,
                user,
                fetchSearchedDetails,
                profileDetails,setProfileDetails,
                createRequest,
                requests,
                fetchRequests,
                verdictRequest,
                fetchContacts
            }}
        >
            {children}
        </userContext.Provider>
    );
}

function UserDetails(){
    return useContext(userContext);
}

export {UserDetails,UserProvider};