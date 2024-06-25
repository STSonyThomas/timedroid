import { supabase } from "@/dbConfig/supaConfig";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserDataFromToken } from "@/helpers/getUserDataFromToken";
export async function POST(request){
    try {
        const reqBody = await request.json();
        const {date,month,year,monday,tuesday,wednesday,thursday,friday,saturday,sunday}=reqBody;
        console.log("Coming from seond line of attendance api",date,month,year,monday,tuesday,wednesday,thursday,friday,saturday,sunday);
        const userData =  await getUserDataFromToken(request);
        console.log("fourth line of attendance api",userData);
        // get employee_key:MongoDB Unique Key, emailAdress:email,status:pending
        const sendData = {...userData,status:"pending",...reqBody};
        //connecting with supabase
        const {data,error} = await supabase.from("attendance").insert(sendData);
        if(error){
            console.log(error);
            return NextResponse.json({error:"Entry for date already exists!"},{status:400});
        }
        console.log(data);
        console.log(sendData);
        return NextResponse.json({
            message:"Data added to DB successfully",
            success:true,
        },{
            status:201
        })
        
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({error:error.message},{status:500});
    }
}