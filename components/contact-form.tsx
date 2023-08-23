"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { HoverContentComponent } from "./HoverContentComponent";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { useParams, useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  number: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  message: z.string(),
});

interface ContactFormProps {}

export const ContactForm: React.FC<ContactFormProps> = ({}) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      await axios.post(`/api/email`, values);
      form.reset();
      toast({
        title: "Client Data Added",
        description: "Client Data Successfully Added",
        variant: "default",
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to submit data",
        description: "Make sure all fields are filled up.",
        variant: "destructive",
      });
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full grid-cols-12 gap-2 px-2 py-4 mt-5 border rounded-lg md:px-4 focus-within:shadow-sm"
      >
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <Label htmlFor="summarize" className="text-left w-fit">
              Name (required)
            </Label>
          </HoverCardTrigger>
          <HoverCardContent
            align="start"
            className="w-[260px] text-sm"
            side="left"
          >
            <HoverContentComponent type="Name of the Client" />
          </HoverCardContent>
        </HoverCard>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Client's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <Label htmlFor="summarize" className="mt-3 text-left w-fit">
              Contact Number
            </Label>
          </HoverCardTrigger>
          <HoverCardContent
            align="start"
            className="w-[260px] text-sm"
            side="left"
          >
            <HoverContentComponent type="Contact Number for Client" />
          </HoverCardContent>
        </HoverCard>
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Client's number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <Label htmlFor="summarize" className="mt-3 text-left w-fit">
              Email
            </Label>
          </HoverCardTrigger>
          <HoverCardContent
            align="start"
            className="w-[260px] text-sm"
            side="left"
          >
            <HoverContentComponent type="Client's email, in case of minor their parents." />
          </HoverCardContent>
        </HoverCard>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Client's email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <Label htmlFor="address" className="text-left w-fit">
              Message (required)
            </Label>
          </HoverCardTrigger>
          <HoverCardContent
            align="start"
            className="w-[260px] text-sm"
            side="left"
          >
            <HoverContentComponent type="Address of the Client" />
          </HoverCardContent>
        </HoverCard>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Your message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-5" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
