import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext'

export default function PrivateComponent() {
    const {token} = UserAuth();
    useEffect(()=>{
      console.log(token);
    },[token]);
  return (
    token?<Outlet/>:<Navigate to="/"/>
  )
}
