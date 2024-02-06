import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import { UserDetails } from '../context/UserContext';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

export default function Navbar() {
  const {setWindow} = UserDetails();
  const {user,fetchSearchedDetails} = UserDetails();

  function handleOpenProfile(){
    fetchSearchedDetails(user.UserName);
    setWindow('Profile');
  }

  return (
        <div className='flex items-center justify-between py-3 px-2 bg-slate-700 h-[9vh]'>
        
            <h2 className='text-white text-2xl font-bold min-w-fit'>Whisper Wing</h2>
            
            <div className='flex items-center justify-around basis-2/12'
              
            >
              <SearchIcon onClick={()=>{setWindow('Search')}} sx={{color:"white"}}/>
              <AccessTimeIcon onClick={()=>{setWindow('RequestsPending')}} sx={{color:"white"}}/>
              <div onClick={handleOpenProfile} >
                {user && user.ProfilePic?<img src={user.ProfilePic}
                    className='w-11 h-11  rounded-full object-cover'
                    alt='profile-pic'
                />:<Avatar sx={{ bgcolor: deepOrange[500] }}>{user && user.Name && user.Name[0]}</Avatar>}
              </div>
            </div>
        </div>
  )
}
