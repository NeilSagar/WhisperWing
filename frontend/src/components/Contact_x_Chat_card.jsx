import React, { useEffect } from 'react'
import { UserDetails } from '../context/UserContext';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

export default function Contact_x_Chat_card(props) {
    const {user,setWindow,setChatWithId} = UserDetails();
    function handleOpenChat(contactId){
        setChatWithId(contactId);
        props.setSideBarMainScreen("chats");
        setWindow('Chat');
    }
  return (
    <div>
        <div className='p-2 flex items-center bg-slate-400 rounded-md my-1 hover:cursor-pointer'
            onClick={()=>handleOpenChat(props.contactId)}
        >
            <div className='icon '>
                {props.ProfilePic?<img className='w-10 h-10 rounded-full'
                src={props.ProfilePic}/>:<Avatar sx={{ bgcolor: deepOrange[500] }}>{props.Name && props.Name[0]}</Avatar>}
            </div>
            <div className='flex-grow  py-1 px-2'>
                <p className='text-lg font-semibold'>
                    {props.Name}
                </p>
                <p> {props.Secondary}</p>
            </div>
        </div>
    </div>
  )
}
