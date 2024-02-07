import React, { useEffect, useState } from 'react'
import ChatNavbar from './ChatNavbar'
import ChatBox from './ChatBox'
import ChatSend from './ChatSend'
import { UserDetails } from '../context/UserContext';

export default function Chat({socket}) {
  const {chatWithId,fetchChat,chatDetails} = UserDetails();

  const [chats,setChats] = useState(null);

  useEffect(()=>{
    if(chatDetails){
      setChats(chatDetails.last100Messages); 

    }       
  },[chatDetails]);

  useEffect(()=>{
    fetchChat();
  },[chatWithId]);


  return (
    <div className='w-full flex flex-col'>
        <ChatNavbar />
        <ChatBox chats={chats}/>
        <ChatSend setChats={setChats} socket={socket}/>
    </div>
  )
}
