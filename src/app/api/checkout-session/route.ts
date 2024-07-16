import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "../../../../auth";
import { MembershipCheckout } from "@/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(request: NextRequest) {
  const session = await auth();
  const { quantity, membershipAmt, membershipName, membershipDuration } =
    await request.json();
  try {
    console.log("POST request received");

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const params: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: membershipName, // Replace with your product name
            },
            unit_amount: membershipAmt * quantity * 100, // Ensure quantity is a positive integer
          },
          quantity: quantity,
        },
      ],
      metadata: {
        membershipAmt: membershipAmt,
        membershipName: membershipName,
        membershipDuration: membershipDuration,
        type: "Membership",
        customer_email: session.user.email!,
      },
      mode: "payment",
      success_url: `${request.headers.get(
        "origin"
      )}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/cancel`,
    };
    const stripeSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);

    console.log("Session created:", stripeSession);
    return NextResponse.json(
      { success: true, id: stripeSession.id },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.url.split("=")[1];
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json({ session: session }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
