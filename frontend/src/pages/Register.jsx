import React, { useEffect, useState } from 'react'

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import logo from "../Resources/chat.png";
import ClearIcon from '@mui/icons-material/Clear';
import { handleRegister } from '../services/api';
import { Backdrop, CircularProgress } from '@mui/material';

async function converImgtoBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };

    try {
      fileReader.readAsDataURL(file);
    } catch (error) {
      console.error('Error reading the file:', error);
      reject(error);
    }
  });
}

const clearIconStyle = {
  color: "#FA7070",
  transition: "transform 0.3s ease-in-out",
  ":hover": {
    transform: "rotate(90deg)",
    cursor:"pointer"
  },
};
const backdropStyle={
  backgroundColor:"#fff", 
  zIndex: (theme) => theme.zIndex.drawer + 1,
  textAlign:"center",
}
export default function Register() {
  const Navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
      Name:"",
      Email:"",
      Password:"",
      UserName:"",
      ProfilePic:""
  });
  const [errorMsg,setErrorMsg] = useState(null);
  const [success,setSuccess] = useState(false);
  const [loading,setLoading] = useState(false);
  const {token} = UserAuth();
    async function handleChange(e){
      const name = e.target.name;
      setErrorMsg(null);
      if(name === "ProfilePic"){
        
        const file = e.target.files[0];
        if(!file)return;
        try {
          const result = await converImgtoBase64(file,setRegisterData);
          if(result){
            setRegisterData((prev)=>{
              return{
                ...prev,
                [name]:result
              }
            });
          }
        } catch (error) {
          console.log(error)
        }
        
      }
      else{
        const value = e.target.value;
        setRegisterData((prev)=>{
          return({
              ...prev,
              [name]:value
          });
      });
      }

    }

    async function handleSubmit(){
      if(!registerData.Name || !registerData.Email || !registerData.Password){
        setErrorMsg("Name, Email & Password are necessary.");
        return;
      }
      setLoading(true);
      const result = await handleRegister(registerData);
      if(errorMsg || success)setLoading(false);
      
      if(result){
        if(result.status === 201){
          setSuccess(true);
        }else{
          setErrorMsg(result.message);
        }
      }
     
    }

    function handleClearImage(){
      setRegisterData((prev)=>{
        return {
          ...prev,
          ['ProfilePic']:null
        }
      });
    }

    useEffect(()=>{
      if(success){
        setTimeout(()=>{
          Navigate("/");
        },3000);
      }
      if(errorMsg){
        setLoading(false);
      }
    },[success,errorMsg,setLoading]);
    useEffect(()=>{
      if(token)Navigate("/loading");
    },[token]);
  return (
    <div >

        {loading?<Backdrop
          sx={backdropStyle}
          open={true}
        >
        <CircularProgress sx={{padding:"10px"}}/>
        <p className='text-lg'>
        {success?"Log In using credentials. Navigating to Log In..." :
        "Please wait ..."  }
        </p>

        </Backdrop>
        :<></>}

        <div className='w-4/12 min-w-fit max-w-lg mx-auto bg-slate-800 
        p-10 rounded-md text-center shadow-slate-900-2xl'>
            <div className='flex items-center'>
              <img src={logo} alt='logo' className='h-10'/>
              <h1 className='text-white font-bold text-5xl m-2 font-'>Whisper Wing</h1>
            </div>
            <h2 className='text-white text-2xl mt-2'>Sign Up</h2>

            <div className='flex m-2 mt-6'>
            <div className='bg-slate-300 p-2 rounded-s-md'><PersonIcon/></div>
            <input className='border w-full p-2 rounded-e-md focus:outline-none'
            type='text' 
            placeholder='Name'
            name='Name'
            value={registerData.Name}
            onChange={handleChange}
            />
            </div>

            <div className='flex m-2'>
            <div className='bg-slate-300 p-2 rounded-s-md'><AlternateEmailIcon/></div>
            <input className='border w-full p-2 rounded-e-md focus:outline-none'
            type='text' 
            placeholder='Email'
            name='Email'
            value={registerData.Email}
            onChange={handleChange}
            />
            </div>

            <div className='flex m-2'>
            <div className='bg-slate-300 p-2 rounded-s-md'><LockIcon/></div>
            <input className='border w-full p-2 rounded-e-md focus:outline-none'
            type='password' 
            placeholder='Password'
            name='Password'
            value={registerData.Password}
            onChange={handleChange}
            />
            </div>

            <div className='flex m-2'>
            <div className='bg-slate-300 p-2 rounded-s-md'><PersonIcon/></div>
            <input className='border w-full p-2 rounded-e-md focus:outline-none'
            type='text' 
            placeholder='Username'
            name='UserName'
            value={registerData.UserName}
            onChange={handleChange}
            />
            </div>

            <div className='flex m-2 items-center bg-white rounded-md'>
            <label className="flex rounded-md hover:cursor-pointer flex-grow" htmlFor='formImage'>
                <span  className='bg-slate-300 p-2 rounded-s-md '><AddPhotoAlternateIcon/></span>
                <span  className='p-2 text-left text-gray-400 bg-white w-full rounded-e-md '>
                {registerData.ProfilePic?"Uploaded Avatar": "Add an Avatar"}
                </span>
            </label>
            {registerData.ProfilePic?
                <span className='float-end px-1' 
                onClick={handleClearImage}>
                <ClearIcon sx={clearIconStyle}/>
                </span>:<></>}
            </div>

            <input 
            type="file" 
            id='formImage' 
            className="hidden"
            name="ProfilePic" 
            accept="image/*"
            onChange={handleChange}
            />
            
            <div className='w-2/4 mx-auto mt-5'>
            <button className='bg-slate-300 p-2 rounded-md w-full transition hover:scale-105'
            onClick={handleSubmit}>Register</button>
            </div>
            {errorMsg?
            <p 
            className='
            text-red-500 bg-red-400 bg-opacity-20 border-red-500 rounded-md 
            p-2 mt-2 w-10/12 mx-auto min-w-fit' 
            style={{border:"1px solid red"}}>{errorMsg}</p>:<></>}
            
            <p className='text-white hover:cursor-pointer mt-2'>Already registered? <span className=' text-blue-400' onClick={()=>{ Navigate("/") }}>Log In</span> </p>
        </div>
    </div>
  )
}
