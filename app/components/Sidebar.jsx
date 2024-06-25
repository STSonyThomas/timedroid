"use client"

import { getDataFromToken } from '@/helpers/getDataFromToken';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaTimes, FaBars,FaLock } from 'react-icons/fa'

const Sidebar = () => {
  const [displayBar, setDisplayBar] = useState(false);
  const router = useRouter();
  const handleHamburgerClick = () => setDisplayBar(!displayBar);
  const handleLogout = async()=>{
    try {
      const response = await axios.get("/api/users/logout");
      console.log("response",response);
      toast.success(response.data.message);
      router.push("/login");
      
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }
  const handleUserProfile = async ()=>{
    try {
      const userId = await axios.get("/api/users/validateUser");
      console.log(userId);
      if(userId){
        router.push(`/userHome/${userId.data.userId}`)
      }else{
        toast.error("Either session expired or invalid user access");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  }

  return (
    <div className='w-full h-full'>
      {displayBar ? (
        <div className='fixed inset-0 md:relative md:h-full md:w-full bg-gray-400/50  flex flex-col space-y-2 pt-2 pr-1 align-top border-solid border-r-2 border-gray-500 z-20'>
          <FaTimes className="icon text-black cursor-pointer ml-auto mr-2 mt-2 md:relative md:ml-auto md:mr-2" onClick={handleHamburgerClick} />
          <button className='bg-white/70 px-4 py-2 rounded-sm text-gray-400 shadow-lg hover:shadow-md hover:shadow-black'><Link href="/userHome">Record Time</Link></button>
          <button className='bg-red-600 px-4 py-2 text-white shadow-lg rounded-sm hover:shadow-md hover:shadow-black' onClick={handleUserProfile}>Dashboard</button>
          <button className='bg-red-600 px-4 py-2 text-white shadow-lg rounded hover:shadow-md hover:shadow-black'><Link href="/userHome/adminDashboard">AdminBoard</Link></button>
          <button className='bg-red-600 px-4 py-2 text-white shadow-lg rounded hover:shadow-md hover:shadow-black'><Link href="/userHome/addUser">Add Employee<span className=''><FaLock className='inline-block ml-2 mx-auto'/></span></Link></button>
          <button className='bg-red-600 px-4 py-2 text-white shadow-lg rounded-sm hover:shadow-md hover:shadow-black' onClick={handleLogout}>Logout</button>
          
        </div>
      ) : (
        <FaBars className="icon cursor-pointer text-black mt-1 ml-1" onClick={handleHamburgerClick} />
      )}
    </div>
  )
}

export default Sidebar;
