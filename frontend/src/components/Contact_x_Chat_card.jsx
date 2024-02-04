import React, { useEffect } from 'react'

export default function Contact_x_Chat_card(props) {
    useEffect(()=>{
        console.log(props);
    },[props]);
  return (
    <div>
        <div className='p-2 flex items-center bg-slate-300 rounded-md my-2'>
            <div className='icon '>
                <img className='w-10 h-10 rounded-full'
                src={props.ProfilePic}/>
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
