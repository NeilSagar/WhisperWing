import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import { UserDetails } from '../context/UserContext';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function RequestsPending() {
    const [pendingRequests,setPendingRequests] = useState(null);
    const {user,requests,fetchRequests,verdictRequest} = UserDetails();

    async function handleAcceptRequest(index){
        const FromUsername = pendingRequests[index].UserName;
        const result = await verdictRequest(FromUsername,true);
        if(result && result.status === 201){
            const updated_pendingRequests = pendingRequests.filter((request)=>request.UserName!==pendingRequests[index].UserName);
            setPendingRequests(updated_pendingRequests);
        }
    }
    async function handleRejectRequest(index){
        const FromUsername = pendingRequests[index].UserName;
        const result = await verdictRequest(FromUsername,false);
        if(result.status === 201){
            const updated_pendingRequests = pendingRequests.filter((request)=>request.UserName!==pendingRequests[index].UserName);
            setPendingRequests(updated_pendingRequests);
        }
    }

    useEffect(()=>{
        fetchRequests(user.UserName);
    },[user]);

    useEffect(()=>{
        setPendingRequests(requests);
    },[requests]);

  return (
    <div className='w-full'>
        <div className='w-10/12 mx-auto my-10 bg-white p-3 rounded-md'>
            
            <h1 className='m-2 font-semibold text-lg'>Requests Pending</h1>
            <hr/>

            <div className='h-2/3'>
                {pendingRequests && pendingRequests.map((request,index)=>{
                    return (
                    <div key={index}>
                        <div  className='flex items-center p-2 justify-between'>
                            <div className='flex space-x-3'>
                            {request.ProfilePic?
                            
                            <img src={request.ProfilePic} className='w-12 h-12 rounded-full'/>
                            :<Avatar sx={{bgcolor:deepPurple[400]}}>{request.Name[0]}</Avatar>}
                            
                            <div>
                                <p>{request.Name}</p>
                                <p className='text-sm text-gray-600'>{request.UserName}</p>
                            </div>
                            </div>
                            <div className='flex space-x-2 '>
                                <button onClick={()=>handleAcceptRequest(index)}
                                className='border border-green-300 rounded-full bg-green-100 p-2'>
                                    <CheckIcon/>
                                </button>
                                <button onClick={()=>handleRejectRequest(index)}
                                className='border border-red-300 rounded-full bg-red-100 p-2'>
                                    <CloseIcon/>
                                </button>
                            </div>
                            
                        </div>
                        <hr />
                    </div>
                    
                    )
                })}
                
            </div>
            {pendingRequests==null || pendingRequests.length ===0?<p className='mt-5 text-center'>No Requests</p>:<></>}
        </div>
    </div>
  )
}
