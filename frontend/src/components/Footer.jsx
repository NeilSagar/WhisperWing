import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { UserAuth } from '../context/AuthContext';
export default function Footer() {
  const {logOut} = UserAuth();
  return (
    <div>
        <div className='flex items-center bg-slate-800 p-2 justify-between'>
        <div className='flex items-center'>
            <img src='https://www.profilebakery.com/wp-content/uploads/2023/03/AI-Profile-Picture.jpg'
                className='w-14 rounded-full'
            />
            <p className='mx-2 text-white'>John Smith</p>
        </div>
        
        <button className='text-red-500 font-semibold p-3 transition hover:scale-105'
        onClick={logOut}
        >
        <LogoutIcon sx={{marginRight:"5px"}}/>
        Log Out</button>
        </div>
    </div>
  )
}
