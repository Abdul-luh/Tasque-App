import { EmailTemplate } from "@/components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
  firstName: string,
  email: string,
  token: string
) {
  if (
    !email ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    throw new Error("Invalid email address.");
  }
  if (!token || typeof token !== "string") {
    throw new Error("Invalid token.");
  }

  const verificationUrl = `${process.env.DOMAIN}/register/verify-email?token=${token}`;

  // Actual email logic with Resend. Other: (Nodemailer/Resend/SendGrid etc.)
  try {
    const { data, error } = await resend.emails.send({
      from: "TasqueApp <no-reply@tasqueapp.com>",
      to: email,
      subject: "Verify your TasqueApp account",
      react: EmailTemplate({ firstName, verificationUrl }),
    });

    console.log({ data }, { error });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}
