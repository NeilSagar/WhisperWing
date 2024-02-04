import React from 'react'
import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';
export default function ChatSend() {
  return (
    <div className='flex bg-white items-center px-2 h-[10vh]'>
        <div className='flex-grow '>
            <input  className='w-full p-5 text-lg focus:outline-none '
            type='text' 
            placeholder='your message' />

        </div>
        <div className='w-10 hover:cursor-pointer'>
            <AttachmentIcon/>
        </div>
        <div className=' hover:cursor-pointer bg-slate-500 p-3 rounded-full hover:scale-105 transition
        flex items-center justify-center'>
            <SendIcon sx={{color:"white"}}/>
        </div>
    </div>
  )
}
