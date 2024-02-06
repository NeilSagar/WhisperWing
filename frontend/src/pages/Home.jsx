import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat';
import Navbar from "../components/Navbar";
import { UserAuth } from '../context/AuthContext';
import Profile from '../components/Profile';
import { UserDetails } from '../context/UserContext';
import SearchBar from '../components/SearchBar';
import RequestsPending from '../components/RequestsPending';
import {io} from "socket.io-client";

const URL = "http://localhost:5000";

export default function Home() {
  const {window,user} = UserDetails();
  const {token} = UserAuth();
  let socket = null;
  if(token){
    socket = io(URL,{
        auth:{
            token:token
        }
    });
  }
  

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
          return <Profile UserName={user.UserName}/>;
      }
  }

  const handleChatMessage = (payload) => {
      console.log(payload);
  };

  useEffect(() => {
    if (user ) {

        socket.on('chat-message', handleChatMessage);
        socket.on("connect_error", (err) => {
          console.log(err.message); // prints the message associated with the error
        });
        
        socket.emit('user-connected', { UserId: user.UserId, UserName: user.UserName });
        return () => {
            socket.off('chat-message', handleChatMessage);
            socket.off('user-connected');
        };
    }
}, [user]); 

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
