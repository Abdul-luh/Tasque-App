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
      <Preview>Verify your TasqueApp email</Preview>
      <Body style={{ backgroundColor: "#f3f3f3", padding: "20px" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "40px",
            borderRadius: "8px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <Text
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#3FA3FF",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            tasque <span style={{ color: "#000" }}>app</span>
          </Text>

          <Text style={{ fontSize: "18px", margin: "20px 0" }}>
            Hello {firstName},
          </Text>

          <Text>
            Please click the button below to verify your email address:
          </Text>

          <Button
            href={verificationUrl}
            style={{
              backgroundColor: "#3FA3FF",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "6px",
              display: "inline-block",
              margin: "20px 0",
              textDecoration: "none",
            }}
          >
            Verify Email
          </Button>

          <Text style={{ fontSize: "14px", color: "#555" }}>
            If you did not create a TasqueApp account, you can ignore this
            message.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
