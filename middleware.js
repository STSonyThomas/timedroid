import { NextResponse } from "next/server";
import { useAuthStore } from "./store/UserAuthStore";
import { getDataFromToken } from "./helpers/getDataFromToken";
import jwt from "jsonwebtoken";
import axios from "axios";
export function middleware(request){
    const path =request.nextUrl.pathname;
    // const expToken=getDataFromToken(request);
    const publicPaths = path ==="/login" || path==="/";
    const protectedPaths = path==="/userHome/(.*)/addUser" ||path ==="/(.*)/adminDashboard" || path=="/userHome/addUser";
    const token = request.cookies.get("token")?.value ||"";
    const adminToken = request.cookies.get("admin")?.value || "";
    console.log(token);
    if(publicPaths && token){
        return NextResponse.redirect(
            new URL("/userHome",request.nextUrl)
        );
    }
    if(!publicPaths && !token){
        return NextResponse.redirect(
            new URL("/login",request.nextUrl)
        );
    }
    if(protectedPaths && !adminToken){
        return NextResponse.redirect(
            new URL("/userHome",request.nextUrl)
        );
    }

    // const userLogin =  useAuthStore((state)=>state.user);
    // if(!userLogin){
    //     NextResponse.redirect(
    //         new URL("/",request.url)
    //     );
    // };

    return NextResponse.next();
}

export const config ={
    matcher:["/userHome/(.*)","/login","/","/userHome"]
}