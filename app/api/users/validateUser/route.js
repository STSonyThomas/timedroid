import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request){
    try {
        const decodedToken = await getDataFromToken(request);
        console.log(decodedToken);
        const user =  await User.findOne({_id:decodedToken}).select("-isAdmin")
        console.log(user);
        return NextResponse.json({message:"User found!",userData:user,userId:decodedToken});
        
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({error:error.message},{status:400});
    }
}