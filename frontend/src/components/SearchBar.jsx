import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { UserDetails } from '../context/UserContext';
import { UserAuth } from '../context/AuthContext';
import { handleSearchedUser } from '../services/api';

import chat from "../Resources/chat.png";

export default function Searchbar() {
    const [searchedUser,setSearchedUser] = useState("");
    const [results,setResults] = useState([]);
    const {token} = UserAuth();
    const {fetchSearchedDetails} = UserDetails();

    async function handleChange(e){
      const value = e.target.value;
      setSearchedUser(value);
    }
    async function handleSearched(){
      const response = await handleSearchedUser(searchedUser,token);
      if(response && response.status===201){
         setResults(response.message);
      }
    }

    function handleQueryClick(index){
      //get user details with index's username
      const searchedUserName = results[index].UserName;
      fetchSearchedDetails(searchedUserName);
    }
    
  return (
    <div className='w-full flex flex-col items-center'>

        <div className='w-1/2 m-4'>
        <div className='flex items-center'>
          <input 
          type='text'  placeholder='Search for users'
          className='w-full focus:outline-none py-3 px-5 text-lg'
          value={searchedUser}
          onChange={handleChange}
          />
          <button className='bg-blue-500 p-4 flex items-center'
            onClick={handleSearched}
          >
            <SearchIcon sx={{fontSize:"1.125rem",lineHeight:"1.75rem"}}/>
          </button>
        </div>

        {results.length!==0?
          <div className='bg-white p-3 rounded-lg min-w-fit mt-2 w-11/12 mx-auto'>
          {results.map((result,index)=>{
            return(
              <div key={index} onClick={()=>handleQueryClick(index)}>
              <div className='flex items-center py-2'>
                <img className='rounded-full w-10 h-10 mx-2' src={result&&result.ProfilePic?result.ProfilePic:chat} alt='user'  />
                <div className='flex flex-col '>
                  <p >{result.Name}</p>
                  <p className='text-sm text-gray-400'>{result.UserName}</p>
                </div>
              </div>
              <hr/>
              </div>
            )
          })}
          
       </div>:<></>}
        </div>
        
      
    </div>
  )
}
