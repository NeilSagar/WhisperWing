import React, { useState } from 'react'

export default function ContactSearchbar({setSideBarMainScreen}) {
  const [searchedUser, setSearchedUser] = useState("");
  function handleSearchingContacts(e){
    if(e.key === "Enter"){
      
    }
  }
  function handleClick(){
    setSideBarMainScreen("contacts");
  }
  
  return (
    <div className='h-[6vh] flex flex-col items-center justify-center w-full'>
      <div className=' w-full'>
        <input className=' p-2 w-full bg-slate-200 focus:outline-none text-sm rounded-md' 
        type='text' 
        value={searchedUser}
        onChange={(e)=>{setSearchedUser(e.target.value)}}
        onKeyDown={handleSearchingContacts}
        onClick={handleClick}
        placeholder='Search for contacts'/>
      </div>
    </div>
  )
}
