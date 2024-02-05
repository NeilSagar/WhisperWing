import React, { useEffect } from 'react'
import { UserDetails } from '../context/UserContext'

export default function ChatNavbar() {
  const {chatDetails,chatWithId} = UserDetails();
  // additional function to load until chatDetails.UserId!==chatWithId

  // useEffect(()=>{
  //   console.log(chatDetails);
  // },[chatDetails]);
  
  return (
    <div>
        <div className='flex items-center p-2 bg-slate-800 h-[7vh]'>
            <div>
                <img src={chatDetails && chatDetails.chatWithProfilePic}
                    className='w-10 h-10 rounded-full'
                />
            </div>
            <h2 className='text-white text-xl px-3'>{chatDetails && chatDetails.chatWithName}</h2>
        </div>
    </div>
  )
}
