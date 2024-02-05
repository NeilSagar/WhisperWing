import React, { useEffect, useState } from 'react'
import { UserDetails } from '../context/UserContext';

export default function ChatBox({chats}) {
    const {user,chatDetails,chatWithId} = UserDetails();
    // const [chats,setChats] = useState(null);
    
    

    // useEffect(()=>{
    //     if(chatDetails)setChats(chatDetails.last100Messages);        
    // },[chatDetails]);

    useEffect(()=>{
        if(chats){
            const lastIndex = chats.length-1;
            if(lastIndex>0){
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
            const dateval = new Date(chat.TimeStamp);
            let hours = dateval.getHours();
            let minutes = dateval.getMinutes();
            if(hours<10)hours = "0"+hours;
            if(minutes<10)minutes = "0"+minutes;
            return(
                <div key={index} id={`${chat.From}${index}`} className='my-5'>
                        {  user.UserId === chat.From?
                            <div className='mine mx-5 w-1/2 items-end ml-auto'>
                                <div className=' bg-slate-500 w-2/3 max-w-fit ml-auto p-2 rounded-b-xl rounded-ss-xl shadow-md '>
                                    <p className='text-white '>
                                       {chat.Message}
                                    </p>
                                    <p className='text-xs text-white ml-auto w-fit'>{hours}:{minutes}</p>
                                </div>
                            </div>
                        :
                        <div className='other mx-5 w-1/2'>
                            <div className=' bg-white w-2/3 max-w-fit p-2 rounded-b-xl rounded-se-xl shadow-md'>
                                <p>
                                    {chat.Message}
                                </p>
                                <p className='text-xs text-slate-700 ml-auto w-fit'>{hours}:{minutes}</p>
                            </div>  
                    
                        </div>}
                </div>)
        })}
    </div>
  )
}
