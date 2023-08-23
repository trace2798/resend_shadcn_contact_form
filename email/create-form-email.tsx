import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type ContactFormEmailProps = {
  message: string;
  email: string;
  name: string;
  number: string;
};

export default function ContactFormEmail({
  message,
  email,
  name,
  number,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New message from your site</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">
                You received the following message from the contact form in your
                site
              </Heading>
              <Text>Sender's name: {name}</Text>
              <Hr />
              <Text>Sender's number: {number}</Text>
              <Text>Sender's email is: {email}</Text>
              <Hr />
              <Text>Message:{message}</Text>
              <Hr />
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
