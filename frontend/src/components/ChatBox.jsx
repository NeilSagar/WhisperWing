import React from 'react'

export default function ChatBox() {
  return (
    <div className='flex-grow '>
        <div className='other mx-5 w-1/2'>
            <div className=' bg-white w-2/3 max-w-fit p-2 rounded-b-xl rounded-se-xl mt-10 shadow-md'>
                <p>
                    Hello, Arian How you doing?lorem lorem lorem lorem lorem lorem
                </p>
            </div>
            <p className='text-slate-700 text-sm max-w-fit px-2 py-1'>12:05am</p>
        </div>

        <div className='mine mx-5 w-1/2 items-end ml-auto'>
            <div className=' bg-slate-500 w-2/3 max-w-fit ml-auto p-2 rounded-b-xl rounded-ss-xl mt-10 shadow-md '>
                <p className='text-white '>
                    Hello, Shadow How you doing?lorem lorem lorem lorem lorem lorem
                </p>
            </div>
            <p className='text-slate-700 text-sm px-2 py-1 max-w-fit ml-auto'>12:05am</p>
        </div>
    </div>
  )
}
