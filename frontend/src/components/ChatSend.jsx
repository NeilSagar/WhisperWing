import React, { useEffect, useState } from 'react'
import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';
import { UserDetails } from '../context/UserContext';
export default function ChatSend() {
  const {chatDetails,chatWithId,updateChat} = UserDetails();
  const [message,setMessage] = useState("");

  function handleChange(e){
    setMessage(e.target.value);
  }
  async function handleSendMessage(){
    if(message.length===0){
      return;
    }
    if(chatDetails && chatWithId === chatDetails.chatWithUserId){
        const response = await updateChat(chatWithId,message);
        if(response){
          console.log(response);
        }
    }
    setMessage("");
  }

  useEffect(()=>{
    setMessage("");
  },[chatWithId]);

  return (
    <div className='flex bg-white items-center px-2 h-[9vh]'>
        <div className='flex-grow '>
            <textarea  className='w-full  text-lg focus:outline-none resize-none h-auto'
            placeholder='your message' 
            value={message}
            onChange={handleChange}
            />
            
        </div>

        <div className='w-10 hover:cursor-pointer'>
            <AttachmentIcon/>
        </div>
        <button className=' bg-slate-500 p-3 rounded-full hover:scale-105 transition
        flex items-center justify-center'
        onClick={handleSendMessage}
        >
            <SendIcon sx={{color:"white"}}/>
        </button>

    </div>
  )
}
