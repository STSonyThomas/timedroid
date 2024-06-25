import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/dbConfig/supaConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(request) {
  try {
    const userId = await getDataFromToken(request);
    const currDate =  new Date();
    console.log(currDate);
    const { data, error } = await supabase
      .from("attendance")
      .select()
      .eq("empkey",userId);
    if(error){
        return NextResponse.json({error:error},{status:400});
    }
    // console.log(data);
    return NextResponse.json({
        message:"Data retrieved successfully",
        success:true,
        data
    },{
        status:200
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
