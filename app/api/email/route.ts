import { NextResponse } from "next/server";

import { Resend } from "resend";


export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();

    const { name } = body;

  

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    

    return NextResponse.json(board);
  } catch (error) {
    console.log("[BOARDS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}