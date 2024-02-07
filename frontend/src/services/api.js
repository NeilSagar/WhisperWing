import axios from "axios";

const url = "http://localhost:5000";

export const handleRegister=async (userDetails)=>{
    try {
        const response = await axios.post(url+"/register",userDetails);
        return {status:response.status,message:response.data.message};
    } catch (error) {
        const response = error.response ;
        const status = response ? response.status : 500;
        const message = response ? response.data.message : error.message;
        return {status,message};
    }
}

export const handleLogIn = async (logInDetails)=>{
    try {
        const response = await axios.post(url+"/logIn",logInDetails);
        return {status:response.status,message:response.data.message,JWToken:response.data.jwt};
    } catch (error) {
        const response = error.response ;
        const status = response ? response.status : 500;
        const message = response ? response.data.message : error.message;
        return {status,message};
    }
}

export const handleFetchUserDetails = async (token)=>{
    try {
        const response = await axios.get(url + '/userDetails', {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          return {status:response.status,message:response.data.message,recentChats:response.data.recentChats};
    } catch (error) {
        const response = error.response ;
        const status = response ? response.status : 500;
        const message = response ? response.data.message : error.message;
        return {status,message};
    }
}

export const handleSearchedUser = async (searchedUser, token) => {
    const data = JSON.stringify({searchedUser});

    try {
        const response = await axios.post(url + '/getSearchedUser/', data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Corrected the header name ('Authorization' to 'Authorization')
            },
        });
        return { status: response.status, message: response.data.message };
    } catch (error) {
        const response = error.response;
        const status = response ? response.status : 500;
        const message = response ? response.data.message : error.message;

        return { status, message };
    }
};

export const handleSearchedUserDetails = async (currentUserName,searchedUserName,token)=>{
    const data = JSON.stringify({currentUserName,searchedUserName});
    try {
        const response = await axios.post(url + '/getSearchedUserDetails', data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Corrected the header name ('Authorization' to 'Authorization')
            },
        });
        return { status: response.status, message: response.data.message };
    } catch (error) {
        const response = error.response;
        const status = response ? response.status : 500;
        const message = response ? response.data.message : error.message;
        return { status, message };
    }
}

export const handleCreateRequest = async (userNameFrom,userNameTo,token)=>{
    const data=JSON.stringify({userNameFrom,userNameTo});
    try {
        const response = await axios.post(url + '/createRequest', data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        });
        return { status: response.status, message: response.data.message };
    } catch (error) {
        const response = error.response;
        const status = response ? response.status : 500;
        const message = response ? response.data.message : error.message;
        return { status, message };
    }
}

export const handleFetchRequests = async (username,token) =>{
    const data = JSON.stringify({UserName:username});
    try {
        const response = await axios.post(url + '/fetchRequests', data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        });
        
        return { status: response.status, message: response.data.message };
    } catch (error) {
        const response = error.response;
        const status = response ? response.status : 500;
        const message = response ? response.data.message : error.message;
        return { status, message };
    }
}

export const handleRequestVerdict = async (From,To,Verdict,token)=>{
    const data = JSON.stringify({From,To,Verdict});
    console.log(data);
    try {
        const response = await axios.post(url + '/handleRequest', data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        });
        return {status:response.status, message:response.data.message};
    } catch (error) {
        const response = error.response;
        const status = response ? response.status : 500;
        const message = response ? response.data.message : error.message;
        return { status, message };
    }
}

export const handleFetchChat = async(userId,chatWithId,token)=>{
    const data = JSON.stringify({userId,chatWithId});
    try {
        const response = await axios.post(url+"/fetchchat",data,{
            withCredentials:true,
            headers:{
                'Content-Type': 'application/json',
                "Authorization":"Bearer "+token
            }
        });
        
        return { status: response.status, message: response.data.message };
    } catch (error) {
        const response = error.response;
        const status = response ? response.status : 500;
        const message = response ? response.data.message : error.message;
        console.log(message);
        return { status, message };
    }
}

export const handleUpdateChat = async (UserId,chatWithId,message,token)=>{
    const data = {UserId,chatWithId,message};
    try {
        const response = await axios.post(url+"/updateChat",data,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token
            }
        });
        return { status: response.status, message: response.data.message };
    } catch (error) {
        const response = error.response;
        const status = response ? response.status : 500;
        const message = response ? response.data.message : error.message;
        console.log(message);
        return { status, message };
    }
}