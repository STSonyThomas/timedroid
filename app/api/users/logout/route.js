import { NextResponse } from "next/server";


export async function GET(request){
    try {
        const response =  NextResponse.json({message:"User Logged out!",success:true});
        const adminToken = request.cookies.get("admin")?.value || "";
        if(adminToken){
            response.cookies.set("admin","",{
                httpOnly:true,
                expires:new Date(0)
            });
        }
        response.cookies.set("token","",{httpOnly:true,expires:new Date(0)});
        return response;
        
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500});
    }
}