import React from 'react'

export default function ChatNavbar() {
  return (
    <div>
        <div className='flex items-center p-2 bg-slate-800 h-[7vh]'>
            <div>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCczoMDFIc77qVeqtnJ26h8Yen0WXNfyLTIg&usqp=CAU'
                    className='w-10 rounded-full'
                />
            </div>
            <h2 className='text-white text-xl px-3'>Shadow</h2>
        </div>
    </div>
  )
}
