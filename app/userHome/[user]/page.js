"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import DenseTable from "@/app/components/DataTable";

export default function UserSpecificHome({ params }) {
  const [processing, setProcessing] = useState(false);
  const [data, setData] = useState();
  const router = useRouter();
 
  return (
    <div className="flex flex-col items-center  min-h-screen">
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

      {/* <h1 className='text-black'>{params.user} this particular users pending requests will be present here</h1> */}
      <h1 className="text-black text-lg">Dashboard</h1>
      <div className="flex flex-1 w-full">
        <DenseTable rowData ={data} />
      </div>
      <Toaster />
    </div>
  );
}


