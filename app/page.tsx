import { FeedbackForm } from "@/components/feedback-form";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <ModeToggle/>
      <h1 className="text-xl font-semibold">Feedback Form</h1>
      <FeedbackForm />
    </main>
  );
}
