import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import Navbar from "../components/Navbar";
import { UserAuth } from '../context/AuthContext';
import Profile from '../components/Profile';
import { UserDetails } from '../context/UserContext';
import SearchBar from '../components/SearchBar';
import RequestsPending from '../components/RequestsPending';
import { io } from "socket.io-client";

const URL = "http://localhost:5000";

export default function Home() {
    const { window, user,chatWithId,chatDetails,setChatDetails,recentChats,setRecentChats } = UserDetails();
    const { token } = UserAuth();

    let socket = null;
    if(user){
        socket = io(URL, {
          auth: {
            token: token
          }
      });
    }
    function findContactDetails(contactUserId){
      let details = {};
      for(let i=0;i<user.Contacts.length;i++){
        if(user.Contacts[i].contactUserId === contactUserId){
          details = user.Contacts[i];
          break;
        }
      }
      return details;
    }
    const handleChatMessage = (payload) => {
      const {FromId,ToId,Message,TimeStamp} = payload;
        if(FromId && ToId && Message){

          if(FromId === chatWithId){
            setChatDetails((prev) => ({
                ...prev,
              last100Messages: [...prev.last100Messages, { From: FromId, TimeStamp, Message }]
            }));
          }
          const currContactDetails  = findContactDetails (FromId);
          setRecentChats((prev)=>{
            const newData = prev.filter((contact)=>contact.UserId !== FromId);
            newData.push({
              UserId:currContactDetails.contactUserId || FromId,
              UserName:currContactDetails.contactUserName || FromId,
              Name:currContactDetails.contactName || FromId.slice(0,10),
              ProfilePic:currContactDetails.contactProfilePic || null,
              lastMessage:{
                From:FromId,
                TimeStamp,
                Message,

              }
            });
            return newData;
          });
        }
    };

    useEffect(() => {
        if (user) {

            socket.on('chat-message', handleChatMessage);
            socket.on("connect_error", (err) => {
                console.log("socket-warning:",err.message); 
            });

            socket.emit('user-connected', { UserId: user.UserId, UserName: user.UserName });
            
            return () => {
                if (socket) {
                    socket.off('chat-message', handleChatMessage);
                    socket.off('connect_error');
                    socket.disconnect(); // Disconnect socket on component unmount
                }
            };
        }
    }, [user,chatWithId,chatDetails,setChatDetails,recentChats,setRecentChats]);

    function handleWindowDisplay() {
        switch (window) {
            case 'Profile':
                // console.log("Profile:",new Date());
                return <Profile />;
            case 'Search':
                return <SearchBar />
            case 'RequestsPending':
                return <RequestsPending />
            case 'Chat':
              // console.log("Chat:",new Date());
                return <Chat socket={socket}/>
            default:
                return <Profile UserName={user.UserName} />;
        }
    }

    return (
        <div className='w-full flex flex-col h-screen'>
            <Navbar />
            <div className='flex flex-grow'>
                <Sidebar />
                {handleWindowDisplay()}
            </div>
        </div>
    )
}
