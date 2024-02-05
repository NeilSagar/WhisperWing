import React, { useEffect } from 'react'
import ChatNavbar from './ChatNavbar'
import ChatBox from './ChatBox'
import ChatSend from './ChatSend'
import { UserAuth } from '../context/AuthContext';
import { UserDetails } from '../context/UserContext';

export default function Chat() {
  const {chatWithId,fetchChat} = UserDetails();
  useEffect(()=>{
    console.log("calling fetch");
    fetchChat();
  },[chatWithId]);
  return (
    <div className='w-full flex flex-col'>
        <ChatNavbar/>
        <ChatBox/>
        <ChatSend/>
    </div>
  )
}
