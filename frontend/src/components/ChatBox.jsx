import React, { useEffect, useState } from 'react'
import { UserDetails } from '../context/UserContext';

export default function ChatBox() {
    const {user,chatDetails,chatWithId,fetchChat} = UserDetails();
    const [chats,setChats] = useState(null);
    
    useEffect(()=>{
        fetchChat();
    },[]);

    useEffect(()=>{
        if(chatDetails)setChats(chatDetails.last100Messages);        
    },[chatDetails]);

    useEffect(()=>{
        if(chats){
            const lastIndex = chats.length-1;
            if(lastIndex>0){
                console.log(chats[lastIndex].From+lastIndex);
                const element = document.getElementById(chats[lastIndex].From+lastIndex);
                if (element) {
                    element.scrollIntoView({ behavior: 'instant' });
                }
            }
        }
    },[chats]);
  return (
    <div className='h-[75vh] overflow-auto'>
        {user && chatDetails && chatWithId && chatWithId===chatDetails.chatWithUserId && chats && chats.map((chat,index)=>{
            return(
                <div key={index} id={`${chat.From}${index}`}>
                        {  user.UserId === chat.From?
                            <div className='mine mx-5 w-1/2 items-end ml-auto'>
                                <div className=' bg-slate-500 w-2/3 max-w-fit ml-auto p-2 rounded-b-xl rounded-ss-xl mt-10 shadow-md '>
                                    <p className='text-white '>
                                       {chat.Message}
                                    </p>
                                </div>
                                <p className='text-slate-700 text-sm px-2 py-1 max-w-fit ml-auto'>12:05am</p>
                            </div>
                        :
                        <div className='other mx-5 w-1/2'>
                            <div className=' bg-white w-2/3 max-w-fit p-2 rounded-b-xl rounded-se-xl mt-10 shadow-md'>
                                <p>
                                    {chat.Message}
                                </p>
                            </div>  
                            <p className='text-slate-700 text-sm max-w-fit px-2 py-1'>12:05am</p>
                        </div>}
                </div>)
        })}
    </div>
  )
}
