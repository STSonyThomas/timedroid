import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/dbConfig/supaConfig";
import { AzureOpenAI } from "openai";

export async function POST(request) {
    const endpoint = process.env.OPEN_AI_ENDPOINT;
    const apiKey=process.env.OPEN_AI_APIKEY;
    const apiVersion = "2024-05-01-preview";
    const deployment = "gpt-4";
  try {
    const requestBody = await request.json();
    console.log(requestBody);
    const client = new AzureOpenAI({endpoint,apiKey,apiVersion,deployment});
    const results = await client.chat.completions.create({
        messages:requestBody,
        model:""

    })

    console.log(results);
    return NextResponse.json(
      { message: "Successfully received context",
        success:true,
        results:[...requestBody,results.choices[0].message]
       },
      { status: 200 },
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
