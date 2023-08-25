import FeedbackFormEmail from "@/email/create-email-from-form";
import ResponseBackEmail from "@/email/response-back";
import { rateLimit } from "@/lib/rate-limit";
import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { Resend } from "resend";

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
      from: "Feedback Form <feedback@upstash.app>",
      to: "shreyaschaliha27@protonmail.com",
      // cc: ["tres5840@gmail.com"],
      subject: `${name} send you this feedback.`,
      reply_to: email,
      react: React.createElement(FeedbackFormEmail, {
        message: message,
        email: email,
        name: name,
        number: number,
      }),
    });

    const data2 = resend.emails.send({
      from: "Upstash Team <feedback@upstash.app>",
      to: `${email}`,
      subject: "Submission Confirmation From Upstash Team",
      react: React.createElement(ResponseBackEmail, {
        name: name,
      }),
    });
    console.log(data, "Feedback");
    console.log(data2, "response mail");
    // If you are using the free plan from resend labs. Make sure the value for "to" field is your own email address with which you created the account in resend.
    // Otherwise you will get a error with statusCode 403
    // {
    //     name: 'invalid_to_address',
    //     message: 'You can only send testing emails to your own email address (shreyaschaliha27@protonmail.com).',
    //     statusCode: 403
    //   }
    return NextResponse.json("SUBMITTED");
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
