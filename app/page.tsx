import { ContactForm } from "@/components/contact-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <h1 className="text-xl font-semibold">Feedback Form</h1>
      <ContactForm />
    </main>
  );
}
