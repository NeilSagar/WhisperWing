import React, { useState } from 'react'
import ContactSearchbar from './ContactSearchbar'
import RecentChats from './RecentChats'
import Contacts from './Contacts';

export default function Sidebar() {
  const [sideBarMainScreen,setSideBarMainScreen] = useState("chats");

  function handleSideBarMainScreen(){
    switch(sideBarMainScreen){
      case "chats":return <RecentChats/>
      case "contacts":return <Contacts setSideBarMainScreen={setSideBarMainScreen}/>
      default: return <RecentChats/>
    }
  }
  return (
    <div>
        <div className=' h-[91vh] w-1/3 min-w-72 py-1 px-2 bg-slate-400 flex flex-col'>
            <ContactSearchbar setSideBarMainScreen={setSideBarMainScreen}/>
            {handleSideBarMainScreen()}
        </div>   
    </div>
  )
}
