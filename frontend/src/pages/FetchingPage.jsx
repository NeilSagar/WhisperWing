import { Backdrop, CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import { UserDetails } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const backdropStyle={
    backgroundColor:"#fff", 
    zIndex: (theme) => theme.zIndex.drawer + 1,
    textAlign:"center",
  }

export default function FetchingPage() {
    const {fetchUserDetails,user,profileDetails,setWindow,setProfileDetails} = UserDetails();
    const {token} = UserAuth();
    const navigate = useNavigate();


    useEffect(()=>{
        if(user){
          setProfileDetails(user);
          setWindow('Profile')
          
          if(profileDetails && user && profileDetails.UserId === user.UserId){
            console.log("navigating to home");
            navigate("/Home");
          }
        }
    },[user]); 

    useEffect(()=>{
        fetchUserDetails();
    },[user,token]);
    
  return (
    <Backdrop
          sx={backdropStyle}
          open={true}
        >
        <CircularProgress sx={{padding:"10px"}}/>
        <p className='text-lg'>Fetching Details. Please wait...</p>
    </Backdrop>
  )
}
