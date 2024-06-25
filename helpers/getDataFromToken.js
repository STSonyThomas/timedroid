import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getDataFromToken= async(request)=>{
    try {
        
        const token = request.cookies.get("token")?.value || "";
        const data = await jwt.verify(token,process.env.TOKEN_SECRET);
        console.log("data",data);
        const userId = data.id;
        console.log(userId);
        return data.id; 
    } catch (error) {
        
        throw new Error(error.message);
    }
}