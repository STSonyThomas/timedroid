import { connect } from "@/dbConfig/dbConfig.js";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {email,password,name,role}= reqBody;
        let isAdmin = false;
        console.log(role);
        if(role==="Admin"){
            isAdmin=true;
        }else{
            isAdmin=false;
        }
        // console.log(reqBody);    
        // console.log({email,password,name,role});
        const user =  await User.findOne({email});
        if(user){
            return NextResponse.json({error:"User already exists!"},{status:400})
        };

        // hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashPwd = await bcryptjs.hash(password,salt);
        const newUser = new User({
            username:name,
            email,
            password:hashPwd,
            isAdmin,
        });

        const savedUser = await newUser.save();

        console.log(savedUser);

        return NextResponse.json({
            message:"User created successfully",
            success:true,
            savedUser
        },
        {status:201});

    } catch (error) {
        return NextResponse.json({error:error.message},{
            status:500
        });
    };
}

connect()