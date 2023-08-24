"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { MessageCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2),
  number: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  message: z.string().min(5),
});

interface FeedbackFormProps {}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({}) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      number: "",
      email: "",
      message: "",
    },
  });

  type FormData = z.infer<typeof formSchema>;

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      await axios.post(`/api/email`, values);
      form.reset();
      toast({
        title: "Feedback successfully send",
        description: "We will contact you back as soon as possible.",
        variant: "default",
      });
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 429) {
          return toast({
            title: "Too many request.",
            description: "Try in an hour.",
            variant: "green",
          });
        }
      } else {
        console.error(error);
        toast({
          title: "Failed to send information",
          description: "Make sure all fields are filled up.",
          variant: "destructive",
        });
      }
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <>
      <div className="fixed right-10 bottom-16">
        <Dialog>
          <DialogTrigger>
            <MessageCircle className="h-10 w-10 text-zinc-700 dark:text-neutral-300" />
            {/* <Button variant="outline">Send a Feedback</Button> */}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Feedback Form</DialogTitle>
              <DialogDescription>
                Thank you for taking your time to send us a feedback. Provide
                your information and feedback below and we will get in touch
                with you within 24 business hours.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-full grid-cols-12 gap-2 px-2 py-4 mt-5 border rounded-lg md:px-4 focus-within:shadow-sm max-w-lg"
              >
                <FormLabel className="mt-3">Name</FormLabel>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormLabel className="mt-3">Contact Number</FormLabel>
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Your number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormLabel className="mt-3">Email</FormLabel>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormLabel className="mt-3">Message</FormLabel>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Your feedback/message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="mt-5 w-fit"
                  disabled={isLoading || !form.formState.isValid}
                >
                  Submit
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
