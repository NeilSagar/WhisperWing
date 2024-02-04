import React, { useEffect, useState } from 'react'

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import logo from "../Resources/chat.png";

import { useNavigate } from 'react-router-dom';
import { handleLogIn } from '../services/api';
import { UserAuth } from '../context/AuthContext';
import { Backdrop, CircularProgress } from '@mui/material';

const backdropStyle={
  backgroundColor:"#fff", 
  zIndex: (theme) => theme.zIndex.drawer + 1,
  textAlign:"center",
}

export default function LogIn() {
    const Navigate = useNavigate();
    const [logInDetails,setLogInDetails] = useState({
      Email:"",
      Password:""
    });
    const [logInError,setLogInError] = useState(null);
    const [loading,setLoading] = useState(false);
    const {logInWithEmailandPassword,token,authErrorMsg,setAuthErrorMsg} = UserAuth();

    function handleChange(e){
      setAuthErrorMsg(null);
      const name = e.target.name;
      const value = e.target.value;
      setLogInDetails((prev)=>{
        return {
          ...prev,
          [name]:value
        }
      });
    }

    function handleSubmit(){
      if(!logInDetails.Email || !logInDetails.Password){
        return;
      }
      logInWithEmailandPassword(logInDetails);
    }
    
    useEffect(()=>{
      if(authErrorMsg==null)setLoading(false);
      setLogInError(authErrorMsg);
    },[authErrorMsg]);

    useEffect(()=>{
      if(token){
        Navigate("/loading");
      }
    },[token]);

  return (
    <div >
        {loading?<Backdrop
          sx={backdropStyle}
          open={true}
        >
        <CircularProgress sx={{padding:"10px"}}/>
        <p className='text-lg'>Please wait...</p>
        </Backdrop>
        :<></>}

        <div className='w-4/12 min-w-fit max-w-lg mx-auto bg-slate-800 p-10 rounded-md text-center shadow-2xl'>
          <div className='flex items-center'>
                <img src={logo} alt='logo' className='h-10'/>
                <h1 className='text-white font-bold text-5xl m-2 font-'>Whisper Wing</h1>
          </div>
            <h2 className='text-white text-2xl mt-2'>Log In</h2>

            <div className='flex m-2 mt-6'>
            <div className='bg-slate-300 p-2 rounded-s-md'><AlternateEmailIcon/></div>
            <input className='border w-full p-2 rounded-e-md focus:outline-none'
            name='Email'
            type='text' 
            placeholder='Email'
              value={logInDetails.Email}
              onChange={handleChange}
            />
            </div>

            <div className='flex m-2'>
            <div className='bg-slate-300 p-2 rounded-s-md'><LockIcon/></div>
            <input className='border w-full p-2 rounded-e-md focus:outline-none'
            name='Password'
            type='password' 
            placeholder='Password'
            value={logInDetails.Password}
            onChange={handleChange}
            />
            </div>
            
            <div className='w-2/4 mx-auto mt-5'>
            <button className='bg-slate-300 p-2 rounded-md w-full transition hover:scale-105 '
            onClick={handleSubmit}
            >Log In</button>
            </div>

            {logInError?<p 
            className='
            text-red-500 bg-red-400 bg-opacity-20 border-red-500 rounded-md 
            p-2 mt-2 w-10/12 mx-auto min-w-fit' 
            style={{border:"1px solid red"}}>{logInError}</p>:<></>}

            <p className='text-white  mt-2'>Not registered? <span className='text-blue-400 hover:cursor-pointer' onClick={()=>{ Navigate("/Register") }}>Sign Up</span> </p>
            <p className='text-white mt-2'>Forgot Password? <span className='text-blue-400 hover:cursor-pointer' onClick={()=>{ }}>Reset Password</span> </p>
        </div>
    </div>
  )
}
