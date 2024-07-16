import { Resend } from "resend";
import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
const resend = new Resend(process.env.RESEND_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const domain = "http://localhost:3000";

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  console.log("yes");
  // await resend.emails.send({
  //   from: "Acme <onboarding@resend.dev>",
  //   to: [email],
  //   subject: "2FA Code",
  //   html: `<p>Your 2FA code: ${token}</p>`,
  // });
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["gauravhariyani12.gh@gmail.com"],
      subject: "2FA Code",
      html: `<p>Your 2FA code: ${token}</p>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { message: "Error sending email with Resend", error: error.message },
        { status: 500 }
      );
    }

    console.log("Resend data:", data);
    console.log(process.env.SENDGRID_SENDER_EMAIL);
    if (process.env.SENDGRID_SENDER_EMAIL) {
      const msg = {
        to: email,
        from: process.env.SENDGRID_SENDER_EMAIL,
        subject: "RentXWallex 2FA",
        text: `Your 2-factor Authentication Code is ${token}`,
        html: `<p>Your 2FA code: ${token}</p>`,
      };
      await sgMail.send(msg);
      return NextResponse.json(
        { message: "Email sent successfully" },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email", error: error.message },
      { status: 500 }
    );
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
