import React from "react";
import ContactFormEmail from "@/email/create-form-email";
import { NextRequest, NextResponse } from "next/server";

import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const id = req.ip ?? "anonymous";
    const { success } = await rateLimit(id);
    if (!success) {
      return new NextResponse("Rate limit exceeded", { status: 429 });
    }

    const { email, message, name, number } = body;
    console.log(body, "BODY");
    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }
    if (!message) {
      return new NextResponse("Message is required", { status: 400 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!number) {
      return new NextResponse("Number is required", { status: 400 });
    }

    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "shreyaschaliha27@protonmail.com",
      subject: `${name} send you this message.`,
      reply_to: email,
      react: React.createElement(ContactFormEmail, {
        message: message,
        email: email,
        name: name,
        number: number,
      }),
    });
    // make sure the value for "to" field is your own email address with which you make created the account in resend.Otherwise you will get a error with statusCode 403
    // {
    //     name: 'invalid_to_address',
    //     message: 'You can only send testing emails to your own email address (shreyaschaliha27@protonmail.com).',
    //     statusCode: 403
    //   }
    console.log(data);
    return NextResponse.json("SUBMITTED");
  } catch (error) {
    console.log("[email_post]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
