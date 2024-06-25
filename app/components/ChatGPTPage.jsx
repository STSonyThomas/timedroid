"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowUp } from "react-icons/fa";

export default function ChatGPTPage() {
  
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [database,setDatabase] =useState();
  const systemMessage = {
    content:database,
    role:"system"
  }
  const [messages, setMessages] = useState([systemMessage]);
  //constants and declarations arent allowed past this line

  useEffect(() => {
    let data = "";
    const getData = async () => {
      try {
        data = await axios.get("/api/admin/getDatabase");
        const realdata = data.data.data;
        console.log(data.data.data);
        setDatabase(realdata);
        const systemMessage = {
          content: JSON.stringify(realdata,null,2),
          role: "system",
        };
        setMessages([systemMessage]);
        //insert theme song for thalapathy vijay ifykyk
        if (!data) {
          toast.error('Data not found!');
        }
        toast.success("Data loaded for chat.")
      } catch (error) {
        console.log(error.message);
        toast.error("Could not load data from database", {
          duration: 4000,
        });
      }

      
  }
  getData();
}, [setDatabase]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      // toast.loading("Please wait while the answers are being generated...",{duration:5000})
      const newMessage = { content: input, role: "user" };
      console.log("This is the system message");
      console.log("breakpoint!");
      // console.log("after", messages);
      const response = axios.post("/api/admin/chat", [
        ...messages,
        newMessage,
      ]);
      toast.promise(response,{
        loading:'Please wait while your answer is being generated...',
        success: (responseData)=>{
          setMessages(responseData.data.results);
          return "Data Generated"
        },
        error:(err)=>{
          return `Oops met with ${err.message}.`
        }
      },
    {
      success:{
        duration:3000
      }
    }
    )
      // console.log(response.data.results[0].message);
      // // setMessages(response.data.results);
      // console.log(response.data.results);   
    } catch (error) {
      // console.log(error.message);
      toast.error(error.message);
    } finally {
      setInput("");
      setLoading(false);
    }
    
  };

  return (
    <div className="flex justify-center items-end h-full md:h-screen w-full bg-gray-500 mt-2 ">
      <div className="flex flex-col w-full px-4 bg-gray-100 shadow-lg rounded-lg">
        <div className="flex-1 min-h-screen p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 p-2 rounded-md ${
                msg.role === "user"
                  ? "ml-auto bg-blue-300 text-black rounded-l-lg max-w-xs"
                  : "mx-auto bg-gray-100 text-black rounded-r-lg max-w-lg"
              }`}
            >
              {msg.role!="system"?msg.content:null}
            </div>
          ))}
        </div>
        <div className=" flex flex-1 items-center max-h-md justify-center p-4 border-t w-full border-gray-200">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            // onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 max-w-xl px-4 py-2 border rounded-md outline-none"
          />
          <button
            onClick={() => {
              console.log(messages);
              sendMessage();
            }}
            className=" ml-4 px-2 py-2 bg-blue-500 text-white rounded-full"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
      <Toaster/>
    </div>
  );
}
