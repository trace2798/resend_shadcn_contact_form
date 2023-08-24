import { FeedbackForm } from "@/components/feedback-form";

export default function Home() {
  return (
    <main className="flex min-h-[90vh] flex-col items-center justify-center p-5">

      {/* <h1 className="text-xl font-semibold">Feedback Form</h1> */}
      <FeedbackForm />
      {/* <FeedbackFormEmail
        message="something"
        email="xyz@gmail.com"
        name="Trace"
        number="123456789"
      /> */}
    </main>
  );
}
