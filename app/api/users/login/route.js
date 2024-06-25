import { connect } from "@/dbConfig/dbConfig.js";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"



export async function POST(request){
    try {
        const reqBody =  await request.json();
        const {username,password} = reqBody;
        console.log(reqBody);
        //check if user exists
        const user = await User.findOne({email: username});
        if(!user){
            console.log("user doesnt exists");
            return NextResponse.json({error:"User not found!"},{status:400})
        }
        console.log("User exists!");
        const validPassword = await bcryptjs.compare(password,user.password);
        console.log(validPassword);
        if(!validPassword){
            return NextResponse.json({error:"Invalid password"},{status:500});
        }
        //create token data
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email,
            isAdmin:user.isAdmin,
        }
        //create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:"1h"})

        const response = NextResponse.json({
            message:"Login successful!",
            success:true,
        });

        response.cookies.set("token",token,{
            httpOnly:true,
           
        })
        if(user.isAdmin){
            const adminToken = await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:"1h"});

            response.cookies.set("admin",adminToken,{
                httpOnly:true,
            })
        }

        return response;


    } catch (error) {
        console.log(error.message);
        return NextResponse.json({error:error.message},{status:500});
    }
}
connect();
