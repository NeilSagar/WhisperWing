import React from 'react'
import ChatNavbar from './ChatNavbar'
import ChatBox from './ChatBox'
import ChatSend from './ChatSend'
import { UserAuth } from '../context/AuthContext';

export default function Chat() {
  return (
    <div className='w-full flex flex-col'>
        <ChatNavbar/>
        <ChatBox/>
        <ChatSend/>
    </div>
  )
}
