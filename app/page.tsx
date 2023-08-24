
export default function Home() {
  return (
    <main className="flex min-h-[90vh] flex-col items-center justify-center p-5">
      <h1 className="text-xl max-w-lg text-center">
        A simple feedback form made using Next.js 13 app directory, shadcn/ui,
        upstash ratelimit and react-email.
      </h1>
      <h1 className="text-lg text-muted-foreground">
        Mail send using Resend Labs API.
      </h1>
    </main>
  );
}
