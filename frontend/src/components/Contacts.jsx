import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserDetails } from '../context/UserContext';

export default function Contacts({setSideBarMainScreen}) {
  const {fetchContacts,user} = UserDetails();
  const [contacts,setContacts] = useState(null);
  function handleClick(){
    setSideBarMainScreen("chats");
  }
  useEffect(()=>{
    if(user && user.Contacts){
      setContacts(user.Contacts);
    }
  },[user]);
  return (
    <div>
      <div className='flex items-center shadow-sm p-1'>
        <button  onClick={handleClick}
        className='hover:border hover:border-white border border-transparent rounded-full'>
          <ArrowBackIcon sx={{color:"white"}}/>
        </button>
        <h3 className='flex-grow ps-3'>Contacts</h3>
      </div>
      {contacts && contacts.map((contact,index)=>{
        return(
          <p>{contact.contactUserName}</p>
        )
      })}
    </div>
  )
}
