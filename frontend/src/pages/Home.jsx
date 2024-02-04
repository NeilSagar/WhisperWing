import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat';
import Navbar from "../components/Navbar";
import { UserAuth } from '../context/AuthContext';
import Profile from '../components/Profile';
import { UserDetails } from '../context/UserContext';
import SearchBar from '../components/SearchBar';
import RequestsPending from '../components/RequestsPending';

export default function Home() {
  const {window,fetchUserDetails} = UserDetails();
  function handleWindowDisplay(){
      switch (window) {
        case 'Profile':
          return <Profile />;
        case 'Search':
          return <SearchBar/>
        case 'RequestsPending':
          return <RequestsPending/>
        case 'Chat':
          return <Chat/>
        default:
          return <Profile />;
      }
  }
  return (
      <div className='w-full flex flex-col h-screen'>
        <Navbar />
        
        <div className='flex flex-grow'>
          <Sidebar/>
          {handleWindowDisplay()}
        </div>
      </div> 

  )
}
