import React, { useEffect, useState } from 'react'
import { UserDetails } from '../context/UserContext'
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

export default function RecentChats() {
  const {recentChats,setChatWithId,setWindow,chatWithId} = UserDetails();
  const [reversedRecentChats,setReversedChats] = useState(null);

  function handleRecentChatSelect(index){
    const openChatWithId = reversedRecentChats[index].UserId;
    setChatWithId(openChatWithId);

    setWindow('Chat');
  }
  useEffect(()=>{
    if(recentChats){
      const reversedChats = [...recentChats].reverse();
      setReversedChats(reversedChats);
    }
  },[recentChats]);
  
  return (
    <div className='overflow-auto h-[85vh] pt-1'>
    {reversedRecentChats && reversedRecentChats.map((chat,index)=>{
      const timeStamp = new Date(chat.lastMessage.TimeStamp);
      let hour = timeStamp.getHours();
      let minutes = timeStamp.getMinutes();
      if(hour<10)hour = "0"+hour;
      if(minutes<10)minutes = "0"+minutes;

      return (
        <div key={index} className={`p-2 flex items-center hover:cursor-default  ${chatWithId === chat.UserId ? 'bg-slate-700 text-white' : 'bg-slate-400 hover:bg-slate-500'} rounded-md `}
          onClick={()=>handleRecentChatSelect(index)}
        >
          <div className='icon '>
            {chat.ProfilePic?<img className='w-10 h-10 rounded-full' alt=''
            src={chat.ProfilePic}/>:<Avatar sx={{ bgcolor: deepOrange[500] }}>{chat.Name && chat.Name[0]}</Avatar>}
          </div>
          <div className='flex-grow  py-1 px-2'>
            <p className='text-lg font-semibold'>
              {chat.Name}
            </p>
          <div className='flex items-end'>
            <p>You: </p>
            <p className='ml-1'>  {chat.lastMessage.Message.slice(0,12)}...</p>
            <p className='text-xs w-fit ml-auto'>{hour}:{minutes}</p>
          </div>
        </div>
      </div>
      )
    })} 
    {!reversedRecentChats || reversedRecentChats.length ===0?
      <div className="p-2 bg-slate-400 rounded-md">
          <p className='text-center'>No recent chats.</p>
      </div>:<></>
    } 
    </div>
  )
}
