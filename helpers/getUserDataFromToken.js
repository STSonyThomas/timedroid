import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getUserDataFromToken= async(request)=>{
    try {
        
        const token = request.cookies.get("token")?.value || "";
        const data = await jwt.verify(token,process.env.TOKEN_SECRET);
        console.log("data",data);
        const userData = {
            empkey:data.id,
            emailaddress:data.email,

        };
        return userData; 
    } catch (error) {
        
        throw new Error(error.message);
    }
}