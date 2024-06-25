"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaLock } from 'react-icons/fa';


const AddUser = () => {
  const [processing,setProcessing] =  useState(false);
  const [data,setData] =useState(true);
  const router = useRouter();

  // useEffect(()=>{
    
  //   try {
  //     const callData = async()=>{
  //       const tokenData=  await axios.get("/api/users/validateUser");
  //       console.log("tokenData",tokenData.data.userData);
  //       setData(tokenData.data.userData)
        
  //     }
  //     callData();
  //     if(!data){
  //       console.log("redirecting");
  //       router.push("/"); 
  //     }
      
  //   } catch (error) {
  //     console.log(error.message);
  //   }

  // },[setData,router])

  const handleAddUser = async(e)=>{
    e.preventDefault();
    setProcessing(true)
    
    const user = {
      email: e.target.email.value,
      password:e.target.password.value,
      name:e.target.name.value,
      role:e.target.role.value,

    }

    try{
      const signupResponse = await axios.post("/api/users/signup",user);
      console.log(signupResponse.data);
      const status = signupResponse.data.success
      console.log(status);
      if(status===true){
        toast.success("User added!",{
          duration:3000,
          position:"bottom-center"
        });
      }else{
        toast.error(signupResponse.data.error,{
          duration:3000,
          position:"bottom-center"
        });
      }

    }catch(error){
      console.log(error.message);
      toast.error(error.message,{
        duration:3000,
        position:"bottom-center"
      });
    }finally{
      setProcessing(false);
    }
  }
  return (
    <div className='flex justify-center items-center  min-h-screen'>
        {/* <div 
        className="
        absolute
        top-0
        left-0
        w-full
        h-full
        bg-gradient-to-br
        from-pink-400
        to-[#0055D1]
        -z-50
        rounded-md
        filter
        blur-3xl
        opacity-50
        "
        /> */}
        
        <form 
        className='flex flex-col justify-center space-y-2 p-4 bg-white/75 opacity-90 rounded-sm text-black'
        onSubmit={handleAddUser}
        >
            <h1 className=' text-lg rounded-md p-1 h-full'>Add New Employee<span className=''><FaLock className='inline-block ml-2 mx-auto'/></span></h1>
            <hr className='border-t border-black my-4'/>
            <div className='flex flex-col md:flex-row md:space-x-2 space-y-1'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' placeholder='johndoe@hurun.com' name='email' className='p-1' required={true} />
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' placeholder='John Doe' name='name' className='p-1' />
            </div>
            <label htmlFor='password'>Password</label>
            <input type="password" id="password" placeholder='*****' name='password' className='p-1' required={false} defaultValue={"password@hurunindia123"}/>
            <label htmlFor='role'>Role</label>
            <select id='role' name='role' className='p-1' required={true}>
                <option>Admin</option>
                <option>User</option>
            </select>
            <button
            className={`w-full bg-red-700 hover:bg-red-900 h-10 rounded-md  text-white shadow-md ${processing? "cursor-pointer bg-black/20":"cursor-default"}`}
            type="submit" disabled={processing}
          >
            Submit
          </button>
        </form>
        <Toaster/>

    </div>
  )
}

export default AddUser