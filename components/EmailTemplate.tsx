import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Button,
} from "@react-email/components";

export function EmailTemplate({
  verificationUrl,
  firstName,
}: {
  verificationUrl: string;
  firstName: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email</Preview>
      <Body style={{ backgroundColor: "#f3f3f3", padding: "20px" }}>
        <Container
          style={{
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "8px",
          }}
        >
          <Text>Welcome to TasqueApp 🎉</Text>
          <Text style={{ fontSize: "20px" }}>Hello {firstName},</Text>
          <Text>
            Please click the button below to verify your email address:
          </Text>
          <Button
            href={verificationUrl}
            style={{ backgroundColor: "#3FA3FF", color: "#fff" }}
          >
            Verify Email
          </Button>
          <Text>
            Please ignore this email if you did not create an account with us.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
