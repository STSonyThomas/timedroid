"use client";
import { useAuthStore } from "@/store/UserAuthStore";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [userLogin, setUser] = useAuthStore((state) => [
    state.user,
    state.setUser,
  ]);
  const Router = useRouter();
  const [btnDisabled,setBtnDisabled] =  useState(false);
  const [processing,setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    // console.log(e.target.userName.value);
    const userData = {
      username:e.target.userName.value,
      password:e.target.password.value,
    };
    console.log(userData);
    try {
      const response = await axios.post("/api/users/login",userData);
      console.log("Login success",response.data);
      const status =  response.data.success;
      if(status){
        setUser({
          userName: e.target.userName.value,
          password: e.target.password.value,
        });
        console.log(userLogin);
        toast.success("You have been logged in!",{
          duratio:3000,
          position:"bottom-center"
        });
        Router.push("/userHome");
      }else{
        toast.error(response.data.error,{
          duration:3000,
          position:"bottom-center"
        })
      }
      
    } catch (error) {
      console.log(error.message);
      toast.error(error.message,{
        duration:3000,
        position:"bottom-center",
      });
    }finally{
      setProcessing(false);
    }
  };


  return (
    <div className="flex justify-center items-center  min-h-screen">
        <div 
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
        />
      <div className=" flex flex-row p-4 bg-gradient-to-br bg-gray-200 opacity-80 rounded-md shadow-md mx-auto my-auto ">
      {/* <Image
            src="https://hurunindia.com/wp-content/uploads/2022/05/logo.png"
            alt="Hurun India Logo"
            width={300}
            height={100}
            className="w-44 md:w-66 pb-10 md:pb-0 object-contain bg-gradient-to-br
            from-gray-200
            to-gray-100  rounded-md"
            priority={true}
            /> */}
        <form
          className="flex flex-col space-y-3  text-black items-center justify-center py-10 px-2"
          onSubmit={handleSubmit}
        >
          <input
            className="rounded-sm  py-2 px-1 bg-gray-300 ring-pink-400 focus:ring-2 outline-red-700 shadow-sm"
            type="email"
            name="userName"
            placeholder="Johndoe@gmail.com"
          />
          <input
            className="rounded-sm px-1 py-2 bg-gray-300 ring-pink-400 focus:ring-2 outline-red-700 shadow-sm"
            type="password"
            name="password"
            placeholder="*****"
          />
          <button
            className="w-full bg-red-700 hover:bg-red-900 h-10 rounded-md  text-white shadow-md"
            type="submit"
            disabled={processing}
          >
            Submit
          </button>
        </form>
        <Toaster/>
      </div>
    </div>
  );
};

export default Login;
