import { createContext, useContext, useState } from "react";
import { UserAuth } from "./AuthContext";
import { handleCreateRequest, handleFetchUserDetails, handleSearchedUserDetails,handleFetchRequests, handleRequestVerdict } from "../services/api";


const userContext = createContext();

function UserProvider({children}){
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("baatchit-profile")));
    const [window,setWindow] = useState("");
    const [searchedUserDetails,setSearchedUserDetails] = useState(null);
    const [requests,setRequests] = useState(null);
    const {token} = UserAuth();

    async function fetchUserDetails() {
        if (token) {
            const userData = await handleFetchUserDetails(token);
            if (userData.status === 201) {
                // Set the user details using setUser function
                setUser(userData.message);
                localStorage.setItem("baatchit-profile", JSON.stringify(userData.message));
            }
        }
    }

    async function fetchSearchedDetails(username){
        if(user && user.UserName === username){
            setWindow("Profile");
            return;
        }

        const response = await handleSearchedUserDetails(user.UserName,username,token);
        if(response){
            setSearchedUserDetails(response.message);
            
            setWindow("OtherProfile");
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

    
    return (
        <userContext.Provider
            value={{
                fetchUserDetails,
                window,setWindow,
                user,
                fetchSearchedDetails,
                searchedUserDetails,
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